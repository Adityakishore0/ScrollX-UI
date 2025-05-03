import React from "react";
import { cn } from "@/lib/utils";

type GlowingBorderCardProps = {
  title: string;
  description: string;
  fromColor: string;
  toColor: string;
};

export default function GlowingBorderCard({
  title,
  description,
  fromColor,
  toColor,
}: GlowingBorderCardProps) {
  return (
    <div className="relative group">
      <div
        className={cn(
          "absolute -inset-0.5 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt",
          `bg-gradient-to-r from-${fromColor} to-${toColor}`
        )}
      />
      <div className="relative flex items-center justify-center h-72 bg-white dark:bg-black rounded-lg p-6">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-800 dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
