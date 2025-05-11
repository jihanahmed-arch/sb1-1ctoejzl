import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AtSign, Loader, CheckCircle } from 'lucide-react';

interface ForgotPasswordFormProps {
  onSuccess: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword, loading, error } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
      setTimeout(() => {
        onSuccess();
      }, 3000);
    } catch (err) {
      // Error is handled by the auth context
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-4">
        <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
        <h3 className="text-lg font-medium text-gray-800 mb-2">Reset Email Sent</h3>
        <p className="text-gray-600">
          We've sent a password reset link to <strong>{email}</strong>. Please check your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-gray-600 mb-6">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        {/* Email */}
        <div>
          <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <AtSign size={18} className="text-gray-400" />
            </div>
            <input
              id="reset-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
            />
          </div>
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-pink-500 hover:bg-pink-600 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50 disabled:opacity-70"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <Loader size={18} className="animate-spin mr-2" />
              Sending...
            </span>
          ) : (
            'Send Reset Link'
          )}
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;