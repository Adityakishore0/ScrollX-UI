"use client";
import React, { useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface SparkWavesProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkCount?: number;
  duration?: number;
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
  waveInterval?: number;
  maxRadius?: number;
  ringsPerWave?: number;
  ringSpacing?: number;
  enableInward?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  radius: number;
  startTime: number;
  waveId: number;
  ringIndex: number;
  direction: "outward" | "inward";
}

export const SparkWaves: React.FC<SparkWavesProps> = ({
  sparkColor = "#3b82f6",
  sparkSize = 10,
  sparkCount = 24,
  duration = 4000,
  easing = "ease-out",
  waveInterval = 1400,
  maxRadius = 1000,
  ringsPerWave = 6,
  ringSpacing = 50,
  enableInward = true,
  className = "",
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const lastWaveTimeRef = useRef<number>(0);
  const lastInwardWaveTimeRef = useRef<number>(700);
  const waveIdRef = useRef<number>(0);
  const centerXRef = useRef<number>(0);
  const centerYRef = useRef<number>(0);
  const maxScreenRadiusRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout: NodeJS.Timeout;

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        centerXRef.current = width / 2;
        centerYRef.current = height / 2;
        maxScreenRadiusRef.current =
          Math.sqrt(width * width + height * height) / 2 + 100;
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(parent);

    resizeCanvas();

    return () => {
      ro.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case "linear":
          return t;
        case "ease-in":
          return t * t;
        case "ease-in-out":
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (timestamp - lastWaveTimeRef.current >= waveInterval) {
        const currentWaveId = waveIdRef.current++;

        for (let ringIndex = 0; ringIndex < ringsPerWave; ringIndex++) {
          const ringDelay = ringIndex * 150;

          for (let i = 0; i < sparkCount; i++) {
            const angleOffset = ringIndex % 2 === 0 ? 0 : Math.PI / sparkCount;
            const angle = (2 * Math.PI * i) / sparkCount + angleOffset;

            sparksRef.current.push({
              x: centerXRef.current,
              y: centerYRef.current,
              angle: angle,
              radius: ringIndex * ringSpacing,
              startTime: timestamp + ringDelay,
              waveId: currentWaveId,
              ringIndex: ringIndex,
              direction: "outward",
            });
          }
        }

        lastWaveTimeRef.current = timestamp;
      }

      if (
        enableInward &&
        timestamp - lastInwardWaveTimeRef.current >= waveInterval
      ) {
        const currentWaveId = waveIdRef.current++;

        for (let ringIndex = 0; ringIndex < ringsPerWave; ringIndex++) {
          const ringDelay = ringIndex * 150;

          for (let i = 0; i < sparkCount; i++) {
            const angleOffset =
              ringIndex % 2 === 0 ? Math.PI / sparkCount / 2 : 0;
            const angle = (2 * Math.PI * i) / sparkCount + angleOffset;

            sparksRef.current.push({
              x: centerXRef.current,
              y: centerYRef.current,
              angle: angle,
              radius: maxScreenRadiusRef.current - ringIndex * ringSpacing,
              startTime: timestamp + ringDelay,
              waveId: currentWaveId,
              ringIndex: ringIndex,
              direction: "inward",
            });
          }
        }

        lastInwardWaveTimeRef.current = timestamp;
      }

      sparksRef.current = sparksRef.current.filter((spark: Spark) => {
        const elapsed = timestamp - spark.startTime;

        if (elapsed < 0) return true;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        let currentRadius: number;

        if (spark.direction === "outward") {
          const expansionDistance = eased * maxRadius;
          currentRadius = spark.radius + expansionDistance;
        } else {
          const contractionDistance = eased * (maxScreenRadiusRef.current - 0);
          currentRadius = spark.radius - contractionDistance;

          if (currentRadius < 0) return false;
        }

        const fadeStart = 0.6;
        const opacity =
          progress < fadeStart
            ? 1
            : 1 - (progress - fadeStart) / (1 - fadeStart);

        const lineLength = sparkSize * (1 - eased * 0.3);

        const x1 = spark.x + currentRadius * Math.cos(spark.angle);
        const y1 = spark.y + currentRadius * Math.sin(spark.angle);

        const lineAngle =
          spark.direction === "inward" ? spark.angle + Math.PI : spark.angle;
        const x2 = x1 + lineLength * Math.cos(lineAngle);
        const y2 = y1 + lineLength * Math.sin(lineAngle);

        ctx.shadowBlur = 10;
        ctx.shadowColor = sparkColor;
        ctx.strokeStyle = sparkColor;
        ctx.globalAlpha = opacity;
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [
    sparkColor,
    sparkSize,
    sparkCount,
    duration,
    easeFunc,
    waveInterval,
    maxRadius,
    ringsPerWave,
    ringSpacing,
    enableInward,
  ]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
};
