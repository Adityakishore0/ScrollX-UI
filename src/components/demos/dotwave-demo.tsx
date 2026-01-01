"use client";

import { DotWave } from "@/components/ui/dot-wave";

export default function DotWaveDemo() {
  return (
    <DotWave
      dotGap={20}
      dotRadiusMax={3}
      expansionSpeed={250}
      lightIntensity={0.4}
      fadeIntensity={0.08}
      className="w-full h-[350px] flex items-center justify-center"
    >
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-600 to-white text-2xl md:text-4xl lg:text-7xl font-sans font-bold tracking-tight relative z-20">
        Dot Wave, <br /> Background.
      </h2>
    </DotWave>
  );
}
