"use client";

import Link from "next/link";
import { SpotlightCard } from "@/components/ui/spotlightcard";
import { Button } from "@/components/ui/button";
import Typeanimation from "@/components/ui/typeanimation";

export default function GithubStarSpotlightCard() {
  return (
    <SpotlightCard
      spotlightColor="255, 214, 10"
      className="w-[220px] h-[240px] bg-surface text-surface-foreground shadow-sm border border-border"
    >
      <div className="flex flex-col justify-between h-full w-full px-3">
        <div className="space-y-3">
          <Link
            href="https://x.com/scrollx_ui"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-semibold underline-offset-4 hover:underline"
          >
            ScrollX UI
          </Link>
          <p className="text-sm leading-relaxed text-muted-foreground">
            An open-source library available on GitHub — contribute or star the
            repo to support it.
          </p>
        </div>
        <Link
          href="https://github.com/Adityakishore0/ScrollX-UI"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4"
        >
          <Button className="px-3 py-1.5 h-auto text-xs font-medium bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-2">
            <Typeanimation
              words={["Star Now", "Contribute"]}
              typingSpeed="slow"
              deletingSpeed="slow"
              pauseDuration={2000}
              gradientFrom=""
              gradientTo=""
              className="text-white dark:text-black font-semibold"
            />
          </Button>
        </Link>
      </div>
    </SpotlightCard>
  );
}
