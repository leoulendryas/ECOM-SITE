"use client";

import { useState, useEffect } from "react";
import Header from "@/components/common/header/page";
import Footer from "@/components/common/footer/page";
import CartDrawer from "@/components/common/product-cart/page";

interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  price_at_time_of_addition: string;
  imageUrl?: string;
  name?: string;
  size?: string;
  color?: string;
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("/api/getCartItem");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        setCartItems(data.CartItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header onCartToggle={handleCartToggle} />
      <main className="flex-grow mt-14">
        {children}
      </main>
      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={handleCartToggle} cartItems={cartItems} />
    </div>
  );
}
