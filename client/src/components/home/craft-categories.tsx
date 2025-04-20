import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Category {
  id: number;
  name: string;
  description: string;
  image?: string;
  slug: string;
}

// Predefined colors for category cards
const categoryColors = {
  "Dokra": "bg-[var(--color-golden)]",
  "Kantha": "bg-[var(--color-indigo)]",
  "Terracotta": "bg-[var(--color-terracotta)]",
  "Shitalpati": "bg-[var(--color-success)]"
};

export default function CraftCategories() {
  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  return (
    <section id="crafts" className="py-16 md:py-24 bg-gradient-to-b from-[var(--color-beige)] to-[var(--color-clay)]/30">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold mb-4">
            Explore Traditional Crafts
          </h2>
          <p className="max-w-2xl mx-auto text-[var(--color-charcoal)]/70">
            Discover the rich heritage of West Bengal through its diverse handicrafts, 
            each telling a unique story of artistic tradition.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-52 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 w-32 mb-2 rounded"></div>
                  <div className="h-5 bg-gray-200 w-48 mb-3 rounded"></div>
                  <div className="h-4 bg-gray-200 w-full mb-4 rounded"></div>
                  <div className="h-4 bg-gray-200 w-32 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories?.map((category: Category) => {
              // Get the background color for the category, or default to golden
              const bgColor = categoryColors[category.name as keyof typeof categoryColors] || "bg-[var(--color-golden)]";
              
              return (
                <div 
                  key={category.id} 
                  className="category-card bg-white rounded-lg overflow-hidden shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className={`h-52 overflow-hidden flex items-center justify-center ${bgColor}`}>
                    <div className="text-white text-center p-4">
                      <span className="font-['Caveat'] text-4xl block mb-2">{category.name}</span>
                      <span className="font-medium block">Traditional Craft</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="font-['Caveat'] text-2xl text-[var(--color-golden)] mb-2 block">
                      {category.name}
                    </span>
                    <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold mb-3">
                      {category.name === "Dokra" && "Metal Casting Tradition"}
                      {category.name === "Kantha" && "Embroidery Art"}
                      {category.name === "Terracotta" && "Clay Pottery"}
                      {category.name === "Shitalpati" && "Cool Mat Weaving"}
                    </h3>
                    <p className="mb-4 text-sm text-[var(--color-charcoal)]/70">
                      {category.description}
                    </p>
                    <Link href={`/crafts/${category.slug}`} className="inline-flex items-center text-[var(--color-indigo)] font-medium">
                      Explore Collection
                      <ChevronRight className="h-5 w-5 ml-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
