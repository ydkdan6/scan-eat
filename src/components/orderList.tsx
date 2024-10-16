"use client";

import React, {useState} from 'react';
import { useRouter } from 'next/navigation';
import Modal from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from '@/context/CartContext'; // Import the Cart context

const Cart = () => {
  const router = useRouter();
  const { cartItems, removeFromCart } = useCart(); // Get cartItems and removeFromCart
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate subtotal, discount, and total
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = 1200; // Example discount
  const total = subtotal - discount;

  const handleBackBtn = () => {
    router.push('/');
  }

 // Handle checkout button click
 const handleCheckout = () => {
  if (cartItems.length === 0) {
    // Show warning toast if the cart is empty
    toast.warn("Your cart is empty! Add items before proceeding to checkout.", {
      position: "top-right",
      autoClose: 3000, // Automatically close after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  } else {
    // Add any additional checkout logic here (e.g., processing payment)
    setIsModalOpen(true); // Open the modal if there are items in the cart
  }
};

  return (
    <div className="bg-gray-50 p-4 min-h-screen">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        
        <div className='flex justify-between items-center mb-5'>
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
</svg>        <h1 className="text-lg font-bold mb-4">Cart</h1>
        </div>

        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-3 bg-orange-100 rounded-lg p-3">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              {/* Display the price multiplied by the quantity correctly */}
              <p className="font-bold">₦{item.price * item.quantity}</p>
              <button
                onClick={() => removeFromCart(item.name)}
                className="text-red-500 ml-4"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}

        {/* Promo Code */}
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter your promo code"
          />
          <button className="w-full bg-orange-500 text-white py-2 mt-2 rounded-lg">
            Apply
          </button>
        </div>

        {/* Subtotal, Discount, and Total */}
        <div className="text-right space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold">₦{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span className="font-semibold text-green-600">₦{discount}</span>
          </div>
          <div className="flex justify-between">
            <span>Total</span>
            <span className="font-bold">₦{total}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6">
          <button className="w-full bg-orange-500 text-white py-3 rounded-lg mb-2"
          onClick={handleCheckout}>
            Proceed to Checkout
          </button>
          <button className="w-full bg-gray-100 text-orange-500 py-3 rounded-lg"
          onClick={ () => handleBackBtn()}>
            Continue Shopping
          </button>
        </div>
      </div>
      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <ToastContainer />
    </div>
  );
};

export default Cart;
