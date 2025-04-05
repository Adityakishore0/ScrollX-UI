import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ComponentShowcase } from "@/components/ComponentShowcase";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen">
        <HeroSection />
        <FeaturesSection />
        <ComponentShowcase />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
}
