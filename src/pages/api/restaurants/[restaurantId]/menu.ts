import { NextApiRequest, NextApiResponse } from 'next';

interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<MenuItem[] | { error: string }>) {
  const { restaurantId } = req.query;

  if (!restaurantId) {
    res.status(400).json({ error: 'restaurantId is required' });
    return;
  }

  console.log("Received restaurantId: ", restaurantId);

  // Mock data for demonstration
  const menus: Record<string, MenuItem[]> = {
    '123': [
      { name: 'Jollof rice', description: 'Delicious jollof rice', price: 3000, image: 'https://via.placeholder.com/150' },
      { name: 'Fried rice', description: 'Tasty fried rice', price: 2500, image: 'https://via.placeholder.com/150' },
    ],
    '456': [
      { name: 'Spaghetti', description: 'Italian spaghetti', price: 2000, image: 'https://via.placeholder.com/150' },
      { name: 'Afang soup', description: 'Traditional soup', price: 3000, image: 'https://via.placeholder.com/150' },
    ],
  };

  const menu = menus[restaurantId as string];

  if (!menu) {
    res.status(404).json({ error: 'Menu not found for the provided restaurantId' });
    return;
  }

  console.log("Returning menu: ", menu);
  res.status(200).json(menu);
}
