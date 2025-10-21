"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Clock: React.FC<{ className?: string; children?: React.ReactNode }> = ({
  className,
  children,
}) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  const hourDuration = isMobile ? 30 : 20;
  const minuteDuration = isMobile ? 15 : 10;
  const secondDuration = isMobile ? 6 : 3;

  return (
    <div className={cn("w-full", className)}>
      <motion.div
        className="absolute w-[min(24rem,80vw)] h-[min(24rem,80vw)] rounded-full blur-3xl"
        animate={{
          background: [
            "radial-gradient(circle at 30% 50%, rgba(234, 88, 12, 0.2), transparent 40%)",
            "radial-gradient(circle at 70% 50%, rgba(59, 130, 246, 0.2), transparent 40%)",
          ],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <div className="relative w-full max-w-[24rem] aspect-square p-4 sm:p-8 z-10">
        <div className="relative w-full h-full rounded-full flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full rounded-full"
          >
            <defs>
              <linearGradient id="metalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e8e8e8" />
                <stop offset="50%" stopColor="#b0b0b0" />
                <stop offset="100%" stopColor="#949494" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="url(#metalGrad)"
              stroke="url(#metalGrad)"
              strokeWidth="2"
            />
          </svg>
          <div
            className="absolute inset-[3%] rounded-full bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-inner"
            style={{
              boxShadow:
                "inset 0 6px 30px rgba(0,0,0,0.95), inset 0 -2px 15px rgba(255,255,255,0.05)",
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background: `conic-gradient(
                  from 0deg,
                  transparent 0deg,
                  rgba(234, 88, 12, 0) 30deg,
                  rgba(234, 88, 12, 0.8) 90deg,
                  rgba(234, 88, 12, 0.9) 120deg,
                  rgba(234, 88, 12, 0) 180deg,
                  transparent 210deg,
                  rgba(59, 130, 246, 0) 240deg,
                  rgba(59, 130, 246, 0.8) 300deg,
                  rgba(59, 130, 246, 0.9) 330deg,
                  rgba(59, 130, 246, 0) 360deg
                )`,
              }}
            />

            <div
              className="absolute inset-[16%] rounded-full bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center"
              style={{
                boxShadow:
                  "0 0 40px rgba(0,0,0,0.8), inset 0 2px 10px rgba(255,255,255,0.03)",
              }}
            >
              {children}
            </div>

            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 origin-bottom"
                style={{
                  height: "45%",
                  transform: `translate(-50%, -100%) rotate(${i * 30}deg)`,
                }}
              >
                <div
                  className="w-[0.25rem] h-[0.75rem] bg-gradient-to-b from-gray-400 to-gray-600 mx-auto rounded-full shadow-sm"
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(0,0,0,0.5), 0 0 4px rgba(255,255,255,0.1)",
                  }}
                />
              </div>
            ))}

            {[...Array(60)].map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 origin-bottom"
                style={{
                  height: "45%",
                  transform: `translate(-50%, -100%) rotate(${i * 6}deg)`,
                }}
              >
                {i % 5 !== 0 && (
                  <div className="w-px h-[0.25rem] bg-gray-700 mx-auto opacity-50" />
                )}
              </div>
            ))}

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                <motion.div
                  className="absolute left-1/2 bottom-1/2 origin-bottom"
                  style={{
                    width: "clamp(6px, 1.5vw, 8px)",
                    height: "28%",
                    marginLeft: "calc(clamp(6px, 1.5vw, 8px) / -2)",
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.6))",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: hourDuration,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div
                    className="w-full h-full bg-gradient-to-b from-gray-300 via-gray-400 to-gray-600 rounded-full"
                    style={{
                      clipPath: "polygon(40% 0%, 60% 0%, 55% 100%, 45% 100%)",
                      boxShadow:
                        "inset 0 1px 2px rgba(255,255,255,0.3), inset 0 -1px 2px rgba(0,0,0,0.3)",
                    }}
                  />
                </motion.div>
                <motion.div
                  className="absolute left-1/2 bottom-1/2 origin-bottom"
                  style={{
                    width: "clamp(5px, 1.2vw, 6px)",
                    height: "38%",
                    marginLeft: "calc(clamp(5px, 1.2vw, 6px) / -2)",
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.6))",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: minuteDuration,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div
                    className="w-full h-full bg-gradient-to-b from-gray-200 via-gray-300 to-gray-500 rounded-full"
                    style={{
                      clipPath: "polygon(40% 0%, 60% 0%, 55% 100%, 45% 100%)",
                      boxShadow:
                        "inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -1px 2px rgba(0,0,0,0.3)",
                    }}
                  />
                </motion.div>

                <motion.div
                  className="absolute left-1/2 bottom-1/2 origin-bottom"
                  style={{
                    width: "clamp(2px, 0.6vw, 3px)",
                    height: "42%",
                    marginLeft: "calc(clamp(2px, 0.6vw, 3px) / -2)",
                    filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.7))",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: secondDuration,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div
                    className="w-full h-full bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 rounded-full"
                    style={{
                      boxShadow: "inset 0 0.5px 1px rgba(255,255,255,0.4)",
                    }}
                  />
                </motion.div>
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(1rem,4vw,1.25rem)] h-[clamp(1rem,4vw,1.25rem)] bg-gradient-to-br from-gray-300 via-gray-400 to-gray-600 rounded-full shadow-lg"
                  style={{
                    boxShadow:
                      "0 2px 8px rgba(0,0,0,0.8), inset 0 1px 2px rgba(255,255,255,0.3), inset 0 -1px 2px rgba(0,0,0,0.3)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clock;
