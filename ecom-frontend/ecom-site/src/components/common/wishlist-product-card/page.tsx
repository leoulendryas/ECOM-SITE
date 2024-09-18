"use client";
import { useState } from "react";
import Image from "next/image";
import { FaHeart, FaRegHeart, FaShoppingBag } from "react-icons/fa";

interface ProductCardProps {
    imageUrl: string;
    name: string;
    size: string;
    color: string;
    price: number;
    liked: boolean;
    onToggleLike: () => void;
    onClick: () => void;
    onAddToBag: () => void;  // New prop
    className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
    imageUrl, 
    name, 
    size, 
    color, 
    price, 
    liked: initialLiked, 
    onToggleLike,
    onClick,
    onAddToBag,  // New prop
    className 
}) => {
    const [liked, setLiked] = useState(initialLiked);

    const handleToggleLike = () => {
        setLiked(!liked);
        onToggleLike();
    };

    return (
        <div 
            className={`overflow-hidden relative bg-white`} 
            onClick={onClick}
        >
            <div className="relative w-full pb-[100%]">
                <Image 
                    src={imageUrl} 
                    alt={name} 
                    layout="fill" 
                    objectFit="cover" 
                    className="absolute inset-0"
                />
                <button
                    onClick={(e) => { 
                        e.stopPropagation();
                        handleToggleLike(); 
                    }}
                    className="absolute top-4 left-4 text-black text-lg bg-lightGray bg-opacity-50 rounded-full p-1 z-10 focus:outline-none"
                >
                    {liked ? <FaHeart className="text-black" /> : <FaRegHeart />}
                </button>
            </div>
            <div className="p-2">
                <h2 className="text-base font-normal flex items-center justify-between">
                    {name}
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onAddToBag();  // Call onAddToBag when clicked
                            }}
                            className="text-black text-lg bg-lightGray bg-opacity-50 rounded-full p-1 focus:outline-none"
                        >
                            <FaShoppingBag />
                        </button>
                    </div>
                </h2>
                <p className="text-base font-normal text-gray">{size}</p>
                <p className="text-base font-normal text-gray">{color}</p>
                <p className="text-base font-semibold mt-2">{price.toFixed(2)} Birr</p>
            </div>
        </div>
    );
};

export default ProductCard;
