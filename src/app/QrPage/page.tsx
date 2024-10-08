import React from 'react';
import QRCodeGenerator from '@/components/QrCodeGenerator';

const RestaurantAdminPage: React.FC = () => {
  const restaurantId = '123';  
  const table = '1';           

  return (
    <div>
      <h1>QR Code for Restaurant {restaurantId}, Table {table}</h1>
      <QRCodeGenerator restaurantId={restaurantId} table={table} />
    </div>
  );
};

export default RestaurantAdminPage;
