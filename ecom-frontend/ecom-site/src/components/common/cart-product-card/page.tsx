import React from 'react';
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
  quantity,
  id,
  onRemove
}) => {

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

  return (
    <div className="flex w-full overflow-hidden relative mb-4">
      <div className="relative w-[100px] h-[100px]">
        <Image 
          src={imageUrl || '/default-image.jpg'}
          alt={name || 'Product Image'}
          layout="fill" 
          objectFit="cover" 
        />
        <button 
          className="absolute top-1 right-1 text-white bg-black p-0.5 rounded-full" 
          onClick={handleRemove}
        >
          <FaTimes size={11} />
        </button>
        <div className="absolute bottom-1 left-1 text-white bg-black bg-opacity-50 px-1 py-0.5 rounded-md text-sm">
          {quantity}
        </div>
      </div>

      <div className="flex-grow pl-4">
        <h2 className="text-base font-normal">{name || 'Unnamed Product'}</h2>
        <p className="text-base font-normal text-gray">Size: {size || 'Unknown Size'}</p>
        <p className="text-base font-normal text-gray">Color: {color || 'Unknown Color'}</p>
        <p className="text-base font-semibold mt-2">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
