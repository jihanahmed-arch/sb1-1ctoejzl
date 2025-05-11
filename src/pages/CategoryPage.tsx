import React from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByCategory, getProductsBySubcategory } from '../data/products';
import ProductCard from '../components/products/ProductCard';
import { ArrowLeft } from 'lucide-react';

const CategoryPage: React.FC = () => {
  const { category, subcategory } = useParams<{ category: string; subcategory?: string }>();
  
  let products = [];
  let title = '';
  
  if (subcategory) {
    products = getProductsBySubcategory(category, subcategory);
    title = subcategory.charAt(0).toUpperCase() + subcategory.slice(1).replace('-', ' ');
  } else {
    products = getProductsByCategory(category);
    title = category.charAt(0).toUpperCase() + category.slice(1);
  }
  
  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h1>
        <p className="text-gray-600 mb-6">
          The category you're looking for doesn't exist or has no products yet.
        </p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Home
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-32">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-4">
        <a href="/" className="hover:text-pink-500 transition-colors">Home</a>
        <span className="mx-2">/</span>
        {subcategory ? (
          <>
            <a href={`/category/${category}`} className="hover:text-pink-500 transition-colors capitalize">
              {category}
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-700 capitalize">{subcategory.replace('-', ' ')}</span>
          </>
        ) : (
          <span className="text-gray-700 capitalize">{category}</span>
        )}
      </div>
      
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{title}</h1>
      
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;