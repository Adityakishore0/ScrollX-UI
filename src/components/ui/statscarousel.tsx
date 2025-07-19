"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

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
  onDone: () => void;
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
    const unsub = rounded.on("change", (v) => {
      setDisplayValue(v);
      if (v >= value) onDone?.();
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

export default function StatsCarouselcount({
  stats,
  title,
  className = "",
  cardClassName = "",
}: {
  stats?: StatItem[];
  title?: string;
  className?: string;
  cardClassName?: string;
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
  const [phase, setPhase] = useState<"idle" | "down" | "stackUp" | "upReenter">(
    "idle"
  );
  const [activeTopId, setActiveTopId] = useState(initialStats[0].id!);
  const [triggerCounter, setTriggerCounter] = useState(0);
  const [animatedIds, setAnimatedIds] = useState<Set<number>>(new Set());
  const [resetQueue, setResetQueue] = useState<Set<number>>(new Set());
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (phase === "idle")
      timeoutRef.current = setTimeout(() => setPhase("down"), 3000);
    if (phase === "down")
      timeoutRef.current = setTimeout(() => setPhase("stackUp"), 600);
    if (phase === "stackUp")
      timeoutRef.current = setTimeout(() => setPhase("upReenter"), 600);
    if (phase === "upReenter") {
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

    return () => clearTimeout(timeoutRef.current);
  }, [phase]);

  return (
    <section
      className={`py-20 px-4 w-full max-w-md mx-auto text-center relative h-[500px] ${className}`}
    >
      <h2 className="text-lg font-bold text-black dark:text-white mb-12">
        {title ?? "CREATE STUNNING INTERFACES WITH SCROLLX UI COMPONENTS"}
      </h2>
      <div className="relative h-[300px]">
        {items.map((stat, index) => {
          const baseY = index * 20;
          const scale = 1 - index * 0.05;
          const isTopCard = index === 0;
          const bottomIndex = items.length - 1;
          const bottomScale = 1 - bottomIndex * 0.05;

          let animate = { x: 0, y: baseY, scale };
          if (isTopCard && phase === "down")
            animate = { x: 0, y: baseY + 150, scale: 0.8 };
          if (!isTopCard && phase === "stackUp")
            animate = { x: 0, y: baseY - 20, scale };
          if (isTopCard && phase === "stackUp")
            animate = { x: 0, y: baseY + 150, scale: 0.8 };
          if (isTopCard && phase === "upReenter")
            animate = { x: 0, y: bottomIndex * 20, scale: bottomScale };

          const zIndex = phase === "upReenter" && isTopCard ? 0 : 100 - index;
          const shouldAnimate =
            stat.id === activeTopId &&
            phase === "idle" &&
            !animatedIds.has(stat.id!);
          const shouldShowZero =
            resetQueue.has(stat.id!) && stat.id !== activeTopId;

          return (
            <motion.div
              key={stat.id}
              className="absolute left-0 right-0 mx-auto w-full"
              style={{ zIndex }}
              animate={animate}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div
                className={`flex flex-col items-center justify-center rounded-xl border border-neutral-800 p-6 bg-neutral-950 dark:border-neutral-200 dark:bg-neutral-50 shadow-lg ${cardClassName}`}
              >
                {shouldAnimate ? (
                  <StatsCarousel
                    value={stat.value}
                    suffix={stat.suffix}
                    trigger={triggerCounter}
                    onDone={() =>
                      setAnimatedIds((prev) => new Set(prev).add(stat.id!))
                    }
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
      </div>
    </section>
  );
}
