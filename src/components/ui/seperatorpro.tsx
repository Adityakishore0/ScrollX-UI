"use client";
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

const SeparatorPro = React.memo(
  React.forwardRef<
    React.ElementRef<typeof SeparatorPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
      variant?: "default" | "dots" | "wave";
    }
  >(
    (
      {
        className,
        orientation = "horizontal",
        decorative = true,
        variant = "default",
        ...props
      },
      ref
    ) => {
      const isHorizontal = orientation === "horizontal";

      const wavePath = React.useMemo(() => {
        return isHorizontal
          ? "M0,10 Q25,0 50,10 T100,10 T150,10 T200,10 T250,10 T300,10 T350,10 T400,10"
          : "M10,0 Q5,50 10,100 T10,200 T10,300 T10,400";
      }, [isHorizontal]);

      return (
        <SeparatorPrimitive.Root
          ref={ref}
          decorative={decorative}
          orientation={orientation}
          className={cn(
            "shrink-0 flex items-center justify-center overflow-hidden",
            isHorizontal ? "w-full" : "h-full",
            className
          )}
          {...props}
        >
          {variant === "default" && (
            <div
              className={cn(
                "bg-neutral-400 dark:bg-neutral-800",
                isHorizontal ? "h-px w-full" : "w-px h-full"
              )}
            />
          )}

          {variant === "dots" && (
            <div
              className={cn(
                "relative",
                isHorizontal ? "w-full h-4" : "h-full w-4"
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 bg-repeat",
                  "text-neutral-400 dark:text-white/20"
                )}
                style={{
                  backgroundImage:
                    "radial-gradient(circle, currentColor 0.8px, transparent 0.8px)",
                  backgroundSize: isHorizontal ? "6px 100%" : "100% 6px",
                  maskImage: isHorizontal
                    ? "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)"
                    : "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
                }}
              />
            </div>
          )}

          {variant === "wave" && (
            <div
              className={cn(
                "relative flex items-center justify-center",
                isHorizontal ? "w-full h-6" : "h-full w-6"
              )}
            >
              <svg
                className={cn(
                  "text-neutral-400 dark:text-white/20",
                  isHorizontal ? "w-full h-6" : "h-full w-6"
                )}
                viewBox={isHorizontal ? "0 0 400 20" : "0 0 20 400"}
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={wavePath}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          )}
        </SeparatorPrimitive.Root>
      );
    }
  )
);

SeparatorPro.displayName = "SeparatorPro";

export { SeparatorPro };
