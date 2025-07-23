"use client";

import { Button } from "@/components/ui/button";
import GridBackground from "@/components/ui/gridbackground";

export default function GridBackgroundDemo() {
  return (
    <GridBackground className="flex items-center justify-center w-full flex-col px-6">
      <div className="relative z-10 max-w-2xl text-center space-y-5 pt-16 md:pt-24">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-white">
          Build Beyond Boundaries
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg leading-relaxed">
          A modern, flexible component library designed to help you ship faster.
          Beautifully crafted, accessible components built for exceptional
          developer experience.
        </p>
        <div className="flex justify-center gap-4 pt-6">
          <Button variant="default" size="lg">
            Docs
          </Button>
          <Button variant="outline" size="lg">
            Explore Components
          </Button>
        </div>
      </div>
    </GridBackground>
  );
}
