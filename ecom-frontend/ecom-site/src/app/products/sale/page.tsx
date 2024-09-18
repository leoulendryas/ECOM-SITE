"use client";
import { useEffect, useState } from "react";
import ProductsPage from "@/components/products/page";
import ClientLayout from '../../ClientLayout';

interface ProductImage {
  id: number;
  image_url: string;
  position: string;
  position_sequence: number;
}

interface Product {
  id: number;
  name: string;
  size: string;
  color: string;
  price: string;
  liked: boolean;
  ProductImages: ProductImage[];
}

export default function Products() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);

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
              id: saleProduct.Product.id,
              name: saleProduct.Product.name,
              size: saleProduct.Product.size,
              color: saleProduct.Product.color,
              price: parseFloat(saleProduct.sale_price).toFixed(2),
              liked: false,
              ProductImages: saleProduct.Product.ProductImages || [],
            }))
          );
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching sale products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSaleProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ClientLayout>
      <ProductsPage products={saleProducts} breadCrumbs={`Sale`}/>
    </ClientLayout>
  );
}
