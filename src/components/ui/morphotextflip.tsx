"use client";
import React, { useState, useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cn = (...classes: (string | undefined | null | false)[]): string =>
  classes.filter(Boolean).join(" ");

export interface MorphoTextFlipProps {
  words?: string[];
  interval?: number;
  className?: string;
  textClassName?: string;
  animationDuration?: number;
  animationType?: "slideUp" | "fadeScale" | "flipY" | "slideRotate" | "elastic";
}

export function MorphoTextFlip({
  words = ["remarkable", "bold", "scalable", "beautiful"],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
  animationType = "slideUp",
}: MorphoTextFlipProps) {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState("auto");
  const textRef = React.useRef<HTMLDivElement>(null);
  const measureRef = React.useRef<HTMLDivElement>(null);

  const updateWidthForWord = () => {
    if (measureRef.current) {
      const textWidth = measureRef.current.scrollWidth + 48;
      setWidth(`${textWidth}px`);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      updateWidthForWord();
    }, 10);
    return () => clearTimeout(timer);
  }, [currentWordIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);
    return () => clearInterval(intervalId);
  }, [words, interval]);

  const animationVariants = {
    slideUp: {
      initial: { y: 40, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -40, opacity: 0 },
    },
    fadeScale: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 1.2, opacity: 0 },
    },
    flipY: {
      initial: { rotateY: 90, opacity: 0 },
      animate: { rotateY: 0, opacity: 1 },
      exit: { rotateY: -90, opacity: 0 },
    },
    slideRotate: {
      initial: { x: 100, rotate: 10, opacity: 0 },
      animate: { x: 0, rotate: 0, opacity: 1 },
      exit: { x: -100, rotate: -10, opacity: 0 },
    },
    elastic: {
      initial: { scale: 0, rotate: -180 },
      animate: { scale: 1, rotate: 0 },
      exit: { scale: 0, rotate: 180 },
    },
  };

  const currentVariant = animationVariants[animationType];
  const duration = animationDuration / 1000;

  return (
    <motion.div
      layout
      layoutId={`words-container-${id}`}
      animate={{ width }}
      transition={{
        duration: duration * 0.4,
        ease: "easeInOut",
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className={cn(
        "relative inline-block overflow-hidden rounded-2xl px-6 pt-2 pb-3",
        "backdrop-blur-sm border border-gray-200 shadow-xl",
        "bg-white/70 dark:bg-slate-800/70",
        "dark:border-slate-700",
        className
      )}
    >
      <div className="relative flex items-center justify-center">
        <div
          ref={measureRef}
          className={cn(
            "absolute opacity-0 pointer-events-none whitespace-nowrap",
            "text-4xl font-bold md:text-7xl",
            textClassName
          )}
          style={{ top: -9999 }}
        >
          {words[currentWordIndex]}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={words[currentWordIndex]}
            initial={currentVariant.initial}
            animate={currentVariant.animate}
            exit={currentVariant.exit}
            transition={{
              duration: duration * 0.6,
              ease:
                animationType === "elastic"
                  ? [0.68, -0.55, 0.265, 1.55]
                  : "easeInOut",
            }}
            className={cn(
              "text-4xl font-bold text-rose-600 dark:text-rose-400 md:text-7xl  whitespace-nowrap",
              textClassName
            )}
            ref={textRef}
          >
            {words[currentWordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
