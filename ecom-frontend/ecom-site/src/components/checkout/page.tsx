"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Notification from '@/components/common/notification/page';

interface Item {
  product_id: number;
  quantity: number;
  price: number;
}

interface CheckoutProps {
  subtotal: number;
  deliveryFee: number;
  items: Item[];
}

const Checkout: React.FC<CheckoutProps> = ({ subtotal, deliveryFee, items }) => {
  const user_id = Cookies.get('userId');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const router = useRouter();

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const customerResponse = await fetch('/api/customer-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user_id,
          address,
          phone_number: phoneNumber,
        }),
      });

      if (!customerResponse.ok) {
        throw new Error('Failed to send customer details.');
      }

      const orderResponse = await fetch('/api/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user_id,
          total_amount: subtotal + deliveryFee,
          payment_method: 'Cash On Delivery',
          order_status: 'pending',
          cart_id: user_id,
          items: items,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order.');
      }

      const { id } = await orderResponse.json();

      // Success notification
      setNotification({ type: 'success', message: 'Order placed successfully!' });
      localStorage.setItem('lastOrderId', id);

      router.push('/profile');
    } catch (error) {
      console.error('Error during checkout:', error);
      
      // Error notification
      setNotification({ type: 'error', message: 'There was an error with your checkout. Please try again.' });
    } finally {
      setLoading(false); 
    }
  };

  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center p-6">
      {/* Display notification */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      
      <div className="w-full max-w-4xl">
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">Delivery Information</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="address" className="block text-lg font-medium mb-1">Address</label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your address"
                required
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-lg font-medium mb-1">Phone Number</label>
              <input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </form>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-lg font-medium">
              <span>Subtotal:</span>
              <span>{subtotal.toFixed(2)}Birr</span>
            </div>
            <div className="flex justify-between text-lg font-medium">
              <span>Delivery Fee:</span>
              <span>{deliveryFee.toFixed(2)}Birr</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>{total.toFixed(2)}Birr</span>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-6 w-full py-2 bg-black text-white rounded-md shadow-md hover:bg-gray-800 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Proceed to Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
