import React from 'react';
import { Product } from '../../types';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  size?: 'small' | 'medium' | 'large';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, size = 'medium' }) => {
  const { addToCart } = useCart();
  
  const formatPrice = (price: number) => {
    return `৳${price.toLocaleString()}`;
  };
  
  const sizeClasses = {
    small: 'max-w-xs',
    medium: 'max-w-sm',
    large: 'max-w-md'
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <a 
      href={`/product/${product.id}`}
      className={`group block ${sizeClasses[size]} bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300`}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden aspect-[3/4]">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handleAddToCart}
            className="bg-white rounded-full p-3 hover:bg-pink-500 hover:text-white transition-colors duration-300"
            aria-label="Add to cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
        
        {/* Product Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-2">
          {product.isNew && (
            <span className="bg-pink-500 text-white px-2 py-1 text-xs font-semibold rounded">New</span>
          )}
          {product.featured && (
            <span className="bg-purple-500 text-white px-2 py-1 text-xs font-semibold rounded">Featured</span>
          )}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-1">
              {product.name}
            </h3>
            <p className="text-xs text-gray-500 capitalize">
              {product.subcategory.replace('-', ' ')}
            </p>
          </div>
          <p className="font-semibold text-pink-500">{formatPrice(product.price)}</p>
        </div>
        
        {/* Rating */}
        <div className="flex items-center mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating) 
                    ? 'text-yellow-400' 
                    : i < product.rating 
                    ? 'text-yellow-400' 
                    : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">
            ({product.reviewCount})
          </span>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;