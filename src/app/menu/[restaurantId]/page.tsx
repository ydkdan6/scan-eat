"use client";

// import Link from "next/link";
import { useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/outline";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useMenu } from "@/context/MenuContext"; // Import MenuContext

const MenuPage = () => {
  const router = useRouter();
  // const { restaurantId } = router;
  const { addToCart, cartItems  } = useCart();
  const { quantities, likedItems, updateQuantity, toggleLike } = useMenu(); // Destructure context values
  const [table, setTable] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  type MenuItem = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
  };


  // Mock menu data
  const menuItems: MenuItem[] = [
    { id: 1, name: "Jollof Rice", description: "Delicious jollof rice", price: 3000, image: "/images/image2.jpeg" },
    { id: 2, name: "Fried Rice", description: "Tasty fried rice", price: 2500, image: "/images/img1.jpeg" },
    { id: 3, name: "Spaghetti", description: "Italian spaghetti", price: 2000, image: "/images/image2.jpeg" },
    { id: 4, name: "Afang Soup", description: "Traditional soup", price: 3000, image: "/images/img1.jpeg" },
    { id: 1, name: "Meat pie", description: "Delicious Meat Pie", price: 1500, image: "/images/image2.jpeg" },
    { id: 2, name: "Fried Rice", description: "Tasty fried rice", price: 2500, image: "/images/img1.jpeg" },
    { id: 3, name: "Spaghetti", description: "Italian spaghetti", price: 2000, image: "/images/image2.jpeg" },
    { id: 4, name: "Afang Soup", description: "Traditional soup", price: 3000, image: "/images/img1.jpeg" },
    { id: 1, name: "Jollof Rice", description: "Delicious jollof rice", price: 3000, image: "/images/image2.jpeg" },
    { id: 2, name: "Fried Rice", description: "Tasty fried rice", price: 2500, image: "/images/img1.jpeg" },
    { id: 3, name: "Spaghetti", description: "Italian spaghetti", price: 2000, image: "/images/image2.jpeg" },
    { id: 4, name: "Afang Soup", description: "Traditional soup", price: 3000, image: "/images/img1.jpeg" },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
      const tableFromUrl = new URLSearchParams(window.location.search).get('table');
      setTable(tableFromUrl ?? '');
    }
  }, []);

  if (!isMounted) return null;

  // Handle Order Button Click
  const handleOrder = (item: MenuItem) => {
    const quantity = quantities[item.id] || 0;
    addToCart({ ...item, quantity, table });
    router.push("/orders");
  };

  // Handle quantity increase
  const increaseQuantity = (itemId: number) => {
    const currentQuantity = quantities[itemId] || 0;
    updateQuantity(itemId, currentQuantity + 1);
  };

  // Handle quantity decrease
  const decreaseQuantity = (itemId: number) => {
    const currentQuantity = quantities[itemId] || 0;
    updateQuantity(itemId, Math.max(currentQuantity - 1, 0));
  };

  // Filter menu items based on the search query
  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-10">
      <header className="bg-gray-10">
      <div className="flex justify-between items-center max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
  {/* Logo */}
  <div className="w-[150px] md:w-[100px] h-auto mr-2">
    <img src="/images/logo.png" alt="scan-eat" className="max-h-[90px]" />
  </div>

  {/* Search Input */}
  <div className="w-[300px]">
    <input
      type="text"
      placeholder="Search food..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full h-[55px] px-4 py-2 border rounded-2xl"
    />
  </div>
</div>

        <h1 className="text-3xl text-center font-bold text-gray-900">Foods</h1>
      </header>

      <div className="mt-4 max-w-4xl mx-auto px-4">
        {filteredMenuItems.length > 0 ? (
          filteredMenuItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 mb-4 bg-gray-50 rounded-lg shadow-md">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-3xl" />
              <div className="ml-4 flex-1">
              {/* <Link
              href={{
                pathname: `/menu/[restaurantId]/[itemId]`,
                query: {
                  name: item.name,
                  price: item.price,
                  image: item.image,
                },
              }}
              as={`/menu/${restaurantId}/${item.id}`} // Dynamic route
            > */}
              <h2 className="text-lg font-bold text-gray-800 cursor-pointer">{item.name}</h2>
            {/* </Link>                */}
            <p className="text-sm text-gray-500">{item.description}</p> 
                <p className="text-orange-500 font-bold mt-1">₦{item.price}</p>

                {/* Quantity Control Buttons */}
                <div className="mt-4 flex items-center space-x-2">
                  <button onClick={() => decreaseQuantity(item.id)} className="bg-white text-orange-500 px-2 py-[2px] rounded-lg">
                    -
                  </button>
                  <span className="text-gray-800 font-semibold">{quantities[item.id] || 1}</span>
                  <button onClick={() => increaseQuantity(item.id)} className="bg-white text-orange-500 px-2 py-[2px] rounded-lg">
                    +
                  </button>
                </div>
              </div>

              {/* Wishlist Heart Icon and Order Button */}
              <div className="ml-4 flex flex-col items-center">
                {/* <button className="mb-6 ml-7 p-1 text-red-500 transition-colors duration-200" onClick={() => toggleLike(item.id)}>
                  <HeartIcon className={`h-8 w-8 cursor-pointer transition-all duration-300 ease-in-out ${likedItems[item.id] ? 'text-orange-500 fill-orange-600 scale-125' : 'text-red-500'}`} />
                </button> */}

                <button
                  className={`bg-orange-500 text-white px-4 py-2 rounded-lg mt-5 `}
                  onClick={() => handleOrder(item)}
                  
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
