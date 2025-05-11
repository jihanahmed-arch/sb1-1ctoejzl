import React from 'react';
import Logo from './Logo';
import { Instagram, Facebook, Youtube, GitBranch as BrandTiktok } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="col-span-1">
            <Logo withTagline />
            <p className="mt-4 text-gray-600 text-sm">
              Bringing you the finest collection of fashion, beauty, and accessories.
              Our products are carefully curated to help you express your unique style.
            </p>
            
            <div className="mt-6 flex space-x-4">
              <a 
                href="https://www.facebook.com/womensclothshopSylhet" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-600 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-pink-400 hover:text-pink-600 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-pink-400 hover:text-pink-600 transition-colors"
              >
                <Youtube size={20} />
              </a>
              <a 
                href="#" 
                className="text-pink-400 hover:text-pink-600 transition-colors"
              >
                <BrandTiktok size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Hena's Collection. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="/privacy-policy" className="text-sm text-gray-500 hover:text-pink-500 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-sm text-gray-500 hover:text-pink-500 transition-colors">
                Terms of Service
              </a>
              <a href="/sitemap" className="text-sm text-gray-500 hover:text-pink-500 transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;