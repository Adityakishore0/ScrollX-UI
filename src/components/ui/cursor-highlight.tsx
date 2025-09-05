"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface CursorHighlightProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
  gradient?: string;
  direction?: "left" | "right" | "top" | "bottom";
  animate?: boolean;
  duration?: number;
  showPointer?: boolean;
  pointerDuration?: number;
  pointerClassName?: string;
  containerClassName?: string;
  rectangle?: boolean | string;
}

const Pointer = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
  </svg>
);

interface PointerAnim {
  initial: { x: number; y: number; rotate: number };
  animate: { x: number; y: number; rotate: number };
}

export function CursorHighlight({
  text,
  children,
  className,
  gradient = "from-purple-800 via-purple-600 to-purple-800",
  direction = "left",
  animate = false,
  duration = 2,
  showPointer = false,
  pointerDuration = 1,
  pointerClassName,
  containerClassName,
  rectangle = false,
}: CursorHighlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3, once: false });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const element = containerRef.current;
    if (element) {
      const { width, height } = element.getBoundingClientRect();
      setDimensions({ width, height });
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    if (element) resizeObserver.observe(element);
    return () => {
      if (element) resizeObserver.unobserve(element);
    };
  }, [text, children]);

  useEffect(() => {
    if (!isInView) {
      const timeout = setTimeout(() => setResetKey((k) => k + 1), 200);
      return () => clearTimeout(timeout);
    }
  }, [isInView]);

  const content = text || children;
  const hasCustomTextColor =
    className &&
    className.includes("text-") &&
    (className.includes("dark:text-") || !className.includes("dark:"));

  const defaultTextColors = hasCustomTextColor
    ? ""
    : "text-black dark:text-white";

  const getPointerAnimation = (): PointerAnim => {
    const startOffset = 15;
    const endOffset = 5;
    const yPos = dimensions.height / 2;

    switch (direction) {
      case "left":
        return {
          initial: { x: -startOffset, y: yPos, rotate: 275 },
          animate: { x: dimensions.width + endOffset, y: yPos, rotate: 275 },
        };
      case "right":
        return {
          initial: { x: dimensions.width + startOffset, y: yPos, rotate: 5 },
          animate: { x: -20, y: yPos, rotate: 5 },
        };
      case "top":
        return {
          initial: { x: -startOffset, y: yPos, rotate: 275 },
          animate: { x: dimensions.width + endOffset, y: yPos, rotate: 275 },
        };
      case "bottom":
        return {
          initial: { x: -startOffset, y: yPos, rotate: 275 },
          animate: { x: dimensions.width + endOffset, y: yPos, rotate: 275 },
        };
      default:
        return {
          initial: { x: -startOffset, y: yPos, rotate: 275 },
          animate: { x: dimensions.width + endOffset, y: yPos, rotate: 275 },
        };
    }
  };

  const delay = showPointer ? pointerDuration + 0.2 : 0.2;

  const directionStyles: Record<
    "left" | "right" | "top" | "bottom",
    {
      initial: { clipPath: string };
      animate: { clipPath: string };
      transition: { duration: number; ease: "easeInOut"; delay: number };
    }
  > = {
    left: {
      initial: { clipPath: "inset(0 100% 0 0)" },
      animate: {
        clipPath: isInView ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
      },
      transition: { duration, ease: "easeInOut", delay },
    },
    right: {
      initial: { clipPath: "inset(0 0 0 100%)" },
      animate: {
        clipPath: isInView ? "inset(0 0 0 0%)" : "inset(0 0 0 100%)",
      },
      transition: { duration, ease: "easeInOut", delay },
    },
    top: {
      initial: { clipPath: "inset(100% 0 0 0)" },
      animate: {
        clipPath: isInView ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
      },
      transition: { duration, ease: "easeInOut", delay },
    },
    bottom: {
      initial: { clipPath: "inset(0 0 100% 0)" },
      animate: {
        clipPath: isInView ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
      },
      transition: { duration, ease: "easeInOut", delay },
    },
  };

  const pointerAnimation = getPointerAnimation();
  const gradientClass = `bg-gradient-to-r ${gradient}`;

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block", containerClassName)}
    >
      {rectangle && dimensions.width > 0 && dimensions.height > 0 && (
        <motion.div
          className={cn(
            "absolute z-10 pointer-events-none",
            "border border-neutral-800 dark:border-neutral-200 bg-transparent",
            typeof rectangle === "string" ? rectangle : ""
          )}
          style={{
            left: direction === "right" ? "auto" : 0,
            right: direction === "right" ? 0 : "auto",
          }}
          initial={{ width: 0, height: dimensions.height }}
          animate={
            isInView
              ? { width: dimensions.width, height: dimensions.height }
              : { width: 0, height: dimensions.height }
          }
          transition={{ duration: pointerDuration, ease: "easeInOut" }}
        />
      )}

      <div className="relative z-40">
        <span className={cn(defaultTextColors, "relative z-20", className)}>
          {content}
        </span>

        <motion.span
          key={resetKey}
          className={cn(
            "absolute inset-0 bg-clip-text text-transparent z-30",
            gradientClass,
            className
          )}
          initial={directionStyles[direction].initial}
          animate={directionStyles[direction].animate}
          transition={directionStyles[direction].transition}
        >
          {content}
        </motion.span>
      </div>

      {showPointer && dimensions.width > 0 && dimensions.height > 0 && (
        <motion.div
          className="pointer-events-none absolute z-40"
          initial={{ opacity: 0, ...pointerAnimation.initial }}
          animate={
            isInView
              ? { opacity: 1, ...pointerAnimation.animate }
              : { opacity: 0 }
          }
          transition={{
            duration: pointerDuration,
            ease: "easeInOut",
            opacity: { duration: 0.2, ease: "easeInOut" },
          }}
        >
          <Pointer className={cn("h-4 w-4 text-blue-500", pointerClassName)} />
        </motion.div>
      )}
    </div>
  );
}
