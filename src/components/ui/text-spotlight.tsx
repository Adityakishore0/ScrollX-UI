"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  spotlightColor?: string;
  spotlightSize?: number;
  textClassName?: string;
  spotlightOpacity?: number;
  spotlightArea?: number;
  animateOnPhone?: boolean;
  colorDuration?: number;
}

const BREAKPOINT = 1024;

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < BREAKPOINT);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

export function TextSpotlight({
  text,
  className,
  textClassName,
  spotlightColor = "255, 255, 255",
  spotlightSize = 450,
  spotlightOpacity = 1,
  spotlightArea,
  animateOnPhone = false,
  colorDuration = 2000,
  ...props
}: TextSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [revealProgress, setRevealProgress] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!animateOnPhone || !isMobile || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (!entry.isIntersecting) {
          setRevealProgress(0);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [animateOnPhone, isMobile]);

  useEffect(() => {
    if (!animateOnPhone || !isMobile || !isVisible) return;

    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / colorDuration, 1);
      setRevealProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, animateOnPhone, isMobile, colorDuration]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const background = useMotionTemplate`
    radial-gradient(
      ${spotlightSize}px circle at ${mouseX}px ${mouseY}px,
      rgba(${spotlightColor}, ${spotlightOpacity}),
      transparent 80%
    )
  `;

  const chars = text.split("");
  const shouldShowMobileReveal = animateOnPhone && isMobile;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative w-full overflow-hidden", className)}
      {...props}
    >
      {shouldShowMobileReveal ? (
        <p
          className={cn("relative z-10 select-none text-center", textClassName)}
        >
          {chars.map((char, index) => {
            const charProgress = (revealProgress * chars.length - index) / 1;
            const opacity = Math.max(0, Math.min(1, charProgress));
            const isRevealed = opacity > 0.5;

            return (
              <span
                key={index}
                style={{
                  transition: "all 0.3s ease-out",
                  color: isRevealed ? "inherit" : undefined,
                }}
                className={
                  isRevealed ? "" : "text-gray-600/10 dark:text-white/15"
                }
              >
                {char}
              </span>
            );
          })}
        </p>
      ) : (
        <>
          <p
            className={cn(
              "relative z-10 text-gray-600/10 dark:text-white/15 select-none text-center",
              textClassName
            )}
          >
            {text}
          </p>

          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            style={{
              WebkitMaskImage: background,
              maskImage: background,
              opacity: isHovered ? 1 : 0,
            }}
          >
            <p className={cn("text-foreground text-center", textClassName)}>
              {text}
            </p>
          </motion.div>
        </>
      )}
    </div>
  );
}
