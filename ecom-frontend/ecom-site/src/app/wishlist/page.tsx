"use client";
import ProductsPage from "@/components/wishlist/page";
import Header from "@/components/common/header/page";
import { useState } from "react";
import Footer from "@/components/common/footer/page";

export default function Wishlist() {
  const products = [
    {
      imageUrl: "/images/user/sample-image-1.png",
      name: "Adapt X Whitney Shorts",
      size: "XL",
      color: "Green",
      price: 36,
      liked: false,
    },
    {
      imageUrl: "/images/user/sample-image-1.png",
      name: "Adapt X Whitney Shorts",
      size: "XL",
      color: "Green",
      price: 36,
      liked: false,
    },
    {
      imageUrl: "/images/user/sample-image-1.png",
      name: "Adapt X Whitney Shorts",
      size: "XL",
      color: "Green",
      price: 36,
      liked: false,
    },
    {
      imageUrl: "/images/user/sample-image-1.png",
      name: "Adapt X Whitney Shorts",
      size: "XL",
      color: "Green",
      price: 36,
      liked: false,
    },
    {
      imageUrl: "/images/user/sample-image-1.png",
      name: "Adapt X Whitney Shorts",
      size: "XL",
      color: "Green",
      price: 36,
      liked: false,
    },
    {
      imageUrl: "/images/user/sample-image-1.png",
      name: "Adapt X Whitney Shorts",
      size: "XL",
      color: "Green",
      price: 36,
      liked: false,
    },
    {
      imageUrl: "/images/user/sample-image-1.png",
      name: "Adapt X Whitney Shorts",
      size: "XL",
      color: "Green",
      price: 36,
      liked: false,
    },
    {
      imageUrl: "/images/user/sample-image-1.png",
      name: "Adapt X Whitney Shorts",
      size: "XL",
      color: "Green",
      price: 36,
      liked: false,
    },
    {
      imageUrl: "/images/user/sample-image-1.png",
      name: "Adapt X Whitney Shorts",
      size: "XL",
      color: "Green",
      price: 36,
      liked: false,
    },
    {
      imageUrl: "/images/user/sample-image-1.png",
      name: "Adapt X Whitney Shorts",
      size: "XL",
      color: "Green",
      price: 36,
      liked: false,
    },
    {
      imageUrl: "/images/user/sample-image-1.png",
      name: "Adapt X Whitney Shorts",
      size: "XL",
      color: "Green",
      price: 36,
      liked: false,
    },
  ];
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div>
      <div className="pb-24">
      <Header onCartToggle={handleCartToggle} />
      </div>
      <ProductsPage products={products} /> 
      <Footer />
    </div>
  );
}
