"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import {
  AnimatePresence,
  motion,
  type Variants,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "relative text-primary underline-offset-4 hover:text-primary/90 group",
        success: "bg-green-600 text-white hover:bg-green-700",
        warning: "bg-yellow-500 text-black hover:bg-yellow-600",
        info: "bg-blue-500 text-white hover:bg-blue-600",
        dark: "bg-gray-800 text-white hover:bg-gray-700",
        light: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        gradient:
          "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90",
        glass:
          "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface StaggerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  text?: string;
  hoverText?: string;
  staggerDelay?: number;
  staggerDuration?: number;
  direction?: "up" | "down" | "alternate-even" | "alternate-odd";
  easing?: number[];
  disableStagger?: boolean;
}

const useProcessedChars = (text: string, hoverText?: string) =>
  React.useMemo(() => {
    const base = Array.from(text);
    const hover = Array.from(hoverText ?? text);
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

const getTargetY = (
  direction: StaggerButtonProps["direction"],
  isEven: boolean
) => {
  switch (direction) {
    case "up":
      return "-100%";
    case "down":
      return "0%";
    case "alternate-even":
      return isEven ? "-50%" : "0%";
    case "alternate-odd":
      return isEven ? "0%" : "-50%";
    default:
      return "-50%";
  }
};

const StaggerButton = React.forwardRef<HTMLButtonElement, StaggerButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      text,
      hoverText,
      staggerDelay = 0.025,
      staggerDuration = 0.4,
      direction = "down",
      easing = [0.25, 1, 0.5, 1],
      disableStagger = false,
      children,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isTapped, setIsTapped] = React.useState(false);
    const displayText =
      text ??
      React.Children.toArray(children)
        .map((c) => (typeof c === "string" ? c : ""))
        .join("") ??
      "";
    const { safeBase, safeHover } = useProcessedChars(displayText, hoverText);
    const prefersReducedMotion = useReducedMotion();
    const isTouchDevice = useIsTouchDevice();

    const containerVariants: Variants = {
      initial: {},
      hover: {
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        },
      },
      exit: {},
    };

    const stackVariants: Variants = {
      initial: { y: direction === "up" ? "0%" : "-50%" },
      hover: ({ index, isEven }: { index: number; isEven: boolean }) =>
        prefersReducedMotion
          ? { y: direction === "up" ? "0%" : "-50%" }
          : {
              y: getTargetY(direction, isEven),
              transition: {
                duration: staggerDuration,
                delay: index * staggerDelay,
                ease: easing,
              },
            },
      exit: { y: direction === "up" ? "0%" : "-50%" },
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
      if (isTouchDevice && !disableStagger) {
        setIsTapped(true);
        setTimeout(
          () => setIsTapped(false),
          staggerDuration * 1000 + safeBase.length * staggerDelay * 1000
        );
      }
      props.onTouchStart?.(e);
    };

    const shouldAnimate = disableStagger
      ? false
      : isTouchDevice
      ? isTapped
      : isHovered;

    const Comp = asChild ? Slot : motion.button;

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          className,
          "relative group"
        )}
        ref={ref}
        onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
        onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
        onTouchStart={handleTouchStart}
        {...props}
      >
        <AnimatePresence mode="wait">
          <motion.span
            className="relative h-fit leading-none select-none transform-gpu will-change-transform inline-flex"
            variants={containerVariants}
            initial="initial"
            exit="exit"
            animate={shouldAnimate ? "hover" : "initial"}
            style={{ perspective: 1000 }}
          >
            {safeBase.map((char, index) => {
              const nextChar = safeHover[index];
              const isSpace = char === " " && nextChar === " ";
              const visibleCharsBefore = safeBase
                .slice(0, index)
                .filter((c) => c !== " ").length;
              const isEven = visibleCharsBefore % 2 === 0;
              const isUp = direction === "up";

              return (
                <span
                  key={index}
                  className="inline-block h-[1em] align-baseline overflow-hidden relative"
                  style={{ lineHeight: 1 }}
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
                    {isUp ? (
                      <>
                        <span className="block h-[1em] leading-none relative">
                          {isSpace ? "\u00A0" : char}
                        </span>
                        <span className="block h-[1em] leading-none absolute top-full left-0">
                          {isSpace ? "\u00A0" : nextChar}
                        </span>
                      </>
                    ) : (
                      <>
                        {isEven && (
                          <span className="block h-[1em] leading-none">
                            {isSpace ? "\u00A0" : nextChar}
                          </span>
                        )}
                        <span className="block h-[1em] leading-none">
                          {isSpace ? "\u00A0" : char}
                        </span>
                        {!isEven && (
                          <span className="block h-[1em] leading-none">
                            {isSpace ? "\u00A0" : nextChar}
                          </span>
                        )}
                      </>
                    )}
                  </motion.span>
                </span>
              );
            })}
          </motion.span>
        </AnimatePresence>
        {variant === "link" && (
          <span className="absolute left-1/2 bottom-2 h-[1px] w-0 bg-current transition-all duration-300 group-hover:w-3/4 group-hover:-translate-x-1/2" />
        )}
      </Comp>
    );
  }
);

StaggerButton.displayName = "StaggerButton";

export { StaggerButton, buttonVariants };
export type { StaggerButtonProps };
