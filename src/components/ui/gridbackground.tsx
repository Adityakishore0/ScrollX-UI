"use client";
import React from "react";

interface GridBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export default function GridBackground({
  className,
  children,
}: GridBackgroundProps) {
  return (
    <div
      className={`relative h-[30rem] md:h-screen w-full bg-white dark:bg-black overflow-hidden ${
        className ?? ""
      }`}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 h-1/2 w-[325vw] left-[-98vw] md:w-full md:left-4">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <g>
              {[...Array(15)].map((_, i) => {
                const x = `${i * 7}%`;
                return (
                  <line
                    key={x}
                    x1={x}
                    y1="0%"
                    x2={x}
                    y2="40%"
                    stroke="#9ca3af"
                    strokeWidth="1"
                  />
                );
              })}
            </g>
            <g>
              <line
                x1="0%"
                y1="0%"
                x2="98%"
                y2="0%"
                stroke="#9ca3af"
                strokeWidth="1"
              />
              <line
                x1="0%"
                y1="13.33%"
                x2="98%"
                y2="13.33%"
                stroke="#9ca3af"
                strokeWidth="1"
              />
            </g>
            <g>
              {[...Array(15)].map((_, i) => {
                const x1 = `${i * 7}%`;
                const x2 = `${20 + i * 4}%`;
                return (
                  <line
                    key={x1}
                    x1={x1}
                    y1="40%"
                    x2={x2}
                    y2="100%"
                    stroke="#9ca3af"
                    strokeWidth="1"
                  />
                );
              })}
            </g>
            <line
              x1="0%"
              y1="40%"
              x2="98%"
              y2="40%"
              stroke="#6b7280"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="absolute bottom-0 h-1/2 w-[325vw] left-[-98vw] md:w-full md:left-4">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <g>
              {[...Array(15)].map((_, i) => {
                const x1 = `${12 + i * 5.2}%`;
                const x2 = `${i * 7}%`;
                return (
                  <line
                    key={x1}
                    x1={x1}
                    y1="24%"
                    x2={x2}
                    y2="60%"
                    stroke="#9ca3af"
                    strokeWidth="1"
                  />
                );
              })}
            </g>
            <g>
              <line
                x1="0%"
                y1="80%"
                x2="98%"
                y2="80%"
                stroke="#9ca3af"
                strokeWidth="1"
              />
            </g>
            <g>
              {[...Array(15)].map((_, i) => {
                const x = `${i * 7}%`;
                return (
                  <line
                    key={x}
                    x1={x}
                    y1="60%"
                    x2={x}
                    y2="100%"
                    stroke="#9ca3af"
                    strokeWidth="1"
                  />
                );
              })}
            </g>
          </svg>
        </div>

        <div className="absolute top-1/2 left-0 w-full h-64 -translate-y-1/2 pointer-events-none z-0 bg-gradient-to-b from-white/0 via-white to-white/0 dark:from-black/0 dark:via-black dark:to-black/0" />
      </div>

      <div className="relative z-10 w-full h-full flex items-center justify-center flex-col">
        {children}
      </div>
    </div>
  );
}
