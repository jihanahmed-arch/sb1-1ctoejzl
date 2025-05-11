import React from 'react';
import { useCart } from '../../context/CartContext';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CartSummaryProps {
  isCheckout?: boolean;
  onPlaceOrder?: () => void;
  isProcessing?: boolean;
  shippingCost?: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ 
  isCheckout = false, 
  onPlaceOrder,
  isProcessing = false,
  shippingCost = 0
}) => {
  const { cart } = useCart();
  const navigate = useNavigate();
  
  const formatPrice = (price: number) => {
    return `৳${price.toLocaleString()}`;
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };
  
  const total = cart.subtotal + shippingCost;
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({cart.items.length} items)</span>
          <span>{formatPrice(cart.subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{cart.items.length > 0 ? formatPrice(shippingCost) : 'Free'}</span>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between font-semibold text-gray-800 text-lg mb-4">
          <span>Total</span>
          <span className="text-pink-500">{formatPrice(total)}</span>
        </div>
        
        <button 
          onClick={isCheckout ? onPlaceOrder : handleProceedToCheckout}
          disabled={cart.items.length === 0 || isProcessing}
          className={`w-full py-3 flex items-center justify-center rounded-md transition-colors ${
            cart.items.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-pink-500 hover:bg-pink-600 text-white'
          } disabled:opacity-70`}
        >
          {isCheckout ? (
            isProcessing ? (
              'Processing...'
            ) : (
              <>
                Place Order
                <CheckCircle size={18} className="ml-2" />
              </>
            )
          ) : (
            <>
              Proceed to Checkout
              <ArrowRight size={16} className="ml-2" />
            </>
          )}
        </button>
        
        {!isCheckout && (
          <p className="text-center text-xs text-gray-500 mt-4">
            By checking out, you agree to our <a href="/terms" className="underline hover:text-pink-500">Terms of Service</a> and <a href="/privacy-policy" className="underline hover:text-pink-500">Privacy Policy</a>.
          </p>
        )}
      </div>
    </div>
  );
};

export default CartSummary;