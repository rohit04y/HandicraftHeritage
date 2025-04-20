import Hero from "@/components/home/hero";
import CraftCategories from "@/components/home/craft-categories";
import FeaturedProducts from "@/components/home/featured-products";
import BlockchainVerification from "@/components/home/blockchain-verification";
import ArtisanStories from "@/components/home/artisan-stories";
import EducationalSection from "@/components/home/educational-section";
import Sustainability from "@/components/home/sustainability";
import Newsletter from "@/components/home/newsletter";
import { useEffect } from "react";

export default function Home() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />
      <CraftCategories />
      <FeaturedProducts />
      <BlockchainVerification />
      <ArtisanStories />
      <EducationalSection />
      <Sustainability />
      <Newsletter />
    </>
  );
}
