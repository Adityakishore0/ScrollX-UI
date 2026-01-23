"use client";

import { CosmicBackground } from "@/components/ui/cosmic-background";

export default function CosmicBackgroundDemo() {
  return (
    <CosmicBackground
      variant="cosmic"
      intensity={1.0}
      speed={1.0}
      interactive={true}
      quality="high"
      overlay={false}
      className="relative h-[400px] w-full flex flex-col items-center justify-center"
    >
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-white to-neutral-200 drop-shadow-[0_0_20px_rgba(255,255,255,0.25)] text-2xl md:text-4xl lg:text-6xl py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Feeling cosmic?
      </h2>
    </CosmicBackground>
  );
}
