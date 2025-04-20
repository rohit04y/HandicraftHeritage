import { Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlockchainCertificateProps {
  productId: string;
  createdOn: string;
  artisan: string;
  location: string;
  blockchainId: string;
  productImage: string;
  className?: string;
}

export default function BlockchainCertificate({
  productId,
  createdOn,
  artisan,
  location,
  blockchainId,
  productImage,
  className
}: BlockchainCertificateProps) {
  return (
    <div className={cn("bg-white rounded-lg shadow-md overflow-hidden", className)}>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="text-center">
            <img 
              src={productImage} 
              alt="Product" 
              className="w-24 h-24 rounded-lg mx-auto mb-2 object-cover" 
            />
            <span className="text-sm font-medium">Dokra Elephant</span>
          </div>
          <div className="flex-1 px-6">
            <div className="h-0.5 bg-[var(--color-indigo)] relative">
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--color-indigo)]"></div>
              <div className="absolute top-1/2 left-1/3 transform -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--color-indigo)]"></div>
              <div className="absolute top-1/2 left-2/3 transform -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--color-indigo)]"></div>
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--color-indigo)]"></div>
            </div>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 rounded-lg mx-auto mb-2 bg-[var(--color-indigo)]/10 flex items-center justify-center">
              <Home className="h-10 w-10 text-[var(--color-indigo)]" />
            </div>
            <span className="text-sm font-medium">Your Home</span>
          </div>
        </div>
        
        <div className="border border-dashed border-gray-300 rounded-lg p-5 bg-[var(--color-beige)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-['Cormorant_Garamond'] text-lg font-semibold">Certificate of Authenticity</h3>
            <div className="bg-[var(--color-indigo)] text-white text-xs font-bold px-3 py-1 rounded-full">Verified</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-[var(--color-charcoal)]/60 mb-1">Product ID</p>
              <p className="text-sm font-mono font-medium">{productId}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-charcoal)]/60 mb-1">Created On</p>
              <p className="text-sm font-medium">{createdOn}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-charcoal)]/60 mb-1">Artisan</p>
              <p className="text-sm font-medium">{artisan}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-charcoal)]/60 mb-1">Location</p>
              <p className="text-sm font-medium">{location}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-gray-300">
            <div className="text-xs text-[var(--color-charcoal)]/70">View blockchain record</div>
            <div className="font-mono text-xs">{blockchainId}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
