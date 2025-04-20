import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface ProductFilterProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

function ProductFilter({ activeFilter, setActiveFilter }: ProductFilterProps) {
  const filters = [
    { id: "all", label: "All Products" },
    { id: "dokra", label: "Dokra" },
    { id: "kantha", label: "Kantha" },
    { id: "terracotta", label: "Terracotta" },
    { id: "shitalpati", label: "Shitalpati" }
  ];
  
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === filter.id
              ? "bg-[var(--color-terracotta)] text-white"
              : "bg-white text-[var(--color-charcoal)] hover:bg-[var(--color-clay)]"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState("all");
  
  type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    image?: string;
    discount_price?: number | null;
    is_featured: boolean;
    is_new_arrival: boolean;
    is_best_seller: boolean;
    is_sustainable: boolean;
    category_id: number;
    artisan_id: number;
    slug: string;
  };

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/featured'],
  });
  
  // Dummy data for products if API returns empty
  const dummyProducts = [
    {
      id: 1,
      name: "Bronze Elephant Figurine",
      price: 2999,
      description: "Traditional Dokra metal casting technique used to create this beautiful elephant figurine",
      image: "",
      discount_price: 2499,
      is_featured: true,
      is_new_arrival: false,
      is_best_seller: true,
      is_sustainable: true,
      category_id: 1,
      artisan_id: 1,
      slug: "bronze-elephant-figurine"
    },
    {
      id: 2,
      name: "Embroidered Wall Hanging",
      price: 1899,
      description: "Handcrafted Kantha embroidery wall hanging depicting rural Bengal life",
      image: "",
      discount_price: null,
      is_featured: true,
      is_new_arrival: true,
      is_best_seller: false,
      is_sustainable: true,
      category_id: 2,
      artisan_id: 2,
      slug: "embroidered-wall-hanging"
    },
    {
      id: 3,
      name: "Terracotta Decorative Pot",
      price: 1299,
      description: "Hand-painted terracotta pot with traditional Bengali motifs",
      image: "",
      discount_price: 999,
      is_featured: true,
      is_new_arrival: true,
      is_best_seller: true,
      is_sustainable: true,
      category_id: 3,
      artisan_id: 3,
      slug: "terracotta-decorative-pot"
    },
    {
      id: 4,
      name: "Shitalpati Table Mat Set",
      price: 1499,
      description: "Set of 6 eco-friendly table mats made from natural reed fiber",
      image: "",
      discount_price: null,
      is_featured: true,
      is_new_arrival: false,
      is_best_seller: false,
      is_sustainable: true,
      category_id: 4,
      artisan_id: 4,
      slug: "shitalpati-table-mat-set"
    }
  ];
  
  // Use products from API or fallback to dummy data
  const displayProducts = products || dummyProducts;
  
  // Filter products based on active filter
  const filteredProducts = displayProducts.filter((product: Product) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "dokra" && product.category_id === 1) return true;
    if (activeFilter === "kantha" && product.category_id === 2) return true;
    if (activeFilter === "terracotta" && product.category_id === 3) return true;
    if (activeFilter === "shitalpati" && product.category_id === 4) return true;
    return false;
  });
  
  // Get category name from category ID
  const getCategoryName = (categoryId: number) => {
    switch(categoryId) {
      case 1: return "Dokra";
      case 2: return "Kantha";
      case 3: return "Terracotta";
      case 4: return "Shitalpati";
      default: return "Other";
    }
  };
  
  // Get category color based on category ID
  const getCategoryColor = (categoryId: number) => {
    switch(categoryId) {
      case 1: return "bg-[var(--color-golden)]";
      case 2: return "bg-[var(--color-indigo)]";
      case 3: return "bg-[var(--color-terracotta)]";
      case 4: return "bg-[var(--color-success)]";
      default: return "bg-[var(--color-charcoal)]";
    }
  };
  
  return (
    <section className="py-16 md:py-24 bg-[var(--color-beige)]">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold mb-4">
            Featured Artisan Creations
          </h2>
          <p className="max-w-2xl mx-auto text-[var(--color-charcoal)]/70">
            Discover unique handicrafts made with traditional techniques,
            each item tells a story of Bengal's rich cultural heritage.
          </p>
        </div>
        
        <ProductFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 w-32 mb-2 rounded"></div>
                  <div className="h-5 bg-gray-200 w-48 mb-3 rounded"></div>
                  <div className="h-4 bg-gray-200 w-full mb-4 rounded"></div>
                  <div className="h-8 bg-gray-200 w-full rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product: Product) => (
              <Link key={product.id} href={`/product/${product.slug}`} className="group bg-white rounded-lg overflow-hidden shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg block">
                <div className={`h-64 relative ${getCategoryColor(product.category_id)}`}>
                  <div className="flex items-center justify-center h-full text-white">
                    <span className="font-['Caveat'] text-3xl">{product.name}</span>
                  </div>
                  
                  {/* Product badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.is_new_arrival && (
                      <span className="bg-[var(--color-alert)] text-white text-xs px-2 py-1 rounded-full">
                        New Arrival
                      </span>
                    )}
                    {product.is_best_seller && (
                      <span className="bg-[var(--color-indigo)] text-white text-xs px-2 py-1 rounded-full">
                        Best Seller
                      </span>
                    )}
                    {product.is_sustainable && (
                      <span className="bg-[var(--color-success)] text-white text-xs px-2 py-1 rounded-full">
                        Eco-Friendly
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-3">
                    <span className="inline-block px-2 py-1 rounded text-xs bg-[var(--color-clay)] text-[var(--color-indigo)]">
                      {getCategoryName(product.category_id)}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-[var(--color-terracotta)] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-[var(--color-charcoal)]/70 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      {product.discount_price ? (
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">
                            {formatPrice(product.discount_price)}
                          </span>
                          <span className="text-sm line-through text-[var(--color-charcoal)]/60">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                      ) : (
                        <span className="font-bold text-lg">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                    <span className="inline-flex items-center text-[var(--color-indigo)] text-sm font-medium">
                      View Details
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Link href="/crafts/dokra" className="inline-flex items-center justify-center px-8 py-3 bg-[var(--color-terracotta)] text-white font-medium rounded-full hover:bg-[var(--color-terracotta)]/90 transition">
            View All Products
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}