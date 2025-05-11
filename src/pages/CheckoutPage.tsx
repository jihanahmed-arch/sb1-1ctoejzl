import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useRequireAuth } from '../hooks/useRequireAuth';
import CartSummary from '../components/cart/CartSummary';
import OrderConfirmedModal from '../components/checkout/OrderConfirmedModal';
import { CheckCircle, CreditCard, MapPin, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type PaymentMethod = 'cash' | 'bkash';
type DeliveryLocation = 'sylhet' | 'outside';

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const { user, updateShippingInfo } = useAuth();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useRequireAuth();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [deliveryLocation, setDeliveryLocation] = useState<DeliveryLocation>('sylhet');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    firstName: user?.shippingInfo?.firstName || '',
    lastName: user?.shippingInfo?.lastName || '',
    email: user?.email || '',
    phone: user?.shippingInfo?.phone || '',
    address: user?.shippingInfo?.address || '',
    city: user?.shippingInfo?.city || '',
    postalCode: user?.shippingInfo?.postalCode || '',
    saveInfo: true
  });

  const getShippingCost = () => {
    return deliveryLocation === 'sylhet' ? 80 : 130;
  };
  
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (name === 'saveInfo' && checked) {
      try {
        await updateShippingInfo(formData);
      } catch (error) {
        console.error('Failed to save shipping info:', error);
      }
    }
  };
  
  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    setError(null);
    
    try {
      if (formData.saveInfo) {
        await updateShippingInfo(formData);
      }

      const orderDetails = {
        items: cart.items,
        shipping: formData,
        paymentMethod,
        deliveryLocation,
        shippingCost: getShippingCost(),
        total: cart.total + getShippingCost()
      };

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-order-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderDetails }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to process order');
      }

      setShowConfirmation(true);
      clearCart();
    } catch (error) {
      console.error('Order processing failed:', error);
      setError(error.message || 'Failed to process order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // useRequireAuth will handle the redirect
  }

  if (cart.items.length === 0 && !showConfirmation) {
    navigate('/');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-32">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center mb-4">
                <MapPin size={20} className="text-pink-500 mr-2" />
                <h2 className="text-lg font-medium">Shipping Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address*
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City*
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code*
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onChange={handleChange}
                    className="h-4 w-4 text-pink-500 focus:ring-pink-400 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Save this information for next time
                  </span>
                </label>
              </div>
            </div>

            {/* Delivery Location Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center mb-4">
                <Truck size={20} className="text-pink-500 mr-2" />
                <h2 className="text-lg font-medium">Delivery Location</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="sylhet"
                    name="delivery-location"
                    type="radio"
                    checked={deliveryLocation === 'sylhet'}
                    onChange={() => setDeliveryLocation('sylhet')}
                    className="h-4 w-4 text-pink-500 focus:ring-pink-400 border-gray-300"
                  />
                  <label htmlFor="sylhet" className="ml-3 flex flex-col">
                    <span className="text-sm font-medium text-gray-700">Inside Sylhet</span>
                    <span className="text-xs text-gray-500">Delivery charge: ৳80</span>
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="outside"
                    name="delivery-location"
                    type="radio"
                    checked={deliveryLocation === 'outside'}
                    onChange={() => setDeliveryLocation('outside')}
                    className="h-4 w-4 text-pink-500 focus:ring-pink-400 border-gray-300"
                  />
                  <label htmlFor="outside" className="ml-3 flex flex-col">
                    <span className="text-sm font-medium text-gray-700">Any District (Bangladesh)</span>
                    <span className="text-xs text-gray-500">Delivery charge: ৳130</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <CreditCard size={20} className="text-pink-500 mr-2" />
                <h2 className="text-lg font-medium">Payment Method</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="cash-on-delivery"
                    name="payment-method"
                    type="radio"
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                    className="h-4 w-4 text-pink-500 focus:ring-pink-400 border-gray-300"
                  />
                  <label htmlFor="cash-on-delivery" className="ml-3 flex flex-col">
                    <span className="text-sm font-medium text-gray-700">Cash on Delivery</span>
                    <span className="text-xs text-gray-500">Pay when you receive your order</span>
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="bkash"
                    name="payment-method"
                    type="radio"
                    checked={paymentMethod === 'bkash'}
                    onChange={() => setPaymentMethod('bkash')}
                    className="h-4 w-4 text-pink-500 focus:ring-pink-400 border-gray-300"
                  />
                  <label htmlFor="bkash" className="ml-3 flex flex-col">
                    <span className="text-sm font-medium text-gray-700">bKash</span>
                    <span className="text-xs text-gray-500">Pay online using bKash</span>
                  </label>
                </div>
              </div>
              
              {paymentMethod === 'bkash' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-700 mb-2">
                    Please use the following information to complete your bKash payment:
                  </p>
                  <p className="text-sm text-gray-600">
                    bKash Merchant Number: <span className="font-medium">01700000000</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Reference: <span className="font-medium">HC-{Math.floor(Math.random() * 10000)}</span>
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-6 lg:hidden">
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full py-3 flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-white rounded-md transition-colors disabled:opacity-70"
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <CheckCircle size={18} className="mr-2" />
                    Place Order
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        <div className="lg:w-1/3 mt-6 lg:mt-0">
          <CartSummary 
            isCheckout={true} 
            onPlaceOrder={handlePlaceOrder}
            isProcessing={isProcessing}
            shippingCost={getShippingCost()}
          />
        </div>
      </div>
      
      <OrderConfirmedModal 
        isOpen={showConfirmation} 
        onClose={() => {
          setShowConfirmation(false);
          navigate('/');
        }} 
      />
    </div>
  );
};

export default CheckoutPage;