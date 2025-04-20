import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/contexts/cart-context";
import { cn } from "@/lib/utils";
import { X, Menu, Search, User, ShoppingCart } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems, setIsCartOpen } = useCart();
  const [location] = useLocation();
  
  // Handle scroll event to add shadow to header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Handle search form submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Search for:", searchQuery);
  };
  
  return (
    <header className={cn(
      "sticky top-0 z-50 bg-[var(--color-beige)] transition-shadow duration-300",
      isScrolled ? "shadow-md" : "shadow-sm"
    )}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[var(--color-terracotta)] flex items-center justify-center mr-3">
              <span className="font-['Caveat'] text-[var(--color-beige)] text-xl">AB</span>
            </div>
            <span className="font-['Cormorant_Garamond'] font-bold text-xl text-[var(--color-terracotta)] tracking-wide">
              Artisan Bengal
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/">
            <a className={cn(
              "font-medium transition-colors hover:text-[var(--color-terracotta)]",
              location === "/" ? "text-[var(--color-terracotta)]" : ""
            )}>
              Home
            </a>
          </Link>
          <Link href="/crafts/dokra">
            <a className={cn(
              "font-medium transition-colors hover:text-[var(--color-terracotta)]",
              location.startsWith("/crafts") ? "text-[var(--color-terracotta)]" : ""
            )}>
              Crafts
            </a>
          </Link>
          <Link href="/artisans">
            <a className={cn(
              "font-medium transition-colors hover:text-[var(--color-terracotta)]",
              location.startsWith("/artisans") ? "text-[var(--color-terracotta)]" : ""
            )}>
              Artisans
            </a>
          </Link>
          <Link href="/about">
            <a className={cn(
              "font-medium transition-colors hover:text-[var(--color-terracotta)]",
              location === "/about" ? "text-[var(--color-terracotta)]" : ""
            )}>
              About
            </a>
          </Link>
        </nav>
        
        {/* Search & Actions */}
        <div className="flex items-center space-x-4">
          {/* Desktop Search */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="relative hidden md:block"
          >
            <input 
              type="text" 
              placeholder="Search crafts..." 
              className="pl-10 pr-4 py-2 rounded-full border border-[var(--color-clay)] focus:border-[var(--color-terracotta)] focus:outline-none bg-[var(--color-beige)] text-sm w-48"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="h-5 w-5 absolute left-3 top-2 text-gray-400" />
          </form>
          
          {/* Profile */}
          <Link href="/account" className="p-2 hover:bg-[var(--color-clay)] rounded-full transition-colors">
            <User className="h-6 w-6" />
          </Link>
          
          {/* Cart */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="p-2 hover:bg-[var(--color-clay)] rounded-full transition-colors relative"
          >
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--color-terracotta)] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>
          
          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-terracotta)] flex items-center justify-center mr-2">
                      <span className="font-['Caveat'] text-[var(--color-beige)] text-base">AB</span>
                    </div>
                    <span className="font-['Cormorant_Garamond'] font-bold text-lg text-[var(--color-terracotta)]">
                      Artisan Bengal
                    </span>
                  </div>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetClose>
                </div>
                
                {/* Mobile Search */}
                <form onSubmit={handleSearchSubmit} className="mb-6">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search crafts..." 
                      className="w-full pl-10 pr-4 py-2 rounded-full border border-[var(--color-clay)] focus:border-[var(--color-terracotta)] focus:outline-none bg-[var(--color-beige)] text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="h-5 w-5 absolute left-3 top-2 text-gray-400" />
                  </div>
                </form>
                
                {/* Mobile Navigation */}
                <nav className="flex flex-col space-y-5">
                  <SheetClose asChild>
                    <Link href="/">
                      <a className="font-medium text-lg hover:text-[var(--color-terracotta)]">Home</a>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/crafts/dokra">
                      <a className="font-medium text-lg hover:text-[var(--color-terracotta)]">Crafts</a>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/artisans">
                      <a className="font-medium text-lg hover:text-[var(--color-terracotta)]">Artisans</a>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/about">
                      <a className="font-medium text-lg hover:text-[var(--color-terracotta)]">About</a>
                    </Link>
                  </SheetClose>
                </nav>
                
                <div className="mt-auto space-y-6">
                  <SheetClose asChild>
                    <Link href="/account">
                      <a className="flex items-center space-x-2 font-medium">
                        <User className="h-5 w-5" />
                        <span>My Account</span>
                      </a>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <button 
                      onClick={() => setIsCartOpen(true)}
                      className="flex items-center space-x-2 font-medium"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>Cart ({totalItems})</span>
                    </button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
