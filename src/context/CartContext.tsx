type CartItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  table: string | null; // Include table if needed
};



"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

// Create CartContext with proper type definition
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemName: string) => void;
  updateQuantity: (itemName: string, quantity: number) => void;
}

// Create the context with a default value of null
const CartContext = createContext<CartContextType | null>(null);

// Create CartProvider
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // Type cartItems as an array of CartItem

  // Function to add items to the cart
  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.name === item.name);

      // If the item already exists in the cart, update the quantity
      if (existingItem) {
        return prevItems.map((i) =>
          i.name === item.name ? { ...i, quantity: item.quantity } : i
        );
      }

      // If it's a new item, add it to the cart
      return [...prevItems, { ...item }];
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemName: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.name !== itemName));
  };


  const updateQuantity = (itemName: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.name === itemName ? { ...item, quantity } : item
      )
    );
  };


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
