"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MovingLinesBackgroundProps {
  speed?: string;
  opacity?: number;
  direction?: "left" | "right";
  blur?: string;
  className?: string;
  lineClassName?: string;
  children?: React.ReactNode;
}

export function MovingLinesBackground({
  speed = "20s",
  opacity = 0.8,
  direction = "right",
  blur = "0px",
  className,
  lineClassName,
  children,
}: MovingLinesBackgroundProps) {
  const id = React.useId();
  const directionValue = direction === "right" ? "200%" : "-200%";

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <style jsx>{`
        @keyframes lineBackgroundMove-${id} {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: ${directionValue} ${directionValue};
          }
        }
      `}</style>

      <motion.div
        style={
          {
            "--speed": speed,
            "--blur": blur,
            filter: `blur(var(--blur))`,
            opacity,
            backgroundSize: "0.6em 0.6em",
            backgroundPosition: "0 0",
            animation: `lineBackgroundMove-${id} var(--speed) linear infinite`,
          } as React.CSSProperties
        }
        className={cn(
          "absolute inset-0 z-0 transition-colors duration-500",
          "bg-[linear-gradient(45deg,transparent_45%,rgba(0,0,0,0.08)_45%,rgba(0,0,0,0.08)_55%,transparent_0)]",
          "dark:bg-[linear-gradient(45deg,transparent_45%,rgba(255,255,255,0.08)_45%,rgba(255,255,255,0.08)_55%,transparent_0)]",
          lineClassName
        )}
      />

      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
