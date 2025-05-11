import React, { useState } from 'react';
import { Send } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Here would be the API call to subscribe the user
    // For now, we'll just simulate success
    setSubmitted(true);
    setError('');
  };

  return (
    <section className="py-12 bg-pink-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 mb-6">
            Be the first to know about new collections, exclusive offers, and fashion tips.
          </p>
          
          {submitted ? (
            <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              Thank you for subscribing! We've sent a confirmation to your email.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-grow">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && <p className="text-left text-red-500 text-sm mt-1">{error}</p>}
              </div>
              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                Subscribe
                <Send size={16} className="ml-2" />
              </button>
            </form>
          )}
          
          <p className="text-sm text-gray-500 mt-4">
            By subscribing, you agree to our <a href="/privacy-policy" className="underline hover:text-pink-500">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;