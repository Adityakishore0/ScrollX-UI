"use client";
import React, { useEffect, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface Beam {
  id: number;
  x: number;
  duration: number;
}

interface BackgroundMeteorsProps {
  children?: ReactNode;
}

export default function BackgroundMeteors({
  children,
}: BackgroundMeteorsProps) {
  const [beams, setBeams] = useState<Beam[]>([]);
  const gridSize = 40;
  const totalLines = 35;

  const generateSafeGridPositions = (count: number): number[] => {
    const available: number[] = [];
    for (let i = 0; i < totalLines - 1; i++) {
      available.push(i);
    }

    const selected: number[] = [];
    while (available.length > 0 && selected.length < count) {
      const idx = Math.floor(Math.random() * available.length);
      const value = available[idx];
      selected.push(value);
      available.splice(
        0,
        available.length,
        ...available.filter((v) => Math.abs(v - value) > 1)
      );
    }

    return selected.map((line) => line * gridSize);
  };

  useEffect(() => {
    const generateBeams = () => {
      const count = Math.floor(Math.random() * 2) + 3;
      const xPositions = generateSafeGridPositions(count);

      const newBeams: Beam[] = xPositions.map((x) => ({
        id: Math.random(),
        x,
        duration: 4 + Math.random() * 1.5,
      }));

      setBeams(newBeams);

      const maxDuration = Math.max(...newBeams.map((b) => b.duration));
      setTimeout(generateBeams, (maxDuration - 0.5) * 1000);
    };

    generateBeams();
  }, []);

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-white dark:bg-black">
      <div
        className="absolute inset-0"
        style={{
          backgroundSize: `${gridSize}px ${gridSize}px`,
          backgroundImage:
            "linear-gradient(to right, #e4e4e7 1px, transparent 1px), linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)",
        }}
      />
      <div
        className="absolute inset-0 dark:block hidden"
        style={{
          backgroundSize: `${gridSize}px ${gridSize}px`,
          backgroundImage:
            "linear-gradient(to right, #262626 1px, transparent 1px), linear-gradient(to bottom, #024e6b  1px, transparent 1px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white dark:bg-black 
        [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
      />
      {beams.map((b) => (
        <motion.div
          key={b.id}
          className="absolute top-0"
          style={{ left: b.x, zIndex: 2 }}
          initial={{ y: -150 }}
          animate={{ y: "100vh" }}
          transition={{
            duration: b.duration,
            ease: "linear",
          }}
        >
          <div
            className="h-14 w-px rounded-full
              bg-gradient-to-t from-black to-transparent
              dark:from-indigo-500 dark:via-teal-500 dark:to-transparent"
            style={{ margin: "0 auto" }}
          />
        </motion.div>
      ))}

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
