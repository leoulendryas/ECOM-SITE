import { useState } from 'react';
import ProductCard from '@/components/common/smaller-product-card/page';
import FilterSection from '@/components/common/filter/page';
import Button5 from '@/components/common/button/button-five/page';

interface ProductCardProps {
    imageUrl: string;
    name: string;
    size: string;
    color: string;
    price: number;
    liked: boolean;
    onToggleLike: () => void;
    className?: string; 
}

interface ProductsPageProps {
    products: Omit<ProductCardProps, 'onToggleLike'>[];
    title?: string;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ products }) => {
    const [likedProducts, setLikedProducts] = useState<boolean[]>(products.map(product => product.liked));
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const toggleLike = (index: number) => {
        const updatedLikes = [...likedProducts];
        updatedLikes[index] = !updatedLikes[index];
        setLikedProducts(updatedLikes);
    };

    return (
        <div className="p-4 mb-8">
            <div className="flex flex-col md:flex-row">
                {/* Filter Section */}
                <div className="md:w-2/6 lg:w-1/6 w-full mb-4 md:mb-0">
                    <button
                        className="md:hidden bg-gray-200 p-2 w-full text-left mb-4"
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                        {isFilterOpen ? "Hide Filters" : "Show Filters"}
                    </button>
                    <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block sticky top-0`}>
                        <FilterSection />
                    </div>
                </div>

                {/* Products Section */}
                <div className="w-full md:w-full overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold">50 Items</h2>
                    </div>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {products.map((product, index) => (
                            <ProductCard
                                key={index}
                                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)]"
                                {...product}
                                liked={likedProducts[index]}
                                onToggleLike={() => toggleLike(index)}
                            />
                        ))}
                    </div>
                    <div className="flex justify-center mt-6">
                        <div className="py-2 px-8">
                            <Button5 text="Load More" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
