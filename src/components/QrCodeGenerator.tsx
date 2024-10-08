import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeGeneratorProps {
  restaurantId: string;
  table: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ restaurantId, table }) => {
  //  URL  encoded into the QR code
  const qrCodeValue = `https://metro-eat.vercel.app/`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md mx-auto transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Restaurant Menu QR Code</h2>
        <QRCodeSVG value={qrCodeValue} size={256} className="mx-auto mb-4 border-2 border-blue-200 rounded-lg shadow-lg" />
        <p className="mt-4 text-gray-700 text-lg">
          Scan this QR code to view the menu for <strong>Table {table}</strong> at <strong>Restaurant {restaurantId}</strong>
        </p>
        <p className="text-sm text-gray-500 mt-2">Ensure your camera is focused on the QR code.</p>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
