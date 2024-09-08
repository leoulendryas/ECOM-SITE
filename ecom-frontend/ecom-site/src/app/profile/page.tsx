"use client"
import AccountPage from "@/components/profile/page"
import Header from "@/components/common/header/page"
import Footer from "@/components/common/footer/page"
import { useState } from "react";

export default function Profile() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };
  return(
    <div>
      <div className="mt-20"> 
        <Header onCartToggle={handleCartToggle} />
      </div>
      <AccountPage />
      <Footer />
    </div>
  )
}
