"use client";
import React, { useState, useRef } from "react";
import { MousePointer } from "lucide-react";
import CursorImageTrail from "@/components/ui/cursorimagetrail";
import { Button } from "@/components/ui/button";

export default function CursorImageTrailDemo() {
  const [animationStyle, setAnimationStyle] = useState<"dynamic" | "minimal">(
    "minimal"
  );
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleAnimationStyle = () => {
    setAnimationStyle((prev) => (prev === "minimal" ? "dynamic" : "minimal"));

    if (buttonRef.current) {
      buttonRef.current.classList.add("animate-pulse-once");
      setTimeout(() => {
        buttonRef.current?.classList.remove("animate-pulse-once");
      }, 500);
    }
  };

  return (
    <CursorImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      animationStyle={animationStyle}
      images={Array.from(
        { length: 16 },
        (_, i) => `/images/active/${i + 1}.jpg`
      )}
    >
      <section className="relative grid h-screen w-full place-content-center bg-white text-black dark:bg-black dark:text-neutral-200 antialiased">
        <div className="absolute top-4 right-4 z-20">
          <Button
            ref={buttonRef}
            onClick={toggleAnimationStyle}
            className="transition-all duration-300 hover:scale-105"
          >
            {animationStyle === "minimal" ? "v2" : "v1"}
          </Button>
        </div>

        <p className="flex items-center gap-2 text-5xl font-extrabold uppercase tracking-wide transition-colors duration-500">
          <MousePointer className="w-10 h-10" />
          <span>Hover me</span>
        </p>

        <style jsx>{`
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }
          .animate-pulse-once {
            animation: pulse 0.5s ease-in-out;
          }
        `}</style>
      </section>
    </CursorImageTrail>
  );
}
