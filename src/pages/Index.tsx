
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/ProductGrid";
import { Cart } from "@/components/Cart";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Product } from "@/components/ProductCard";

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
  }
];

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setFeaturedProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleAddToCart = (product: Product) => {
    console.log("Adding to cart:", product);
    setIsCartOpen(true);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 md:pt-28 pb-12 md:pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col-reverse md:flex-row md:items-center">
            <div className="md:w-1/2 pt-8 md:pt-0 md:pr-12 space-y-6 md:space-y-8 animate-fade-in">
              <span className="inline-block px-3 py-1 rounded-full bg-secondary text-xs font-medium tracking-wider">
                NEW COLLECTION
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight text-balance">
                Simplicity meets exceptional craftsmanship
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Discover our curated collection of minimal, high-quality products designed for modern living.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <ButtonCustom size="lg">
                  Shop Collection
                </ButtonCustom>
                <ButtonCustom size="lg" variant="secondary">
                  Learn More
                </ButtonCustom>
              </div>
            </div>
            
            <div className="md:w-1/2 animate-scale-in">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Modern minimalist interior with products" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Categories */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-medium mb-4">Shop by Category</h2>
            <p className="text-muted-foreground">
              Explore our curated collections of thoughtfully designed products.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { name: "Home Decor", image: "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80" },
              { name: "Lighting", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80" },
              { name: "Furniture", image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80" },
              { name: "Kitchen", image: "https://images.unsplash.com/photo-1556911220-bda9f7f8677e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80" }
            ].map((category, index) => (
              <Link 
                key={category.name}
                to="/products"
                className="group relative block overflow-hidden rounded-lg aspect-square animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/30" />
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-xl font-medium tracking-tight bg-black/30 px-4 py-2 rounded-lg backdrop-blur-sm">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-medium">Featured Products</h2>
              <p className="text-muted-foreground mt-2">
                Discover our most popular designs
              </p>
            </div>
            <Link 
              to="/products" 
              className="inline-flex items-center text-sm font-medium hover:underline"
            >
              View All Products
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <ProductGrid 
            products={featuredProducts} 
            isLoading={isLoading}
            onAddToCart={handleAddToCart}
            columns={4}
          />
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <svg
              className="w-10 h-10 mx-auto mb-6 text-muted-foreground/60"
              fill="currentColor"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
              "The attention to detail in their products is remarkable. Every item feels thoughtfully designed and exceptionally well-crafted."
            </p>
            <div>
              <p className="font-medium">Sarah Johnson</p>
              <p className="text-muted-foreground text-sm">Interior Designer</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-medium mb-4">Join Our Newsletter</h2>
            <p className="text-muted-foreground mb-6">
              Be the first to know about new products, exclusive offers, and design inspiration.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
              <ButtonCustom type="submit">Subscribe</ButtonCustom>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
      
      {/* Cart drawer */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Index;
