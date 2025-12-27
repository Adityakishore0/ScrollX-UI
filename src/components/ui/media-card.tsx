"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface MediaCardRootProps {
  children: React.ReactNode;
  className?: string;
  dotClassName?: string;
  marqueeClassName?: string;
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
  marqueeSpeed?: number;
  marqueeDelay?: number;
}

interface MediaCardItemProps {
  src: string;
  alt: string;
  title: string;
  type?: "image" | "video";
  className?: string;
}

interface CursorContextType {
  setLabel: (label: string | null) => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

const CursorContext = React.createContext<CursorContextType | null>(null);

const useCursor = () => {
  const context = React.useContext(CursorContext);
  if (!context) {
    throw new Error("MediaCard components must be used within MediaCard root");
  }
  return context;
};

const Cursor = ({
  label,
  containerRef,
  dotClassName,
  marqueeClassName,
  springConfig = { stiffness: 300, damping: 30, mass: 0.5 },
  marqueeSpeed = 10,
  marqueeDelay = 0.5,
}: {
  label: string | null;
  containerRef: React.RefObject<HTMLDivElement>;
  dotClassName?: string;
  marqueeClassName?: string;
  springConfig?: { stiffness?: number; damping?: number; mass?: number };
  marqueeSpeed?: number;
  marqueeDelay?: number;
}) => {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const [isInside, setIsInside] = useState(false);

  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const move = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const isWithinBounds =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      setIsInside(isWithinBounds);

      if (isWithinBounds) {
        rawX.set(e.clientX);
        rawY.set(e.clientY);
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [rawX, rawY, containerRef]);

  if (!isInside) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[10000]"
      style={{ left: x, top: y, x: "-50%", y: "-50%" }}
    >
      <AnimatePresence mode="wait">
        {label ? (
          <motion.div
            key="marquee"
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
            }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className={cn(
              "overflow-hidden backdrop-blur-md shadow-2xl flex items-center justify-center bg-white/95 rounded-full w-40 h-10",
              marqueeClassName
            )}
          >
            <div className="relative w-full h-full flex items-center">
              <motion.div
                className="absolute whitespace-nowrap text-sm font-bold tracking-widest flex"
                initial={{ x: "0%" }}
                animate={{ x: "-50%" }}
                transition={{
                  duration: marqueeSpeed,
                  repeat: Infinity,
                  ease: "linear",
                  delay: marqueeDelay,
                }}
              >
                <span className="px-1">{label}</span>
                <span className="px-1">{label}</span>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="dot"
            initial={{
              width: "8px",
              height: "8px",
              opacity: 1,
            }}
            animate={{
              width: "8px",
              height: "8px",
              opacity: 1,
            }}
            exit={{
              width: "8px",
              height: "8px",
              opacity: 1,
            }}
            transition={{ duration: 0.2 }}
            className={cn("rounded-full bg-black", dotClassName)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const MediaCard = ({
  children,
  className,
  dotClassName,
  marqueeClassName,
  springConfig,
  marqueeSpeed,
  marqueeDelay,
}: MediaCardRootProps) => {
  const [label, setLabel] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <CursorContext.Provider value={{ setLabel, containerRef }}>
      <Cursor
        label={label}
        containerRef={containerRef}
        dotClassName={dotClassName}
        marqueeClassName={marqueeClassName}
        springConfig={springConfig}
        marqueeSpeed={marqueeSpeed}
        marqueeDelay={marqueeDelay}
      />
      <div ref={containerRef} className={cn("", className)}>
        {children}
      </div>
    </CursorContext.Provider>
  );
};

const MediaCardItem = ({
  src,
  alt,
  title,
  type = "image",
  className,
}: MediaCardItemProps) => {
  const { setLabel } = useCursor();

  return (
    <div
      onMouseEnter={() => setLabel(title)}
      onMouseLeave={() => setLabel(null)}
      className={cn("relative overflow-hidden rounded-3xl", className)}
    >
      {type === "video" ? (
        <video
          src={src}
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
          autoPlay
        />
      ) : (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      )}
    </div>
  );
};

export { MediaCard, MediaCardItem };
