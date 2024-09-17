import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    if (req.method === 'DELETE') {
        try {
            const response = await fetch(`http://localhost:5000/api/wishlist/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': req.headers.authorization || ''
                }
            });

            if (response.ok) {
                return res.status(200).json({ message: 'Product successfully deleted' });
            } else {
                const errorData = await response.json();
                return res.status(response.status).json(errorData);
            }
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
