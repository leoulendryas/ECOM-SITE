"use client";
import { useEffect, useState } from "react";
import ProductsPage from "@/components/products/page";
import Header from "@/components/common/header/page";
import Footer from "@/components/common/footer/page";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [filters, setFilters] = useState({
    isNew: "true",
    isFeatured: "true"
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = new URLSearchParams(filters as Record<string, string>).toString();
        const response = await fetch(`/api/filteredProducts?${query}`);
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
