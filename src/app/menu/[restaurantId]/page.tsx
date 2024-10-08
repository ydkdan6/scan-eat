"use client";

import { useParams } from 'next/navigation'; // Import useParams from next/navigation
import { useEffect, useState } from 'react';
import { HeartIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/navigation'; // Correct router import for the new App Directory
import { useCart } from '@/context/CartContext'; // Import your cart context

const MenuPage = () => {
  const router = useRouter(); // Initialize the router hook from next/navigation
  // const { restaurantId } = useParams(); // Get params using next/navigation
  const { addToCart } = useCart(); // Destructure addToCart from the cart context
  const [table, setTable] = useState(null); // State to store table information
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({}); // State for tracking item quantities
  const [isMounted, setIsMounted] = useState(false); // Ensure client-side mounting
  const [searchQuery, setSearchQuery] = useState(''); // State for the search input

  // Mock menu data
  const menuItems = [
    { id: 1, name: 'Jollof Rice', description: 'Delicious jollof rice', price: 3000, image: '/images/image2.jpeg' },
    { id: 2,  name: 'Fried Rice', description: 'Tasty fried rice', price: 2500, image: '/images/img1.jpeg' },
    { id: 3, name: 'Spaghetti', description: 'Italian spaghetti', price: 2000, image: '/images/image2.jpeg' },
    { id: 4,  name: 'Afang Soup', description: 'Traditional soup', price: 3000, image: '/images/img1.jpeg' },
  ];

  useEffect(() => {
    // Set up table data on mount and check for client-side rendering
    
    setIsMounted(true); // Marks the component as mounted on the client-side
    if (typeof window !== 'undefined') {
      const tableFromUrl = new URLSearchParams(window.location.search).get('table');
      setTable(tableFromUrl);
    }
  }, []);

  if (!isMounted) {
    return null; // Or some loading spinner if desired
  }

  // Handle Order Button Click
  const handleOrder = (item) => {
    const quantity = quantities[item.id] || 0;
    addToCart({ ...item, quantity, table }); // Add the item to the cart
    router.push('/orders'); // Navigate to the cart page after adding the item
  };

  // Handle quantity increase
  const increaseQuantity = (index) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: (prevQuantities[index] || 0) + 1,
    }));
  };

  // Handle quantity decrease
  const decreaseQuantity = (index) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: Math.max((prevQuantities[index] || 0) - 1, 0), // Prevent quantity going below 0
    }));
  };

  // Filter menu items based on the search query
  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-10">
      <header className="bg-gray-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          {/* Search Input */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[300px] h-[55px] ml-11 px-4 py-2 border rounded-2xl"
            />
          </div>
        </div>
        <h1 className="text-3xl text-center font-bold text-gray-900">
          Foods
        </h1>
      </header>

      <div className="mt-4 max-w-4xl mx-auto px-4">
        {filteredMenuItems.length > 0 ? (
          filteredMenuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 mb-4 bg-gray-50 rounded-lg shadow-md"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-3xl"
              />
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.description}</p>
                <p className="text-orange-500 font-bold mt-1">₦{item.price}</p>

                {/* Quantity Control Buttons */}
                <div className="mt-4 flex items-center space-x-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-white text-orange-500 px-2 py-[2px] rounded-lg"
                  >
                    -
                  </button>
                  <span className="text-gray-800 font-semibold">
                    {quantities[item.id] || 0}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-white text-orange-500 px-2 py-[2px] rounded-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Wishlist Heart Icon and Order Button */}
              <div className="ml-4 flex flex-col items-center">
                {/* Heart Icon */}
                <button className="mb-6 ml-7 p-1 text-red-500 transition-colors duration-200">
                  <HeartIcon className="h-8 w-8 fill-white" />
                </button>

                {/* Order Button */}
                <button
                  className={`bg-orange-500 text-white px-4 py-2 rounded-lg mt-5  ${quantities[item.id] > 0 ? '' : 'opacity-50 cursor-not-allowed'}`}
                  onClick={() => handleOrder(item)}
                  disabled={quantities[item.id] === 0}
                >
                  Order
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-4">No items found.</div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
