import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { gender, isNew, isFeatured } = req.query; 
  try {
    const query = new URLSearchParams();
    if (gender) query.append('gender', String(gender));
    if (isNew) query.append('isNew', String(isNew));
    if (isFeatured) query.append('isFeatured', String(isFeatured));

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?${query.toString()}`, {
      method: 'GET',
    });

    const products = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ message: 'Error fetching products' });
    }

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
}
