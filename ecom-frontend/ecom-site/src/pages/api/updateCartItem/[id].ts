import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  if (req.method === 'PUT') {
    const { quantity } = req.body;

    const response = await fetch(`http://localhost:5000/api/cart/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    });

    if (response.ok) {
      res.status(200).json({ message: 'Quantity updated successfully' });
    } else {
      res.status(response.status).json({ error: 'Failed to update quantity' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
