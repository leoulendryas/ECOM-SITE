import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/common/product-card/page";
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import Link from "next/link";
import Cookies from "js-cookie";
import Notification from "@/components/common/notification/page";

interface ProductCardProps {
  id: number;
  imageUrl: string;
  name: string;
  size: string;
  color: string;
  price: number;
  liked: boolean;
  wishlistId?: number;
  onToggleLike: () => void;
}

interface SliderProps {
  products: Omit<ProductCardProps, 'onToggleLike'>[];
  title: string;
  path: string;
}

const Slider: React.FC<SliderProps> = ({ products, title, path }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [likedProducts, setLikedProducts] = useState<boolean[]>(products.map(product => product.liked));
  const [wishlistMap, setWishlistMap] = useState<{ [key: number]: number }>({});
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const router = useRouter();
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

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = Cookies.get('token');
      if (!token) return;

      try {
        const response = await fetch('/api/wishlist', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const wishlist = await response.json();
          const wishlistProductIds = wishlist.map((item: { product_id: number, id: number }) => {
            setWishlistMap(prevMap => ({ ...prevMap, [item.product_id]: item.id }));
            return item.product_id;
          });
          const updatedLikes = products.map(product => wishlistProductIds.includes(product.id));
          setLikedProducts(updatedLikes);
        } else {
          console.error("Failed to fetch wishlist");
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [products]);

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

  const toggleLike = async (index: number, productId: number) => {
    const token = Cookies.get('token');

    if (!token) {
      router.push('/auth');
      return;
    }

    const updatedLikes = [...likedProducts];
    const isLiked = updatedLikes[index];
    updatedLikes[index] = !isLiked;
    setLikedProducts(updatedLikes);
    const wishlistId = wishlistMap[productId];

    const url = isLiked ? `/api/wishlistRemove/${wishlistId}` : '/api/wishlistAdd';
    const method = isLiked ? 'DELETE' : 'POST';
    const body = !isLiked ? JSON.stringify({ product_id: productId }) : null;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body,
      });

      if (!response.ok) {
        setNotification({ message: "Failed to update wishlist", type: 'error' });
      } else {
        setNotification({
          message: isLiked ? "Product removed from wishlist" : "Product added to wishlist",
          type: 'success',
        });

        if (isLiked) {
          setWishlistMap(prevMap => {
            const newMap = { ...prevMap };
            delete newMap[productId];
            return newMap;
          });
        }
      }
    } catch (error) {
      setNotification({ message: "Error updating wishlist", type: 'error' });
      console.error("Error updating wishlist:", error);
    }
  };

  const handleProductClick = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  const sliderOffset = -currentPage * (100 / itemsPerPage);

  return (
    <div className="relative bg-white px-4 md:px-20 pt-12 pb-12" ref={sliderRef}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <Link className="mt-auto" href={`/products/${path}`}>
            <p className="text-sm font-semibold underline">View All</p>
          </Link>
        </div>
        <div className="flex space-x-4">
          {currentPage > 0 && (
            <button onClick={handlePrev} className="p-2 bg-lightGray hover:bg-gray-300 rounded-full">
              <FaAngleLeft />
            </button>
          )}
          {currentPage < products.length - itemsPerPage && (
            <button onClick={handleNext} className="p-2 bg-black text-white hover:bg-gray-300 rounded-full">
              <FaAngleRight />
            </button>
          )}
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(${sliderOffset}%)` }}>
          {products.map((product, index) => {
            const isSmallScreen = window.innerWidth < 768;
            const width = `calc(${100 / itemsPerPage}% - ${isSmallScreen ? 2 * cardMargin : 40 * cardMargin}px)`;

            return (
              <div key={product.id} className="flex-none cursor-pointer" style={{ width, margin: `0 ${cardMargin}px` }}>
                <ProductCard
                  {...product}
                  liked={likedProducts[index]}
                  onToggleLike={() => toggleLike(index, product.id)}
                  onImageClick={() => handleProductClick(product.id)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Notification component */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default Slider;
