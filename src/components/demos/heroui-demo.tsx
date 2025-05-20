"use client";
import HeroUI from "@/components/ui/heroui";
import { useTheme } from "next-themes";

export default function HerouiDemo() {
  const { theme } = useTheme();

  return (
    <HeroUI
      title="ScrollX UI"
      subtitle="Where Interactions Spark Joy"
      badgeText="✨ Now Open Source"
      primaryCTA="Get Started"
      secondaryCTA="Documentation"
      features={[
        "TypeScript First",
        "Dark Mode",
        "100% Customizable",
        "MIT Licensed",
      ]}
      globeBaseColor={{
        light: [0.98, 0.98, 0.98],
        dark: [0.12, 0.12, 0.12],
      }}
      globeMarkerColor={{
        light: [0.2, 0.5, 0.9],
        dark: [0.1, 0.8, 1],
      }}
      globeGlowColor={{
        light: [0.3, 0.3, 0.3],
        dark: [1, 1, 1],
      }}
    />
  );
}
