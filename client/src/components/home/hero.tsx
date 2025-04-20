import { Link } from "wouter";
import logoImage from "@assets/image_1745140414765.png";

export default function Hero() {
  return (
    <section className="bg-[var(--color-clay)] py-12 md:py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Hero Content */}
        <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
          <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-terracotta)] mb-4">
            Revitalizing Bengal's Rural Handicrafts
          </h1>
          <p className="text-lg mb-8 text-[var(--color-charcoal)]">
            Empowering artisans through fair trade and sustainable practices while preserving traditional craftsmanship for future generations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/crafts/dokra">
              <a className="px-8 py-3 bg-[var(--color-terracotta)] text-white font-medium rounded-full hover:bg-[var(--color-terracotta)]/90 transition text-center">
                Explore Crafts
              </a>
            </Link>
            <Link href="/artisans">
              <a className="px-8 py-3 border border-[var(--color-indigo)] text-[var(--color-indigo)] font-medium rounded-full hover:bg-[var(--color-indigo)]/5 transition text-center">
                Meet Artisans
              </a>
            </Link>
          </div>
          
          <div className="mt-8 flex items-center p-4 bg-white/80 rounded-lg shadow-sm inline-block">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-golden)] flex items-center justify-center border-2 border-white text-white font-bold">A</div>
              <div className="w-10 h-10 rounded-full bg-[var(--color-indigo)] flex items-center justify-center border-2 border-white text-white font-bold">B</div>
              <div className="w-10 h-10 rounded-full bg-[var(--color-terracotta)] flex items-center justify-center border-2 border-white text-white font-bold">C</div>
            </div>
            <span className="ml-4 text-sm font-medium">
              Empowering <span className="text-[var(--color-terracotta)]">500+</span> artisans across West Bengal
            </span>
          </div>
        </div>
        
        {/* Hero Visual */}
        <div className="md:w-1/2 relative">
          <div className="bg-[var(--color-terracotta)] p-1 rounded-lg shadow-xl">
            <div className="aspect-w-4 aspect-h-3 bg-[var(--color-beige)] rounded-lg flex items-center justify-center overflow-hidden">
              <div className="text-center p-8">
                <div className="w-44 h-44 mx-auto mb-6 flex items-center justify-center">
                  <img src={logoImage} alt="Artisan Sphere Logo" className="w-full h-full object-contain" />
                </div>
                <h2 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[var(--color-terracotta)] mb-3">Artisan Sphere</h2>
                <p className="text-[var(--color-charcoal)]">
                  Connecting rural artisans directly to global markets while preserving traditional craftsmanship
                </p>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-[var(--color-golden)] opacity-60"></div>
          <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-[var(--color-indigo)] opacity-60"></div>
        </div>
      </div>
    </section>
  );
}
