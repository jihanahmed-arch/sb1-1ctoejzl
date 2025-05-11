import React, { useState } from 'react';
import { Product, ProductVariant } from '../../types';
import { Star, ShoppingCart, Truck, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
  );
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const { addToCart } = useCart();
  
  const formatPrice = (price: number) => {
    return `৳${price.toLocaleString()}`;
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedVariant);
  };
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) setQuantity(value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row -mx-4">
        {/* Product Images */}
        <div className="lg:w-1/2 px-4 mb-6 lg:mb-0">
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation Controls */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 text-gray-800 hover:bg-opacity-90 transition-all"
                    aria-label="Previous image"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 text-gray-800 hover:bg-opacity-90 transition-all"
                    aria-label="Next image"
                  >
                    <ArrowRight size={20} />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                      index === currentImageIndex ? 'border-pink-500' : 'border-transparent'
                    }`}
                  >
                    <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="lg:w-1/2 px-4">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : i < product.rating 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                    fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                  />
                ))}
                <span className="ml-2 text-gray-600">
                  {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>
            
            <p className="text-2xl font-bold text-pink-500 mb-4">
              {formatPrice(product.price)}
            </p>
            
            <div className="prose prose-sm text-gray-600 mb-6">
              <p>{product.description}</p>
            </div>
            
            {/* Variants Selection */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  {product.category === 'cosmetics' ? 'Color/Variant' : 'Style'}:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2 border rounded-md text-sm ${
                        selectedVariant?.id === variant.id
                          ? 'border-pink-500 bg-pink-50 text-pink-600'
                          : 'border-gray-300 text-gray-700 hover:border-pink-300'
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium text-gray-700">Size:</h3>
                  <a href="#size-chart" className="text-sm font-medium text-pink-500 hover:text-pink-600">
                    Size Guide
                  </a>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 flex items-center justify-center border rounded-md text-sm ${
                        selectedSize === size
                          ? 'border-pink-500 bg-pink-50 text-pink-600'
                          : 'border-gray-300 text-gray-700 hover:border-pink-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Quantity:</h3>
              <div className="flex items-center">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="h-10 w-10 border border-gray-300 rounded-l-md flex items-center justify-center text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="h-10 w-16 border-t border-b border-gray-300 text-center text-gray-700 focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-10 w-10 border border-gray-300 rounded-r-md flex items-center justify-center text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-6 bg-pink-500 hover:bg-pink-600 text-white rounded-md transition-colors flex items-center justify-center"
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </button>
            </div>
            
            {/* Product Meta Info */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center text-gray-600 mb-3">
                <Truck size={18} className="mr-2" />
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </div>
              <div className="text-sm text-gray-500">
                <p>Category: <span className="capitalize">{product.category}</span></p>
                <p>Subcategory: <span className="capitalize">{product.subcategory.replace('-', ' ')}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;