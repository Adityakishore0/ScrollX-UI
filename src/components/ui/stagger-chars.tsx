"use client";
import * as React from "react";
import {
  AnimatePresence,
  motion,
  type Variants,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface StaggerCharsProps {
  text: string;
  hoverText?: string;
  delay?: number;
  duration?: number;
  className?: string;
  hoverClassName?: string;
  direction?: "up" | "down" | "alternate";
  easing?: number[];
  disabled?: boolean;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
}

const useProcessedChars = (text: string, hoverText?: string) =>
  React.useMemo(() => {
    const base = text.split("");
    const hover = (hoverText ?? text).split("");
    const max = Math.max(base.length, hover.length);

    return {
      safeBase: Array.from({ length: max }, (_, i) => base[i] ?? " "),
      safeHover: Array.from({ length: max }, (_, i) => hover[i] ?? " "),
    };
  }, [text, hoverText]);

const useIsTouchDevice = () => {
  const [isTouch, setIsTouch] = React.useState(false);

  React.useEffect(() => {
    const check = () =>
      setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isTouch;
};

const getInitialY = (
  direction: StaggerCharsProps["direction"],
  isEven: boolean
) => {
  switch (direction) {
    case "up":
      return "0%";
    case "down":
      return "-50%";
    case "alternate":
    default:
      return isEven ? "-50%" : "0%";
  }
};

const getTargetY = (
  direction: StaggerCharsProps["direction"],
  isEven: boolean
) => {
  switch (direction) {
    case "up":
      return "-50%";
    case "down":
      return "0%";
    case "alternate":
    default:
      return isEven ? "0%" : "-50%";
  }
};

const StaggerChars = React.memo<StaggerCharsProps>(
  ({
    text,
    hoverText,
    hoverClassName,
    delay = 0.05,
    duration = 1,
    className,
    direction = "alternate",
    easing = [0.22, 1, 0.36, 1],
    disabled = false,
    onAnimationStart,
    onAnimationComplete,
  }) => {
    const { safeBase, safeHover } = useProcessedChars(text, hoverText);
    const prefersReducedMotion = useReducedMotion();
    const isTouchDevice = useIsTouchDevice();

    const [isHovered, setIsHovered] = React.useState(false);
    const [isAutoAnimating, setIsAutoAnimating] = React.useState(false);
    const intervalRef = React.useRef<NodeJS.Timeout>();

    React.useEffect(() => {
      if (!isTouchDevice || disabled) return;
      const timeout = setTimeout(() => {
        setIsAutoAnimating(true);
        onAnimationStart?.();
        intervalRef.current = setInterval(
          () => setIsAutoAnimating((prev) => !prev),
          2000
        );
      }, 1000);

      return () => {
        clearTimeout(timeout);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, [isTouchDevice, disabled, onAnimationStart]);

    const containerVariants: Variants = {
      initial: {},
      hover: {
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : delay,
        },
      },
      exit: {},
    };

    const stackVariants: Variants = {
      initial: ({ isEven }: { index: number; isEven: boolean }) =>
        prefersReducedMotion
          ? { y: "0%" }
          : { y: getInitialY(direction, isEven) },
      hover: ({ index, isEven }: { index: number; isEven: boolean }) =>
        prefersReducedMotion
          ? { y: "0%" }
          : {
              y: getTargetY(direction, isEven),
              transition: {
                duration,
                delay: index * delay,
                ease: easing,
              },
            },
      exit: ({ isEven }: { index: number; isEven: boolean }) =>
        prefersReducedMotion
          ? { y: "0%" }
          : { y: getInitialY(direction, isEven) },
    };

    const handleHoverStart = () => {
      if (disabled || isTouchDevice) return;
      setIsHovered(true);
      onAnimationStart?.();
    };

    const handleHoverEnd = () => {
      if (disabled || isTouchDevice) return;
      setIsHovered(false);
      onAnimationComplete?.();
    };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          className={cn(
            "relative h-fit uppercase text-black dark:text-white leading-none",
            "select-none transform-gpu will-change-transform",
            !disabled && "cursor-pointer",
            className
          )}
          variants={containerVariants}
          initial="initial"
          exit="exit"
          whileHover={disabled || isTouchDevice ? undefined : "hover"}
          animate={
            isTouchDevice && !disabled
              ? isAutoAnimating
                ? "hover"
                : "initial"
              : undefined
          }
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
                key={index}
                className="inline-block h-[1em] align-baseline overflow-hidden transform-gpu will-change-transform relative"
                style={{ lineHeight: 1 }}
                aria-hidden="true"
              >
                <motion.span
                  className="block relative"
                  variants={stackVariants}
                  custom={{ index, isEven }}
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "translateZ(0)",
                    lineHeight: 1,
                  }}
                >
                  {isEven && (
                    <span
                      className={cn(
                        "block h-[1em] leading-none",
                        hoverClassName
                      )}
                      style={{ lineHeight: 1 }}
                    >
                      {isSpace ? "\u00A0" : nextChar}
                    </span>
                  )}
                  <span
                    className="block h-[1em] leading-none"
                    style={{ lineHeight: 1 }}
                  >
                    {isSpace ? "\u00A0" : char}
                  </span>
                  {!isEven && (
                    <span
                      className={cn(
                        "block h-[1em] leading-none",
                        hoverClassName
                      )}
                      style={{ lineHeight: 1 }}
                    >
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
export type { StaggerCharsProps };
export default StaggerChars;
