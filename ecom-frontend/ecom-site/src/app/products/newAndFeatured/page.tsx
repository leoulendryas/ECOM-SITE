"use client";
import { useEffect, useState } from "react";
import ProductsPage from "@/components/products/page";
import ClientLayout from '../../ClientLayout';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [filters, setFilters] = useState({
    is_new: "true",
    is_featured: "true"
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ClientLayout>
      <ProductsPage products={products} breadCrumbs={`New And Featured`}/>
    </ClientLayout>
  );
}
