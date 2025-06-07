"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface StatItem {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

interface StatsCountProps {
  stats?: StatItem[];
  title?: string;
  showDividers?: boolean;
  className?: string;
}

const defaultStats: StatItem[] = [
  {
    value: 50,
    suffix: "+",
    label: "Handcrafted animated components",
    duration: 5,
  },
  {
    value: 12,
    suffix: "K+",
    label: "Developers building with ScrollX-UI",
    duration: 6,
  },
  {
    value: 99,
    suffix: "%",
    label: "Performance optimized for web",
    duration: 5.5,
  },
];

const defaultTitle = "CREATE STUNNING INTERFACES WITH SCROLLX-UI COMPONENTS";

function AnimatedCounter({
  value,
  suffix = "",
  duration = 1,
  delay = 0,
  label,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  delay?: number;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-50px" });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 20,
    stiffness: 50,
    mass: 1,
  });

  const rounded = useTransform(springValue, (latest) =>
    Number(latest.toFixed(value % 1 === 0 ? 0 : 1))
  );

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [rounded]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isInView) {
      motionValue.set(0);
      timeout = setTimeout(() => {
        motionValue.set(value);
      }, delay * 300);
    } else {
      motionValue.set(0);
    }
    return () => clearTimeout(timeout);
  }, [isInView, value, motionValue, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.8,
        delay: delay * 0.2,
        type: "spring",
        stiffness: 80,
      }}
      className={cn(
        "text-center flex-1 min-w-0 flex flex-col justify-center h-full"
      )}
    >
      <motion.div
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 whitespace-nowrap"
        )}
        initial={{ scale: 0.8 }}
        animate={isInView ? { scale: 1 } : { scale: 0.8 }}
        transition={{
          duration: 0.6,
          delay: delay * 0.2 + 0.3,
          type: "spring",
          stiffness: 100,
        }}
      >
        {displayValue}
        {suffix}
      </motion.div>
      <motion.p
        className={cn(
          "text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed px-1 sm:px-2 hyphens-auto break-words"
        )}
        style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: delay * 0.2 + 0.6, duration: 0.6 }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
}

export default function StatsCount({
  stats = defaultStats,
  title = defaultTitle,
  showDividers = true,
  className = "",
}: StatsCountProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { margin: "-100px" });

  return (
    <motion.section
      ref={containerRef}
      className={cn(
        "py-8 sm:py-12 lg:py-20 px-2 sm:px-4 md:px-8 w-full overflow-hidden",
        className
      )}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className={cn("text-center mb-8 sm:mb-12 lg:mb-16")}
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2
          className={cn(
            "text-sm sm:text-base md:text-lg lg:text-xl font-medium tracking-wide px-4"
          )}
        >
          <span className="hidden sm:inline">
            {title.includes("WITH") ? (
              <>
                {title.split("WITH")[0]}WITH{" "}
                <span
                  className={cn(
                    "text-blue-600 dark:text-blue-400 font-semibold"
                  )}
                >
                  {title.split("WITH")[1]}
                </span>
              </>
            ) : (
              title
            )}
          </span>
          <div
            className={cn("flex flex-col items-center leading-tight sm:hidden")}
          >
            {title.includes("WITH") ? (
              <>
                <span>{title.split("WITH")[0].trim()}</span>
                <span className={cn("text-center")}>WITH</span>
                <span
                  className={cn(
                    "text-blue-600 dark:text-blue-400 font-semibold"
                  )}
                >
                  {title.split("WITH")[1].trim()}
                </span>
              </>
            ) : (
              <span>{title}</span>
            )}
          </div>
        </h2>
      </motion.div>

      <div className={cn("w-full max-w-6xl mx-auto")}>
        <div
          className={cn(
            "flex flex-row items-stretch justify-between gap-2 sm:gap-4 lg:gap-8 w-full min-h-[120px] sm:min-h-[140px]"
          )}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "relative flex-1 min-w-0 flex flex-col justify-center h-full"
              )}
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                duration={stat.duration}
                delay={index}
                label={stat.label}
              />
              {index < stats.length - 1 && showDividers && (
                <motion.div
                  className={cn(
                    "absolute -right-1 sm:-right-2 lg:-right-4 top-1/2 transform -translate-y-1/2 h-12 sm:h-16 lg:h-20 w-px bg-gray-200 dark:bg-gray-700"
                  )}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={
                    isInView
                      ? { opacity: 1, scaleY: 1 }
                      : { opacity: 0, scaleY: 0 }
                  }
                  transition={{ delay: 1.5 + index * 0.2, duration: 0.6 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
