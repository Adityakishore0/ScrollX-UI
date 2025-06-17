"use client";
import { motion } from "framer-motion";
import React from "react";

interface WhiteStripesProps {
  children?: React.ReactNode;
  className?: string;
}

export default function WhiteStripes({
  children,
  className = "",
}: WhiteStripesProps) {
  const stripeCount = 15;

  return (
    <div
      className={`relative w-full h-screen bg-black dark:bg-white flex flex-col justify-start items-center overflow-hidden ${className}`}
    >
      {Array.from({ length: stripeCount }).map((_, index) => {
        const height = 30 - index * 1.5;
        const margin = index * 3;
        if (height <= 0) return null;

        const delay = index * 0.1;

        return (
          <motion.div
            key={index}
            initial={{ y: 0 }}
            animate={{
              y: [0, -5, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
            className="w-full bg-white dark:bg-black"
            style={{
              height: `${height}px`,
              marginBottom: `${margin}px`,
            }}
          />
        );
      })}

      {children && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-8">
          {children}
        </div>
      )}
    </div>
  );
}
