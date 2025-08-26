"use client";
import React from "react";
import { BeamsUpstream } from "@/components/ui/beams-upstream";

export default function BeamsUpstreamDemo() {
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-500 mb-4">
          Dare to Dream Big
        </h1>
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-8" />
        <p className="text-neutral-400 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
          Every great journey starts with a single step. Push past fear, chase
          your vision, and turn your dreams into reality. The world doesn&apos;t
          wait—why should you?
        </p>
      </div>
      <BeamsUpstream />
    </div>
  );
}
