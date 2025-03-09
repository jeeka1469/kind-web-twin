
import { useState, useEffect } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/ProductGrid";
import { Cart } from "@/components/Cart";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Product } from "@/components/ProductCard";

// Mock products
const mockProducts: Product[] = [
  {
    id: "1",
    title: "Minimal Desk Lamp",
    description: "A sleek, adjustable desk lamp with warm lighting",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
    category: "Lighting",
    slug: "minimal-desk-lamp"
  },
  {
    id: "2",
    title: "Ceramic Mug Set",
    description: "Set of 4 handcrafted ceramic mugs",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
    category: "Kitchenware",
    slug: "ceramic-mug-set"
  },
  {
    id: "3",
    title: "Minimalist Watch",
    description: "Elegant timepiece with a leather strap",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
    category: "Accessories",
    slug: "minimalist-watch"
  },
  {
    id: "4",
    title: "Modern Lounge Chair",
    description: "Comfortable chair with clean lines and natural materials",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
    category: "Furniture",
    slug: "modern-lounge-chair"
  },
  {
    id: "5",
    title: "Wooden Serving Bowl",
    description: "Handcrafted wooden bowl for serving salads and fruits",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1604339454148-7c70a8b57143?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
    category: "Kitchenware",
    slug: "wooden-serving-bowl"
  },
  {
    id: "6",
    title: "Marble Clock",
    description: "Minimalist wall clock with marble face",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
    category: "Home Decor",
    slug: "marble-clock"
  },
  {
    id: "7",
    title: "Linen Bed Sheets",
    description: "Soft, breathable linen sheets for a luxurious sleep experience",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
    category: "Bedding",
    slug: "linen-bed-sheets"
  },
  {
    id: "8",
    title: "Copper Watering Can",
    description: "Elegant copper watering can for indoor plants",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
    category: "Garden",
    slug: "copper-watering-can"
  }
];

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleAddToCart = (product: Product) => {
    console.log("Adding to cart:", product);
    setIsCartOpen(true);
  };
  
  const filterProductsByCategory = (category: string | null) => {
    if (!category) return mockProducts;
    return mockProducts.filter(product => product.category === category);
  };
  
  const handleCategorySelect = (category: string | null) => {
    setIsLoading(true);
    setSelectedCategory(category);
    
    // Simulate loading delay when filtering
    setTimeout(() => {
      setProducts(filterProductsByCategory(category));
      setIsLoading(false);
    }, 400);
  };
  
  const categories = Array.from(new Set(mockProducts.map(p => p.category)));
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-16">
        {/* Page header */}
        <div className="bg-secondary/30 py-8 md:py-12">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-medium">All Products</h1>
            <p className="text-muted-foreground mt-2">
              Browse our collection of thoughtfully designed products
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filter sidebar - mobile toggle */}
            <div className="flex md:hidden mb-4">
              <ButtonCustom
                variant="secondary"
                onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
                className="w-full flex items-center justify-center"
              >
                <Filter size={16} className="mr-2" />
                Filter Products
              </ButtonCustom>
            </div>
            
            {/* Filter sidebar */}
            <div 
              className={`w-full md:w-64 space-y-6 ${isFilterSidebarOpen ? 'block' : 'hidden md:block'}`}
            >
              <div className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Categories</h3>
                  <SlidersHorizontal size={16} />
                </div>
                
                <div className="space-y-2">
                  <div 
                    className={`px-3 py-2 rounded-md cursor-pointer transition-colors ${
                      selectedCategory === null ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                    }`}
                    onClick={() => handleCategorySelect(null)}
                  >
                    All Products
                  </div>
                  
                  {categories.map(category => (
                    <div 
                      key={category}
                      className={`px-3 py-2 rounded-md cursor-pointer transition-colors ${
                        selectedCategory === category ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                      }`}
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="font-medium mb-4">Price Range</h3>
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    placeholder="Min"
                    className="flex-1 px-3 py-2 border rounded-md text-sm"
                  />
                  <span className="text-muted-foreground">to</span>
                  <input
                    type="text"
                    placeholder="Max"
                    className="flex-1 px-3 py-2 border rounded-md text-sm"
                  />
                </div>
                <div className="mt-4">
                  <ButtonCustom size="sm" className="w-full">
                    Apply
                  </ButtonCustom>
                </div>
              </div>
            </div>
            
            {/* Product grid */}
            <div className="flex-1">
              <div className="mb-6 flex justify-between items-center">
                <p className="text-muted-foreground">
                  Showing {products.length} of {mockProducts.length} products
                </p>
                <select className="px-3 py-2 border rounded-md text-sm">
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Most Popular</option>
                </select>
              </div>
              
              <ProductGrid 
                products={products} 
                isLoading={isLoading}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Cart drawer */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Products;
