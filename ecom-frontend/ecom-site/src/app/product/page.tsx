"use client"
import ProductDetails from "@/components/common/product-details/page"
import Header from "@/components/common/header/page"
import Footer from "@/components/common/footer/page"
import { useState } from "react";

export default function Product() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };
  return(
    <div>
      <div className="mt-20"> 
        <Header onCartToggle={handleCartToggle} />
      </div>
      <ProductDetails />
      <Footer />
    </div>
  )
}
