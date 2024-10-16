"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMenu } from "@/context/MenuContext"; // Importing Menu Context

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  location: string;
  prepTime: string;
  distance: string;
  ingredients: string[];
  rating: number;
  reviews: number;
  weight: string;
  calories: string;
};

const ItemDetailPage = () => {
  const router = useRouter();
  const { itemId } = router.query;
  const { quantities, likedItems, updateQuantity, toggleLike } = useMenu(); // Using MenuContext to access state
  const [item, setItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Mock data (replace with actual data fetching logic)
  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Jollof Rice",
      description: "Delicious jollof rice",
      price: 3000,
      image: "/images/image2.jpeg",
      location: "Dominic Utuk Avenue",
      prepTime: "30 minutes",
      distance: "200m",
      ingredients: ["Red bell peppers", "Curry powder", "Chicken broth", "Rice"],
      rating: 4.5,
      reviews: 20,
      weight: "250g",
      calories: "12% cal",
    },
    // More items...
  ];

  useEffect(() => {
    if (itemId) {
      const menuItem = menuItems.find(
        (item: MenuItem) => item.id === parseInt(itemId as string)
      );
      if (menuItem) {
        setItem(menuItem);
        setQuantity(quantities[menuItem.id] || 1); // Initialize with stored quantity
      } else {
        router.push("/menu"); // Redirect back if item not found
      }
    }
  }, [itemId, quantities, router]);

  if (!item) return <div>Loading...</div>;

  const handleAddToCart = () => {
    // Handle adding to cart logic here
    console.log("Add to cart clicked", item);
  };

  return (
    <div className="min-h-screen bg-[#FFF4EE] p-6 flex flex-col items-center">
      {/* Back Button */}
      <button onClick={() => router.back()} className="self-start mb-4">
        <span className="text-xl">&larr;</span>
      </button>

      {/* Food Image */}
      <div className="w-64 h-64 rounded-full overflow-hidden mb-6">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Food Name */}
      <h1 className="text-3xl font-bold mb-4">{item.name}</h1>

      {/* Information Section */}
      <div className="flex space-x-4 text-sm text-gray-700 mb-6">
        <div className="flex items-center space-x-1">
          <span>📍</span>
          <span>{item.location}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>⏲️</span>
          <span>{item.prepTime}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>🚶‍♂️</span>
          <span>{item.distance}</span>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="w-full max-w-lg bg-white rounded-lg p-6">
        <div className="flex justify-around mb-4 text-gray-500">
          <button className="font-bold border-b-2 border-orange-500">
            Details
          </button>
          <button>Ingredients</button>
          <button>Reviews</button>
        </div>

        {/* Ingredients List */}
        <p className="text-gray-700 mb-4">{item.ingredients.join(", ")}</p>

        {/* Quantity, Price, and Rating */}
        <div className="flex justify-between items-center mb-4">
          <span>{item.weight} / {item.calories}</span>
          <span className="flex items-center space-x-1 text-gray-500">
            <span>⭐</span>
            <span>{item.rating}</span>
            <span>({item.reviews})</span>
          </span>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setQuantity(Math.max(quantity - 1, 1))}
              className="text-xl bg-gray-200 p-2 rounded-full"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-xl bg-gray-200 p-2 rounded-full"
            >
              +
            </button>
          </div>
          <span className="text-2xl font-bold text-orange-500">
            ₦{item.price * quantity}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-orange-500 text-white py-3 rounded-full text-lg"
        >
          Add to Cart
        </button>

        {/* Like Button */}
        <button
          onClick={() => toggleLike(item.id)}
          className={`mt-4 w-full py-2 rounded-full text-lg ${
            likedItems[item.id] ? "bg-red-500 text-white" : "bg-gray-200 text-red-500"
          }`}
        >
          {likedItems[item.id] ? "Liked ♥" : "Like ♥"}
        </button>
      </div>
    </div>
  );
};

export default ItemDetailPage;
