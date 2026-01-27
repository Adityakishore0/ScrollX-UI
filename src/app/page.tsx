import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ComponentShowcase } from "@/components/ComponentShowcase";
import { Footer } from "@/components/Footer";
import Testimonial from "@/components/testimonial";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen relative">
        <div className="relative z-30">
          <HeroSection />
          <FeaturesSection />
          <ComponentShowcase />
          <Testimonial />
        </div>
        <div className="sticky bottom-0">
          <Footer />
        </div>
      </main>
    </>
  );
}
