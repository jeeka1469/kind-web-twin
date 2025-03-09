
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Minus, Plus, ShoppingBag, Heart, Share2, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Cart } from "@/components/Cart";
import { ButtonCustom } from "@/components/ui/button-custom";
import { ProductGrid } from "@/components/ProductGrid";
import { Product } from "@/components/ProductCard";

// Mock products
const mockProducts: Product[] = [
  {
    id: "1",
    title: "Minimal Desk Lamp",
    description: "A sleek, adjustable desk lamp with warm lighting. Made from high-quality materials with a focus on durability and design. Perfect for your home office or bedside table.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
    category: "Lighting",
    slug: "minimal-desk-lamp"
  },
  {
    id: "2",
    title: "Ceramic Mug Set",
    description: "Set of 4 handcrafted ceramic mugs. Each mug is individually crafted by artisans, ensuring a unique piece with subtle variations in color and texture.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
    category: "Kitchenware",
    slug: "ceramic-mug-set"
  },
  {
    id: "3",
    title: "Minimalist Watch",
    description: "Elegant timepiece with a genuine leather strap. Features a Japanese movement mechanism and scratch-resistant sapphire crystal face.",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
    category: "Accessories",
    slug: "minimalist-watch"
  },
  {
    id: "4",
    title: "Modern Lounge Chair",
    description: "Comfortable chair with clean lines and natural materials. The ergonomic design provides optimal support while the timeless aesthetic complements any interior style.",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
    category: "Furniture",
    slug: "modern-lounge-chair"
  }
];

// Additional images for product gallery
const additionalImages = [
  "https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
];

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Reset state on slug change
    setIsLoading(true);
    setSelectedImage(0);
    setQuantity(1);
    
    // Simulate API fetch
    const timer = setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.slug === slug) || null;
      setProduct(foundProduct);
      
      // Set related products - in real app this would be products in same category
      if (foundProduct) {
        const related = mockProducts
          .filter(p => p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
      
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [slug]);
  
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      console.log(`Adding ${quantity} of ${product.title} to cart`);
      setIsCartOpen(true);
    }
  };
  
  // Build a gallery with main product image + additional images
  const galleryImages = product ? [product.image, ...additionalImages] : [];
  
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/2 space-y-4">
                  <div className="aspect-square bg-muted rounded-lg"></div>
                  <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="aspect-square bg-muted rounded-lg"></div>
                    ))}
                  </div>
                </div>
                
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="h-8 bg-muted rounded w-3/4"></div>
                  <div className="h-6 bg-muted rounded w-1/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                  <div className="h-10 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-2xl font-medium mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <ButtonCustom asChild>
              <Link to="/products">Continue Shopping</Link>
            </ButtonCustom>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex text-sm">
              <li className="flex items-center">
                <Link to="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
                <ChevronRight size={16} className="mx-2 text-muted-foreground" />
              </li>
              <li className="flex items-center">
                <Link to="/products" className="text-muted-foreground hover:text-foreground">
                  Products
                </Link>
                <ChevronRight size={16} className="mx-2 text-muted-foreground" />
              </li>
              <li className="text-foreground font-medium truncate">
                {product.title}
              </li>
            </ol>
          </nav>
          
          {/* Product details */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 animate-fade-in">
            {/* Product gallery */}
            <div className="w-full lg:w-1/2 space-y-4">
              {/* Main image */}
              <div className="aspect-square overflow-hidden rounded-lg bg-secondary/20 relative">
                <img 
                  src={galleryImages[selectedImage]} 
                  alt={product.title} 
                  className="object-cover w-full h-full transition-all animate-blur-in"
                />
              </div>
              
              {/* Thumbnail gallery */}
              <div className="grid grid-cols-4 gap-4">
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    className={`aspect-square rounded-lg overflow-hidden bg-secondary/20 border-2 transition-all ${
                      selectedImage === index ? 'border-primary' : 'border-transparent hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.title} - View ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product info */}
            <div className="w-full lg:w-1/2 animate-slide-in" style={{ animationDelay: '200ms' }}>
              <div className="pb-6 mb-6 border-b">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="inline-block px-2.5 py-0.5 bg-secondary/80 text-xs font-medium rounded-full">
                    {product.category}
                  </span>
                  <span className="text-sm text-green-600 font-medium">
                    In Stock
                  </span>
                </div>
                
                <h1 className="text-3xl font-medium mb-2">{product.title}</h1>
                
                <div className="flex items-baseline space-x-2 mb-6">
                  <span className="text-2xl font-medium">${product.price.toFixed(2)}</span>
                  {Math.random() > 0.5 && (
                    <span className="text-muted-foreground line-through">
                      ${(product.price * 1.2).toFixed(2)}
                    </span>
                  )}
                </div>
                
                <p className="text-muted-foreground mb-6">
                  {product.description}
                </p>
                
                {/* Quantity selector */}
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 hover:bg-muted transition-colors"
                      aria-label="Decrease quantity"
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} className={quantity <= 1 ? 'text-muted-foreground' : ''} />
                    </button>
                    <span className="px-4 py-2 text-sm font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 hover:bg-muted transition-colors"
                      aria-label="Increase quantity"
                      disabled={quantity >= 10}
                    >
                      <Plus size={16} className={quantity >= 10 ? 'text-muted-foreground' : ''} />
                    </button>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <ButtonCustom
                    onClick={handleAddToCart}
                    className="flex-1"
                    leftIcon={<ShoppingBag size={16} />}
                  >
                    Add to Cart
                  </ButtonCustom>
                  
                  <ButtonCustom
                    variant="secondary"
                    className="flex items-center justify-center"
                    aria-label="Add to wishlist"
                  >
                    <Heart size={16} className="mr-2" />
                    Wishlist
                  </ButtonCustom>
                  
                  <ButtonCustom
                    variant="ghost"
                    className="sm:flex-shrink-0 aspect-square p-0 w-10 sm:w-10"
                    aria-label="Share"
                  >
                    <Share2 size={16} />
                  </ButtonCustom>
                </div>
              </div>
              
              {/* Product features */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Truck size={20} className="text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium">Free Shipping</h3>
                    <p className="text-sm text-muted-foreground">
                      Free standard shipping on all orders over $75
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <RotateCcw size={20} className="text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium">Easy Returns</h3>
                    <p className="text-sm text-muted-foreground">
                      30-day return policy for a full refund
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <ShieldCheck size={20} className="text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium">Secure Checkout</h3>
                    <p className="text-sm text-muted-foreground">
                      Encrypted payment processing for your security
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related products */}
          <div className="mt-16 md:mt-24">
            <h2 className="text-2xl font-medium mb-8">You May Also Like</h2>
            <ProductGrid 
              products={relatedProducts} 
              onAddToCart={() => setIsCartOpen(true)}
              columns={4}
            />
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Cart drawer */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default ProductDetail;
