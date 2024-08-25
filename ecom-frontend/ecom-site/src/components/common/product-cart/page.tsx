import React, { useEffect } from 'react';
import { FiPlus } from 'react-icons/fi'; 
import ProductCard from '@/components/common/smaller-product-card/page';
import Button5 from '../button/button-five/page';
import { FaTimes } from 'react-icons/fa';

interface CartItem {
  imageUrl: string;
  name: string;
  size: string;
  color: string;
  price: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cartItems }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-75 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-full px-6 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } 
        w-full lg:w-2/5 xl:w-1/3 2xl:w-1/4 overflow-y-auto`}
      >
        <div className="p-4 max-h-full">
          <button onClick={onClose} className="text-black text-2xl"><FaTimes  size={24} /></button>
          <h2 className="text-3xl font-medium my-4 text-center">Your Bag</h2>
          
          {/* Promo Code Section */}
          <div className="mt-6 mb-10 flex justify-between items-center">
            <p className="text-lg">Do you have a promo code?</p>
            <button className="text-black border rounded-full flex items-center justify-center">
              <FiPlus size={18} />
            </button>
          </div>

          {/* Cart Items */}
          <div>
            {cartItems.map((item, index) => (
              <ProductCard
                key={index}
                imageUrl={item.imageUrl}
                name={item.name}
                size={item.size}
                color={item.color}
                price={item.price}
              />
            ))}
          </div>

          {/* Line break above subtotal */}
          <hr className="border-gray my-4" />

          {/* Subtotal, Delivery, and Total */}
          <div className="space-y-2">
            <div className="flex justify-between text-gray">
              <span>Sub Total:</span>
              <span>$36</span>
            </div>
            <div className="flex justify-between text-gray">
              <span>Delivery:</span>
              <span>FREE</span>
            </div>
          <div className="flex justify-between text-gray">
            <span>Total:</span>
            <span>$36</span>
          </div>
          </div>

          {/* Line break below total */}
          <hr className="border-gray my-4" />

          {/* Checkout Button */}
          <div className="w-full py-2 my-10 pb-10 text-center">
            <Button5 text="CHECK OUT" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
