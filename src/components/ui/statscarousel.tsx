"use client";

import { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

interface StatItem {
  id?: number;
  value: number;
  suffix?: string;
  label: string;
}

function StatsCarousel({
  value,
  suffix,
  trigger,
  onDone,
}: {
  value: number;
  suffix?: string;
  trigger: number;
  onDone?: () => void;
}) {
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
    motionValue.set(0);
    let animationComplete = false;

    const unsub = rounded.on("change", (v) => {
      setDisplayValue(v);
      if (v >= value && !animationComplete) {
        animationComplete = true;
        onDone?.();
      }
    });

    const timeout = setTimeout(() => {
      motionValue.set(value);
    }, 100);

    return () => {
      unsub();
      clearTimeout(timeout);
    };
  }, [trigger, value, motionValue, rounded, onDone]);

  return (
    <div className="text-5xl font-extrabold text-white dark:text-black">
      {displayValue}
      {suffix}
    </div>
  );
}

export default function StatsCarouselCount({
  stats,
  title,
  className = "",
  cardClassName = "",
  animation,
}: {
  stats?: StatItem[];
  title?: string;
  className?: string;
  cardClassName?: string;
  animation?: "drag";
}) {
  const defaultStats: StatItem[] = [
    { value: 50, suffix: "+", label: "Components" },
    { value: 12, suffix: "K+", label: "Developers" },
    { value: 99, suffix: "%", label: "Performance" },
  ];

  const initialStats = (stats ?? defaultStats).map((s, i) => ({
    ...s,
    id: i + 1,
  }));

  const [items, setItems] = useState(initialStats);
  const [triggerCounter, setTriggerCounter] = useState(0);

  const [phase, setPhase] = useState<"idle" | "down" | "stackUp" | "upReenter">(
    "idle"
  );
  const [activeTopId, setActiveTopId] = useState(initialStats[0].id!);
  const [animatedIds, setAnimatedIds] = useState<Set<number>>(new Set());
  const [resetQueue, setResetQueue] = useState<Set<number>>(new Set());

  const timeoutRef = useRef<NodeJS.Timeout>();
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout>();

  const isDragMode = animation === "drag";

  useEffect(() => {
    if (isDragMode) return;

    const startAutoPlay = () => {
      autoPlayTimeoutRef.current = setTimeout(() => {
        if (phase === "idle") {
          setPhase("down");
        }
      }, 3000);
    };

    if (phase === "idle") {
      startAutoPlay();
    }

    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, [isDragMode, phase]);

  useEffect(() => {
    if (isDragMode) return;

    if (phase === "down") {
      timeoutRef.current = setTimeout(() => setPhase("stackUp"), 600);
    } else if (phase === "stackUp") {
      timeoutRef.current = setTimeout(() => setPhase("upReenter"), 600);
    } else if (phase === "upReenter") {
      timeoutRef.current = setTimeout(() => {
        setItems((prev) => {
          const [first, ...rest] = prev;
          const newTopId = rest[0].id!;

          setResetQueue((r) => {
            const newSet = new Set(r);
            newSet.add(first.id!);
            return newSet;
          });

          setAnimatedIds((prev) => {
            const copy = new Set(prev);
            copy.delete(first.id!);
            return copy;
          });

          setActiveTopId(newTopId);
          setTriggerCounter((t) => t + 1);

          return [...rest, first];
        });

        setPhase("idle");
      }, 600);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isDragMode, phase]);

  const handleDragEnd = (_: PointerEvent, info: { offset: { y: number } }) => {
    if (!isDragMode) return;

    const dragDistance = info.offset.y;

    if (dragDistance > 100) {
      setItems((prev) => {
        const [first, ...rest] = prev;
        setTriggerCounter((t) => t + 1);
        return [...rest, first];
      });
    }
  };

  useEffect(() => {
    setTriggerCounter((t) => t + 1);
  }, []);

  return (
    <section
      className={`py-20 px-4 w-full max-w-md mx-auto text-center relative h-[500px] z-[40] ${className}`}
    >
      <h2 className="text-lg font-bold text-black dark:text-white mb-12">
        {title ?? "CREATE STUNNING INTERFACES WITH SCROLLX UI COMPONENTS"}
      </h2>

      <div className="relative h-[300px]">
        <AnimatePresence>
          {items.map((stat, index) => {
            const baseY = index * 20;
            const scale = 1 - index * 0.05;
            const isTopCard = index === 0;
            const bottomIndex = items.length - 1;
            const bottomScale = 1 - bottomIndex * 0.05;

            let animate = { x: 0, y: baseY, scale };

            if (!isDragMode) {
              if (isTopCard && phase === "down") {
                animate = { x: 0, y: baseY + 150, scale: 0.8 };
              }
              if (!isTopCard && phase === "stackUp") {
                animate = { x: 0, y: baseY - 20, scale };
              }
              if (isTopCard && phase === "stackUp") {
                animate = { x: 0, y: baseY + 150, scale: 0.8 };
              }
              if (isTopCard && phase === "upReenter") {
                animate = { x: 0, y: bottomIndex * 20, scale: bottomScale };
              }
            }

            const zIndex =
              !isDragMode && phase === "upReenter" && isTopCard
                ? 0
                : Math.max(0, Math.min(40, 40 - index));

            const shouldAutoAnimate =
              !isDragMode &&
              stat.id === activeTopId &&
              phase === "idle" &&
              !animatedIds.has(stat.id!);

            const shouldDragAnimate = isDragMode && isTopCard;

            const shouldShowZero =
              !isDragMode &&
              resetQueue.has(stat.id!) &&
              stat.id !== activeTopId;

            return (
              <motion.div
                key={stat.id}
                className="absolute left-0 right-0 mx-auto w-full touch-none"
                style={{ zIndex }}
                animate={animate}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                drag={isDragMode && isTopCard ? "y" : false}
                dragConstraints={{ top: 0, bottom: 150 }}
                dragElastic={0.3}
                onDragEnd={handleDragEnd}
                whileHover={
                  isDragMode && isTopCard ? { scale: 1.02, cursor: "grab" } : {}
                }
                whileDrag={
                  isDragMode ? { scale: 0.95, cursor: "grabbing" } : {}
                }
                dragTransition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div
                  className={`flex flex-col items-center justify-center rounded-xl border border-neutral-800 p-6 bg-neutral-950 dark:border-neutral-200 dark:bg-neutral-50 shadow-lg ${
                    isDragMode && isTopCard
                      ? "hover:shadow-xl transition-shadow duration-200"
                      : ""
                  } ${cardClassName}`}
                >
                  {shouldAutoAnimate ? (
                    <StatsCarousel
                      value={stat.value}
                      suffix={stat.suffix}
                      trigger={triggerCounter}
                      onDone={() =>
                        setAnimatedIds((prev) => new Set(prev).add(stat.id!))
                      }
                    />
                  ) : shouldDragAnimate ? (
                    <StatsCarousel
                      value={stat.value}
                      suffix={stat.suffix}
                      trigger={triggerCounter}
                    />
                  ) : shouldShowZero ? (
                    <div className="text-5xl font-extrabold text-white dark:text-black">
                      0{stat.suffix}
                    </div>
                  ) : (
                    <div className="text-5xl font-extrabold text-white dark:text-black">
                      {stat.value}
                      {stat.suffix}
                    </div>
                  )}
                  <p className="text-xs text-neutral-400 dark:text-neutral-800 mt-2 text-center uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
