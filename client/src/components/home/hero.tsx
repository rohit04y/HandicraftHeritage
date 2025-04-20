import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="bg-cover bg-center relative" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1545022388-9f16ebd5c898?auto=format&fit=crop&w=1920&q=80')"
    }}>
      <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40 md:w-4/5">
        <div className="max-w-xl bg-[var(--color-beige)]/90 p-8 md:p-12 rounded-lg backdrop-blur-sm">
          <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-bold text-[var(--color-terracotta)] mb-4">
            Revitalizing Bengal's<br />Rural Handicrafts
          </h1>
          <p className="text-lg mb-8">
            Empowering artisans through fair trade and sustainable practices while preserving traditional craftsmanship.
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
          
          <div className="mt-8 flex items-center">
            <div className="flex -space-x-3">
              <img 
                src="https://images.unsplash.com/photo-1594616838951-c155f8d978a0?auto=format&fit=crop&w=100&h=100&q=80" 
                alt="Artisan" 
                className="w-10 h-10 rounded-full border-2 border-[var(--color-beige)]" 
              />
              <img 
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&h=100&q=80" 
                alt="Artisan" 
                className="w-10 h-10 rounded-full border-2 border-[var(--color-beige)]" 
              />
              <img 
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=100&h=100&q=80" 
                alt="Artisan" 
                className="w-10 h-10 rounded-full border-2 border-[var(--color-beige)]" 
              />
            </div>
            <span className="ml-4 text-sm font-medium">
              Empowering <span className="text-[var(--color-terracotta)]">500+</span> artisans across West Bengal
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
