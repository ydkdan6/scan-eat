"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate subtotal, discount, and total
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = 1200; // Example discount
  const total = subtotal - discount;

  const handleBackBtn = () => {
    router.push('/');
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.warn("Your cart is empty! Add items before proceeding to checkout.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } else {
      setIsModalOpen(true);
    }
  };

  const increaseQuantity = (itemName) => {
    const item = cartItems.find((i) => i.name === itemName);
    updateQuantity(itemName, item.quantity + 1);
  };

  const decreaseQuantity = (itemName) => {
    const item = cartItems.find((i) => i.name === itemName);
    if (item.quantity > 1) {
      updateQuantity(itemName, item.quantity - 1);
    } else {
      removeFromCart(itemName);
    }
  };

  return (
    <div className="bg-gray-50 p-4 min-h-screen">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-lg font-bold mb-4">Cart</h1>

        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-3 bg-orange-100 rounded-lg p-3">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <button onClick={() => decreaseQuantity(item.name)} className="bg-gray-200 px-2 rounded-lg">
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.name)} className="bg-gray-200 px-2 rounded-lg">
                    +
                  </button>
                </div>
              </div>
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
            onClick={handleBackBtn}>
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
