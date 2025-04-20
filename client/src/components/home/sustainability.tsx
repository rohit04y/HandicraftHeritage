import { ChevronRight, GlobeIcon, Sparkles, Package } from "lucide-react";
import { Link } from "wouter";

export default function Sustainability() {
  return (
    <section className="py-16 bg-[var(--color-success)]/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="font-['Caveat'] text-xl text-[var(--color-success)]">Eco-Conscious</span>
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold mb-4">
            Our Sustainability Commitment
          </h2>
          <p className="max-w-2xl mx-auto text-[var(--color-charcoal)]/70">
            We're dedicated to environmentally responsible practices throughout our value chain, 
            from sourcing to shipping.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="w-16 h-16 bg-[var(--color-success)]/20 rounded-full flex items-center justify-center mb-5">
              <GlobeIcon className="h-8 w-8 text-[var(--color-success)]" />
            </div>
            <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold mb-3">Natural Materials</h3>
            <p className="text-[var(--color-charcoal)]/70 mb-4">
              Our artisans work with eco-friendly materials sourced locally, including natural fibers, 
              clay, and recycled metals.
            </p>
            <Link href="/sustainability#materials">
              <a className="text-[var(--color-success)] font-medium inline-flex items-center">
                Learn More
                <ChevronRight className="h-5 w-5 ml-1" />
              </a>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="w-16 h-16 bg-[var(--color-success)]/20 rounded-full flex items-center justify-center mb-5">
              <Sparkles className="h-8 w-8 text-[var(--color-success)]" />
            </div>
            <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold mb-3">Traditional Techniques</h3>
            <p className="text-[var(--color-charcoal)]/70 mb-4">
              Time-honored crafting methods that have low environmental impact, using hand tools and 
              natural processing methods.
            </p>
            <Link href="/sustainability#techniques">
              <a className="text-[var(--color-success)] font-medium inline-flex items-center">
                Learn More
                <ChevronRight className="h-5 w-5 ml-1" />
              </a>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="w-16 h-16 bg-[var(--color-success)]/20 rounded-full flex items-center justify-center mb-5">
              <Package className="h-8 w-8 text-[var(--color-success)]" />
            </div>
            <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold mb-3">Eco-Packaging</h3>
            <p className="text-[var(--color-charcoal)]/70 mb-4">
              Products are shipped in biodegradable packaging made from recycled materials with 
              minimal environmental footprint.
            </p>
            <Link href="/sustainability#packaging">
              <a className="text-[var(--color-success)] font-medium inline-flex items-center">
                Learn More
                <ChevronRight className="h-5 w-5 ml-1" />
              </a>
            </Link>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/sustainability-report">
            <a className="inline-flex items-center px-6 py-3 border-2 border-[var(--color-success)] text-[var(--color-success)] font-medium rounded-full hover:bg-[var(--color-success)] hover:text-white transition">
              Our Sustainability Report
              <ChevronRight className="h-5 w-5 ml-2" />
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
