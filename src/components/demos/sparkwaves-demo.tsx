"use client";

import { SparkWaves } from "@/components/ui/spark-waves";

export default function SparkWavesDemo() {
  return (
    <SparkWaves
      sparkColor="#818cf8"
      sparkSize={12}
      sparkCount={28}
      duration={4500}
      waveInterval={1600}
      maxRadius={900}
      ringsPerWave={7}
      ringSpacing={55}
      enableInward={true}
      className="w-full h-[350px] flex items-center justify-center"
    >
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans font-bold tracking-tight relative z-20">
        Spark Waves, <br /> Background.
      </h2>
    </SparkWaves>
  );
}
