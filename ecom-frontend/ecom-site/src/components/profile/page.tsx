import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button1 from '../common/button/button-one/page';
import Button5 from '../common/button/button-five/page';

interface Order {
  id: string;
  date: string;
  total: string;
  status: string;
}

const AccountPage: React.FC = () => {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    phoneNumber: '123-456-7890',
  });

  const [orders, setOrders] = useState<Order[]>([
    { id: '1', date: '2024-08-25', total: '$120.00', status: 'Delivered' },
    { id: '2', date: '2024-08-20', total: '$75.00', status: 'Processing' },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(userInfo);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedInfo(userInfo); 
  };

  const handleSave = () => {
    setUserInfo(editedInfo);
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    console.log('Logout button clicked');
    router.push('/login'); 
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-lightGray rounded-lg p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className='space-y-2'>
            <h2 className="text-lg font-semibold">{`${userInfo.firstName} ${userInfo.lastName}`}</h2>
            <p className="text-black">{userInfo.email}</p>
            <p className="text-black">{userInfo.phoneNumber}</p>
          </div>
          <div className="flex space-x-4">
            <div onClick={handleEdit}>
              <Button1 text="Edit" />
            </div>
            <div onClick={handleLogout}>
              <Button1 text="Log out" />
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-4">Edit Your Information</h2>
            <div className="mb-4">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={editedInfo.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg focus:outline-none bg-lightGray"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={editedInfo.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg focus:outline-none bg-lightGray"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={editedInfo.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg focus:outline-none bg-lightGray"
              />
            </div>
            <div className="flex space-x-4">
              <div onClick={handleSave}>
                <Button5 text="Save" />
              </div>
              <div onClick={handleCancel}>
                <Button5 text="Cancel" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-lightGray rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Your Orders</h3>
        {orders.length === 0 ? (
          <p className="text-gray-600">You have no orders.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li
                key={order.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border-b border-gray"
              >
                <div className='space-y-2'>
                  <p className="font-semibold">Order #{order.id}</p>
                  <p className="text-gray-600">Date: {order.date}</p>
                  <p className="text-gray-600">Total: {order.total}</p>
                  <p className={`text-${order.status === 'Delivered' ? 'green' : 'yellow'}-500`}>
                    Status: {order.status}
                  </p>
                </div>
                <button className="text-black hover:underline mt-2 sm:mt-0">View Details</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
