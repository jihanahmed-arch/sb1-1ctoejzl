import { Product } from '../types';

// Mock products data
export const products: Product[] = [
  // Dresses
  {
    id: 'dress-1',
    name: 'Pocket Burkha',
    description: 'Very comfortable fabric pocket burkha. Embroidered on the sleeves and bottom. (Bangi color)\nLength 52\nFree size',
    price: 680,
    images: [
      'https://i.postimg.cc/nz0vDqSY/fe7f4d7d-7836-4b97-9645-f75d474bf48a.png',
      'https://i.postimg.cc/wT6Dk4Y5/86873c52-2e96-4bab-a4db-6c7d357202a2.png'
    ],
    category: 'clothes',
    subcategory: 'dresses',
    rating: 4.6,
    reviewCount: 24,
    inStock: true,
    featured: true,
    isNew: true
  },
  {
    id: 'dress-2',
    name: 'Jorjet 4-piece set',
    description: 'Jorjet 4-piece set\n👗 Kameez: Made of georgette fabric with all-over gorgeous embroidery and sequin work.\n👖 Salwar: Original Indian butter fabric salwar.\n🧣 Orna: Jorjet Orna with all-over gorgeous embroidery and sequence work.',
    price: 1600,
    images: [
      'https://i.postimg.cc/02w9TsfS/0fc4e315-c54b-4e54-b220-f3a8b9afac76.png',
      'https://i.postimg.cc/NMZjXfDg/e7c1fd97-23e5-4189-95ed-40220e725673.png'
    ],
    category: 'clothes',
    subcategory: 'dresses',
    variants: [
      { id: 'black', name: 'Black' },
      { id: 'green', name: 'Green' }
    ],
    rating: 4.8,
    reviewCount: 12,
    inStock: true,
    featured: true
  },
  {
    id: 'dress-3',
    name: 'Casual T-shirt Dress',
    description: 'A comfortable and versatile t-shirt dress perfect for everyday wear. Features a relaxed fit and soft cotton fabric.',
    price: 1299,
    images: [
      'https://images.pexels.com/photos/8386598/pexels-photo-8386598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    ],
    category: 'clothes',
    subcategory: 'dresses',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.3,
    reviewCount: 37,
    inStock: true
  },
  
  // Tops
  {
    id: 'top-1',
    name: 'Silk Blouse',
    description: 'An elegant silk blouse with a classic design. Perfect for both professional and casual settings.',
    price: 1599,
    images: [
      'https://images.pexels.com/photos/7691227/pexels-photo-7691227.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    ],
    category: 'clothes',
    subcategory: 'tops',
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.5,
    reviewCount: 19,
    inStock: true,
    featured: true
  },
  {
    id: 'top-2',
    name: 'Casual Cotton Tee',
    description: 'A comfortable cotton t-shirt with a relaxed fit. Perfect for everyday casual wear.',
    price: 699,
    images: [
      'https://images.pexels.com/photos/5709665/pexels-photo-5709665.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    ],
    category: 'clothes',
    subcategory: 'tops',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.2,
    reviewCount: 45,
    inStock: true
  },
  
  // Jewelry
  {
    id: 'necklace-1',
    name: 'Simple Round Earings',
    description: 'Timeless and minimal, these classic round earrings add a touch of elegance to any outfit. Perfect for everyday wear or subtle sophistication.',
    price: 50,
    images: [
      'https://i.postimg.cc/3wXfgy91/e6485992-b0e2-4e32-9f82-15f3155e0513-1.png'
    ],
    category: 'jewelry',
    subcategory: 'necklaces',
    rating: 4.9,
    reviewCount: 32,
    inStock: true,
    featured: true,
    isNew: true
  },
  {
    id: 'earrings-1',
    name: 'Crystal Drop Earrings',
    description: 'Elegant crystal drop earrings that catch the light beautifully. Perfect for special occasions.',
    price: 899,
    images: [
      'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    ],
    category: 'jewelry',
    subcategory: 'earrings',
    rating: 4.7,
    reviewCount: 18,
    inStock: true,
    featured: true
  },
  {
    id: 'bracelet-1',
    name: 'Gold Chain Bracelet',
    description: 'A stylish gold chain bracelet that adds a touch of elegance to any outfit. Features a secure clasp closure.',
    price: 1599,
    images: [
      'https://images.pexels.com/photos/8285167/pexels-photo-8285167.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    ],
    category: 'jewelry',
    subcategory: 'bracelets',
    rating: 4.6,
    reviewCount: 14,
    inStock: true
  },
  
  // Cosmetics
  {
    id: 'makeup-1',
    name: 'YC Whitening Facewash',
    description: 'An extra nourishing face wash, specially formulated to moisturize your skin, nourishes with milk extract. It helps eliminate dirt and residue. It helps prevent and control excess oil, white restore natural moisture balance to your skin. The skin appears clean young-looking and moisture.',
    price: 200,
    images: [
      'https://i.postimg.cc/xC58mCLb/273b27f9-b12e-47b4-af3c-4e63d9f13ee4.png',
      'https://i.postimg.cc/YSqCH75r/17782.jpg'
    ],
    category: 'cosmetics',
    subcategory: 'makeup',
    variants: [
      { id: 'lip-1-rose', name: 'Rose Petal' },
      { id: 'lip-1-coral', name: 'Coral Sunset' },
      { id: 'lip-1-red', name: 'Classic Red' }
    ],
    rating: 4.4,
    reviewCount: 65,
    inStock: true,
    featured: true
  },
  {
    id: 'skincare-1',
    name: 'Beauty Glazed & Tea tree nose pore strips',
    description: 'This removes blackheads from the nose.\nUsage:\nWash your face thoroughly with a face wash.\nIt\'s even better if you take steam on your nose for 5–10 minutes, as the steam opens up the pores. 😊\nThen clean the nose well with water and apply the nose strip on the wet nose. 😊\nRemember: The strip will not stick to dry skin.\nAfter that, leave it on for 10–15 minutes. Once the strip dries, gently peel it off.',
    price: 40,
    images: [
      'https://i.postimg.cc/B6xdmYgr/495967223-1244200821040949-3429672110501012259-n.jpg',
      'https://i.postimg.cc/wxkhpXbg/495446636-1244200941040937-8765191286281290605-n.jpg'
    ],
    category: 'cosmetics',
    subcategory: 'skincare',
    rating: 4.8,
    reviewCount: 42,
    inStock: true,
    isNew: true
  },
  {
    id: 'fragrance-1',
    name: 'Floral Eau de Parfum',
    description: 'A light and fresh floral fragrance with notes of rose, jasmine, and a hint of citrus. Long-lasting and perfect for daily wear.',
    price: 1799,
    images: [
      'https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    ],
    category: 'cosmetics',
    subcategory: 'fragrances',
    rating: 4.7,
    reviewCount: 29,
    inStock: true,
    featured: true
  }
];

// Helper function to get featured products
export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

// Helper function to get new arrivals
export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.isNew);
};

// Helper function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

// Helper function to get products by subcategory
export const getProductsBySubcategory = (category: string, subcategory: string): Product[] => {
  return products.filter(
    product => product.category === category && product.subcategory === subcategory
  );
};

// Helper function to get a product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};