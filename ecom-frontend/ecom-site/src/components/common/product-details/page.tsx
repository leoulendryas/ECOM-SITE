import React, { useState } from 'react';
import Image from 'next/image';
import Button5 from '@/components/common/button/button-five/page'

const ProductDetails: React.FC = () => {
  // State for selected color
  const [selectedColor, setSelectedColor] = useState<string>('Brown');

  // Sample image sources
  const imageSources = [
    '/images/user/sample-image-1.png', 
    '/images/user/sample-image-2.png',
    '/images/user/sample-image-3.png',
    '/images/user/sample-image-4.png',
    '/images/user/sample-image-5.png',
  ];

  // Colors available for selection
  const colors = [
    { name: 'Brown', hex: '#A52A2A' },
    { name: 'Gray', hex: '#808080' },
    { name: 'Black', hex: '#000000' },
    { name: 'Navy', hex: '#000080' },
    { name: 'Green', hex: '#32A852' },
  ];

  return (
    <div className="flex flex-col md:flex-row px-4 md:px-20">
      {/* Left Section: Image Gallery */}
      <div className="flex flex-col w-full md:w-3/5">
        <div className="grid grid-cols-2">
          {/* Top two image slots */}
          {imageSources.slice(0, 2).map((src, index) => (
            <div key={index} className="h-48 md:h-96 relative bg-gray-300">
              <Image src={src} alt={`Product Image ${index + 1}`} layout="fill" objectFit="cover" />
            </div>
          ))}
        </div>
        {/* Middle wide image slot */}
        <div className="h-64 md:h-96 relative bg-gray-300">
          <Image src={imageSources[2]} alt="Product Image 3" layout="fill" objectFit="cover" />
        </div>
        <div className="grid grid-cols-2">
          {/* Bottom two image slots */}
          {imageSources.slice(3).map((src, index) => (
            <div key={index + 3} className="h-48 md:h-96 relative bg-gray-300">
              <Image src={src} alt={`Product Image ${index + 4}`} layout="fill" objectFit="cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Product Info */}
      <div className="w-full md:w-2/5 mt-0 md:ml-8 flex flex-col items-center">
        <h1 className="text-2xl lg:text-3xl font-semibold">Arrival 7 Shorts</h1>
        <p className="text-xl md:text-2xl mt-2 text-gray font-medium">XL</p>
        <p className="text-xl md:text-2xl mt-2 font-medium">$25</p>

        {/* Color options */}
        <div className="flex mt-12">
          {colors.map((color) => (
            <div
              key={color.name}
              className={`h-8 lg:h-10 lg:w-10 w-8 mr-2 cursor-pointer rounded-full border ${
                selectedColor === color.name ? 'border-black' : 'border-transparent'
              }`}
              style={{ backgroundColor: color.hex }}
              onClick={() => setSelectedColor(color.name)}
            ></div>
          ))}
        </div>

        {/* Size options */}
        <div className="flex mt-12">         
          <button className="border border-gray rounded px-3 py-1 mx-1 lg:px-4 lg:py-2">XS</button>
          <button className="border border-gray rounded px-3 py-1 mx-1 lg:px-4 lg:py-2">S</button>
          <button className="border border-gray rounded px-3 py-1 mx-1 lg:px-4 lg:py-2">M</button>
          <button className="border border-gray rounded px-3 py-1 mx-1 lg:px-4 lg:py-2">L</button>
          <button className="border border-gray rounded px-3 py-1 mx-1 lg:px-4 lg:py-2">XL</button>
          <button className="border border-gray rounded px-3 py-1 mx-1 lg:px-4 lg:py-2">XXL</button>
        </div>

        {/* Buttons */}
        <div className="flex mt-12">
          <div className="px-4 py-2 mr-2"><Button5 text="ADD TO BAG" /></div>
          <div className="px-4 py-2"><Button5 text="FAVORITE" /></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
