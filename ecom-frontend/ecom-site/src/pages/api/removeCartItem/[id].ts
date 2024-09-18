import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const userId = cookies.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID not found in cookies' });
    }

    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/cart/items/${id}`;
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete item. Status: ${response.status}`);
    }

    return res.status(200).json({ message: 'Item successfully deleted' });
  } catch (error) {
    console.error('Error removing cart item:', error);
    return res.status(500).json({ message: 'Error removing cart item' });
  }
}
