"use client";
import * as React from "react";

import { ScrollAreaPro } from "@/components/ui/scroll-areapro";
import { SeparatorPro } from "@/components/ui/seperatorpro";

const words = [
  "Dream",
  "Focus",
  "Build",
  "Learn",
  "Create",
  "Inspire",
  "Explore",
  "Grow",
  "Adapt",
  "Shine",
  "Lead",
  "Imagine",
  "Evolve",
  "Balance",
  "Persist",
  "Win",
  "Reflect",
  "Rise",
  "Change",
  "Thrive",
];

export default function ScrollAreaProDemo() {
  return (
    <ScrollAreaPro
      className="h-72 w-48 rounded-md border"
      showProgress="vertical"
    >
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Words</h4>
        {words.map((word) => (
          <React.Fragment key={word}>
            <div className="text-sm">{word}</div>
            <SeparatorPro className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollAreaPro>
  );
}
