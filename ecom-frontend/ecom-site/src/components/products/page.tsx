"use client";
import { useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import ProductCard from "@/components/common/smaller-product-card/page";
import FilterSection from "@/components/common/filter/page";
import Button5 from "@/components/common/button/button-five/page";
import Breadcrumb from "@/components/common/breadCrumb/page";
import Notification from "@/components/common/notification/page";

const useWishlist = () => {
  const [wishlist, setWishlist] = useState<
    { productId: number; wishlistId: number }[]
  >([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = Cookies.get("token");
      if (!token) return;

      try {
        const response = await fetch("/api/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const wishlist = await response.json();
          const wishlistItems = wishlist.map(
            (item: { product_id: number; id: number }) => ({
              productId: item.product_id,
              wishlistId: item.id,
            })
          );
          setWishlist(wishlistItems);
        } else {
          console.error("Failed to fetch wishlist");
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  return { wishlist, setWishlist };
};

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

interface ProductsPageProps {
  products: Product[];
  title?: string;
  breadCrumbs: string;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ products, breadCrumbs }) => {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [likedProducts, setLikedProducts] = useState<boolean[]>(
    products.map((product) => product.liked)
  );
  const { wishlist, setWishlist } = useWishlist();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    const updatedLikes = products.map((product) =>
      wishlist.some((item) => item.productId === product.id)
    );
    setLikedProducts(updatedLikes);
  }, [products, wishlist]);

  const toggleLike = useCallback(
    async (productId: number, index: number) => {
      const token = Cookies.get("token");
      const userId = Cookies.get("userId");

      if (!token || !userId) {
        localStorage.setItem("pendingLike", JSON.stringify(productId));
        window.location.href = "/auth";
        return;
      }

      const previousLiked = likedProducts[index];
      setLikedProducts((prev) =>
        prev.map((liked, idx) => (idx === index ? !liked : liked))
      );

      const wishlistItem = wishlist.find((item) => item.productId === productId);
      const wishlistId = wishlistItem ? wishlistItem.wishlistId : null;
      const url = previousLiked
        ? `/api/wishlistRemove/${wishlistId}`
        : "/api/wishlistAdd";
      const method = previousLiked ? "DELETE" : "POST";
      const body = !previousLiked
        ? JSON.stringify({
            user_id: parseInt(userId, 10),
            product_id: productId,
          })
        : null;

      try {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body,
        });

        if (response.status === 401) {
          window.location.href = "/auth";
        }

        if (previousLiked) {
          const updatedWishlist = wishlist.filter(
            (item) => item.productId !== productId
          );
          setWishlist(updatedWishlist);
          setNotification({ type: "success", message: "Removed from wishlist" });
        } else {
          const responseData = await response.json();
          const newWishlistItem = { productId, wishlistId: responseData.id };
          setWishlist([...wishlist, newWishlistItem]);
          setNotification({ type: "success", message: "Added to wishlist" });
        }
      } catch (error) {
        console.error("Error adding/removing from wishlist:", error);
        setLikedProducts((prev) =>
          prev.map((liked, idx) => (idx === index ? previousLiked : liked))
        );
        setNotification({ type: "error", message: "Action failed" });
      }
    },
    [likedProducts, wishlist, setWishlist]
  );

  useEffect(() => {
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");
    const productIdToLike = localStorage.getItem("pendingLike");

    if (productIdToLike && token && userId) {
      toggleLike(
        parseInt(productIdToLike, 10),
        products.findIndex((p) => p.id === parseInt(productIdToLike, 10))
      );
      localStorage.removeItem("pendingLike");
    }
  }, [products, toggleLike]);

  const handleLoadMore = async () => {
    setLoading(true);
    setLoading(false);
  };

  const handleProductClick = (productId: number) => {
    window.location.href = `/product/${productId}`;
  };

  const breadcrumbItems = [
    { label: `${breadCrumbs}`, href: '/products/men' },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="p-4 mb-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/6 lg:w-1/6 w-full mb-4 md:mb-0">
            <button
              className="md:hidden bg-gray-200 p-2 w-full text-left mb-4"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              {isFilterOpen ? "Hide Filters" : "Show Filters"}
            </button>
            <div className={`${isFilterOpen ? "block" : "hidden"} md:block`}>
              <FilterSection />
            </div>
          </div>

          <div className="w-full md:w-full overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">{products.length} Items</h2>
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  imageUrl={product.ProductImages[0]?.image_url || ""}
                  name={product.name}
                  size={product.size}
                  color={product.color}
                  price={product.price}
                  liked={likedProducts[index]}
                  onToggleLike={() => toggleLike(product.id, index)}
                  onImageClick={() => handleProductClick(product.id)}
                />
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <div className="py-2 px-8">
                <Button5
                  text={loading ? "Loading..." : "Load More"}
                  onClick={handleLoadMore}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Display notification */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
};

export default ProductsPage;
