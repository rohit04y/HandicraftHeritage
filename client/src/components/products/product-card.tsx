import { useState } from "react";
import { Link } from "wouter";
import { Heart, Star } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  image: string;
  category_id: number;
  artisan_id: number;
  slug: string;
  is_sustainable: boolean;
  is_best_seller: boolean;
  is_new_arrival: boolean;
  rating: number;
  rating_count: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  
  // Get category name based on id
  const getCategoryName = (id: number): string => {
    const categories = ["Dokra", "Kantha", "Terracotta", "Shitalpati"];
    return categories[id - 1] || "Craft"; 
  };
  
  // Mock user ID for demo purposes
  const mockUserId = 1;
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(mockUserId, product.id, 1);
  };
  
  return (
    <div 
      className="product-card group bg-[var(--color-beige)] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug}`}>
        <a>
          <div className="relative h-64 overflow-hidden">
            {product.is_sustainable && (
              <Badge className="absolute top-3 left-3 z-10 bg-[var(--color-success)]/90 text-white">
                Eco Friendly
              </Badge>
            )}
            {product.is_best_seller && (
              <Badge className="absolute top-3 left-3 z-10 bg-[var(--color-golden)]/90 text-white">
                Best Seller
              </Badge>
            )}
            {product.is_new_arrival && (
              <Badge className="absolute top-3 left-3 z-10 bg-[var(--color-indigo)]/90 text-white">
                New Arrival
              </Badge>
            )}
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition duration-500 group-hover:scale-105" 
            />
            <button 
              className={`absolute bottom-3 right-3 bg-white/90 p-2 rounded-full transition duration-300 hover:bg-white ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // TODO: Add to wishlist functionality
              }}
            >
              <Heart className="h-5 w-5 text-[var(--color-terracotta)]" />
            </button>
          </div>
          <div className="p-5">
            <div className="flex items-center mb-2">
              <span className="text-sm text-[var(--color-terracotta)] font-medium">
                {getCategoryName(product.category_id)}
              </span>
              <div className="ml-auto flex items-center">
                <Star className="w-4 h-4 text-[var(--color-golden)] fill-[var(--color-golden)]" />
                <span className="text-xs font-medium ml-1">{product.rating}</span>
              </div>
            </div>
            <h3 className="font-['Cormorant_Garamond'] text-lg font-semibold mb-1">
              {product.name}
            </h3>
            <p className="text-sm text-[var(--color-charcoal)]/70 mb-3">
              {product.description}
            </p>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-lg font-bold">{formatPrice(product.price)}</span>
                {product.discount_price && (
                  <span className="text-sm text-[var(--color-charcoal)]/60 line-through ml-2">
                    {formatPrice(product.discount_price)}
                  </span>
                )}
              </div>
              <Button 
                size="sm"
                onClick={handleAddToCart}
                className="bg-[var(--color-terracotta)] hover:bg-[var(--color-terracotta)]/90 text-white"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
