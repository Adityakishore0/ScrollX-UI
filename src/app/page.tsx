import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ComponentShowcase } from "@/components/ComponentShowcase";
import { Footer } from "@/components/Footer";
import ExploreCta from "@/components/explore-cta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen relative">
        <div className="relative z-30">
          <HeroSection />
          <FeaturesSection />
          <ComponentShowcase />
          <ExploreCta />
        </div>
        <div className="sticky bottom-0">
          <Footer />
        </div>
      </main>
    </>
  );
}
