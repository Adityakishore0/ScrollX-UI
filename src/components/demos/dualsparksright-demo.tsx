"use client";

import { DualSparks } from "@/components/ui/dualsparks";

export default function DualSparksRightDemo() {
  return (
    <DualSparks
      sparkColor="#000000"
      sparkColorDark="#ffffff"
      sparkSize={2}
      sparkCount={22}
      ringsPerWave={3}
      waveInterval={1200}
      maxRadius={1000}
      corners="right"
      className="w-full h-[350px] flex items-center bg-black justify-center"
    >
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans font-bold tracking-tight relative z-20">
        DualSparks, <br /> Background.
      </h2>
    </DualSparks>
  );
}
