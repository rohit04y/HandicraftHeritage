import { useEffect } from "react";
import { Link } from "wouter";
import { 
  ChevronRight, 
  Globe, 
  Users, 
  ShieldCheck, 
  Leaf, 
  FileCheck,
  BarChart,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[var(--color-beige)]">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[var(--color-terracotta)]/10 to-[var(--color-clay)]/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-bold mb-6">
              Our Story & Mission
            </h1>
            <p className="text-lg mb-8">
              Artisan Bengal was founded with a singular vision: to revitalize West Bengal's rich 
              artistic heritage while creating sustainable livelihoods for rural artisans. We bridge 
              centuries-old craft traditions with modern global markets through technology and innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/artisans">
                <Button className="bg-[var(--color-terracotta)] hover:bg-[var(--color-terracotta)]/90">
                  Meet Our Artisans
                </Button>
              </Link>
              <Link href="/crafts/dokra">
                <Button variant="outline" className="border-[var(--color-indigo)] text-[var(--color-indigo)]">
                  Explore Our Crafts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-['Caveat'] text-xl text-[var(--color-terracotta)]">Our Vision</span>
              <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold mb-6">
                Preserving Tradition Through Innovation
              </h2>
              <p className="mb-6">
                In the heart of West Bengal's villages, generations of skilled artisans have preserved ancient craftsmanship 
                that tells the story of our cultural heritage. Yet, these artisans face significant challenges - unfair 
                compensation, limited market access, and the risk of traditional techniques being lost to time.
              </p>
              <p className="mb-6">
                Artisan Bengal addresses these challenges through a sustainable, tech-driven model that connects artisans 
                directly with global customers. Our blockchain verification ensures authenticity while our focus on sustainable 
                production honors both tradition and our responsibility to the environment.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="flex items-start">
                  <div className="p-2 bg-[var(--color-terracotta)]/10 rounded-full mr-4">
                    <Users className="h-5 w-5 text-[var(--color-terracotta)]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Artisan Empowerment</h3>
                    <p className="text-sm text-[var(--color-charcoal)]/70">
                      Providing fair compensation and sustainable livelihoods
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-2 bg-[var(--color-terracotta)]/10 rounded-full mr-4">
                    <Globe className="h-5 w-5 text-[var(--color-terracotta)]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Global Access</h3>
                    <p className="text-sm text-[var(--color-charcoal)]/70">
                      Connecting rural artisans to international markets
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-2 bg-[var(--color-terracotta)]/10 rounded-full mr-4">
                    <ShieldCheck className="h-5 w-5 text-[var(--color-terracotta)]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Authentication</h3>
                    <p className="text-sm text-[var(--color-charcoal)]/70">
                      Blockchain verification for product authenticity
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-2 bg-[var(--color-terracotta)]/10 rounded-full mr-4">
                    <Leaf className="h-5 w-5 text-[var(--color-terracotta)]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Sustainability</h3>
                    <p className="text-sm text-[var(--color-charcoal)]/70">
                      Eco-friendly production and ethical practices
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1594616838951-c155f8d978a0?auto=format&fit=crop&w=600&h=400&q=80" 
                  alt="Artisan at work" 
                  className="rounded-lg shadow-md w-full h-auto" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1605883705077-8d3d3cebe78c?auto=format&fit=crop&w=600&h=300&q=80" 
                  alt="Terracotta crafting" 
                  className="rounded-lg shadow-md w-full h-auto" 
                />
              </div>
              <div className="space-y-4 pt-8">
                <img 
                  src="https://images.unsplash.com/photo-1617178564136-564b38fc87b4?auto=format&fit=crop&w=600&h=300&q=80" 
                  alt="Dokra artisan" 
                  className="rounded-lg shadow-md w-full h-auto" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1606722590066-8cc69f0c0708?auto=format&fit=crop&w=600&h=400&q=80" 
                  alt="Kantha embroidery" 
                  className="rounded-lg shadow-md w-full h-auto" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section id="blockchain" className="py-16 bg-[var(--color-indigo)]/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-['Caveat'] text-xl text-[var(--color-terracotta)]">Our Approach</span>
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold mb-6">
              Innovative Solutions for Traditional Crafts
            </h2>
            <p>
              We combine cutting-edge technology with time-honored craftsmanship to create 
              a sustainable ecosystem that benefits artisans, customers, and the environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-16 h-16 bg-[var(--color-indigo)]/10 rounded-full flex items-center justify-center mb-6">
                <FileCheck className="h-8 w-8 text-[var(--color-indigo)]" />
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold mb-3">Blockchain Verification</h3>
              <p className="text-[var(--color-charcoal)]/70 mb-4">
                Each premium product includes a unique blockchain certificate that verifies its authenticity and 
                allows customers to trace its journey from artisan to home. This transparency ensures both 
                authenticity and fair compensation.
              </p>
              <p className="text-[var(--color-charcoal)]/70">
                The certificate includes details such as the artisan's name, location, creation date, and a 
                unique blockchain ID that cannot be forged or altered.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-16 h-16 bg-[var(--color-indigo)]/10 rounded-full flex items-center justify-center mb-6">
                <BarChart className="h-8 w-8 text-[var(--color-indigo)]" />
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold mb-3">AI-Driven Demand Forecasting</h3>
              <p className="text-[var(--color-charcoal)]/70 mb-4">
                We utilize AI algorithms to analyze purchasing patterns and predict market demands for specific 
                craft categories and styles. This helps artisans focus their production on items with higher 
                market potential.
              </p>
              <p className="text-[var(--color-charcoal)]/70">
                By reducing overproduction and inventory waste, we create a more sustainable production cycle 
                while ensuring artisans can sell what they create.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-16 h-16 bg-[var(--color-indigo)]/10 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="h-8 w-8 text-[var(--color-indigo)]" />
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold mb-3">Virtual Showrooms</h3>
              <p className="text-[var(--color-charcoal)]/70 mb-4">
                Our digital platform features immersive virtual showrooms that allow customers from around the world 
                to explore craft collections and understand the stories and techniques behind each piece.
              </p>
              <p className="text-[var(--color-charcoal)]/70">
                These virtual experiences bring customers closer to the artisans and their craft traditions, 
                creating deeper connections with the products they purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Craft Heritage Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="font-['Caveat'] text-xl text-[var(--color-terracotta)]">Craft Heritage</span>
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold mb-6">
              West Bengal's Cultural Treasures
            </h2>
            <p className="max-w-3xl mx-auto">
              Our platform features four distinct craft traditions from West Bengal, each with its unique 
              history, techniques, and cultural significance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex">
              <div className="p-5 bg-[var(--color-beige)] rounded-l-lg flex items-center justify-center">
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold writing-vertical-rl transform rotate-180">Dokra</h3>
              </div>
              <div className="flex-1 bg-[var(--color-beige)]/50 p-6 rounded-r-lg">
                <p className="mb-4">
                  Dokra is one of India's oldest metal casting techniques, dating back over 4,000 years. 
                  This lost-wax method creates intricate brass and bronze sculptures with distinctive tribal motifs.
                </p>
                <p>
                  Artisans from the Bankura and Birbhum districts are particularly renowned for their mastery 
                  of this ancient craft, creating everything from religious figurines to contemporary jewelry.
                </p>
                <Link href="/crafts/dokra">
                  <a className="inline-flex items-center text-[var(--color-indigo)] font-medium mt-4">
                    Explore Dokra Collection
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </Link>
              </div>
            </div>

            <div className="flex">
              <div className="p-5 bg-[var(--color-beige)] rounded-l-lg flex items-center justify-center">
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold writing-vertical-rl transform rotate-180">Kantha</h3>
              </div>
              <div className="flex-1 bg-[var(--color-beige)]/50 p-6 rounded-r-lg">
                <p className="mb-4">
                  Kantha embroidery has been practiced by women in rural Bengal for centuries. Originally a way to 
                  repurpose old saris by layering and stitching them together, it has evolved into an exquisite art form.
                </p>
                <p>
                  The distinctive running stitch creates ripple-like patterns and is used to depict scenes from nature, 
                  mythology, and everyday life, often telling stories through needlework.
                </p>
                <Link href="/crafts/kantha">
                  <a className="inline-flex items-center text-[var(--color-indigo)] font-medium mt-4">
                    Explore Kantha Collection
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </Link>
              </div>
            </div>

            <div className="flex">
              <div className="p-5 bg-[var(--color-beige)] rounded-l-lg flex items-center justify-center">
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold writing-vertical-rl transform rotate-180">Terracotta</h3>
              </div>
              <div className="flex-1 bg-[var(--color-beige)]/50 p-6 rounded-r-lg">
                <p className="mb-4">
                  The terracotta craft of West Bengal is characterized by its distinctive earthen red color 
                  and intricate detailing. From the famous temple facades of Bishnupur to decorative household items, 
                  this clay-based craft has deep cultural roots.
                </p>
                <p>
                  Artisans shape local river clay by hand or on a potter's wheel before firing it in traditional kilns, 
                  creating everything from religious sculptures to contemporary home décor.
                </p>
                <Link href="/crafts/terracotta">
                  <a className="inline-flex items-center text-[var(--color-indigo)] font-medium mt-4">
                    Explore Terracotta Collection
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </Link>
              </div>
            </div>

            <div className="flex">
              <div className="p-5 bg-[var(--color-beige)] rounded-l-lg flex items-center justify-center">
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold writing-vertical-rl transform rotate-180">Shitalpati</h3>
              </div>
              <div className="flex-1 bg-[var(--color-beige)]/50 p-6 rounded-r-lg">
                <p className="mb-4">
                  Shitalpati mat weaving is a specialized craft from Cooch Behar in North Bengal. The name "Shitalpati" 
                  literally means "cool mat," referring to the natural cooling properties of these reed mats.
                </p>
                <p>
                  Artisans meticulously split and process the natural reeds before weaving them into mats with 
                  geometric patterns. These mats are not only functional but also considered works of art.
                </p>
                <Link href="/crafts/shitalpati">
                  <a className="inline-flex items-center text-[var(--color-indigo)] font-medium mt-4">
                    Explore Shitalpati Collection
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section id="sustainability" className="py-16 bg-[var(--color-success)]/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-['Caveat'] text-xl text-[var(--color-success)]">Our Commitment</span>
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold mb-6">
              Sustainable & Ethical Practices
            </h2>
            <p>
              Sustainability is at the core of our business model. We're committed to environmentally 
              responsible practices throughout our value chain, from material sourcing to packaging and shipping.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold mb-4">Environmental Responsibility</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mt-1 mr-3 w-5 h-5 bg-[var(--color-success)]/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[var(--color-success)] rounded-full"></div>
                  </div>
                  <span>Use of natural, locally-sourced materials</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 w-5 h-5 bg-[var(--color-success)]/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[var(--color-success)] rounded-full"></div>
                  </div>
                  <span>Traditional techniques with low environmental impact</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 w-5 h-5 bg-[var(--color-success)]/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[var(--color-success)] rounded-full"></div>
                  </div>
                  <span>Natural dyes and pigments</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 w-5 h-5 bg-[var(--color-success)]/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[var(--color-success)] rounded-full"></div>
                  </div>
                  <span>Waste reduction and material reuse in workshops</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold mb-4">Ethical Production</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mt-1 mr-3 w-5 h-5 bg-[var(--color-success)]/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[var(--color-success)] rounded-full"></div>
                  </div>
                  <span>Fair compensation for artisans (2-3x local market rates)</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 w-5 h-5 bg-[var(--color-success)]/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[var(--color-success)] rounded-full"></div>
                  </div>
                  <span>Safe and healthy working conditions</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 w-5 h-5 bg-[var(--color-success)]/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[var(--color-success)] rounded-full"></div>
                  </div>
                  <span>No child labor or exploitative practices</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 w-5 h-5 bg-[var(--color-success)]/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[var(--color-success)] rounded-full"></div>
                  </div>
                  <span>Skills development and education programs</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold mb-4">Supply Chain & Packaging</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mt-1 mr-3 w-5 h-5 bg-[var(--color-success)]/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[var(--color-success)] rounded-full"></div>
                  </div>
                  <span>Biodegradable and recycled packaging materials</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 w-5 h-5 bg-[var(--color-success)]/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[var(--color-success)] rounded-full"></div>
                  </div>
                  <span>Carbon offset shipping options</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 w-5 h-5 bg-[var(--color-success)]/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[var(--color-success)] rounded-full"></div>
                  </div>
                  <span>Plastic-free shipping and product packaging</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 w-5 h-5 bg-[var(--color-success)]/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[var(--color-success)] rounded-full"></div>
                  </div>
                  <span>Local logistics partners to reduce carbon footprint</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/sustainability-report">
              <Button variant="outline" className="border-[var(--color-success)] text-[var(--color-success)]">
                Read Our Full Sustainability Report
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Join Our Journey CTA */}
      <section className="py-16 bg-[var(--color-terracotta)]">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold mb-6">
              Join Our Journey
            </h2>
            <p className="mb-8 text-white/90">
              By supporting Artisan Bengal, you're not just purchasing beautiful handicrafts – you're helping 
              to preserve centuries-old traditions and providing sustainable livelihoods for rural artisans. 
              Join us in our mission to revitalize Bengal's craft heritage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/crafts/dokra">
                <Button className="bg-white text-[var(--color-terracotta)] hover:bg-white/90">
                  Explore Our Collections
                </Button>
              </Link>
              <Link href="#newsletter">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Subscribe to Our Newsletter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
