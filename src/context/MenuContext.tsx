"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the shape of our context data
type MenuContextType = {
  quantities: { [key: number]: number };
  likedItems: { [key: number]: boolean };
  updateQuantity: (itemId: number, quantity: number) => void;
  toggleLike: (itemId: number) => void;
  resetMenuState: () => void;
};

// Create the context with default values
const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Create a provider component
export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [likedItems, setLikedItems] = useState<{ [key: number]: boolean }>({});

  // Load the state from localStorage when the component mounts
  useEffect(() => {
    const savedQuantities = localStorage.getItem("menu-quantities");
    const savedLikedItems = localStorage.getItem("menu-likedItems");

    if (savedQuantities) {
      setQuantities(JSON.parse(savedQuantities));
    }

    if (savedLikedItems) {
      setLikedItems(JSON.parse(savedLikedItems));
    }
  }, []);

  // Save the state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("menu-quantities", JSON.stringify(quantities));
    localStorage.setItem("menu-likedItems", JSON.stringify(likedItems));
  }, [quantities, likedItems]);

  // Update quantity for a menu item
  const updateQuantity = (itemId: number, quantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: quantity,
    }));
  };

  // Toggle like status for a menu item
  const toggleLike = (itemId: number) => {
    setLikedItems((prevLikedItems) => ({
      ...prevLikedItems,
      [itemId]: !prevLikedItems[itemId],
    }));
  };

  // Reset all state
  const resetMenuState = () => {
    setQuantities({});
    setLikedItems({});
  };

  return (
    <MenuContext.Provider
      value={{
        quantities,
        likedItems,
        updateQuantity,
        toggleLike,
        resetMenuState,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

// Custom hook to use the Menu context
export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
