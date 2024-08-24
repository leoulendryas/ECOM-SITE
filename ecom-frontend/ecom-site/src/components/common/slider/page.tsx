import React, { useState, useEffect, useRef } from "react";
import ProductCard from "@/components/common/product-card/page";
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

interface ProductCardProps {
  imageUrl: string;
  name: string;
  size: string;
  color: string;
  price: number;
  liked: boolean;
  onToggleLike: () => void;
}

interface SliderProps {
  products: Omit<ProductCardProps, 'onToggleLike'>[];
  title: string;
}

const Slider: React.FC<SliderProps> = ({ products, title }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [likedProducts, setLikedProducts] = useState<boolean[]>(products.map(product => product.liked));

  const cardMargin = 1; 

  const calculateItemsPerPage = () => {
    if (sliderRef.current) {
      const sliderWidth = sliderRef.current.clientWidth;
      const cardWidthSmall = 440 + 2 * cardMargin; 
      const cardWidthLarge = 440 + 40 * cardMargin;

      const itemsPerPage = Math.floor(sliderWidth < 768 ? sliderWidth / cardWidthSmall : sliderWidth / cardWidthLarge);
      setItemsPerPage(itemsPerPage || 1);
    }
  };

  useEffect(() => {
    calculateItemsPerPage();

    window.addEventListener("resize", calculateItemsPerPage);
    return () => {
      window.removeEventListener("resize", calculateItemsPerPage);
    };
  }, []);

  const handleNext = () => {
    if (currentPage < products.length - itemsPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleLike = (index: number) => {
    const updatedLikes = [...likedProducts];
    updatedLikes[index] = !updatedLikes[index];
    setLikedProducts(updatedLikes);
  };

  const sliderOffset = -currentPage * (100 / itemsPerPage);

  return (
    <div className="relative bg-whiter px-4 md:px-20 pt-12 pb-12" ref={sliderRef}>
      {/* Title and Navigation */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="flex space-x-4">
          {currentPage >= 0 && (
            <button
              onClick={handlePrev}
              className="p-2 bg-lightGray hover:bg-gray-300 rounded-full"
            >
              <FaAngleLeft />
            </button>
          )}
          {currentPage <= products.length - itemsPerPage && (
            <button
              onClick={handleNext}
              className="p-2 bg-black text-white hover:bg-gray-300 rounded-full"
            >
              <FaAngleRight />
            </button>
          )}
        </div>
      </div>

      {/* Slider Content */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${sliderOffset}%)` }}
        >
          {products.map((product, index) => {
            const isSmallScreen = window.innerWidth < 768; 
            const width = `calc(${100 / itemsPerPage}% - ${isSmallScreen ? 2 * cardMargin : 40 * cardMargin}px)`;

            return (
              <div
                key={index}
                className="flex-none"
                style={{
                  width: width,
                  margin: `0 ${cardMargin}px`,
                }}
              >
                <ProductCard
                  {...product}
                  liked={likedProducts[index]}
                  onToggleLike={() => toggleLike(index)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slider;
