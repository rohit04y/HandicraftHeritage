import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import ProductCard from "@/components/products/product-card";
import { Button } from "@/components/ui/button";

interface ProductFilterProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

function ProductFilter({ activeFilter, setActiveFilter }: ProductFilterProps) {
  return (
    <div className="flex space-x-3">
      <Button
        variant={activeFilter === "new" ? "default" : "outline"}
        className={activeFilter === "new" 
          ? "bg-[var(--color-clay)] text-[var(--color-charcoal)]" 
          : "bg-[var(--color-clay)]/20 text-[var(--color-charcoal)]"}
        onClick={() => setActiveFilter("new")}
      >
        New Arrivals
      </Button>
      <Button
        variant={activeFilter === "bestsellers" ? "default" : "outline"}
        className={activeFilter === "bestsellers" 
          ? "bg-[var(--color-clay)] text-[var(--color-charcoal)]" 
          : "bg-[var(--color-clay)]/20 text-[var(--color-charcoal)]"}
        onClick={() => setActiveFilter("bestsellers")}
      >
        Best Sellers
      </Button>
      <Button
        variant={activeFilter === "sustainable" ? "default" : "outline"}
        className={activeFilter === "sustainable" 
          ? "bg-[var(--color-clay)] text-[var(--color-charcoal)]" 
          : "bg-[var(--color-clay)]/20 text-[var(--color-charcoal)]"}
        onClick={() => setActiveFilter("sustainable")}
      >
        Sustainable
      </Button>
    </div>
  );
}

export default function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState("new");
  
  // Fetch products based on active filter
  const { data: products, isLoading } = useQuery({
    queryKey: [activeFilter === "new" 
      ? '/api/products/new-arrivals' 
      : activeFilter === "bestsellers"
      ? '/api/products/best-sellers'
      : '/api/products/sustainable'
    ],
  });
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold mb-2">
              Featured Creations
            </h2>
            <p className="text-[var(--color-charcoal)]/70">
              Handcrafted with care and expertise by our talented artisans
            </p>
          </div>
          <div className="mt-4 md:mt-0 hidden md:block">
            <ProductFilter 
              activeFilter={activeFilter} 
              setActiveFilter={setActiveFilter} 
            />
          </div>
        </div>
        
        {/* Mobile filter buttons */}
        <div className="mb-8 md:hidden flex justify-center">
          <ProductFilter 
            activeFilter={activeFilter} 
            setActiveFilter={setActiveFilter} 
          />
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse bg-[var(--color-beige)] rounded-lg overflow-hidden shadow-sm">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-5">
                  <div className="flex items-center mb-2">
                    <div className="h-4 bg-gray-200 w-16 rounded"></div>
                    <div className="ml-auto h-4 bg-gray-200 w-10 rounded"></div>
                  </div>
                  <div className="h-5 bg-gray-200 w-48 mb-1 rounded"></div>
                  <div className="h-4 bg-gray-200 w-full mb-3 rounded"></div>
                  <div className="flex items-end justify-between">
                    <div className="h-6 bg-gray-200 w-20 rounded"></div>
                    <div className="h-8 bg-gray-200 w-24 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products?.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Link href="/products">
            <a className="inline-flex items-center px-6 py-3 border-2 border-[var(--color-terracotta)] text-[var(--color-terracotta)] font-medium rounded-full hover:bg-[var(--color-terracotta)] hover:text-white transition">
              View All Products
              <ChevronRight className="h-5 w-5 ml-2" />
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
