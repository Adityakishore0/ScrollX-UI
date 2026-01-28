"use client";

import GlobeWireframe from "@/components/ui/globe-wireframe";

export default function GlobeWireframeDemo() {
  return (
    <div className="relative w-full h-[380px] sm:h-[450px] overflow-hidden">
      <div className="relative z-10 flex flex-col items-center pt-10 sm:pt-16 text-center px-4">
        <h1 className="font-bold tracking-tight leading-tight text-3xl sm:text-5xl text-black dark:text-white">
          <span className="block">Connecting the World</span>
          <span className="block">Through Innovation</span>
        </h1>
      </div>

      <div className="absolute bottom-[-45%] sm:bottom-[-35%] left-1/2 w-[130%] sm:w-[100%] h-[100%] -translate-x-1/2">
        <GlobeWireframe
          className="w-full h-full opacity-80 sm:opacity-100"
          variant="solid"
          scale={0.9}
          rotateCities={["New York", "London", "Tokyo", "Mumbai", "Paris"]}
          rotationSpeed={3000}
          autoRotate={false}
          enableInteraction={false}
        />
      </div>
    </div>
  );
}
