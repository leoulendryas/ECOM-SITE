"use client"
import Image from "next/image";
import Header from "@/components/common/header/page";
import Footer from "@/components/common/footer/page";
import Slider from "@/components/common/slider/page";
import HeroSection from "@/components/home/hero-section/page";
import ProductCategories from "@/components/home/product-categories/page";
import { useState } from "react";
import CartDrawer from "@/components/common/product-cart/page";

export default function Home() {
  const newProducts = [
    {
      imageUrl: "/images/user/sample-image-1.png",
      name: "Adapt X Whitney Shorts",
      size: "XL",
      color: "Green",
      price: 36,
      liked: false,
    },
    {
      imageUrl: "/images/user/sample-image-2.png",
      name: "Adapt X Whitney Bra",
      size: "XXL",
      color: "Brown",
      price: 37,
      liked: true,
    },
    {
      imageUrl: "/images/user/sample-image-3.png",
      name: "Adapt X Whitney Leggings",
      size: "L",
      color: "Purple",
      price: 45,
      liked: true,
    },
    {
      imageUrl: "/images/user/sample-image-4.png",
      name: "Adapt X Whitney Crop Top",
      size: "M",
      color: "Black",
      price: 32,
      liked: false,
    },
    {
      imageUrl: "/images/user/sample-image-5.png",
      name: "Adapt X Whitney Joggers",
      size: "L",
      color: "Grey",
      price: 50,
      liked: false,
    },
    {
      imageUrl: "/images/user/sample-image-6.png",
      name: "Adapt X Whitney Hoodie",
      size: "XL",
      color: "White",
      price: 60,
      liked: false,
    },
    {
      imageUrl: "/images/user/sample-image-7.png",
      name: "Adapt X Whitney Tank Top",
      size: "S",
      color: "Blue",
      price: 28,
      liked: false,
    },
    {
      imageUrl: "/images/user/sample-image-1.png",
      name: "Adapt X Whitney Shorts",
      size: "M",
      color: "Red",
      price: 36,
      liked: true,
    },
    {
      imageUrl: "/images/user/sample-image-2.png",
      name: "Adapt X Whitney Bra",
      size: "L",
      color: "Green",
      price: 37,
      liked: false,
    },
    {
      imageUrl: "/images/user/sample-image-3.png",
      name: "Adapt X Whitney Leggings",
      size: "XXL",
      color: "Orange",
      price: 45,
      liked: true,
    },
    {
      imageUrl: "/images/user/sample-image-4.png",
      name: "Adapt X Whitney Crop Top",
      size: "M",
      color: "Pink",
      price: 32,
      liked: false,
    },
    {
      imageUrl: "/images/user/sample-image-5.png",
      name: "Adapt X Whitney Joggers",
      size: "S",
      color: "Navy",
      price: 50,
      liked: false,
    },
    {
      imageUrl: "/images/user/sample-image-6.png",
      name: "Adapt X Whitney Hoodie",
      size: "XL",
      color: "Grey",
      price: 60,
      liked: true,
    },
    {
      imageUrl: "/images/user/sample-image-7.png",
      name: "Adapt X Whitney Tank Top",
      size: "L",
      color: "Yellow",
      price: 28,
      liked: false,
    },
];

const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const cartItems = [
    {
      imageUrl: '/images/user/sample-image-4.png',
      name: 'Adapt X Whitney Crop Top',
      size: 'M',
      color: 'Black',
      price: 32,
    },
    {
      imageUrl: '/images/user/sample-image-4.png',
      name: 'Adapt X Whitney Crop Top',
      size: 'M',
      color: 'Black',
      price: 32,
    },
    {
      imageUrl: '/images/user/sample-image-4.png',
      name: 'Adapt X Whitney Crop Top',
      size: 'M',
      color: 'Black',
      price: 32,
    },
    {
      imageUrl: '/images/user/sample-image-4.png',
      name: 'Adapt X Whitney Crop Top',
      size: 'M',
      color: 'Black',
      price: 32,
    },
    {
      imageUrl: '/images/user/sample-image-4.png',
      name: 'Adapt X Whitney Crop Top',
      size: 'M',
      color: 'Black',
      price: 32,
    },
    {
      imageUrl: '/images/user/sample-image-4.png',
      name: 'Adapt X Whitney Crop Top',
      size: 'M',
      color: 'Black',
      price: 32,
    },
  ];
  
const saleProducts = [
  {
    imageUrl: "/images/user/sample-image-7.png",
    name: "Adapt X Whitney Shorts",
    size: "M",
    color: "Red",
    price: 36,
    liked: true,
  },
  {
    imageUrl: "/images/user/sample-image-6.png",
    name: "Adapt X Whitney Bra",
    size: "L",
    color: "Green",
    price: 37,
    liked: false,
  },
  {
    imageUrl: "/images/user/sample-image-4.png",
    name: "Adapt X Whitney Leggings",
    size: "XXL",
    color: "Orange",
    price: 45,
    liked: true,
  },
  {
    imageUrl: "/images/user/sample-image-1.png",
    name: "Adapt X Whitney Crop Top",
    size: "M",
    color: "Pink",
    price: 32,
    liked: false,
  },
  {
    imageUrl: "/images/user/sample-image-3.png",
    name: "Adapt X Whitney Joggers",
    size: "S",
    color: "Navy",
    price: 50,
    liked: false,
  },
];
  return (
    <main>
      <div className="pt-12">
        <Header onCartToggle={handleCartToggle} />
      </div>
      <CartDrawer isOpen={isCartOpen} onClose={handleCartToggle} cartItems={cartItems} />
      <HeroSection />
      <div className="py-2">
        <Slider products={newProducts} title="WHAT'S NEW" />
      </div>
      <ProductCategories />
      <div className="py-2">
        <Slider products={saleProducts} title="SALE" />
      </div>
      <Footer />
    </main>
  );
}
