"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BeamsUpstream = React.memo(
  ({ className }: { className?: string }) => {
    const generatePaths = () => {
      const paths: string[] = [];
      const screenSections = 12;

      for (let section = 0; section < screenSections; section++) {
        const baseX = (section * 100) / (screenSections - 1);
        for (let variation = 0; variation < 4; variation++) {
          const startX = baseX + (Math.random() - 0.5) * 15;
          const midX1 = startX + (Math.random() - 0.5) * 20;
          const midX2 = startX + (Math.random() - 0.5) * 25;
          const endX = startX + (Math.random() - 0.5) * 30;
          const path = `M${startX} 100C${startX} 100 ${midX1} 75 ${midX1} 50C${midX1} 50 ${midX2} 25 ${midX2} 12C${midX2} 12 ${endX} 5 ${endX} 0`;
          paths.push(path);
          const altPath = `M${startX} 100C${startX} 100 ${
            startX + 5
          } 80 ${midX1} 60C${midX1} 60 ${midX2} 35 ${midX2} 15C${midX2} 15 ${endX} 3 ${endX} -2`;
          paths.push(altPath);
        }
      }

      return paths;
    };

    const paths = generatePaths();

    return (
      <div
        className={cn(
          "absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden",
          className
        )}
      >
        <svg
          className="pointer-events-none absolute z-0 h-full w-full"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <rect
            width="100%"
            height="100%"
            fill="url(#backgroundGradient)"
            opacity="0.1"
          />

          <g opacity="0.2">
            {paths.map((path, index) => (
              <path
                key={`static-path-${index}`}
                d={path}
                stroke="url(#staticGradient)"
                strokeOpacity="0.3"
                strokeWidth="0.2"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>

          {paths.map((path, index) => (
            <motion.path
              key={`path-${index}`}
              d={path}
              stroke={`url(#flowingGradient-${index % 20})`}
              strokeOpacity="0.8"
              strokeWidth="0.3"
              fill="none"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: Math.random() * 3 + 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                delay: Math.random() * 4,
              }}
            />
          ))}

          {paths.slice(0, 20).map((path, index) => (
            <motion.circle
              key={`particle-${index}`}
              r="0.3"
              fill={`url(#particleGradient-${index % 10})`}
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{
                duration: Math.random() * 8 + 6,
                ease: "linear",
                repeat: Infinity,
                delay: Math.random() * 6,
              }}
              style={{
                offsetPath: `path('${path}')`,
                offsetRotate: "0deg",
              }}
            />
          ))}

          <defs>
            <radialGradient
              id="backgroundGradient"
              cx="50%"
              cy="80%"
              r="60%"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
            </radialGradient>

            <linearGradient
              id="staticGradient"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.4" />
            </linearGradient>

            {Array.from({ length: 20 }).map((_, index) => (
              <motion.linearGradient
                key={`flowingGradient-${index}`}
                id={`flowingGradient-${index}`}
                x1="0%"
                y1="100%"
                x2="0%"
                y2="0%"
                gradientUnits="objectBoundingBox"
                initial={{
                  y1: "100%",
                  y2: "90%",
                }}
                animate={{
                  y1: ["100%", "0%"],
                  y2: ["90%", "-10%"],
                }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  ease: "linear",
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              >
                <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0" />
                <stop offset="30%" stopColor="#3B82F6" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#8B5CF6" stopOpacity="1" />
                <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
              </motion.linearGradient>
            ))}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
    );
  }
);

BeamsUpstream.displayName = "BeamsUpstream";
