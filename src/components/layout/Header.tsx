import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import NavbarDropdown from './NavbarDropdown';
import { products } from '../../data/products';

const Header: React.FC = () => {
  const { cart } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSearchResults([]);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = products
        .filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      setSearchResults([]);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      setIsProfileOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navItems = [
    {
      title: 'Clothes',
      items: [
        { label: 'Dresses', href: '/category/clothes/dresses' },
        { label: 'Tops', href: '/category/clothes/tops' },
        { label: 'Pants', href: '/category/clothes/pants' },
        { label: 'Traditional Wear', href: '/category/clothes/traditional-wear' }
      ]
    },
    {
      title: 'Cosmetics',
      items: [
        { label: 'Makeup', href: '/category/cosmetics/makeup' },
        { label: 'Skincare', href: '/category/cosmetics/skincare' },
        { label: 'Fragrances', href: '/category/cosmetics/fragrances' }
      ]
    },
    {
      title: 'Jewelry',
      items: [
        { label: 'Necklaces', href: '/category/jewelry/necklaces' },
        { label: 'Earrings', href: '/category/jewelry/earrings' },
        { label: 'Bracelets', href: '/category/jewelry/bracelets' },
        { label: 'Rings', href: '/category/jewelry/rings' }
      ]
    }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button 
              className="md:hidden text-pink-500 hover:text-pink-700 transition-colors mr-4"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <a href="/" className="flex-shrink-0">
              <Logo textColor={isScrolled ? 'text-pink-500' : 'text-pink-500'} />
            </a>
          </div>
          
          {/* Mobile Menu */}
          <div className={`md:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <div className="p-4">
              <div className="flex justify-between items-center mb-8">
                <Logo textColor="text-pink-500" />
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              
              <nav className="space-y-6">
                {navItems.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-lg font-medium text-gray-900">{category.title}</h3>
                    <div className="space-y-2 pl-4">
                      {category.items.map((item, itemIndex) => (
                        <a
                          key={itemIndex}
                          href={item.href}
                          className="block text-gray-600 hover:text-pink-500"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <NavbarDropdown 
                key={index}
                title={item.title}
                items={item.items}
              />
            ))}
          </nav>
          
          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <div ref={searchRef} className="relative">
              <button 
                className="text-pink-500 hover:text-pink-700 transition-colors"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-screen sm:w-96 bg-white rounded-lg shadow-lg z-50">
                  <form onSubmit={handleSearchSubmit} className="p-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                        autoFocus
                      />
                      <button 
                        type="submit"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-500"
                      >
                        <Search size={18} />
                      </button>
                    </div>
                  </form>
                  
                  {searchResults.length > 0 && (
                    <div className="border-t border-gray-100">
                      {searchResults.map((product) => (
                        <a
                          key={product.id}
                          href={`/product/${product.id}`}
                          className="block px-4 py-2 hover:bg-gray-50"
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchResults([]);
                          }}
                        >
                          <div className="flex items-center">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{product.name}</p>
                              <p className="text-sm text-gray-500">৳{product.price}</p>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div ref={profileRef} className="relative">
              <button 
                className="text-pink-500 hover:text-pink-700 transition-colors relative"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-label="Profile"
              >
                <User size={20} />
                {isAuthenticated && (
                  <span className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-green-500"></span>
                )}
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  {isAuthenticated ? (
                    <>
                      <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50">
                        Profile
                      </a>
                      <a href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50">
                        My Orders
                      </a>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-50"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <a 
                      href="/auth" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50"
                    >
                      Sign In
                    </a>
                  )}
                </div>
              )}
            </div>
            
            <a 
              href="/cart" 
              className="text-pink-500 hover:text-pink-700 transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {cart.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.items.length}
                </span>
              )}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;