import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/products/product-card";
import { Badge } from "@/components/ui/badge";

export default function ArtisanProfile() {
  const { id } = useParams();
  const artisanId = parseInt(id);
  
  // Fetch artisan data
  const { data: artisan, isLoading: isLoadingArtisan } = useQuery({
    queryKey: [`/api/artisans/${artisanId}`],
  });
  
  // Fetch artisan's products
  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: [`/api/artisans/${artisanId}/products`],
    enabled: !!artisan,
  });
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  if (isLoadingArtisan) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 w-32 rounded mb-8"></div>
          
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-1/3">
              <div className="h-96 bg-gray-200 rounded-lg mb-4"></div>
            </div>
            <div className="md:w-2/3">
              <div className="h-10 bg-gray-200 w-2/3 rounded mb-4"></div>
              <div className="h-5 bg-gray-200 w-1/3 rounded mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 w-3/4 rounded"></div>
              </div>
            </div>
          </div>
          
          <div className="h-8 bg-gray-200 w-64 rounded mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-80 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (!artisan) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="font-['Cormorant_Garamond'] text-2xl font-bold mb-4">
          Artisan Not Found
        </h2>
        <p className="mb-8">The artisan you are looking for does not exist.</p>
        <Link href="/artisans">
          <Button>View All Artisans</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="bg-[var(--color-beige)]">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Link href="/artisans">
            <a className="inline-flex items-center text-[var(--color-indigo)] hover:underline">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Artisans
            </a>
          </Link>
        </div>
        
        {/* Artisan Profile */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3">
              <div className="h-full">
                <img 
                  src={artisan.profile_image} 
                  alt={artisan.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
            <div className="md:w-2/3 p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h1 className="font-['Cormorant_Garamond'] text-3xl font-bold">
                  {artisan.name}
                </h1>
                <Badge className="bg-[var(--color-golden)]/20 text-[var(--color-golden)] border-none">
                  {artisan.craft_specialty}
                </Badge>
              </div>
              
              {artisan.location && (
                <div className="flex items-center text-[var(--color-charcoal)]/70 mb-6">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{artisan.location}</span>
                </div>
              )}
              
              <div className="prose max-w-none mb-8">
                <p>{artisan.bio}</p>
                
                <p>
                  With years of dedication to the craft, {artisan.name} has mastered the intricate 
                  techniques passed down through generations. Every piece created reflects not only 
                  artistic skill but also cultural heritage and personal expression.
                </p>
                
                <p>
                  Working with traditional tools and methods, {artisan.name} is committed to 
                  preserving the authenticity of {artisan.craft_specialty} while introducing 
                  innovative elements that appeal to contemporary tastes.
                </p>
              </div>
              
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-indigo)]/10 text-[var(--color-indigo)] hover:bg-[var(--color-indigo)]/20 transition"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-indigo)]/10 text-[var(--color-indigo)] hover:bg-[var(--color-indigo)]/20 transition"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-indigo)]/10 text-[var(--color-indigo)] hover:bg-[var(--color-indigo)]/20 transition"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Artisan's Products */}
        <div>
          <h2 className="font-['Cormorant_Garamond'] text-2xl font-bold mb-8">
            Creations by {artisan.name}
          </h2>
          
          {isLoadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="animate-pulse bg-white rounded-lg overflow-hidden shadow-sm">
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
          ) : products?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-[var(--color-charcoal)]/70 mb-4">
                No products available from this artisan yet.
              </p>
              <Link href="/crafts/dokra">
                <Button>Explore Other Products</Button>
              </Link>
            </div>
          )}
        </div>
        
        {/* Craft Technique */}
        <div className="mt-16 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="font-['Cormorant_Garamond'] text-2xl font-bold mb-6">
              About {artisan.craft_specialty} Craft
            </h2>
            <div className="prose max-w-none">
              {artisan.craft_specialty === 'Dokra' && (
                <>
                  <p>
                    Dokra is one of the oldest traditional techniques of metal casting in India, dating back over 4,000 years. 
                    This lost-wax casting process involves creating a clay core model, covering it with wax, then with another layer of clay, 
                    and finally heating the mold to melt out the wax, leaving a cavity that is filled with molten metal.
                  </p>
                  <p>
                    The intricate designs and motifs in Dokra art often depict religious figures, tribal deities, animals, and scenes from 
                    everyday rural life. Each piece is handcrafted and unique, with no two pieces being exactly identical.
                  </p>
                </>
              )}
              
              {artisan.craft_specialty === 'Kantha' && (
                <>
                  <p>
                    Kantha is a traditional form of embroidery originating from eastern South Asia, particularly in West Bengal. 
                    The craft began as a way of reusing old saris and cloth by layering them and stitching them together to create 
                    items like quilts, bedspreads, and throws.
                  </p>
                  <p>
                    The distinctive feature of Kantha embroidery is the running stitch, which creates ripple-like patterns across the fabric. 
                    Traditional Kantha designs often include mythological scenes, folk motifs, animals, birds, and geometric patterns that 
                    reflect the cultural heritage of Bengal.
                  </p>
                </>
              )}
              
              {artisan.craft_specialty === 'Terracotta' && (
                <>
                  <p>
                    Terracotta craft in West Bengal is renowned for its distinctive earthen red color and intricate detailing. 
                    The term "terracotta" comes from the Italian words "terra cotta," meaning "baked earth," which aptly describes 
                    the clay pottery and sculptures created in this tradition.
                  </p>
                  <p>
                    Artisans start with local river clay, which is cleaned, mixed with sand for strength, shaped by hand or on a potter's wheel, 
                    and then fired in traditional kilns. West Bengal's terracotta art is known for its ornate temple panels, figurines, jewelry, 
                    and decorative items featuring elaborate scenes from Hindu mythology and rural life.
                  </p>
                </>
              )}
            </div>
            
            <div className="mt-8 text-center">
              <Link href={`/crafts/${artisan.craft_specialty.toLowerCase()}`}>
                <a className="inline-flex items-center px-6 py-3 border-2 border-[var(--color-indigo)] text-[var(--color-indigo)] font-medium rounded-full hover:bg-[var(--color-indigo)] hover:text-white transition">
                  Explore All {artisan.craft_specialty} Products
                  <ChevronRight className="h-5 w-5 ml-2" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
