import React from 'react';
import { Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
  index: number;
}

const CartItem: React.FC<CartItemProps> = ({ item, index }) => {
  const { updateQuantity, removeFromCart } = useCart();
  
  const { product, quantity, size, variant } = item;
  
  const formatPrice = (price: number) => {
    return `৳${price.toLocaleString()}`;
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateQuantity(index, parseInt(e.target.value));
  };
  
  const handleRemove = () => {
    removeFromCart(index);
  };

  return (
    <div className="flex flex-col sm:flex-row py-6 border-b border-gray-200">
      {/* Product Image */}
      <div className="sm:w-24 h-24 flex-shrink-0 mb-4 sm:mb-0">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      
      {/* Product Details */}
      <div className="sm:ml-6 flex-grow">
        <div className="flex flex-col sm:flex-row justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-800">
              <a href={`/product/${product.id}`} className="hover:text-pink-500 transition-colors">
                {product.name}
              </a>
            </h3>
            <p className="text-sm text-gray-500 capitalize">
              {product.category} / {product.subcategory.replace('-', ' ')}
            </p>
          </div>
          <p className="text-base font-semibold text-pink-500 mt-2 sm:mt-0">
            {formatPrice(product.price)}
          </p>
        </div>
        
        {/* Variant & Size */}
        <div className="mt-2 text-sm text-gray-600">
          {variant && <p>Variant: {variant.name}</p>}
          {size && <p>Size: {size}</p>}
        </div>
        
        {/* Actions */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <label htmlFor={`quantity-${index}`} className="sr-only">Quantity</label>
              <select
                id={`quantity-${index}`}
                value={quantity}
                onChange={handleQuantityChange}
                className="border border-gray-300 rounded-md py-1 pl-2 pr-8 text-gray-700 focus:outline-none focus:ring-1 focus:ring-pink-300 focus:border-pink-300"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleRemove}
              className="text-gray-500 hover:text-red-500 transition-colors"
              aria-label="Remove item"
            >
              <Trash2 size={18} />
            </button>
          </div>
          
          <p className="text-base font-semibold text-gray-800">
            {formatPrice(product.price * quantity)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;