"use client";

import Header from "@/components/common/header/page";
import Footer from "@/components/common/footer/page";
import Slider from "@/components/common/slider/page";
import HeroSection from "@/components/home/hero-section/page";
import ProductCategories from "@/components/home/product-categories/page";
import { useState, useEffect } from "react";
import CartDrawer from "@/components/common/product-cart/page";

interface Product {
  imageUrl: string;
  name: string;
  size: string;
  color: string;
  price: number;
  liked: boolean;
}

export default function Home() {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const response = await fetch("/api/filteredProducts?isNew=true");
        const data = await response.json();
        setNewProducts(
          data.map((product: any) => ({
            imageUrl: product.ProductImages[0]?.image_url || "",
            name: product.name,
            size: product.size,
            color: product.color,
            price: parseFloat(product.price),
            liked: false,
          }))
        );
      } catch (error) {
        console.error("Error fetching new products:", error);
      }
    };

    fetchNewProducts();
  }, []);

  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        const response = await fetch("/api/getSaleProducts");
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (Array.isArray(data)) {
          setSaleProducts(
            data.map((saleProduct: any) => ({
              imageUrl: saleProduct.Product.ProductImages[0]?.image_url || "",
              name: saleProduct.Product.name,
              size: saleProduct.Product.size,
              color: saleProduct.Product.color,
              price: parseFloat(saleProduct.sale_price),
              liked: false,
            }))
          );
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching sale products:", error);
      }
    };
  
    fetchSaleProducts();
  }, []);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const cartItems = [
    {
      imageUrl: "/images/user/sample-image-4.png",
      name: "Adapt X Whitney Crop Top",
      size: "M",
      color: "Black",
      price: 32,
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
        <Slider products={newProducts} title="WHAT'S NEW" path="newAndFeatured"/>
      </div>
      <ProductCategories />
      <div className="py-2">
        <Slider products={saleProducts} title="SALE" path="sale"/>
      </div>
      <Footer />
    </main>
  );
}
