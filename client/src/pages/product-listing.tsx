import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import ProductCard from "@/components/products/product-card";
import ProductFilter, { FilterState } from "@/components/products/product-filter";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function ProductListing() {
  const { slug } = useParams();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  
  // Fetch category data
  const { data: category, isLoading: isLoadingCategory } = useQuery({
    queryKey: [`/api/categories/${slug}`],
  });
  
  // Fetch category products
  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: [`/api/categories/${slug}/products`],
  });
  
  // When products are loaded, set filtered products
  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);
  
  // Scroll to top on page load or category change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  // Apply filters to products
  const handleFilterChange = (filters: FilterState) => {
    if (!products) return;
    
    let result = [...products];
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    );
    
    // Apply feature filters
    if (filters.filters.sustainable) {
      result = result.filter(product => product.is_sustainable);
    }
    
    if (filters.filters.blockchainVerified) {
      result = result.filter(product => product.blockchain_verified);
    }
    
    if (filters.filters.newArrivals) {
      result = result.filter(product => product.is_new_arrival);
    }
    
    if (filters.filters.bestSellers) {
      result = result.filter(product => product.is_best_seller);
    }
    
    // Sort products
    switch (filters.sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default: // "featured"
        result.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
    }
    
    setFilteredProducts(result);
  };
  
  if (isLoadingCategory || isLoadingProducts) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 w-3/4 max-w-md rounded mb-6"></div>
          <div className="h-4 bg-gray-200 w-full max-w-2xl rounded mb-12"></div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <div className="h-12 bg-gray-200 rounded mb-4"></div>
              <div className="h-40 bg-gray-200 rounded"></div>
            </div>
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-gray-200 rounded-lg h-80"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!category) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="font-['Cormorant_Garamond'] text-2xl font-bold mb-4">
          Category Not Found
        </h2>
        <p className="mb-8">The category you are looking for does not exist.</p>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Category Header */}
      <div className="mb-12">
        <Link href="/">
          <a className="inline-flex items-center text-[var(--color-indigo)] mb-4 hover:underline">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Home
          </a>
        </Link>
        <h1 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold mb-4">
          {category.name} Collection
        </h1>
        <p className="max-w-3xl text-[var(--color-charcoal)]/70">
          {category.description}
        </p>
      </div>
      
      {/* Products Grid with Sidebar Filter */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filter */}
        <div className="lg:w-1/4">
          <ProductFilter onFilterChange={handleFilterChange} categorySlug={slug} />
        </div>
        
        {/* Products Grid */}
        <div className="lg:w-3/4">
          {filteredProducts.length > 0 ? (
            <>
              <p className="mb-6 text-[var(--color-charcoal)]/70">
                Showing {filteredProducts.length} products
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-[var(--color-beige)] rounded-lg">
              <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold mb-2">
                No Products Found
              </h3>
              <p className="text-[var(--color-charcoal)]/70 mb-6">
                No products match your selected filters. Try adjusting your filter criteria.
              </p>
              <Button 
                variant="outline" 
                onClick={() => handleFilterChange({
                  priceRange: [0, 5000],
                  sortBy: "featured",
                  filters: {
                    sustainable: false,
                    blockchainVerified: false,
                    newArrivals: false,
                    bestSellers: false
                  }
                })}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
