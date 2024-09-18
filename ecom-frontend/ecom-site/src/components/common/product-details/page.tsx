import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Button5 from '@/components/common/button/button-five/page';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/common/breadCrumb/page";
import Notification from '@/components/common/notification/page'; // Import notification component

interface ProductImage {
  image_url: string;
  position: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  size: string;
  color: string;
  fit: string;
  price: string;
  is_featured: boolean;
  is_new: boolean;
  gender: string;
  ProductImages: ProductImage[];
  Category: {
    id: number;
    name: string;
  };
}

const ProductDetails: React.FC<{ product: Product }> = ({ product }) => {
  const userId = Cookies.get('userId');
  const [selectedColor, setSelectedColor] = useState<string>('Brown');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const router = useRouter();

  const imageSources = {
    front: product.ProductImages.find((img) => img.position === 'front')?.image_url || '',
    back: product.ProductImages.find((img) => img.position === 'back')?.image_url || '',
    left: product.ProductImages.find((img) => img.position === 'left')?.image_url || '',
    right: product.ProductImages.find((img) => img.position === 'right')?.image_url || '',
    other: product.ProductImages.find((img) => img.position === 'other')?.image_url || '',
  };

  const colors = [
    { name: 'Brown', hex: '#A52A2A' },
    { name: 'Gray', hex: '#808080' },
    { name: 'Black', hex: '#000000' },
    { name: 'Navy', hex: '#000080' },
    { name: 'Green', hex: '#32A852' },
  ];

  const addToCart = useCallback(async () => {
    if (!userId) {
      router.push('/auth');
      return;
    }

    const price = parseFloat(product.price);

    if (isNaN(price)) {
      setNotification({ message: 'Invalid price format.', type: 'error' });
      return;
    }

    try {
      const response = await fetch('/api/addCartItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart_id: userId,
          product_id: product.id,
          quantity: 1,
          price_at_time_of_addition: price,
        }),
      });

      if (response.ok) {
        setNotification({ message: 'Item added to cart!', type: 'success' });
      } else {
        const errorData = await response.json();
        setNotification({ message: `Error: ${errorData.message}`, type: 'error' });
      }
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      setNotification({ message: 'Failed to add item to cart. Please try again.', type: 'error' });
    }
  }, [product.id, product.price, router, userId]);

  const addToWishlist = useCallback(async () => {
    const token = Cookies.get('token');
    if (!token) {
      localStorage.setItem('pendingLike', product.id.toString());
      router.push('/auth');
      return;
    }

    try {
      const response = await fetch('/api/wishlistAdd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: product.id }),
      });

      if (response.ok) {
        setNotification({ message: 'Product added to wishlist!', type: 'success' });
      } else {
        setNotification({ message: 'Could not add product to wishlist. Please try again.', type: 'error' });
      }
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
      setNotification({ message: 'Error adding product to wishlist.', type: 'error' });
    }
  }, [product.id, router]);

  useEffect(() => {
    const token = Cookies.get('token');
    const pendingLike = localStorage.getItem('pendingLike');

    if (token && pendingLike) {
      const productId = parseInt(pendingLike, 10);
      if (productId === product.id) {
        addToWishlist();
        localStorage.removeItem('pendingLike');
      }
    }
  }, [product.id, addToWishlist]);

  const breadcrumbItems = [
    {
      label: `${product.gender || 'Unknown'}`, 
      href: `/products/${(product.gender?.toLowerCase() || 'all')}`
    },
    { label: `${product.name}` },
  ];  

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex flex-col md:flex-row px-4 md:px-20">
        <div className="flex flex-col w-full md:w-3/5">
          <div className="grid grid-cols-2">
            <div className="h-48 md:h-96 relative bg-gray-300 overflow-hidden">
              <Image src={imageSources.front} alt="Front View" layout="fill" objectFit="cover" />
            </div>
            <div className="h-48 md:h-96 relative bg-gray-300 overflow-hidden">
              <Image src={imageSources.back} alt="Back View" layout="fill" objectFit="cover" />
            </div>
          </div>
          <div className="h-64 md:h-96 relative bg-gray-300 overflow-hidden">
            <Image src={imageSources.other} alt="Other View" layout="fill" objectFit="cover" />
          </div>
          <div className="grid grid-cols-2">
            <div className="h-48 md:h-96 relative bg-gray-300 overflow-hidden">
              <Image src={imageSources.left} alt="Left View" layout="fill" objectFit="cover" />
            </div>
            <div className="h-48 md:h-96 relative bg-gray-300 overflow-hidden">
              <Image src={imageSources.right} alt="Right View" layout="fill" objectFit="cover" />
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/5 mt-0 md:ml-8 flex flex-col items-center">
          <h1 className="text-2xl lg:text-3xl font-semibold">{product.name}</h1>
          <p className="text-xl md:text-2xl mt-2 text-gray-700 font-medium">{product.size}</p>
          <p className="text-xl md:text-2xl mt-2 font-medium">{product.price} Birr</p>

          <div className="flex mt-12">
            {colors.map((color) => (
              <div
                key={color.name}
                className={`h-8 lg:h-10 lg:w-10 w-8 mr-2 cursor-pointer rounded-full border ${
                  selectedColor === color.name ? 'border-black' : 'border-transparent'
                }`}
                style={{ backgroundColor: color.hex }}
                onClick={() => setSelectedColor(color.name)}
                aria-label={`Select ${color.name}`}
              ></div>
            ))}
          </div>

          <div className="flex mt-12">
            <button className="border border-gray-300 rounded px-3 py-1 mx-1 lg:px-4 lg:py-2">XS</button>
            <button className="border border-gray-300 rounded px-3 py-1 mx-1 lg:px-4 lg:py-2">S</button>
            <button className="border border-gray-300 rounded px-3 py-1 mx-1 lg:px-4 lg:py-2">M</button>
            <button className="border border-gray-300 rounded px-3 py-1 mx-1 lg:px-4 lg:py-2">L</button>
            <button className="border border-gray-300 rounded px-3 py-1 mx-1 lg:px-4 lg:py-2">XL</button>
            <button className="border border-gray-300 rounded px-3 py-1 mx-1 lg:px-4 lg:py-2">XXL</button>
          </div>

          <div className="flex mt-12">
            <div className="px-4 py-2 mr-2"><Button5 text="ADD TO BAG" onClick={addToCart} /></div>
            <div className="px-4 py-2">
              <Button5 text="FAVORITE" onClick={addToWishlist} />
            </div>
          </div>

          <div className="text-sm lg:text-base text-center text-gray-600 mt-8">
            {product.description}
          </div>
        </div>
      </div>

      {/* Display notification */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
};

export default ProductDetails;
