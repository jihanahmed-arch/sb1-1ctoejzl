import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, getProductsByCategory } from '../data/products';
import ProductDetail from '../components/products/ProductDetail';
import ProductCard from '../components/products/ProductCard';
import { ArrowLeft, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([
    {
      id: '1',
      userName: 'Sarah M.',
      rating: 5,
      comment: 'Absolutely love this product! The quality is exceptional.',
      date: '2025-03-15T10:30:00Z'
    },
    {
      id: '2',
      userName: 'John D.',
      rating: 4,
      comment: 'Great product, just what I was looking for.',
      date: '2025-03-14T15:45:00Z'
    }
  ]);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6">
          The product you're looking for doesn't exist or has been removed.
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

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    const newReview = {
      id: Date.now().toString(),
      userName: user?.email?.split('@')[0] || 'Anonymous',
      rating,
      comment: reviewText,
      date: new Date().toISOString()
    };

    setReviews(prev => [newReview, ...prev]);
    setReviewText('');
    setRating(5);
  };
  
  // Get related products
  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="pt-32">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <div className="text-sm text-gray-500 mb-4">
          <a href="/" className="hover:text-pink-500 transition-colors">Home</a>
          <span className="mx-2">/</span>
          <a href={`/category/${product.category}`} className="hover:text-pink-500 transition-colors capitalize">
            {product.category}
          </a>
          <span className="mx-2">/</span>
          <a href={`/category/${product.category}/${product.subcategory}`} className="hover:text-pink-500 transition-colors capitalize">
            {product.subcategory.replace('-', ' ')}
          </a>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{product.name}</span>
        </div>
      </div>
      
      {/* Product Detail */}
      <ProductDetail product={product} />
      
      {/* Product Description & Reviews Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-4 px-1 text-sm font-medium border-b-2 ${
                activeTab === 'description'
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-600 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-1 text-sm font-medium border-b-2 ${
                activeTab === 'reviews'
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-600 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reviews ({reviews.length})
            </button>
          </nav>
        </div>
        
        <div className="py-6">
          {activeTab === 'description' ? (
            <div className="prose prose-pink max-w-none">
              <h2>Product Description</h2>
              <p>{product.description}</p>
              
              {product.category === 'clothes' && (
                <>
                  <h3>Fabric & Care</h3>
                  <ul>
                    <li>Premium quality material</li>
                    <li>Machine wash cold</li>
                    <li>Do not bleach</li>
                    <li>Tumble dry low</li>
                    <li>Iron on low heat if needed</li>
                  </ul>
                </>
              )}
              
              {product.category === 'jewelry' && (
                <>
                  <h3>Materials & Care</h3>
                  <ul>
                    <li>High-quality metals</li>
                    <li>Avoid contact with water and chemicals</li>
                    <li>Remove before showering or swimming</li>
                    <li>Store in a cool, dry place</li>
                    <li>Clean with a soft, dry cloth</li>
                  </ul>
                </>
              )}
              
              {product.category === 'cosmetics' && (
                <>
                  <h3>Ingredients & Usage</h3>
                  <ul>
                    <li>Premium quality ingredients</li>
                    <li>Dermatologically tested</li>
                    <li>Not tested on animals</li>
                    <li>Store in a cool, dry place</li>
                    <li>Use as directed for best results</li>
                  </ul>
                </>
              )}
            </div>
          ) : (
            <div>
              {/* Review Form */}
              {isAuthenticated ? (
                <form onSubmit={handleSubmitReview} className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Write a Review</h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating
                    </label>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`${
                            star <= rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        >
                          <Star size={24} fill={star <= rating ? 'currentColor' : 'none'} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Review
                    </label>
                    <textarea
                      id="review"
                      rows={4}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500"
                      placeholder="Share your thoughts about this product..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors"
                  >
                    Submit Review
                  </button>
                </form>
              ) : (
                <div className="bg-gray-50 p-4 rounded-md mb-8">
                  <p className="text-gray-600">
                    Please <a href="/auth" className="text-pink-500 hover:text-pink-600">sign in</a> to leave a review.
                  </p>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                            fill={i < review.rating ? 'currentColor' : 'none'}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">
                        {format(new Date(review.date), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <p className="font-medium text-gray-800">{review.userName}</p>
                    <p className="mt-2 text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">You May Also Like</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;