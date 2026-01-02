"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";

interface SensitiveTextProps {
  children: string;
  className?: string;
  containerClassName?: string;
  maxStretch?: number;
  sensitivity?: number;
  easing?: number;
  verticalRange?: number;
  falloffPower?: number;
  variant?: "compress" | "stretch";
  style?: React.CSSProperties;
}

const SensitiveText: React.FC<SensitiveTextProps> = ({
  children,
  className = "",
  containerClassName = "",
  maxStretch = 0.5,
  sensitivity = 0.5,
  easing = 10,
  verticalRange = 100,
  falloffPower = 2,
  variant = "compress",
  style = {},
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const scalesRef = useRef<number[]>([]);

  const chars = useMemo(() => children.split(""), [children]);

  useEffect(() => {
    scalesRef.current = chars.map(() => 1);

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      cursorRef.current.x = touch.clientX;
      cursorRef.current.y = touch.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [chars]);

  useEffect(() => {
    let rafId: number;

    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / easing;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / easing;

      if (!textRef.current) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      const textRect = textRef.current.getBoundingClientRect();

      const isInHorizontalBounds =
        mouseRef.current.x >= textRect.left &&
        mouseRef.current.x <= textRect.right;

      const isInVerticalBounds =
        mouseRef.current.y >= textRect.top &&
        mouseRef.current.y <= textRect.bottom + verticalRange;

      const isInBounds = isInHorizontalBounds && isInVerticalBounds;

      spansRef.current.forEach((span, index) => {
        if (!span) return;

        const rect = span.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;

        const distX = Math.abs(mouseRef.current.x - charCenterX);
        const maxDist = textRect.width * sensitivity;

        let targetScale = 1;

        if (isInBounds) {
          const proximity = Math.max(0, 1 - distX / maxDist);

          if (variant === "compress") {
            targetScale = 1 - proximity ** falloffPower * maxStretch;
          } else {
            targetScale = 1 + proximity ** falloffPower * maxStretch;
          }
        }

        const currentScale = scalesRef.current[index];
        const newScale = currentScale + (targetScale - currentScale) * 0.15;
        scalesRef.current[index] = newScale;

        span.style.transform = `scaleY(${newScale})`;
      });

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [maxStretch, sensitivity, easing, verticalRange, falloffPower, variant]);

  return (
    <span
      ref={textRef}
      className={cn(containerClassName)}
      style={{
        ...style,
        display: "inline-flex",
        alignItems: "flex-start",
        lineHeight: 0,
        verticalAlign: "top",
      }}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            spansRef.current[i] = el;
          }}
          className={cn(className)}
          style={{
            display: "inline-block",
            whiteSpace: char === " " ? "pre" : "normal",
            transformOrigin: "top center",
            lineHeight: 1,
            verticalAlign: "top",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

export default SensitiveText;
