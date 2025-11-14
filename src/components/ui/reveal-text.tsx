import React, { useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right";
type Mode = "manual" | "auto";

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  boxClassName?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  mode?: Mode;
  stagger?: number;
  once?: boolean;
}

const baseBoxStyles =
  "absolute inset-0 z-10 bg-neutral-900 dark:bg-neutral-100";

const RevealText: React.FC<RevealTextProps> = ({
  children,
  className = "",
  boxClassName = "",
  delay = 0,
  duration = 0.8,
  direction = "down",
  mode = "manual",
  stagger = 0.1,
  once = true,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once });
  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) {
      controls.set("initial");
      controls.start("animate");
    } else if (!once) {
      controls.start("initial");
    }
  }, [inView, controls, once]);

  const getAnimationValues = () => {
    switch (direction) {
      case "up":
        return {
          initial: { scaleY: 1, originY: 0 },
          animate: { scaleY: 0 },
        };
      case "down":
        return {
          initial: { scaleY: 1, originY: 1 },
          animate: { scaleY: 0 },
        };
      case "left":
        return {
          initial: { scaleX: 1, originX: 0 },
          animate: { scaleX: 0 },
        };
      case "right":
        return {
          initial: { scaleX: 1, originX: 1 },
          animate: { scaleX: 0 },
        };
    }
  };

  const animationValues = getAnimationValues();

  const renderWord = (word: string, i: number) => (
    <span key={i} className="relative inline-block overflow-hidden mr-2">
      <motion.span
        variants={{
          initial: animationValues.initial,
          animate: animationValues.animate,
        }}
        initial="initial"
        animate={controls}
        transition={{
          delay: delay + i * stagger,
          duration,
          ease: [0.76, 0, 0.24, 1],
        }}
        className={cn(baseBoxStyles, boxClassName)}
      />

      <motion.span
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1 },
        }}
        initial="initial"
        animate={controls}
        transition={{
          delay: delay + i * stagger + duration * 0.5,
          duration: duration * 0.5,
        }}
        className={className}
      >
        {word}
      </motion.span>
    </span>
  );

  if (mode === "auto" && typeof children === "string") {
    const words = children.split(" ");
    return (
      <span ref={ref} className="inline-block">
        {words.map(renderWord)}
      </span>
    );
  }

  return (
    <span ref={ref} className="relative inline-block overflow-hidden">
      <motion.span
        variants={{
          initial: animationValues.initial,
          animate: animationValues.animate,
        }}
        initial="initial"
        animate={controls}
        transition={{
          delay,
          duration,
          ease: [0.76, 0, 0.24, 1],
        }}
        className={cn(baseBoxStyles, boxClassName)}
      />

      <motion.span
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1 },
        }}
        initial="initial"
        animate={controls}
        transition={{
          delay: delay + duration * 0.5,
          duration: duration * 0.5,
        }}
        className={className}
      >
        {children}
      </motion.span>
    </span>
  );
};

export { RevealText };
