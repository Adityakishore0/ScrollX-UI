"use client";

import { VercelCard } from "@/components/ui/vercel-card";

export default function VercelCardDemo() {
  return (
    <VercelCard
      className="w-full max-w-sm h-64 flex items-center justify-center"
      animateOnHover
      glowEffect
    >
      <div className="text-center px-6">
        <h1 className="text-2xl font-semibold text-black dark:text-white mb-3">
          Vercel Inspired Card
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          A smooth interactive card built with <b>Framer Motion</b> and{" "}
          <b>Tailwind CSS</b>.
        </p>
      </div>
    </VercelCard>
  );
}
