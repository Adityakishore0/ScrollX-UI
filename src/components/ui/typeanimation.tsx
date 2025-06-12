"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type LibrarySpeedType = ComponentProps<typeof TypeAnimation>["speed"];

type SpeedType = number | "slow" | "normal" | "fast";

interface TypeanimationProps {
  words?: string[];
  className?: string;
  typingSpeed?: SpeedType;
  deletingSpeed?: SpeedType;
  pauseDuration?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

const Typeanimation = ({
  words = [" existence", " reality", " the Internet"],
  className,
  typingSpeed = 50,
  deletingSpeed = 50,
  pauseDuration = 1000,
  gradientFrom = "blue-500",
  gradientTo = "purple-600",
}: TypeanimationProps) => {
  const sequence = words.flatMap((word) => [word, pauseDuration]);

  return (
    <motion.span
      className={cn(
        `bg-clip-text text-transparent bg-gradient-to-r from-${gradientFrom} to-${gradientTo}`,
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <TypeAnimation
        sequence={sequence}
        wrapper="span"
        repeat={Infinity}
        className=""
        speed={typingSpeed as LibrarySpeedType}
        deletionSpeed={deletingSpeed as LibrarySpeedType}
      />
    </motion.span>
  );
};

export default Typeanimation;
