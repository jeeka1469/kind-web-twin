
import { useState, useEffect } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { ButtonCustom } from "./ui/button-custom";
import { Product } from "./ProductCard";
import { cn } from "@/lib/utils";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Cart({ isOpen, onClose }: CartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Mock cart data
  useEffect(() => {
    // This would typically come from your cart context or state
    setCartItems([
      {
        product: {
          id: "1",
          title: "Minimal Desk Lamp",
          description: "A sleek, adjustable desk lamp with warm lighting",
          price: 129.99,
          image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
          category: "Lighting",
          slug: "minimal-desk-lamp"
        },
        quantity: 1
      },
      {
        product: {
          id: "2",
          title: "Ceramic Mug Set",
          description: "Set of 4 handcrafted ceramic mugs",
          price: 49.99,
          image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
          category: "Kitchenware",
          slug: "ceramic-mug-set"
        },
        quantity: 2
      }
    ]);
  }, []);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsAnimating(true);
    } else {
      document.body.style.overflow = "";
      
      // Add a small delay before setting animating to false
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  const handleUpdateQuantity = (index: number, change: number) => {
    setCartItems(prevItems => {
      const newItems = [...prevItems];
      const newQuantity = newItems[index].quantity + change;
      
      if (newQuantity <= 0) {
        newItems.splice(index, 1);
      } else {
        newItems[index] = {
          ...newItems[index],
          quantity: newQuantity
        };
      }
      
      return newItems;
    });
  };
  
  const handleRemoveItem = (index: number) => {
    setCartItems(prevItems => {
      const newItems = [...prevItems];
      newItems.splice(index, 1);
      return newItems;
    });
  };
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };
  
  if (!isOpen && !isAnimating) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className={cn(
          "absolute inset-0 bg-black/25 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )} 
        onClick={onClose}
      />
      
      {/* Cart panel */}
      <div 
        className={cn(
          "absolute inset-y-0 right-0 w-full max-w-md flex flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-medium">Shopping Cart</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto py-6 px-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-1">Your cart is empty</p>
              <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
              <ButtonCustom onClick={onClose}>
                Continue Shopping
              </ButtonCustom>
            </div>
          ) : (
            <ul className="divide-y">
              {cartItems.map((item, index) => (
                <li key={item.product.id} className="py-6 flex animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="ml-4 flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium">
                        {item.product.title}
                      </h3>
                      <p className="text-sm font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                      ${item.product.price.toFixed(2)}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() => handleUpdateQuantity(index, -1)}
                          className="p-1 hover:bg-muted transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-2 py-1 text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(index, 1)}
                          className="p-1 hover:bg-muted transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t px-6 py-6 space-y-4">
            <div className="flex justify-between text-base font-medium">
              <p>Subtotal</p>
              <p>${calculateTotal().toFixed(2)}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="space-y-3">
              <ButtonCustom className="w-full">
                Checkout
              </ButtonCustom>
              <ButtonCustom 
                variant="secondary" 
                className="w-full"
                onClick={onClose}
              >
                Continue Shopping
              </ButtonCustom>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
