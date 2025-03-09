
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { ButtonCustom } from "./ui/button-custom";
import { cn } from "@/lib/utils";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Collections", href: "/collections" },
  { name: "About", href: "/about" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // This would normally be connected to your cart state
    setCartItemCount(3);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-xl font-medium tracking-tight transition-opacity hover:opacity-80"
            >
              MEDUSA
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-all duration-200 hover:text-black/70",
                  location.pathname === link.href
                    ? "text-black"
                    : "text-black/60"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 rounded-full hover:bg-black/5 transition-colors"
              aria-label="Search"
            >
              <Search size={20} className="text-black/80" />
            </button>
            
            <Link to="/account">
              <button 
                className="p-2 rounded-full hover:bg-black/5 transition-colors"
                aria-label="Account"
              >
                <User size={20} className="text-black/80" />
              </button>
            </Link>
            
            <button 
              className="p-2 rounded-full hover:bg-black/5 transition-colors relative"
              aria-label="Cart"
              onClick={() => {
                // This would open your cart drawer
                console.log("Open cart");
              }}
            >
              <ShoppingBag size={20} className="text-black/80" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs text-white animate-scale-in">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            {/* Mobile menu button */}
            <button
              className="p-2 rounded-full hover:bg-black/5 transition-colors md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} className="text-black/80" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-50 transition-transform duration-300 ease-in-out transform md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link 
            to="/" 
            className="text-xl font-medium tracking-tight"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            MEDUSA
          </Link>
          <button
            className="p-2 rounded-full hover:bg-black/5 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} className="text-black/80" />
          </button>
        </div>
        <nav className="px-4 py-6 space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "block text-lg font-medium transition-colors py-2",
                location.pathname === link.href
                  ? "text-black"
                  : "text-black/60 hover:text-black"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-6 border-t">
            <Link 
              to="/account" 
              className="flex items-center py-2 text-lg text-black/80 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User size={20} className="mr-3" />
              Account
            </Link>
            <button 
              className="flex items-center py-2 text-lg text-black/80 font-medium w-full text-left"
              onClick={() => {
                setIsMobileMenuOpen(false);
                // Open cart
              }}
            >
              <ShoppingBag size={20} className="mr-3" />
              Cart ({cartItemCount})
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
