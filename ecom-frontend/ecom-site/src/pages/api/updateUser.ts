import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  if (method === 'PUT') {
    try {
      const userId = req.cookies.userId;
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        res.status(200).json(data);
      } else {
        res.status(response.status).json(data);
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
