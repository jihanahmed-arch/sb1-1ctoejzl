import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import { createClient } from '@supabase/supabase-js';
import { format } from 'date-fns';
import { Package } from 'lucide-react';

interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  variant?: {
    id: string;
    name: string;
  };
  size?: string;
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  total: number;
  shipping_info: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
  };
  payment_method: string;
  items: OrderItem[];
}

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const OrdersPage: React.FC = () => {
  const { cart } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        if (ordersError) throw ordersError;

        const ordersWithItems = await Promise.all(
          ordersData.map(async (order) => {
            const { data: itemsData, error: itemsError } = await supabase
              .from('order_items')
              .select('*')
              .eq('order_id', order.id);

            if (itemsError) throw itemsError;

            return {
              ...order,
              items: itemsData
            };
          })
        );

        setOrders(ordersWithItems);
      } catch (err) {
        setError('Failed to load orders. Please try again later.');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatPrice = (price: number) => {
    return `৳${price.toLocaleString()}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-32">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h1>

      {/* Current Cart */}
      {cart.items.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-medium mb-4">Current Cart</h2>
          <div>
            {cart.items.map((item, index) => (
              <CartItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Order History */}
      <div className="space-y-6">
        <h2 className="text-lg font-medium text-gray-800">Order History</h2>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading your orders...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-md">
            {error}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow-sm">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">You haven't placed any orders yet.</p>
            <a
              href="/all-products"
              className="mt-4 inline-block text-pink-500 hover:text-pink-600"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-wrap justify-between items-start mb-4 pb-4 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-500">
                    Order placed on {format(new Date(order.created_at), 'MMM d, yyyy')}
                  </p>
                  <p className="text-sm text-gray-500">
                    Order #{order.id.slice(0, 8)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">
                    Total: {formatPrice(order.total)}
                  </p>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Shipping Information
                </h3>
                <p className="text-sm text-gray-600">
                  {order.shipping_info.firstName} {order.shipping_info.lastName}
                </p>
                <p className="text-sm text-gray-600">
                  {order.shipping_info.address}
                </p>
                <p className="text-sm text-gray-600">
                  {order.shipping_info.city}, {order.shipping_info.postalCode}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Order Items
                </h3>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center py-4 border-t border-gray-100"
                    >
                      <div className="flex-grow">
                        <p className="font-medium text-gray-800">
                          {item.product_id}
                        </p>
                        {item.variant && (
                          <p className="text-sm text-gray-600">
                            Variant: {item.variant.name}
                          </p>
                        )}
                        {item.size && (
                          <p className="text-sm text-gray-600">
                            Size: {item.size}
                          </p>
                        )}
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium text-gray-800">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersPage;