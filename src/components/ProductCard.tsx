
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, ShoppingCart } from "lucide-react";
import { ButtonCustom } from "./ui/button-custom";
import { cn } from "@/lib/utils";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  slug: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden rounded-lg bg-secondary/20 aspect-square relative">
        {!isImageLoaded && (
          <div className="absolute inset-0 image-loading rounded-lg" />
        )}
        <img
          src={product.image}
          alt={product.title}
          className={cn(
            "object-cover w-full h-full transition-all duration-500",
            isHovered ? "scale-105" : "scale-100",
            isImageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsImageLoaded(true)}
        />
        
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 flex justify-between items-center p-4 gap-2 transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          )}
        >
          <ButtonCustom
            size="sm"
            variant="primary"
            className="flex-1 shadow-md"
            onClick={handleAddToCart}
            leftIcon={<ShoppingCart size={16} />}
          >
            Add to Cart
          </ButtonCustom>
          
          <ButtonCustom
            size="sm"
            variant="secondary"
            className="shadow-md aspect-square p-0 w-9"
            aria-label="Quick view"
          >
            <Eye size={16} />
          </ButtonCustom>
        </div>
      </div>
      
      <div className="mt-4 space-y-1 px-1">
        <h3 className="font-medium text-sm transition-colors group-hover:text-black text-black/80">
          {product.title}
        </h3>
        <p className="text-sm font-medium">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
