import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";

interface ProductFilterProps {
  onFilterChange: (filters: FilterState) => void;
  categorySlug?: string;
}

export interface FilterState {
  priceRange: [number, number];
  sortBy: string;
  filters: {
    sustainable: boolean;
    blockchainVerified: boolean;
    newArrivals: boolean;
    bestSellers: boolean;
  };
}

export default function ProductFilter({ onFilterChange, categorySlug }: ProductFilterProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState("featured");
  const [filters, setFilters] = useState({
    sustainable: false,
    blockchainVerified: false,
    newArrivals: false,
    bestSellers: false
  });
  
  const handlePriceChange = (value: number[]) => {
    const newPriceRange: [number, number] = [value[0], value[1]];
    setPriceRange(newPriceRange);
    onFilterChange({
      priceRange: newPriceRange,
      sortBy,
      filters
    });
  };
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
    onFilterChange({
      priceRange,
      sortBy: value,
      filters
    });
  };
  
  const handleFilterChange = (key: keyof typeof filters, checked: boolean) => {
    const newFilters = {
      ...filters,
      [key]: checked
    };
    setFilters(newFilters);
    onFilterChange({
      priceRange,
      sortBy,
      filters: newFilters
    });
  };
  
  const handleReset = () => {
    setPriceRange([0, 5000]);
    setSortBy("featured");
    setFilters({
      sustainable: false,
      blockchainVerified: false,
      newArrivals: false,
      bestSellers: false
    });
    onFilterChange({
      priceRange: [0, 5000],
      sortBy: "featured",
      filters: {
        sustainable: false,
        blockchainVerified: false,
        newArrivals: false,
        bestSellers: false
      }
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold mb-4">
          {categorySlug 
            ? `Filtered by: ${categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)}`
            : "Filter Products"}
        </h3>
        
        <div className="flex justify-between mb-6">
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleReset}
            className="text-[var(--color-indigo)]"
          >
            Reset Filters
          </Button>
        </div>
      </div>
      
      <Accordion type="single" collapsible defaultValue="price" className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger className="font-medium">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 px-1">
              <Slider 
                defaultValue={[0, 5000]} 
                min={0} 
                max={10000} 
                step={100}
                value={[priceRange[0], priceRange[1]]}
                onValueChange={handlePriceChange}
                className="mb-6"
              />
              <div className="flex justify-between">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="features">
          <AccordionTrigger className="font-medium">Product Features</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="sustainable" 
                  checked={filters.sustainable}
                  onCheckedChange={(checked) => 
                    handleFilterChange('sustainable', checked as boolean)
                  }
                />
                <Label htmlFor="sustainable" className="cursor-pointer">
                  Eco-Friendly & Sustainable
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="blockchain" 
                  checked={filters.blockchainVerified}
                  onCheckedChange={(checked) => 
                    handleFilterChange('blockchainVerified', checked as boolean)
                  }
                />
                <Label htmlFor="blockchain" className="cursor-pointer">
                  Blockchain Verified
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="newArrivals" 
                  checked={filters.newArrivals}
                  onCheckedChange={(checked) => 
                    handleFilterChange('newArrivals', checked as boolean)
                  }
                />
                <Label htmlFor="newArrivals" className="cursor-pointer">
                  New Arrivals
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="bestSellers" 
                  checked={filters.bestSellers}
                  onCheckedChange={(checked) => 
                    handleFilterChange('bestSellers', checked as boolean)
                  }
                />
                <Label htmlFor="bestSellers" className="cursor-pointer">
                  Best Sellers
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
