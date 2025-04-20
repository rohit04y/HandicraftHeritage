import { Link } from "wouter";
import { ChevronRight, Facebook, Twitter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Artisan {
  id: number;
  name: string;
  bio: string;
  profile_image: string;
  craft_specialty: string;
  location?: string;
}

interface ArtisanCardProps {
  artisan: Artisan;
  className?: string;
}

export default function ArtisanCard({ artisan, className }: ArtisanCardProps) {
  return (
    <div className={cn("bg-white rounded-lg overflow-hidden shadow-md", className)}>
      <div className="h-64 overflow-hidden">
        <img 
          src={artisan.profile_image} 
          alt={`Artisan ${artisan.name}`} 
          className="w-full h-full object-cover transition duration-500 hover:scale-105" 
        />
      </div>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold">{artisan.name}</h3>
          <Badge 
            variant="outline" 
            className="ml-auto bg-[var(--color-golden)]/20 text-[var(--color-golden)] border-none"
          >
            {artisan.craft_specialty}
          </Badge>
        </div>
        
        {artisan.location && (
          <div className="text-sm text-[var(--color-charcoal)]/60 mb-2">
            <span>{artisan.location}</span>
          </div>
        )}
        
        <p className="text-[var(--color-charcoal)]/70 mb-4 text-sm line-clamp-3">
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
            <a href="#" className="text-[var(--color-charcoal)] hover:text-[var(--color-indigo)] transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-[var(--color-charcoal)] hover:text-[var(--color-indigo)] transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
