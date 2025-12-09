"use client";

import { AuroraDots } from "@/components/ui/aurora-dots";

export default function AuroraDotsDemo() {
  return (
    <AuroraDots className="relative h-[400px] bg-black w-full flex flex-col items-center justify-center">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-600 to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        AuroraDots, <br /> Background.
      </h2>
    </AuroraDots>
  );
}
