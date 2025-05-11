import React from 'react';
import { getNewArrivals } from '../../data/products';
import ProductCard from '../products/ProductCard';

const NewArrivals: React.FC = () => {
  const newArrivals = getNewArrivals();

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">New Arrivals</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our latest additions to the collection. Fresh styles that keep you ahead of the trends.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <a 
            href="/new-arrivals"
            className="inline-block px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors duration-300"
          >
            View All New Arrivals
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;