import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import ArtisanCard from "@/components/artisans/artisan-card";

export default function Artisans() {
  // Fetch artisans data
  const { data: artisans, isLoading } = useQuery({
    queryKey: ['/api/artisans'],
  });
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="bg-[var(--color-beige)]">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[var(--color-terracotta)]/10 to-[var(--color-clay)]/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-bold mb-6">
            Meet Our Artisans
          </h1>
          <p className="max-w-2xl mx-auto text-lg mb-8">
            Behind every handcrafted piece is a skilled artisan with generations of 
            craftsmanship and a unique story. Discover the people preserving West Bengal's 
            rich artistic heritage.
          </p>
        </div>
      </section>
      
      {/* Artisans Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-['Cormorant_Garamond'] text-3xl font-bold mb-10">
            Our Skilled Craftspeople
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
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
              {artisans?.map((artisan: any) => (
                <ArtisanCard key={artisan.id} artisan={artisan} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-['Caveat'] text-xl text-[var(--color-terracotta)]">Our Mission</span>
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold mb-6">
              Empowering Artisans Through Fair Trade
            </h2>
            <p className="text-lg mb-8">
              Artisan Bengal is committed to ensuring that the talented artisans behind our products
              receive fair compensation for their work. By connecting them directly with global markets,
              we help preserve their craft traditions while providing sustainable livelihoods.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div>
                <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold mb-3">
                  Fair Compensation
                </h3>
                <p className="text-[var(--color-charcoal)]/70">
                  We ensure artisans receive fair prices for their creations, typically 2-3x the local market rate.
                </p>
              </div>
              <div>
                <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold mb-3">
                  Skills Development
                </h3>
                <p className="text-[var(--color-charcoal)]/70">
                  We provide training programs to help artisans adapt their traditional skills to contemporary markets.
                </p>
              </div>
              <div>
                <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold mb-3">
                  Community Investment
                </h3>
                <p className="text-[var(--color-charcoal)]/70">
                  A portion of our profits is reinvested in artisan communities to improve workshops and living conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Join Us CTA */}
      <section className="py-16 bg-[var(--color-indigo)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-['Cormorant_Garamond'] text-3xl font-bold mb-6">
            Become an Artisan Partner
          </h2>
          <p className="max-w-2xl mx-auto mb-8">
            Are you a skilled artisan from West Bengal? Join our community to showcase your creations
            to a global audience and benefit from our fair trade practices.
          </p>
          <a 
            href="mailto:partners@artisanbengal.com" 
            className="inline-flex items-center px-6 py-3 bg-white text-[var(--color-indigo)] font-medium rounded-full hover:bg-opacity-90 transition"
          >
            Contact Us to Learn More
          </a>
        </div>
      </section>
    </div>
  );
}
