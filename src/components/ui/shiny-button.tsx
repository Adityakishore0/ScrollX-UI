"use client";

import * as React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const shinyButtonStyles = cva(
  "relative inline-flex items-center justify-center overflow-hidden rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface ShinyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof shinyButtonStyles> {
  asChild?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
  gradientOpacity?: number;
  gradientAngle?: number;
}

export const ShinyButton = React.forwardRef<
  HTMLButtonElement,
  ShinyButtonProps
>(
  (
    {
      asChild = false,
      size = "default",
      className,
      children,
      gradientFrom = "#9E7AFF",
      gradientTo = "#FE8BBB",
      gradientOpacity = 0.8,
      gradientAngle = 0,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const [isTouch, setIsTouch] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const angle = useMotionValue(gradientAngle);

    const reset = React.useCallback(() => {
      angle.set(gradientAngle);
      setIsHovered(false);
    }, [angle, gradientAngle]);

    const handlePointerMove = React.useCallback(
      (e: React.PointerEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const dx = x - rect.width / 2;
        const dy = y - rect.height / 2;
        const radians = Math.atan2(dy, dx);
        const deg = (radians * 180) / Math.PI;
        angle.set(deg);
      },
      [angle]
    );

    React.useEffect(() => {
      if (typeof window !== "undefined") {
        setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
      }
      reset();
    }, [reset]);

    return (
      <Comp
        ref={ref}
        className={cn(shinyButtonStyles({ size }))}
        onPointerEnter={!isTouch ? () => setIsHovered(true) : undefined}
        onPointerMove={!isTouch ? handlePointerMove : undefined}
        onPointerLeave={!isTouch ? reset : undefined}
        {...props}
      >
        {isTouch ? (
          <div
            className="absolute inset-0 rounded-[inherit]"
            style={{
              background: `linear-gradient(${gradientAngle}deg, ${gradientFrom}, ${gradientTo} 30%, transparent 80%)`,
              opacity: gradientOpacity,
            }}
          />
        ) : (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              background: useMotionTemplate`
                linear-gradient(${angle}deg, ${gradientFrom}, ${gradientTo} 30%, transparent 80%)
              `,
              opacity: gradientOpacity,
            }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 20,
              mass: 0.5,
            }}
          />
        )}

        <div
          className={cn(
            "absolute inset-px rounded-[inherit] bg-neutral-100 dark:bg-neutral-900",
            className
          )}
        />
        <div
          className={cn(
            "absolute inset-px rounded-[inherit] bg-neutral-200/40 dark:bg-neutral-800/60 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        />
        <span className="relative z-10">{children}</span>
      </Comp>
    );
  }
);
ShinyButton.displayName = "ShinyButton";

export { shinyButtonStyles };
