"use client";
import BrowseCategory from "@/components/BrowseCategory";
import Header from "@/components/Header";
import HotCollections from "@/components/HotCollections";
import LandingHeroSection from "@/components/LandingHeroSection";
import NFTCards from "@/components/NFTCards";
import NewCollections from "@/components/NewItems";

export default function HeroSection() {
  return (
    <div className="min-h-screen bg-white">
      <Header bgColor="bg-white" />

      <LandingHeroSection />
      <NFTCards />
      <HotCollections />
      <NewCollections />
      <BrowseCategory />
    </div>
  );
}
