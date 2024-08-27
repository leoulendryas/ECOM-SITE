"use client"
import ProductDetails from "@/components/common/product-details/page"
import Header from "@/components/common/header/page"
import Footer from "@/components/common/footer/page"

export default function Product() {
  return(
    <div>
      <div className="mt-20"> 
        <Header />
      </div>
      <ProductDetails />
      <Footer />
    </div>
  )
}
