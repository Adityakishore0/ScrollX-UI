"use client";

import { MovingLinesBackground } from "@/components/ui/movinglines-background";

export default function MovingLinesBackgroundLeftDemo() {
  return (
    <MovingLinesBackground
      direction="left"
      className="relative h-[400px] w-full flex flex-col items-center justify-center"
    >
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Moving Lines, <br /> Background.
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        flowing left, rewriting direction.
      </p>
    </MovingLinesBackground>
  );
}
