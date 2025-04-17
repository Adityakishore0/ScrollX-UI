"use client";

import React from "react";
import { Separator } from "@/components/ui/seperator";
import { Sparkle } from "lucide-react";

export interface StepProps {
  children: React.ReactNode;
}

export const Step = ({ children }: StepProps) => {
  return (
    <div className="relative pl-20 sm:pl-24 group">
      <div className="absolute left-10 top-0 bottom-0 w-[2px] bg-gradient-to-b from-zinc-400/50 via-zinc-300/30 to-transparent dark:from-zinc-600/70 dark:via-zinc-700/30" />

      <div className="absolute left-6 top-2 w-10 h-10 rounded-full backdrop-blur-sm bg-white/30 dark:bg-zinc-800/30 border border-white/50 dark:border-zinc-700/50 shadow-xl flex items-center justify-center transition-all group-hover:scale-105">
        <Sparkle className="w-5 h-5 text-black dark:text-white opacity-80" />
      </div>

      <div>
        <h3 className="text-base font-semibold text-foreground">{children}</h3>
        <Separator className="my-5 ml-6" />
      </div>
    </div>
  );
};

Step.displayName = "Step";
