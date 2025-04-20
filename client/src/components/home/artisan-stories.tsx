import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ChevronRight, Facebook, Twitter } from "lucide-react";

interface Artisan {
  id: number;
  name: string;
  bio: string;
  profile_image: string;
  craft_specialty: string;
}

export default function ArtisanStories() {
  const { data: artisans, isLoading } = useQuery({
    queryKey: ['/api/artisans'],
  });
  
  return (
    <section id="artisans" className="py-16 bg-gradient-to-br from-[var(--color-terracotta)]/5 to-[var(--color-clay)]/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold mb-4">
            Meet Our Artisans
          </h2>
          <p className="max-w-2xl mx-auto text-[var(--color-charcoal)]/70">
            Behind every product is a skilled artisan with generations of craftsmanship and a unique story to tell.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-6 bg-gray-200 w-36 rounded"></div>
                    <div className="ml-auto h-6 bg-gray-200 w-16 rounded-full"></div>
                  </div>
                  <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
                  <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
                  <div className="h-4 bg-gray-200 w-3/4 mb-4 rounded"></div>
                  
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-200 w-24 rounded"></div>
                    <div className="flex space-x-2">
                      <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                      <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artisans?.map((artisan: Artisan) => (
              <div key={artisan.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={artisan.profile_image} 
                    alt={`Artisan ${artisan.name}`} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold">{artisan.name}</h3>
                    <span className="ml-auto bg-[var(--color-golden)]/20 text-[var(--color-golden)] text-xs font-bold px-3 py-1 rounded-full">
                      {artisan.craft_specialty}
                    </span>
                  </div>
                  <p className="text-[var(--color-charcoal)]/70 mb-4">
                    {artisan.bio}
                  </p>
                  <div className="flex justify-between items-center">
                    <Link href={`/artisans/${artisan.id}`}>
                      <a className="text-[var(--color-indigo)] font-medium inline-flex items-center">
                        Read Full Story
                        <ChevronRight className="h-5 w-5 ml-1" />
                      </a>
                    </Link>
                    <div className="flex space-x-2">
                      <a href="#" className="text-[var(--color-charcoal)] hover:text-[var(--color-indigo)]">
                        <Facebook className="h-5 w-5" />
                      </a>
                      <a href="#" className="text-[var(--color-charcoal)] hover:text-[var(--color-indigo)]">
                        <Twitter className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Link href="/artisans">
            <a className="inline-flex items-center px-6 py-3 border-2 border-[var(--color-indigo)] text-[var(--color-indigo)] font-medium rounded-full hover:bg-[var(--color-indigo)] hover:text-white transition">
              Meet All Artisans
              <ChevronRight className="h-5 w-5 ml-2" />
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
