"use client";
import { ReactNode, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoaderProps {
  children?: ReactNode;
  className?: string;
  variant?: "default" | "cube" | "dual-ring" | "magnetic-dots";
  size?: number;
}

export function Loader({
  children,
  className = "",
  variant = "default",
  size,
}: LoaderProps) {
  const finalSize = useMemo(() => size ?? 24, [size]);

  return (
    <div className={cn("flex gap-2", className)}>
      <div
        className="relative flex items-center justify-center"
        style={{
          height: finalSize,
          width: finalSize,
        }}
      >
        {variant === "default" && (
          <>
            <div className="absolute inset-0 rounded-full border-t-[1.5px] border-b-[1.5px] border-black/30 dark:border-white/30" />
            <motion.div
              className="absolute inset-0 rounded-full border-t-[1.5px] border-b-[1.5px] border-black dark:border-white"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </>
        )}

        {variant === "cube" && (
          <motion.div
            className="absolute inset-0 bg-black dark:bg-white shadow-[0_0_4px_rgba(255,255,255,0.6)] dark:shadow-[0_0_4px_rgba(255,255,255,0.6)]"
            animate={{ rotateX: [0, 180, 0], rotateY: [0, 180, 0] }}
            transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
          />
        )}

        {variant === "dual-ring" && (
          <>
            <div className="absolute inset-0 rounded-full border-[1.5px] border-black/20 dark:border-white/20 shadow-[0_0_4px_rgba(0,0,0,0.3)] dark:shadow-[0_0_4px_rgba(255,255,255,0.3)]" />
            <motion.div
              className="absolute inset-0 rounded-full border-t-[1.5px] border-black border-b-transparent dark:border-white dark:border-b-transparent shadow-[0_0_6px_rgba(0,0,0,0.5)] dark:shadow-[0_0_6px_rgba(255,255,255,0.7)]"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </>
        )}

        {variant === "magnetic-dots" && (
          <div className="relative flex items-center justify-center h-full w-full">
            <motion.div
              className="absolute rounded-full bg-black dark:bg-white"
              style={{
                height: finalSize / 3,
                width: finalSize / 3,
              }}
              animate={{ x: [-(finalSize / 3), 0, -(finalSize / 3)] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
            />
            <motion.div
              className="absolute rounded-full bg-black dark:bg-white"
              style={{
                height: finalSize / 3,
                width: finalSize / 3,
              }}
              animate={{ x: [finalSize / 3, 0, finalSize / 3] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
            />
            <motion.div
              className="absolute rounded-full bg-black dark:bg-white opacity-0"
              style={{
                height: finalSize / 3,
                width: finalSize / 3,
              }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "easeInOut",
                times: [0.45, 0.5, 0.55],
              }}
            />
          </div>
        )}
      </div>

      {children && <div className="text-sm">{children}</div>}
    </div>
  );
}
