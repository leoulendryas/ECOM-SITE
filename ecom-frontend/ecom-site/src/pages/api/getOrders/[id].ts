import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  // Validate the ID
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    // Send request to your backend to fetch the order details
    const response = await fetch(`http://localhost:5000/api/orders/${id}`);

    // If the request failed, throw an error
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch order' });
    }

    // Parse the JSON response from the backend
    const data = await response.json();

    // Send the fetched data back to the frontend
    res.status(200).json(data);
  } catch (error) {
    // Catch any other errors that occur during the fetch process
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
