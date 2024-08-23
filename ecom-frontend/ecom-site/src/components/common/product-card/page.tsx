import { useState } from "react";
import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface ProductCardProps {
  imageUrl: string;
  name: string;
  size: string;
  color: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, name, size, color, price }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="max-w-xs overflow-hidden relative">
      <div className="relative w-[440px] h-[550px]">
        <Image 
          src={imageUrl} 
          alt={name} 
          layout="fill" 
          objectFit="cover" 
          className="absolute inset-0"
        />
        <button
          onClick={toggleLike}
          className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full p-2 z-10 focus:outline-none"
        >
          {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </button>
      </div>
      <div className="p-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-normal">{name}</h2>
          <button
            onClick={toggleLike}
            className="text-black text-lg p-2 focus:outline-none"
          >
            {liked ? <FaHeart className="text-black" /> : <FaRegHeart />}
          </button>
        </div>
        <p className="text-base font-normal text-gray">{size}</p>
        <p className="text-base font-normal text-gray">{color}</p>
        <p className="text-base font-semibold mt-2">${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
