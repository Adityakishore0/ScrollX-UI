"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export const Gravity = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const [mounted, setMounted] = useState(false);
  const [rockets, setRockets] = useState<
    { horizontal: number; angleDeg: string; duration: string; delay: string }[]
  >([]);

  useEffect(() => {
    setMounted(true);
    const generated = new Array(number || 20).fill(true).map(() => {
      const angleDir = Math.random() < 0.5 ? -1 : 1;
      const horizontal = angleDir * (100 + Math.random() * 200);
      const vertical = -350;
      const angleRad = Math.atan2(vertical, horizontal);
      const angleDeg = `${angleRad * (180 / Math.PI)}deg`;
      const duration = `${4 + Math.random() * 3}s`;
      const delay = `${Math.random() * 3}s`;
      return { horizontal, angleDeg, duration, delay };
    });
    setRockets(generated);
  }, [number]);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none flex justify-center items-end",
        className
      )}
    >
      {rockets.map((rocket, idx) => (
        <span
          key={`gravity-${idx}`}
          className={cn(
            "absolute animate-rockets-effect h-1 w-1 rounded-full",
            "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
            "dark:from-slate-300 dark:via-slate-400 dark:to-transparent",
            "shadow-[0_0_0_1px_#ffffff10]",
            "before:absolute before:top-1/2 before:right-full before:h-[1px] before:w-[50px] before:-translate-y-1/2",
            "before:bg-gradient-to-l before:from-indigo-500 before:via-purple-500 before:to-transparent",
            "dark:before:from-slate-300 dark:before:via-slate-400 dark:before:to-transparent"
          )}
          style={
            {
              "--x": `${rocket.horizontal}px`,
              "--duration": rocket.duration,
              "--angle": rocket.angleDeg,
              left: "50%",
              bottom: "-50px",
              transform: `rotate(${rocket.angleDeg})`,
              transformOrigin: "center",
              animationDelay: rocket.delay,
            } as React.CSSProperties
          }
        />
      ))}
    </motion.div>
  );
};
