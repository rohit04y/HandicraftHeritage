import { ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import artisanCraftingImage from "@/assets/artisan_crafting.png";

export default function EducationalSection() {
  return (
    <section id="stories" className="py-16 bg-[var(--color-beige)]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-5/12 lg:pr-12 mb-10 lg:mb-0">
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold mb-5">
              Preserving Cultural Heritage
            </h2>
            <p className="text-lg mb-6">
              Learn about the rich history and significance of West Bengal's traditional crafts 
              and how our initiative helps preserve these ancient art forms for future generations.
            </p>
            
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold mb-3">Educational Initiatives</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[var(--color-terracotta)] mt-0.5 mr-2" />
                  <span>Documentation of traditional techniques and patterns</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[var(--color-terracotta)] mt-0.5 mr-2" />
                  <span>Apprenticeship programs for youth in rural communities</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[var(--color-terracotta)] mt-0.5 mr-2" />
                  <span>Virtual craft demonstrations and workshops</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[var(--color-terracotta)] mt-0.5 mr-2" />
                  <span>Cultural exchange programs with global artisan communities</span>
                </li>
              </ul>
            </div>
            
            <Link href="/educational-resources">
              <Button className="bg-[var(--color-terracotta)] hover:bg-[var(--color-terracotta)]/90 text-white">
                Explore Educational Resources
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="lg:w-7/12 grid grid-cols-2 gap-4">
            <div className="aspect-w-3 aspect-h-4">
              <img 
                src="https://images.unsplash.com/photo-1599577180516-b30c7c3829db?auto=format&fit=crop&w=600&h=800&q=80" 
                alt="Dokra crafting process" 
                className="w-full h-full object-cover rounded-lg shadow-md" 
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="aspect-w-4 aspect-h-3">
                <img 
                  src="https://images.unsplash.com/photo-1609826704020-26abbd0879c3?auto=format&fit=crop&w=600&h=450&q=80" 
                  alt="Kantha embroidery detail" 
                  className="w-full h-full object-cover rounded-lg shadow-md" 
                />
              </div>
              <div className="aspect-w-4 aspect-h-3">
                <img 
                  src={artisanCraftingImage} 
                  alt="Artisan crafting dokra figurine" 
                  className="w-full h-full object-cover rounded-lg shadow-md" 
                />
              </div>
            </div>
            <div className="col-span-2">
              <div className="aspect-w-16 aspect-h-8 rounded-lg shadow-md overflow-hidden">
                <iframe 
                  className="w-full h-full" 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                  title="Traditional Craft Techniques of West Bengal"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
