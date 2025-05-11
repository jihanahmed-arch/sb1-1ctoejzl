import React, { useState } from 'react';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ForgotPasswordForm from './ForgotPasswordForm';

type AuthView = 'login' | 'signup' | 'forgot-password';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<AuthView>('login');
  
  if (!isOpen) return null;
  
  const handleAuthSuccess = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 z-10 overflow-hidden">
        {/* Header */}
        <div className="relative px-6 py-4 bg-pink-50 border-b border-pink-100">
          <h2 className="text-xl font-semibold text-gray-800">
            {view === 'login' ? 'Sign In' : view === 'signup' ? 'Create Account' : 'Reset Password'}
          </h2>
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {view === 'login' && (
            <LoginForm onSuccess={handleAuthSuccess} />
          )}
          
          {view === 'signup' && (
            <SignupForm onSuccess={handleAuthSuccess} />
          )}
          
          {view === 'forgot-password' && (
            <ForgotPasswordForm onSuccess={() => setView('login')} />
          )}
          
          {/* Footer Links */}
          <div className="mt-6 text-center text-sm text-gray-600">
            {view === 'login' && (
              <>
                <p>
                  Don't have an account?{' '}
                  <button 
                    onClick={() => setView('signup')}
                    className="text-pink-500 hover:text-pink-600 font-medium"
                  >
                    Sign Up
                  </button>
                </p>
                <p className="mt-2">
                  <button 
                    onClick={() => setView('forgot-password')}
                    className="text-pink-500 hover:text-pink-600 font-medium"
                  >
                    Forgot your password?
                  </button>
                </p>
              </>
            )}
            
            {view === 'signup' && (
              <p>
                Already have an account?{' '}
                <button 
                  onClick={() => setView('login')}
                  className="text-pink-500 hover:text-pink-600 font-medium"
                >
                  Sign In
                </button>
              </p>
            )}
            
            {view === 'forgot-password' && (
              <p>
                Remember your password?{' '}
                <button 
                  onClick={() => setView('login')}
                  className="text-pink-500 hover:text-pink-600 font-medium"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;