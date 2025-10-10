"use client";
import { useRef, useEffect, useState, ReactNode, CSSProperties } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";

type GlassProps = {
  children?: ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  tintOpacity?: number;
  blur?: number;
  ripple?: boolean;
  followMouse?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
};

type Ripple = {
  id: number;
  x: number;
  y: number;
};

export const Glass = ({
  children,
  width = 120,
  height = 120,
  borderRadius = 12,
  tintOpacity = 0.1,
  blur = 2,
  ripple = false,
  followMouse = false,
  className = "",
  style = {},
  onClick,
}: GlassProps) => {
  const glassRef = useRef<HTMLDivElement>(null);
  const left = useMotionValue(0);
  const top = useMotionValue(0);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const smoothLeft = useSpring(left, { damping: 30, stiffness: 200 });
  const smoothTop = useSpring(top, { damping: 30, stiffness: 200 });

  useEffect(() => {
    if (!followMouse) return;

    const glass = glassRef.current;
    const parent = glass?.parentElement;
    if (!glass || !parent) return;

    const w = typeof width === "number" ? width : glass.offsetWidth;
    const h = typeof height === "number" ? height : glass.offsetHeight;

    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const parentRect = parent.getBoundingClientRect();
      left.set(touch.clientX - parentRect.left - w / 2);
      top.set(touch.clientY - parentRect.top - h / 2);
    };

    const handleMouse = (e: MouseEvent) => {
      const parentRect = parent.getBoundingClientRect();
      left.set(e.clientX - parentRect.left - w / 2);
      top.set(e.clientY - parentRect.top - h / 2);
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("touchmove", handleTouch);
    window.addEventListener("touchstart", handleTouch);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, [width, height, left, top, followMouse]);

  useEffect(() => {
    if (!ripple) return;

    const handleClick = (e: MouseEvent) => {
      if (!glassRef.current) return;
      const rect = glassRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple = { id: Date.now(), x, y };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(
        () => setRipples((prev) => prev.filter((r) => r.id !== newRipple.id)),
        1000
      );
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [ripple]);

  const baseStyles: CSSProperties = {
    "--lg-border-radius": `${borderRadius}px`,
    "--lg-tint-opacity": tintOpacity,
    "--lg-blur": `${blur}px`,
    width,
    height,
    borderRadius: `${borderRadius}px`,
    ...(followMouse ? { left: smoothLeft, top: smoothTop } : {}),
    ...style,
  } as CSSProperties;

  const baseClasses = cn(
    followMouse ? "absolute" : "relative",
    "isolate z-[40] shadow-lg",
    "before:absolute before:inset-0 before:z-0 before:rounded-[var(--lg-border-radius)] before:bg-[rgba(255,255,255,var(--lg-tint-opacity))] before:shadow-[inset_0_0_20px_-5px_rgba(255,255,255,0.7)] before:content-['']",
    "after:absolute after:inset-0 after:isolate after:-z-[1] after:rounded-[var(--lg-border-radius)] after:[filter:url(#glass-distortion)] after:backdrop-blur-[var(--lg-blur)] after:content-['']",
    className
  );
  useEffect(() => {
    if (
      typeof document !== "undefined" &&
      !document.getElementById("glass-distortion-filter")
    ) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "0");
      svg.setAttribute("height", "0");
      svg.style.position = "absolute";
      svg.style.overflow = "hidden";
      svg.id = "glass-distortion-filter";
      svg.innerHTML = `
        <defs>
          <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="92" result="noise"/>
            <feGaussianBlur in="noise" stdDeviation="2" result="blurred"/>
            <feDisplacementMap in="SourceGraphic" in2="blurred" scale="80" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
      `;
      document.body.appendChild(svg);
    }
  }, []);

  return (
    <>
      <motion.div
        ref={glassRef}
        className={baseClasses}
        style={baseStyles}
        onClick={onClick}
      >
        <div className="relative z-10 w-full h-full">{children}</div>

        {ripple && (
          <AnimatePresence>
            {ripples.map((ripple) => (
              <motion.div
                key={ripple.id}
                className="absolute rounded-full bg-white/30 pointer-events-none"
                style={{ left: ripple.x, top: ripple.y }}
                initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 1 }}
                animate={{
                  width: typeof width === "number" ? width * 2 : 200,
                  height: typeof width === "number" ? width * 2 : 200,
                  x: typeof width === "number" ? -width : -100,
                  y: typeof width === "number" ? -width : -100,
                  opacity: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            ))}
          </AnimatePresence>
        )}
      </motion.div>
    </>
  );
};
