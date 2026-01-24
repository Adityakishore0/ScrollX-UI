"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StripeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  stripesSpeed?: number;
  variant?: "default" | "compact";
  size?: "default" | "sm" | "lg" | "icon";
}

const StripeButton = React.forwardRef<HTMLButtonElement, StripeButtonProps>(
  (
    {
      children,
      className = "",
      stripesSpeed = 500,
      variant = "default",
      size = "default",
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const sizeClasses = {
      default: "h-10 px-10",
      sm: "h-8 px-10 text-xs",
      lg: "h-12 px-8",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "group relative cursor-pointer border-0 bg-transparent p-0 outline-none",
          size === "icon" && "w-11",
          className
        )}
        {...props}
      >
        <div className="relative h-full w-full overflow-hidden rounded-2xl p-[2px] transition-all duration-300 ease-in-out bg-zinc-200 dark:bg-zinc-800">
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <motion.div
              className="absolute h-10 w-20 -translate-x-1/2 -translate-y-1/2 blur-[4px]
                         [background:linear-gradient(to_right,transparent_20%,#000000_50%,#000000_60%,transparent_80%)] 
                         dark:[background:linear-gradient(to_right,transparent_20%,#ffffff_50%,#ffffff_60%,transparent_80%)]"
              animate={{
                top: ["0%", "0%", "100%", "100%", "0%"],
                left: ["0%", "100%", "100%", "0%", "0%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <motion.div
              className="absolute h-10 w-20 -translate-x-1/2 -translate-y-1/2 blur-[4px]
                         [background:linear-gradient(to_right,transparent_20%,#000000_50%,#000000_60%,transparent_80%)] 
                         dark:[background:linear-gradient(to_right,transparent_20%,#ffffff_50%,#ffffff_60%,transparent_80%)]"
              animate={{
                top: ["100%", "100%", "0%", "0%", "100%"],
                left: ["100%", "0%", "0%", "100%", "100%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          <div
            className={cn(
              "relative z-10 flex items-center justify-center gap-2 rounded-2xl transition-all duration-300 ease-in-out bg-white dark:bg-black overflow-hidden",
              variant === "compact" ? "h-full px-10" : sizeClasses[size]
            )}
          >
            <span
              className="absolute inset-0 pointer-events-none dark:hidden"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(120deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 1) 10px, rgba(100, 100, 100, 1) 10px, rgba(100, 100, 100, 1) 20px)",
                backgroundPosition: isHovered ? "40px 0" : "0 0",
                backgroundSize: "28.28px 100%",
                transition: `background-position ${stripesSpeed}ms ease-out`,
                opacity: 0.15,
              }}
            />

            <span
              className="absolute inset-0 pointer-events-none hidden dark:block"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(120deg, rgba(19, 19, 19, 1), rgba(19, 19, 19, 1) 10px, rgba(43, 43, 43, 1) 10px, rgba(43, 43, 43, 1) 20px)",
                backgroundPosition: isHovered ? "40px 0" : "0 0",
                backgroundSize: "28.28px 100%",
                transition: `background-position ${stripesSpeed}ms ease-out`,
              }}
            />

            <span className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-slate-400/60 dark:via-white/60 to-transparent pointer-events-none rounded-2xl" />
            <span className="relative z-10 text-base font-semibold text-black dark:text-white">
              {children}
            </span>
            <span className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] pointer-events-none" />
          </div>
        </div>
      </button>
    );
  }
);

StripeButton.displayName = "StripeButton";

export { StripeButton };
