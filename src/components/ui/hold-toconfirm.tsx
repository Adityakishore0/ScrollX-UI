"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants, type ButtonProps } from "@/components/ui/button";

interface HoldToConfirmProps extends Omit<ButtonProps, "asChild"> {
  asChild?: boolean;
  duration?: number;
  onConfirm?: () => void;
  animation?: "border" | "fill";
  fillClassName?: string;
  confirmedChildren?: React.ReactNode;
  confirmedClassName?: string;
  resetAfter?: number;
  showProgressOnConfirm?: boolean;
}

const HoldToConfirm = React.forwardRef<HTMLButtonElement, HoldToConfirmProps>(
  (
    {
      duration = 2000,
      onConfirm,
      animation = "fill",
      variant,
      size,
      className,
      fillClassName,
      confirmedChildren,
      confirmedClassName,
      resetAfter = 2000,
      showProgressOnConfirm = false,
      asChild = false,
      children = "Hold to confirm",
      ...props
    },
    ref
  ) => {
    const [confirmed, setConfirmed] = React.useState(false);
    const textRef = React.useRef<HTMLSpanElement>(null);

    const progress = useMotionValue(0);
    const controlsRef = React.useRef<ReturnType<typeof animate> | null>(null);
    const holdTimerRef = React.useRef<NodeJS.Timeout | null>(null);
    const resetTimerRef = React.useRef<NodeJS.Timeout | null>(null);

    const resetHold = (smooth: boolean) => {
      controlsRef.current?.stop();
      if (smooth) {
        controlsRef.current = animate(progress, 0, {
          duration: 0.3,
          ease: "easeOut",
        });
      } else {
        progress.set(0);
      }
    };

    const startHold = () => {
      if (confirmed) return;

      controlsRef.current = animate(progress, 1, {
        duration: duration / 1000,
        ease: "linear",
      });

      holdTimerRef.current = setTimeout(() => {
        setConfirmed(true);
        onConfirm?.();

        if (!showProgressOnConfirm) {
          resetHold(false);
        } else {
          controlsRef.current?.stop();
          progress.set(1);
        }

        if (resetAfter > 0) {
          resetTimerRef.current = setTimeout(() => {
            setConfirmed(false);
            resetHold(true);
          }, resetAfter);
        }
      }, duration);
    };

    const cancelHold = () => {
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
      if (!confirmed) resetHold(true);
    };

    const width = useTransform(progress, [0, 1], ["0%", "100%"]);
    const borderClip = useTransform(
      progress,
      [0, 1],
      ["inset(0 100% 0 0 round 0.375rem)", "inset(0 0% 0 0 round 0.375rem)"]
    );

    const textProgress = useTransform(progress, (value) => {
      if (!textRef.current) return 0;

      const buttonRect = textRef.current
        .closest("button")
        ?.getBoundingClientRect();
      const textRect = textRef.current.getBoundingClientRect();

      if (!buttonRect || !textRect) return 0;

      const textStartPercent =
        (textRect.left - buttonRect.left) / buttonRect.width;
      const fillPosition = value;

      if (fillPosition <= textStartPercent) return 0;

      const textWidth = textRect.width / buttonRect.width;
      const adjustedProgress = (fillPosition - textStartPercent) / textWidth;

      return Math.min(Math.max(adjustedProgress, 0), 1);
    });

    const textWidth = useTransform(textProgress, [0, 1], ["0%", "100%"]);

    React.useEffect(() => {
      return () => {
        controlsRef.current?.stop();
        if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
        if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      };
    }, []);

    const Comp = asChild ? "span" : "button";

    return (
      <Comp
        ref={ref}
        {...props}
        onMouseDown={startHold}
        onMouseUp={cancelHold}
        onMouseLeave={cancelHold}
        onTouchStart={startHold}
        onTouchEnd={cancelHold}
        className={cn(
          "relative overflow-hidden",
          buttonVariants({ variant, size }),
          className
        )}
      >
        {animation === "fill" && (!confirmed || showProgressOnConfirm) && (
          <motion.div
            className={cn("absolute left-0 top-0 h-full", fillClassName)}
            style={{ width }}
          />
        )}

        {animation === "border" && (!confirmed || showProgressOnConfirm) && (
          <motion.div
            className={cn(
              "absolute inset-0 border-2 rounded-md pointer-events-none",
              fillClassName
            )}
            style={{ clipPath: borderClip }}
          />
        )}

        <span className="relative z-10 flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {confirmed && confirmedChildren ? (
              <motion.span
                key="confirmed"
                initial={{ opacity: 0, scale: 0.9, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -8 }}
                transition={{ duration: 0.3 }}
                className={cn("flex items-center gap-2", confirmedClassName)}
              >
                {confirmedChildren}
              </motion.span>
            ) : (
              <motion.span
                key="default"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="relative flex items-center gap-2"
              >
                <span ref={textRef} className="relative">
                  {children}
                  {animation === "fill" && (
                    <motion.span
                      className={cn(
                        "absolute inset-0 overflow-hidden",
                        fillClassName?.includes("text-")
                          ? fillClassName
                          : "text-white dark:text-black"
                      )}
                      style={{ width: textWidth }}
                    >
                      {children}
                    </motion.span>
                  )}
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </Comp>
    );
  }
);

HoldToConfirm.displayName = "HoldToConfirm";

export { HoldToConfirm };
