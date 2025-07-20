"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextGenerateProps {
  text: string;
  className?: string;
  textClassName?: string;
  blurEffect?: boolean;
  speed?: number;
  highlightWords?: string[];
  highlightClassName?: string;
  linkWords?: string[];
  linkHrefs?: string[];
  linkClassNames?: string[];
}

export const AnimatedTextGenerate = ({
  text,
  className,
  textClassName,
  blurEffect = true,
  speed = 0.5,
  highlightWords = [],
  highlightClassName,
  linkWords = [],
  linkHrefs = [],
  linkClassNames = [],
}: AnimatedTextGenerateProps) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const splitWords = text.split(" ");

  useEffect(() => {
    setVisibleCount(0);
    const intervalId = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= splitWords.length) {
          clearInterval(intervalId);
          return prev;
        }
        return prev + 1;
      });
    }, Math.max(speed * 200, 100));
    return () => clearInterval(intervalId);
  }, [text, speed, splitWords.length]);

  const generateWords = () => {
    return (
      <div className="flex flex-wrap items-center gap-1">
        {splitWords.map((word, idx) => {
          const isVisible = idx < visibleCount;
          const remaining = splitWords.length - visibleCount;
          let capsuleCount = 4;
          if (remaining <= 2) capsuleCount = remaining;
          else if (remaining <= 4) capsuleCount = Math.min(3, remaining);
          else if (visibleCount === 0) capsuleCount = 2;
          else if (visibleCount < 3) capsuleCount = 3;

          const isUpcoming =
            idx >= visibleCount && idx < visibleCount + capsuleCount;
          const isHighlight =
            highlightWords.length > 0 &&
            highlightWords.some((hw) =>
              word.toLowerCase().includes(hw.toLowerCase())
            );
          const linkIndex = linkWords.findIndex((lw) =>
            word.toLowerCase().includes(lw.toLowerCase())
          );
          const isLink = linkIndex !== -1;

          if (isVisible) {
            const wordElement = (
              <motion.span
                key={`${word}-${idx}`}
                initial={{
                  opacity: 0,
                  filter: blurEffect ? "blur(10px)" : "none",
                }}
                animate={{
                  opacity: 1,
                  filter: blurEffect ? "blur(0px)" : "none",
                }}
                transition={{
                  duration: speed * 0.3,
                  ease: "easeOut",
                }}
                className={cn(
                  "dark:text-white text-black",
                  isHighlight && highlightClassName
                )}
              >
                {word}
              </motion.span>
            );

            if (isLink && linkHrefs[linkIndex]) {
              return (
                <Link
                  href={linkHrefs[linkIndex]}
                  key={`link-${idx}`}
                  className={cn(linkClassNames[linkIndex])}
                >
                  {wordElement}
                </Link>
              );
            }
            return wordElement;
          }

          if (isUpcoming) {
            return (
              <motion.div
                key={`placeholder-${idx}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.4, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="bg-black dark:bg-gray-600 rounded-full"
                style={{
                  width: `${Math.max(word.length * 0.7, 2.5)}em`,
                  height: "0.9em",
                  display: "inline-block",
                }}
              />
            );
          }

          return null;
        })}
      </div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div
          className={cn(
            "dark:text-white text-black text-2xl leading-snug tracking-wide",
            textClassName
          )}
        >
          {generateWords()}
        </div>
      </div>
    </div>
  );
};
