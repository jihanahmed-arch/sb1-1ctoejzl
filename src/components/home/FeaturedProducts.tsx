import React, { useState } from 'react';
import ProductCard from '../products/ProductCard';
import { getFeaturedProducts } from '../../data/products';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FeaturedProducts: React.FC = () => {
  const featuredProducts = getFeaturedProducts();
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('featured-products-container');
    if (!container) return;
    
    const scrollAmount = 300;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    if (direction === 'left') {
      const newPosition = Math.max(0, scrollPosition - scrollAmount);
      setScrollPosition(newPosition);
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
    } else {
      const newPosition = Math.min(maxScroll, scrollPosition + scrollAmount);
      setScrollPosition(newPosition);
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Featured Products</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full bg-white shadow hover:bg-pink-50 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full bg-white shadow hover:bg-pink-50 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div 
          id="featured-products-container"
          className="flex overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          <div className="flex space-x-6">
            {featuredProducts.map(product => (
              <div key={product.id} className="snap-start flex-shrink-0" style={{ width: '280px' }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;