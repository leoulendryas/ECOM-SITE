import React, { useState } from 'react';
import Image from "next/image";
import { FaTimes } from 'react-icons/fa';

interface ProductCardProps {
  imageUrl: string;
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  id: number;
  onRemove: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  imageUrl, 
  name, 
  size, 
  color, 
  price,
  quantity: initialQuantity,
  id,
  onRemove
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleRemove = async () => {
    try {
      const response = await fetch(`/api/removeCartItem/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        onRemove(id);
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error while deleting item:', error);
    }
  };

  const handleQuantityChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(newQuantity);

    try {
      const response = await fetch(`/api/updateCartItem/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      if (!response.ok) {
        console.error('Failed to update quantity');
      }
    } catch (error) {
      console.error('Error while updating quantity:', error);
    }
  };

  return (
    <div className="flex w-full overflow-hidden relative mb-2 pb-2">
      {/* Product Image and X Button */}
      <div className="relative w-[100px] h-[100px]">
        <Image 
          src={imageUrl || '/default-image.jpg'}
          alt={name || 'Product Image'}
          layout="fill" 
          objectFit="cover" 
        />
        {/* X button to remove the item */}
        <button 
          className="absolute top-1 right-1 text-white bg-black p-0.5 rounded-full" 
          onClick={handleRemove}
        >
          <FaTimes size={11} />
        </button>
      </div>

      {/* Product Info and Quantity Selector */}
      <div className="flex-grow pl-4">
        <div className="flex justify-between items-start">
          {/* Product Information */}
          <div>
            <h2 className="text-base font-normal">{name || 'Unnamed Product'}</h2>
            <p className="text-base font-normal text-gray-500">Size: {size || 'Unknown Size'}</p>
            <p className="text-base font-normal text-gray-500">Color: {color || 'Unknown Color'}</p>
            <p className="text-base font-semibold mt-2">{price.toFixed(2)}Birr</p>
          </div>

          {/* Quantity Dropdown */}
          <div className="ml-4">
            <label htmlFor={`quantity-${id}`} className="mr-2">Qty:</label>
            <select 
              id={`quantity-${id}`} 
              value={quantity} 
              onChange={handleQuantityChange}
              className="bg-white p-1"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
