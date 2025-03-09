
import { useState, useEffect } from "react";
import { ProductCard, Product } from "./ProductCard";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  columns?: number;
  onAddToCart?: (product: Product) => void;
  isLoading?: boolean;
  className?: string;
}

export function ProductGrid({
  products,
  columns = 4,
  onAddToCart,
  isLoading = false,
  className,
}: ProductGridProps) {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  
  // Staggered appearance animation
  useEffect(() => {
    if (isLoading) {
      setVisibleProducts([]);
      return;
    }
    
    const timer = setTimeout(() => {
      setVisibleProducts([]);
      
      products.forEach((product, index) => {
        setTimeout(() => {
          setVisibleProducts(prev => [...prev, product]);
        }, index * 100); // Stagger by 100ms per product
      });
    }, 300);
    
    return () => clearTimeout(timer);
  }, [products, isLoading]);
  
  const getGridColumns = () => {
    switch (columns) {
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    }
  };
  
  // Skeleton loader for products
  const ProductSkeleton = () => (
    <div className="animate-pulse">
      <div className="rounded-lg bg-muted aspect-square"></div>
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-1/4"></div>
      </div>
    </div>
  );
  
  if (isLoading) {
    return (
      <div className={cn("grid gap-6 md:gap-8", getGridColumns(), className)}>
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={`skeleton-${i}`} />
        ))}
      </div>
    );
  }
  
  return (
    <div className={cn("grid gap-6 md:gap-8", getGridColumns(), className)}>
      {products.map((product, i) => (
        <div 
          key={product.id}
          className={cn(
            "transition-all duration-500",
            visibleProducts.includes(product) 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-4"
          )}
          style={{
            transitionDelay: `${i * 100}ms`
          }}
        >
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </div>
      ))}
    </div>
  );
}
