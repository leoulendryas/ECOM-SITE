import React from 'react';
import Image from 'next/image';
import Button3 from '@/components/common/button/button-three/page';

const ProductCategories: React.FC = () => {
  const categories = [
    {
      title: "Men's Wear",
      image: '/images/user/men-categories.png',
      alt: "Men's Wear",
    },
    {
      title: "Women's Wear",
      image: '/images/user/women-categories.png',
      alt: "Women's Wear",
    },
    {
      title: "Kids Wear",
      image: '/images/user/kids-categories.png',
      alt: "Kids Wear",
    },
    {
      title: "Custom",
      image: '/images/user/custom-categories.png',
      alt: "Custom",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
      {categories.map((category, index) => (
        <div 
          key={index} 
          className="relative w-full h-[55vh] md:h-[60vh] lg:h-[65vh] flex items-center justify-center overflow-hidden"
        >
          <Image 
            src={category.image}
            alt={category.alt}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            quality={100}
            className="z-[-1]"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 text-white">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2 lg:mb-4">{category.title}</h2>
            <Button3 text="Buy" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCategories;
