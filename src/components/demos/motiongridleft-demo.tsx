"use client";

import { MotionGrid } from "@/components/ui/motion-grid";

export default function MotionGridDemo() {
  return (
    <MotionGrid
      direction="left"
      speed="3s"
      opacity={0.15}
      enableGlow={true}
      lineColor="20, 184, 166"
      className="relative h-[400px] w-full flex flex-col items-center justify-center"
    >
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        MotionGrid, <br /> Background.
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        gliding right, setting the path.
      </p>
    </MotionGrid>
  );
}
