import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const LanguageSelectModal: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSelectedLanguage = Cookies.get('language_preference');
    if (!hasSelectedLanguage) {
      setIsOpen(true);
    }
  }, []);

  const handleLanguageSelect = () => {
    i18n.changeLanguage('en');
    Cookies.set('language_preference', 'en', { expires: 365 });
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Select Your Language
        </h2>
        <p className="text-gray-600 mb-6">
          Choose your preferred language to continue
        </p>
        
        <button
          onClick={handleLanguageSelect}
          className="w-full py-3 px-4 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
        >
          Continue in English
        </button>
      </div>
    </div>
  );
};

export default LanguageSelectModal;