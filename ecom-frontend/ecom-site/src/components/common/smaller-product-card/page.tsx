import Image from "next/image";

interface ProductCardProps {
  imageUrl: string;
  name: string;
  size: string;
  color: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  imageUrl, 
  name, 
  size, 
  color, 
  price, 
}) => {

  return (
    <div className="flex w-[300px] md:w-[440px] overflow-hidden relative">
      <div className="relative w-[140px] h-[110px]">
        <Image 
          src={imageUrl} 
          alt={name} 
          layout="fill" 
          objectFit="cover" 
          className="absolute inset-0"
        />
      </div>
      <div className="p-2">
        <h2 className="text-base font-normal">{name}</h2>
        <p className="text-base font-normal text-gray">{size}</p>
        <p className="text-base font-normal text-gray">{color}</p>
        <p className="text-base font-semibold mt-2">${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
