import { ChevronRight, Shield, MapPin, Banknote } from "lucide-react";
import BlockchainCertificate from "@/components/ui/blockchain-certificate";
import { Link } from "wouter";
import dokraElephantImage from "@assets/image_1745140861554.png";

export default function BlockchainVerification() {
  return (
    <section className="py-16 bg-[var(--color-indigo)]/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
            <div className="max-w-lg">
              <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-bold mb-5">
                Blockchain Authenticity Verification
              </h2>
              <p className="text-lg mb-6">
                Every premium product comes with a unique digital certificate that validates 
                its authenticity and traces its journey from the artisan to your home.
              </p>
              
              <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[var(--color-indigo)] rounded-full flex items-center justify-center mr-4">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-['Cormorant_Garamond'] font-semibold text-lg">Verified Authenticity</h3>
                    <p className="text-sm text-[var(--color-charcoal)]/70">Each product has a tamper-proof digital record</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[var(--color-indigo)] rounded-full flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-['Cormorant_Garamond'] font-semibold text-lg">Complete Traceability</h3>
                    <p className="text-sm text-[var(--color-charcoal)]/70">Follow your product's journey from creation to delivery</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[var(--color-indigo)] rounded-full flex items-center justify-center mr-4">
                    <Banknote className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-['Cormorant_Garamond'] font-semibold text-lg">Fair Compensation</h3>
                    <p className="text-sm text-[var(--color-charcoal)]/70">Transparency in ensuring artisans receive fair payment</p>
                  </div>
                </div>
              </div>
              
              <Link href="/about#blockchain" className="inline-flex items-center text-[var(--color-indigo)] font-medium">
                Learn more about our blockchain technology
                <ChevronRight className="h-5 w-5 ml-1" />
              </Link>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <BlockchainCertificate 
              productId="DOK-EL-22-7834"
              createdOn="June 12, 2023"
              artisan="Rajesh Sutradhar"
              location="Bankura, West Bengal"
              blockchainId="0x71C...8f3E"
              productImage={dokraElephantImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
