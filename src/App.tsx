import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import CheckoutPage from './pages/CheckoutPage';
import SearchResults from './pages/SearchResults';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import AuthModal from './components/auth/AuthModal';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import AllProducts from './components/home/AllProducts';

// Separate component for auth route to use hooks
const AuthRoute = ({ setIsAuthModalOpen }) => {
  const location = useLocation();

  useEffect(() => {
    setIsAuthModalOpen(true);
  }, [setIsAuthModalOpen]);

  return (
    <div className="pt-32">
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Account</h1>
        <p className="text-gray-600">Please sign in or create an account to continue.</p>
      </div>
    </div>
  );
};

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/all-products" element={<AllProducts />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="/category/:category/:subcategory" element={<CategoryPage />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/auth" element={<AuthRoute setIsAuthModalOpen={setIsAuthModalOpen} />} />
              </Routes>
            </main>
            
            <Footer />
            
            <AuthModal 
              isOpen={isAuthModalOpen} 
              onClose={() => setIsAuthModalOpen(false)} 
            />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;