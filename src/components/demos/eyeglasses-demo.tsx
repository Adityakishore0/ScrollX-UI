"use client";
import React from "react";
import EyeglassesFrame from "@/components/ui/eyeglasses";

export default function EyeglassesDemo() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-8">
      <EyeglassesFrame
        colorOptions={{
          black: "bg-black border-black",
          brown: "bg-amber-800 border-amber-800",
          silver: "bg-gray-400 border-gray-400",
          green: "bg-green-700 border-green-700",
          pink: "bg-pink-500 border-pink-500",
        }}
        initialColor="brown"
        className="rounded-lg"
        showColorPicker={false}
        size="md"
      />
    </div>
  );
}
