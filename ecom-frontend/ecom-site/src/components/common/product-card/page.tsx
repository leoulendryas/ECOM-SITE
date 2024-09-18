"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface ProductCardProps {
  imageUrl: string;
  name: string;
  size: string;
  color: string;
  price: number;
  liked: boolean;
  onToggleLike: () => void;
  onImageClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  name,
  size,
  color,
  price,
  liked: initialLiked,
  onToggleLike,
  onImageClick
}) => {
  const [liked, setLiked] = useState(initialLiked);

  useEffect(() => {
    setLiked(initialLiked);
  }, [initialLiked]);

  const handleToggleLike = (event: React.MouseEvent) => {
    event.stopPropagation();
    setLiked(prev => !prev);
    onToggleLike(); 
  };

  return (
    <div className="w-[440px] overflow-hidden relative cursor-pointer" onClick={onImageClick}>
      <div className="relative w-[440px] h-[550px]">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="absolute inset-0 object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 440px"
        />
        <button
          onClick={handleToggleLike}
          className="absolute top-4 left-4 text-black text-lg bg-lightGray bg-opacity-50 rounded-full p-1 z-10 focus:outline-none"
        >
          {liked ? <FaHeart className="text-black" /> : <FaRegHeart />}
        </button>
      </div>
      <div className="p-2">
        <h2 className="text-base font-normal">{name}</h2>
        <p className="text-base font-normal text-gray">{size}</p>
        <p className="text-base font-normal text-gray">{color}</p>
        <p className="text-base font-semibold mt-2">${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
