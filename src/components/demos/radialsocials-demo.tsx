"use client";

import {
  RadialSocials,
  RadialSocialsContent,
  RadialCircular,
  RadialIcon,
} from "@/components/ui/radial-socials";
import {
  Sparkles,
  Code,
  Palette,
  Zap,
  Layers,
  LayoutGrid,
  Terminal,
  Flame,
} from "lucide-react";

export default function RadialSocialsDemo() {
  return (
    <div className="w-[300px] h-[300px] rounded-2xl bg-white dark:bg-neutral-950 relative shadow-2xl overflow-hidden">
      <div className="absolute top-0 right-0 w-[240px] h-[240px] rounded-full bg-neutral-100/20 dark:bg-neutral-800/20 blur-3xl"></div>
      <div className="relative z-10 flex flex-col h-full justify-between p-5">
        <div>
          <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white leading-snug">
            ScrollX UI
          </h2>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400 text-sm max-w-xs">
            skip the drama, your UI comes pre-cooked, cooler than your deadlines
            and faster than your coffee break
          </p>
        </div>
      </div>
      <div className="absolute -bottom-10 -right-10">
        <RadialSocials
          animationDelay={200}
          expandDuration={600}
          className="w-[200px] h-[120px]"
        >
          <RadialSocialsContent>
            <RadialCircular radius={70} duration={20} startAngle={39}>
              <RadialIcon icon={<Zap className="w-5 h-5" />} />
              <RadialIcon icon={<Sparkles className="w-5 h-5" />} />
              <RadialIcon icon={<Terminal className="w-5 h-5" />} />
              <RadialIcon icon={<Palette className="w-5 h-5" />} />
            </RadialCircular>
            <RadialCircular radius={120} duration={40} startAngle={70}>
              <RadialIcon icon={<Code className="w-5 h-5" />} />
              <RadialIcon icon={<LayoutGrid className="w-5 h-5" />} />
              <RadialIcon icon={<Layers className="w-5 h-5" />} />
              <RadialIcon icon={<Flame className="w-5 h-5" />} />
            </RadialCircular>
          </RadialSocialsContent>
        </RadialSocials>
      </div>
    </div>
  );
}
