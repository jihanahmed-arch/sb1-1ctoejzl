import React, { useState } from 'react';
import { products } from '../../data/products';
import ProductCard from '../products/ProductCard';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

type SortOption = 'newest' | 'price-low' | 'price-high' | 'rating';

const AllProducts: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  // Get all unique categories
  const categories = Array.from(new Set(products.map(p => p.category)));

  // Sort and filter products
  const filteredProducts = products
    .filter(product => 
      (!selectedCategory || product.category === selectedCategory) &&
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">All Products</h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="lg:w-1/4 hidden lg:block">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-medium text-lg mb-4">Filters</h3>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="category-all"
                      name="category"
                      checked={selectedCategory === null}
                      onChange={() => setSelectedCategory(null)}
                      className="h-4 w-4 text-pink-500 focus:ring-pink-400"
                    />
                    <label htmlFor="category-all" className="ml-2 text-gray-700">
                      All Categories
                    </label>
                  </div>
                  
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category}`}
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="h-4 w-4 text-pink-500 focus:ring-pink-400"
                      />
                      <label htmlFor={`category-${category}`} className="ml-2 text-gray-700 capitalize">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range Filter */}
              <div>
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">৳{priceRange[0]}</span>
                    <span className="text-gray-600 text-sm">৳{priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Products Grid & Mobile Filters */}
          <div className="lg:w-3/4">
            {/* Sorting & Mobile Filter Toggle */}
            <div className="flex flex-wrap justify-between items-center mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center px-4 py-2 bg-gray-100 rounded-md text-gray-700 mb-4 sm:mb-0"
              >
                <SlidersHorizontal size={16} className="mr-2" />
                Filters
              </button>
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
              </div>
            </div>
            
            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden bg-white rounded-lg shadow-sm p-4 mb-6">
                <h3 className="font-medium text-lg mb-4">Filters</h3>
                
                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Category</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="mobile-category-all"
                        name="mobile-category"
                        checked={selectedCategory === null}
                        onChange={() => setSelectedCategory(null)}
                        className="h-4 w-4 text-pink-500 focus:ring-pink-400"
                      />
                      <label htmlFor="mobile-category-all" className="ml-2 text-gray-700">
                        All Categories
                      </label>
                    </div>
                    
                    {categories.map(category => (
                      <div key={`mobile-${category}`} className="flex items-center">
                        <input
                          type="radio"
                          id={`mobile-category-${category}`}
                          name="mobile-category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="h-4 w-4 text-pink-500 focus:ring-pink-400"
                        />
                        <label htmlFor={`mobile-category-${category}`} className="ml-2 text-gray-700 capitalize">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Range Filter */}
                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm">৳{priceRange[0]}</span>
                      <span className="text-gray-600 text-sm">৳{priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                    />
                  </div>
                </div>
                
                <button
                  onClick={() => setShowFilters(false)}
                  className="mt-6 w-full py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            )}
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found matching your filters.</p>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setPriceRange([0, 5000]);
                  }}
                  className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllProducts;