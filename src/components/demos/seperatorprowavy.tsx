"use client";
import React from "react";
import { SeparatorPro } from "@/components/ui/seperatorpro";

export default function SeperatorProDotted() {
  return (
    <div className="max-w-md mx-auto mt-10 px-4 rounded-md py-6 space-y-8">
      <div>
        <h1 className="text-xl font-bold">ScrollX UI</h1>
        <p className="text-sm text-muted-foreground mb-4">
          An open-source UI component library.
        </p>
        <SeparatorPro variant="wave" className="my-4" />
        <div className="flex items-center justify-center space-x-4 text-sm">
          <span className="hover:underline cursor-pointer">Blog</span>
          <SeparatorPro variant="wave" orientation="vertical" className="h-4" />
          <span className="hover:underline cursor-pointer">Docs</span>
          <SeparatorPro variant="wave" orientation="vertical" className="h-4" />
          <span className="hover:underline cursor-pointer">Source</span>
        </div>
      </div>
    </div>
  );
}
