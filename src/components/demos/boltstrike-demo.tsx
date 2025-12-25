"use client";

import { BoltStrike } from "@/components/ui/bolt-strike";

export default function BoltStrikeDemo() {
  return (
    <BoltStrike
      color="#7c3aed"
      intensity={1}
      className="relative h-[400px] w-full flex flex-col items-center justify-center"
    >
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Bolt Animation, <br /> Background.
      </h2>
    </BoltStrike>
  );
}
