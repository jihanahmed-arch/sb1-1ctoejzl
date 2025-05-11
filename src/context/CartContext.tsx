import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart, CartItem, Product, ProductVariant } from '../types';

interface CartContextType {
  cart: Cart;
  savedItems: CartItem[];
  addToCart: (product: Product, quantity: number, size?: string, variant?: ProductVariant) => void;
  removeFromCart: (itemIndex: number) => void;
  updateQuantity: (itemIndex: number, quantity: number) => void;
  clearCart: () => void;
  moveToCart: (savedItemIndex: number) => void;
}

const initialCart: Cart = {
  items: [],
  subtotal: 0,
  shipping: 0,
  total: 0
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : initialCart;
    } catch {
      return initialCart;
    }
  });

  const [savedItems, setSavedItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('savedItems');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const calculateTotals = (items: CartItem[]) => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const shipping = items.length > 0 ? 50 : 0;
    return {
      items,
      subtotal,
      shipping,
      total: subtotal + shipping
    };
  };

  const updateCartAndStorage = (newItems: CartItem[]) => {
    const newCart = calculateTotals(newItems);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const addToCart = (product: Product, quantity: number, size?: string, variant?: ProductVariant) => {
    const existingItemIndex = cart.items.findIndex(
      item => 
        item.product.id === product.id && 
        item.size === size && 
        (!item.variant || !variant || item.variant.id === variant.id)
    );

    const updatedItems = [...cart.items];

    if (existingItemIndex >= 0) {
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + quantity
      };
    } else {
      updatedItems.push({ product, quantity, size, variant });
    }

    updateCartAndStorage(updatedItems);
  };

  const removeFromCart = (itemIndex: number) => {
    const updatedItems = cart.items.filter((_, index) => index !== itemIndex);
    updateCartAndStorage(updatedItems);
  };

  const updateQuantity = (itemIndex: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemIndex);
      return;
    }

    const updatedItems = [...cart.items];
    updatedItems[itemIndex] = {
      ...updatedItems[itemIndex],
      quantity
    };
    updateCartAndStorage(updatedItems);
  };

  const clearCart = () => {
    setCart(initialCart);
    localStorage.removeItem('cart');
  };

  const moveToCart = (savedItemIndex: number) => {
    const itemToMove = savedItems[savedItemIndex];
    const newSavedItems = savedItems.filter((_, index) => index !== savedItemIndex);
    
    setSavedItems(newSavedItems);
    localStorage.setItem('savedItems', JSON.stringify(newSavedItems));
    
    addToCart(itemToMove.product, itemToMove.quantity, itemToMove.size, itemToMove.variant);
  };

  const value = {
    cart,
    savedItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    moveToCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};