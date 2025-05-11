import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cart, savedItems, moveToCart } = useCart();
  
  return (
    <div className="container mx-auto px-4 py-8 pt-32">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
      
      {cart.items.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="max-w-md mx-auto">
            <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" />
              Continue Shopping
            </a>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <h2 className="text-lg font-medium">Items ({cart.items.length})</h2>
                <a href="/" className="text-pink-500 hover:text-pink-600 transition-colors">
                  Continue Shopping
                </a>
              </div>
              
              {cart.items.map((item, index) => (
                <CartItem key={index} item={item} index={index} />
              ))}
            </div>
            
            {/* Saved For Later */}
            {savedItems && savedItems.length > 0 && (
              <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium border-b border-gray-200 pb-4">
                  Saved for Later ({savedItems.length})
                </h2>
                
                {savedItems.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row py-6 border-b border-gray-200">
                    <div className="sm:w-24 h-24 flex-shrink-0 mb-4 sm:mb-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    
                    <div className="sm:ml-6 flex-grow">
                      <div className="flex flex-col sm:flex-row justify-between">
                        <div>
                          <h3 className="text-base font-medium text-gray-800">
                            <a href={`/product/${item.product.id}`} className="hover:text-pink-500 transition-colors">
                              {item.product.name}
                            </a>
                          </h3>
                          <p className="text-sm text-gray-500">
                            ৳{item.product.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => moveToCart(index)}
                        className="mt-4 text-sm text-pink-500 hover:text-pink-600 transition-colors"
                      >
                        Move to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;