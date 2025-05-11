// Product Types
export type ProductCategory = 'clothes' | 'cosmetics' | 'jewelry';

export type ClothesSubcategory = 'dresses' | 'tops' | 'pants' | 'traditional wear';
export type CosmeticsSubcategory = 'makeup' | 'skincare' | 'fragrances';
export type JewelrySubcategory = 'necklaces' | 'earrings' | 'bracelets' | 'rings';

export type ProductSubcategory = 
  | ClothesSubcategory 
  | CosmeticsSubcategory 
  | JewelrySubcategory;

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: ProductCategory;
  subcategory: ProductSubcategory;
  sizes?: string[];
  variants?: ProductVariant[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured?: boolean;
  isNew?: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  price?: number;
  image?: string;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  variant?: ProductVariant;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

// Auth Types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Review Types
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}