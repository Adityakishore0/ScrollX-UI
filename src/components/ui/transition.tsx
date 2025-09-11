"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useInView } from "framer-motion";

type Type = "curved" | "slide";
type Dir = "top" | "bottom" | "left" | "right";

export interface TransitionProps {
  intro: React.ReactNode | ((triggerExit: () => void) => React.ReactNode);
  children: React.ReactNode;
  introDuration?: number;
  transitionDuration?: number;
  type?: Type;
  direction?: Dir;
  className?: string;
  skip?: boolean;
  autoExit?: boolean;
  trigger?: boolean;
  onFinished?: () => void;
}

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const Transition: React.FC<TransitionProps> = ({
  intro,
  children,
  introDuration = 1.5,
  transitionDuration = 0.9,
  type = "curved",
  direction = "bottom",
  className = "bg-neutral-900 dark:bg-white",
  skip = false,
  autoExit = true,
  trigger,
  onFinished,
}) => {
  const [showIntro, setShowIntro] = useState(!skip);
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress] = useState(0);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-100px", once: true });

  const rafRef = useRef<number | null>(null);
  const timersRef = useRef<number[]>([]);

  const startTransition = useCallback(() => {
    setAnimating(true);
    let startTime: number | null = null;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = (now - startTime) / 1000;
      const raw = Math.min(elapsed / transitionDuration, 1);
      const eased = easeInOutCubic(raw);
      setProgress(eased);

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setAnimating(false);
        setShowIntro(false);
        setProgress(0);
        rafRef.current = null;
        onFinished?.();
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [transitionDuration, onFinished]);

  useEffect(() => {
    if (skip) {
      setShowIntro(false);
      onFinished?.();
      return;
    }

    if (inView && autoExit) {
      const t = window.setTimeout(
        () => startTransition(),
        introDuration * 1000
      );
      timersRef.current.push(t);
    }

    const currentTimers = timersRef.current;
    return () => {
      currentTimers.forEach(clearTimeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [skip, inView, introDuration, autoExit, onFinished, startTransition]);

  useEffect(() => {
    if (!autoExit && trigger && showIntro) {
      startTransition();
    }
  }, [trigger, autoExit, showIntro, startTransition]);

  const getCurvedClip = (p: number) => {
    const startRadius = 160;
    const radius = Math.max(0, startRadius * (1 - p));
    switch (direction) {
      case "top":
        return `circle(${radius}% at 50% 0%)`;
      case "bottom":
        return `circle(${radius}% at 50% 100%)`;
      case "left":
        return `circle(${radius}% at 0% 50%)`;
      case "right":
      default:
        return `circle(${radius}% at 100% 50%)`;
    }
  };

  const getSlideTransform = (p: number) => {
    const pct = Math.round(p * 100);
    switch (direction) {
      case "bottom":
        return `translateY(${pct}%)`;
      case "top":
        return `translateY(${-pct}%)`;
      case "left":
        return `translateX(${-pct}%)`;
      case "right":
      default:
        return `translateX(${pct}%)`;
    }
  };

  return (
    <div ref={ref} className="relative w-full h-full min-h-full">
      <div className="relative z-0 w-full h-full">{children}</div>

      {showIntro && (
        <div
          className="absolute inset-0 z-40 flex items-center justify-center"
          aria-hidden={!showIntro ? undefined : true}
        >
          <div
            className="absolute inset-0"
            style={
              type === "curved"
                ? {
                    clipPath: getCurvedClip(progress),
                    transition: animating ? undefined : "none",
                  }
                : { transform: getSlideTransform(progress) }
            }
          >
            <div className={`absolute inset-0 ${className}`} />
            <div className="absolute inset-0 flex items-center justify-center">
              {typeof intro === "function" ? intro(startTransition) : intro}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transition;
