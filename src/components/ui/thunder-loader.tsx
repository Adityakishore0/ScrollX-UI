"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const thunderLoaderVariants = cva("inline-block overflow-visible", {
  variants: {
    size: {
      xs: "w-4 h-4",
      sm: "w-6 h-6",
      md: "w-8 h-8",
      lg: "w-12 h-12",
      xl: "w-16 h-16",
      "2xl": "w-20 h-20",
    },
    variant: {
      default: "",
      electric: "",
      fire: "",
      ice: "",
      rainbow: "",
      subtle: "",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

interface ThunderLoaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof thunderLoaderVariants> {
  fillDuration?: number;
  glowDuration?: number;
  animateDuration?: number;
  fillColor?: string;
  glowColor?: string;
  baseColor?: string;
  strokeWidth?: number;
  showGlow?: boolean;
  showFill?: boolean;
  animate?: boolean | "thunder";
  viewBox?: string;
  customPath?: string;
}

const variantColors = {
  default: {
    shimmer: "#60a5fa",
    glow: "#3b82f6",
    base: "#1e40af",
  },
  fire: {
    shimmer: "#fbbf24",
    glow: "#f59e0b",
    base: "#d97706",
  },
  electric: {
    shimmer: "#fb7185",
    glow: "#f43f5e",
    base: "#e11d48",
  },
  ice: {
    shimmer: "#67e8f9",
    glow: "#06b6d4",
    base: "#0891b2",
  },
  rainbow: {
    shimmer: "#a855f7",
    glow: "#8b5cf6",
    base: "#7c3aed",
  },
  subtle: {
    shimmer: "#94a3b8",
    glow: "#64748b",
    base: "#475569",
  },
};

const defaultThunderPath =
  "M50 10 L 35 45 L 55 45 L 40 70 L 70 35 L 50 35 L 65 10 Z";

const ThunderLoader = React.forwardRef<HTMLDivElement, ThunderLoaderProps>(
  (
    {
      className,
      size,
      variant = "default",
      fillDuration = 2,
      glowDuration = 3,
      animateDuration = 2,
      fillColor,
      glowColor,
      baseColor,
      strokeWidth = 2,
      showGlow = false,
      showFill = false,
      animate = false,
      viewBox = "0 0 100 80",
      customPath,
      ...props
    },
    ref
  ) => {
    const colors = variantColors[variant!] || variantColors.default;
    const finalFillColor = fillColor || colors.shimmer;
    const finalGlowColor = glowColor || colors.glow;
    const finalBaseColor = baseColor || colors.base;
    const thunderPath = customPath || defaultThunderPath;
    const isThunderAnimation = animate === "thunder";

    const gradientId = React.useMemo(
      () => `thunder-gradient-${Math.random().toString(36).substr(2, 9)}`,
      []
    );
    const filterId = React.useMemo(
      () => `thunder-filter-${Math.random().toString(36).substr(2, 9)}`,
      []
    );

    const pathRef = React.useRef<SVGPathElement>(null);
    const [pathLength, setPathLength] = React.useState(0);
    const [fillProgress, setFillProgress] = React.useState(0);

    React.useEffect(() => {
      if (pathRef.current) {
        setPathLength(pathRef.current.getTotalLength());
      }
    }, [thunderPath]);

    React.useEffect(() => {
      if (!showFill) return;
      let frame: number;
      let start: number | null = null;
      function animateFill(ts: number) {
        if (start === null) start = ts;
        const elapsed = (ts - start) / 1000;
        const fillTime = fillDuration;
        const unfillTime = fillDuration * 1.5;
        const total = fillTime + unfillTime;
        const t = elapsed % total;
        let progress;
        if (t < fillTime) {
          progress = t / fillTime;
        } else {
          progress = 1 - (t - fillTime) / unfillTime;
        }
        setFillProgress(progress);
        frame = requestAnimationFrame(animateFill);
      }
      frame = requestAnimationFrame(animateFill);
      return () => cancelAnimationFrame(frame);
    }, [fillDuration, showFill]);

    return (
      <div
        ref={ref}
        className={cn(thunderLoaderVariants({ size, variant }), className)}
        {...props}
      >
        <motion.svg
          className="w-full h-full"
          viewBox={viewBox}
          fill="none"
          initial={animate ? { opacity: 0, scale: 0.8 } : undefined}
          animate={animate ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <defs>
            {showFill && (
              <linearGradient id={gradientId} x1="0%" y1="100%" x2="0%" y2="0%">
                <stop
                  offset="0%"
                  stopColor={finalFillColor}
                  stopOpacity="0.7"
                />
                <stop
                  offset="100%"
                  stopColor={finalFillColor}
                  stopOpacity="0.1"
                />
              </linearGradient>
            )}
            {showGlow && (
              <filter
                id={filterId}
                x="-100%"
                y="-100%"
                width="300%"
                height="300%"
              >
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            )}
          </defs>
          {showGlow && (
            <motion.path
              d={thunderPath}
              stroke={finalGlowColor}
              strokeWidth={strokeWidth + 1}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#${filterId})`}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 0.6 }}
            >
              <animate
                attributeName="opacity"
                values="0.3;0.8;0.3"
                dur={`${glowDuration}s`}
                repeatCount="indefinite"
              />
            </motion.path>
          )}
          <motion.path
            ref={pathRef}
            d={thunderPath}
            stroke={finalBaseColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={
              isThunderAnimation
                ? false
                : animate
                ? { pathLength: 0, opacity: 0 }
                : undefined
            }
            animate={
              isThunderAnimation
                ? {
                    strokeDasharray: pathLength,
                    strokeDashoffset: [pathLength, -pathLength],
                  }
                : animate
                ? { pathLength: 1, opacity: 1 }
                : undefined
            }
            transition={
              isThunderAnimation
                ? {
                    repeat: Infinity,
                    duration: animateDuration,
                    ease: "linear",
                  }
                : animate
                ? { duration: animateDuration, delay: 0.5, ease: "easeInOut" }
                : undefined
            }
          />
          {showFill && (
            <mask id={`fill-mask-${gradientId}`}>
              <rect
                x="0"
                y={80 - fillProgress * 80}
                width="100"
                height={fillProgress * 80}
                fill="white"
              />
            </mask>
          )}
          {showFill && (
            <path
              d={thunderPath}
              fill={`url(#${gradientId})`}
              stroke="none"
              mask={`url(#fill-mask-${gradientId})`}
            />
          )}
          {variant === "rainbow" && (
            <motion.circle
              cx="50"
              cy="40"
              r="1"
              fill={finalFillColor}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                delay: 1,
              }}
            />
          )}
        </motion.svg>
      </div>
    );
  }
);

ThunderLoader.displayName = "ThunderLoader";

export { ThunderLoader, thunderLoaderVariants, type ThunderLoaderProps };
