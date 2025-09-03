"use client";
import * as React from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface StaggerCharsProps {
  text: string;
  hoverText?: string;
  delay?: number;
  duration?: number;
  className?: string;
  fromClassName?: string;
  toClassName?: string;
  direction?: "up" | "down" | "alternate";
  easing?: number[];
  disabled?: boolean;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
}

const EASING_PRESETS = {
  smooth: [0.22, 1, 0.36, 1], // ease-out
  bouncy: [0.68, -0.55, 0.265, 1.55], // overshoot
  sharp: [0.4, 0, 0.2, 1], // ease-in-out
  gentle: [0.25, 0.46, 0.45, 0.94], // ease-out-quart
  linear: [0, 0, 1, 1], // linear
  easeIn: [0.42, 0, 1, 1], // classic ease-in
  easeOut: [0, 0, 0.58, 1], // classic ease-out
  easeInOut: [0.42, 0, 0.58, 1], // classic ease-in-out
};

const useProcessedChars = (text: string, hoverText?: string) => {
  return React.useMemo(() => {
    const baseChars = text.split("");
    const hoverChars = (hoverText ?? text).split("");
    const maxLen = Math.max(baseChars.length, hoverChars.length);

    const safeBase = Array.from(
      { length: maxLen },
      (_, i) => baseChars[i] ?? " "
    );
    const safeHover = Array.from(
      { length: maxLen },
      (_, i) => hoverChars[i] ?? " "
    );

    return { safeBase, safeHover, maxLen };
  }, [text, hoverText]);
};

const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
};

const StaggerChars = React.memo<StaggerCharsProps>(
  ({
    text,
    hoverText,
    delay = 0.05,
    duration = 1,
    className,
    fromClassName,
    toClassName,
    direction = "alternate",
    easing = EASING_PRESETS.smooth,
    disabled = false,
    onAnimationStart,
    onAnimationComplete,
  }) => {
    const { safeBase, safeHover } = useProcessedChars(text, hoverText);
    const prefersReducedMotion = useReducedMotion();
    const [isHovered, setIsHovered] = React.useState(false);

    const containerVariants: Variants = React.useMemo(
      () => ({
        initial: {},
        hover: {
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : delay,
            delayChildren: 0,
          },
        },
        exit: {},
      }),
      [delay, prefersReducedMotion]
    );

    const stackVariants: Variants = React.useMemo(
      () => ({
        initial: (custom: { index: number; isEven: boolean }) => {
          if (prefersReducedMotion) return { y: "0%" };

          switch (direction) {
            case "up":
              return { y: "0%" };
            case "down":
              return { y: "-50%" };
            case "alternate":
            default:
              return { y: custom.isEven ? "-50%" : "0%" };
          }
        },
        hover: (custom: { index: number; isEven: boolean }) => {
          if (prefersReducedMotion) return { y: "0%" };

          let targetY: string;
          switch (direction) {
            case "up":
              targetY = "-50%";
              break;
            case "down":
              targetY = "0%";
              break;
            case "alternate":
            default:
              targetY = custom.isEven ? "0%" : "-50%";
              break;
          }

          return {
            y: targetY,
            transition: {
              duration: prefersReducedMotion ? 0 : duration,
              delay: prefersReducedMotion ? 0 : custom.index * delay,
              ease: easing,
            },
          };
        },
        exit: (custom: { index: number; isEven: boolean }) => {
          if (prefersReducedMotion) return { y: "0%" };

          switch (direction) {
            case "up":
              return { y: "0%" };
            case "down":
              return { y: "-50%" };
            case "alternate":
            default:
              return { y: custom.isEven ? "-50%" : "0%" };
          }
        },
      }),
      [direction, duration, delay, easing, prefersReducedMotion]
    );

    const handleHoverStart = React.useCallback(() => {
      if (disabled) return;
      setIsHovered(true);
      onAnimationStart?.();
    }, [disabled, onAnimationStart]);

    const handleHoverEnd = React.useCallback(() => {
      if (disabled) return;
      setIsHovered(false);
      onAnimationComplete?.();
    }, [disabled, onAnimationComplete]);

    return (
      <AnimatePresence mode="wait">
        <motion.div
          className={cn(
            "relative h-fit font-extrabold text-5xl md:text-6xl lg:text-8xl uppercase leading-none",
            "select-none transform-gpu will-change-transform",
            !disabled && "cursor-pointer",
            className
          )}
          variants={containerVariants}
          initial="initial"
          exit="exit"
          whileHover={disabled ? undefined : "hover"}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
          style={{ perspective: 1000 }}
          role="text"
          aria-label={text}
          aria-live={isHovered ? "polite" : undefined}
        >
          {safeBase.map((char, index) => {
            const nextChar = safeHover[index];
            const isSpace = char === " " && nextChar === " ";
            const isEven = index % 2 === 0;

            return (
              <span
                key={`char-wrapper-${index}`}
                className={cn(
                  "inline-block h-[1em] align-baseline overflow-hidden",
                  "transform-gpu will-change-transform"
                )}
                aria-hidden="true"
              >
                <motion.span
                  className="block"
                  variants={stackVariants}
                  custom={{ index, isEven }}
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "translateZ(0)",
                  }}
                >
                  {isEven && (
                    <span className={cn("block h-[1em]", toClassName)}>
                      {isSpace ? "\u00A0" : nextChar}
                    </span>
                  )}
                  <span className={cn("block h-[1em]", fromClassName)}>
                    {isSpace ? "\u00A0" : char}
                  </span>
                  {!isEven && (
                    <span className={cn("block h-[1em]", toClassName)}>
                      {isSpace ? "\u00A0" : nextChar}
                    </span>
                  )}
                </motion.span>
              </span>
            );
          })}
        </motion.div>
      </AnimatePresence>
    );
  }
);

StaggerChars.displayName = "StaggerChars";
export { EASING_PRESETS };
export type { StaggerCharsProps };
export default StaggerChars;
