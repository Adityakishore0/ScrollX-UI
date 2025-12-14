"use client";
import React, { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

class Pixel {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInteger: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number
  ) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  getRandomValue(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.x + centerOffset,
      this.y + centerOffset,
      this.size,
      this.size
    );
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }
    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }
    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}

function getEffectiveSpeed(value: number, reducedMotion: boolean) {
  const min = 0;
  const max = 100;
  const throttle = 0.001;
  if (value <= min || reducedMotion) {
    return min;
  } else if (value >= max) {
    return max * throttle;
  } else {
    return value * throttle;
  }
}

interface PixelHighlightProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
  gap?: number;
  speed?: number;
  colors?: string;
  opacity?: number;
  direction?:
    | "center"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
  fontSize?: string | number;
  fontWeight?: string | number;
  fontFamily?: string;
}

export function PixelHighlight({
  text,
  children,
  className = "",
  gap = 3,
  speed = 80,
  colors = "#fecdd3,#fda4af,#e11d48",
  opacity = 1,
  direction = "center",
  fontSize = 20,
  fontWeight = "bold",
  fontFamily = "sans-serif",
}: PixelHighlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number | null>(null);
  const timePreviousRef = useRef(performance.now());
  const isInView = useInView(containerRef, { amount: 0.3, once: false });
  const [svgMask, setSvgMask] = useState("");
  const [hasAnimated, setHasAnimated] = useState(false);

  const content = text || React.Children.toArray(children).join("");

  useEffect(() => {
    const updateSvgMask = () => {
      const responsiveFontSize =
        typeof fontSize === "number" ? `${fontSize}vw` : fontSize;
      const newSvgMask = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'><text x='50%' y='50%' font-size='${responsiveFontSize}' font-weight='${fontWeight}' text-anchor='middle' dominant-baseline='middle' font-family='${fontFamily}'>${content}</text></svg>`;
      setSvgMask(newSvgMask);
    };

    updateSvgMask();
    window.addEventListener("resize", updateSvgMask);
    return () => window.removeEventListener("resize", updateSvgMask);
  }, [content, fontSize, fontWeight, fontFamily]);

  useEffect(() => {
    if (!isInView) {
      setHasAnimated(false);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx && canvasRef.current) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      pixelsRef.current = [];
    }
  }, [isInView]);

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    const reducedMotionValue = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const getOriginPoint = (width: number, height: number) => {
      switch (direction) {
        case "top":
          return { x: width / 2, y: 0 };
        case "bottom":
          return { x: width / 2, y: height };
        case "left":
          return { x: 0, y: height / 2 };
        case "right":
          return { x: width, y: height / 2 };
        case "top-left":
          return { x: 0, y: 0 };
        case "top-right":
          return { x: width, y: 0 };
        case "bottom-left":
          return { x: 0, y: height };
        case "bottom-right":
          return { x: width, y: height };
        case "center":
        default:
          return { x: width / 2, y: height / 2 };
      }
    };

    const initPixels = () => {
      if (!containerRef.current || !canvasRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);
      const ctx = canvasRef.current.getContext("2d");

      if (!ctx) return;

      canvasRef.current.width = width;
      canvasRef.current.height = height;

      const origin = getOriginPoint(width, height);
      const colorsArray = colors.split(",");
      const pxs: Pixel[] = [];

      for (let x = 0; x < width; x += parseInt(gap.toString(), 10)) {
        for (let y = 0; y < height; y += parseInt(gap.toString(), 10)) {
          const color =
            colorsArray[Math.floor(Math.random() * colorsArray.length)];
          const dx = x - origin.x;
          const dy = y - origin.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const delay = reducedMotionValue ? 0 : distance;

          pxs.push(
            new Pixel(
              canvasRef.current!,
              ctx,
              x,
              y,
              color,
              getEffectiveSpeed(speed, reducedMotionValue),
              delay
            )
          );
        }
      }

      pixelsRef.current = pxs;
    };

    const doAnimate = () => {
      animationRef.current = requestAnimationFrame(doAnimate);

      const timeNow = performance.now();
      const timePassed = timeNow - timePreviousRef.current;
      const timeInterval = 1000 / 60;

      if (timePassed < timeInterval) return;
      timePreviousRef.current = timeNow - (timePassed % timeInterval);

      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx || !canvasRef.current) return;

      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      let allIdle = true;
      for (let i = 0; i < pixelsRef.current.length; i++) {
        const pixel = pixelsRef.current[i];
        pixel.appear();
        if (!pixel.isIdle) {
          allIdle = false;
        }
      }

      if (allIdle && animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        setHasAnimated(true);
      }
    };

    initPixels();
    animationRef.current = requestAnimationFrame(doAnimate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gap, speed, colors, direction, isInView, hasAnimated]);

  const dataUrlMask = `url("data:image/svg+xml,${encodeURIComponent(
    svgMask
  )}")`;

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          maskImage: dataUrlMask,
          WebkitMaskImage: dataUrlMask,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      >
        <canvas ref={canvasRef} className="h-full w-full" style={{ opacity }} />
      </div>
      <span className="sr-only">{content}</span>
    </div>
  );
}

export default PixelHighlight;
