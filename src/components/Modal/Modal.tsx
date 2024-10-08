import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

// Define prop types for the component
interface ModalProps {
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen }) => {
  const [showSecondModal, setShowSecondModal] = useState(false); // State for second modal
  const router = useRouter(); // Initialize router for navigation

  // If modal is not open, return null to prevent rendering
  if (!isOpen) {
    return null;
  }

  const handleCloseFirstModal = () => {
    setShowSecondModal(true); // Open second modal on close button click
  };

  const handleOrderAgain = () => {
    setShowSecondModal(false); // Close second modal
    router.push('/'); // Navigate to the menu page
  };

  const handleGoToBlankPage = () => {
    setShowSecondModal(false); // Close second modal
    router.push('/BlankPage'); // Navigate to a blank page
  };

  return (
    <>
      {/* First Modal */}
      {!showSecondModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
            {/* Smiley Face Icon */}
            <div className="text-6xl mb-4">😊</div>

            <h2 className="text-xl font-bold mb-4">Your Food is on its way!</h2>
            <p>Your order has been placed successfully.<br /></p>

            <button
              onClick={handleCloseFirstModal} // Trigger second modal
              className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Second Modal */}
      {showSecondModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4">Would you like to order again?</h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleGoToBlankPage} // Redirect to blank page
                className="bg-orange-500 text-white py-2 px-4 rounded-lg"
              >
                No, Thanks
              </button>
              <button
                onClick={handleOrderAgain} // Redirect to menu page
                className="bg-green-500 text-white py-2 px-4 rounded-lg"
              >
                Yes, Order Again!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
