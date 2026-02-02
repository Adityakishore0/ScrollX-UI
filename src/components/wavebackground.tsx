"use client";

import React, { useEffect, useRef, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

type ArcPosition = "top" | "bottom" | "left" | "right" | "both";

interface ArcDefaults {
  radius: number;
  thickness: number;
  speed: number;
  offset: number;
  opacity: number;
  blur: number;
  waveAmp: number;
  segments: number;
}

interface ArcData extends ArcDefaults {
  color: string;
}

interface Point {
  x: number;
  y: number;
  fade: number;
}

const waveBackgroundVariants = cva(
  "relative w-full h-full transition-colors duration-300",
  {
    variants: {
      variant: {
        violet: "bg-white dark:bg-black",
        ocean: "bg-white dark:bg-[#000a0f]",
        ember: "bg-white dark:bg-[#0f0000]",
        emerald: "bg-white dark:bg-[#000f05]",
        aurora: "bg-white dark:bg-[#050510]",
      },
    },
    defaultVariants: {
      variant: "violet",
    },
  }
);

const ARC_COLORS = {
  violet: ["#8B7AFF", "#A593FF", "#6B5AEF", "#7B6AFF", "#5B4ADF", "#9B8AFF"],
  ocean: ["#00B4D8", "#48CAE4", "#0096C7", "#0077B6", "#90E0EF", "#ADE8F4"],
  ember: ["#FF6B35", "#FF8C42", "#E84855", "#D62828", "#F4A261", "#E76F51"],
  emerald: ["#2D6A4F", "#40916C", "#52B788", "#74C69D", "#1B4332", "#95D5B2"],
  aurora: ["#7209B7", "#3A0CA3", "#4CC9F0", "#00B4D8", "#F72585", "#B5179E"],
};

const CENTER_GLOW_COLORS = {
  violet: "#6B5AEF",
  ocean: "#0096C7",
  ember: "#E84855",
  emerald: "#40916C",
  aurora: "#4CC9F0",
};

const DEFAULT_ARC_PARAMS: ArcDefaults[] = [
  {
    radius: 250,
    thickness: 12,
    speed: 0.8,
    offset: 0,
    opacity: 1.0,
    blur: 30,
    waveAmp: 20,
    segments: 80,
  },
  {
    radius: 280,
    thickness: 8,
    speed: 0.85,
    offset: 0.5,
    opacity: 0.85,
    blur: 25,
    waveAmp: 20,
    segments: 80,
  },
  {
    radius: 310,
    thickness: 6,
    speed: 0.75,
    offset: 1.0,
    opacity: 0.75,
    blur: 20,
    waveAmp: 18,
    segments: 70,
  },
  {
    radius: 340,
    thickness: 4,
    speed: 0.7,
    offset: 1.5,
    opacity: 0.65,
    blur: 18,
    waveAmp: 18,
    segments: 70,
  },
  {
    radius: 370,
    thickness: 3,
    speed: 0.65,
    offset: 2.0,
    opacity: 0.55,
    blur: 15,
    waveAmp: 15,
    segments: 60,
  },
  {
    radius: 400,
    thickness: 2,
    speed: 0.6,
    offset: 2.5,
    opacity: 0.45,
    blur: 12,
    waveAmp: 15,
    segments: 60,
  },
];

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function drawArc(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  time: number,
  arc: ArcData
): void {
  const {
    color,
    radius,
    thickness,
    speed,
    offset,
    opacity,
    blur,
    waveAmp,
    segments,
  } = arc;
  const startAngle = Math.PI * 0.3;
  const endAngle = Math.PI * 0.7;
  const points: Point[] = [];

  for (let i = 0; i <= segments; i++) {
    const progress = i / segments;
    const angle = startAngle + (endAngle - startAngle) * progress;
    const wave = Math.sin(progress * 5 + time * speed + offset) * waveAmp;
    const r = radius + wave;
    points.push({
      x: centerX + Math.cos(angle) * r,
      y: centerY - Math.sin(angle) * r,
      fade: Math.sin(progress * Math.PI),
    });
  }

  ctx.save();
  ctx.shadowBlur = blur;
  ctx.shadowColor = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = thickness;
  ctx.lineCap = "round";

  for (let i = 0; i < points.length - 1; i++) {
    ctx.globalAlpha = opacity * points[i].fade;
    ctx.beginPath();
    ctx.moveTo(points[i].x, points[i].y);
    ctx.lineTo(points[i + 1].x, points[i + 1].y);
    ctx.stroke();
  }

  ctx.restore();
}

function drawArcsForSide(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  time: number,
  arcs: ArcData[],
  side: "top" | "bottom" | "left" | "right",
  arcSpacing: number
): void {
  ctx.save();

  switch (side) {
    case "top":
      arcs.forEach((arc) => drawArc(ctx, centerX, centerY, time, arc));
      break;

    case "bottom":
      ctx.translate(centerX, centerY);
      ctx.scale(1, -1);
      ctx.translate(-centerX, -centerY);
      arcs.forEach((arc) => drawArc(ctx, centerX, centerY, time, arc));
      break;

    case "left":
      ctx.translate(centerX - arcSpacing, centerY);
      ctx.rotate(Math.PI / 2);
      arcs.forEach((arc) => drawArc(ctx, 0, 0, time, arc));
      break;

    case "right":
      ctx.translate(centerX + arcSpacing, centerY);
      ctx.rotate(-Math.PI / 2);
      arcs.forEach((arc) => drawArc(ctx, 0, 0, time, arc));
      break;
  }

  ctx.restore();
}

export interface WaveBackgroundProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof waveBackgroundVariants> {
  position?: ArcPosition;
  arcCount?: number;
  arcRadii?: number[];
  arcThicknesses?: number[];
  arcSpeeds?: number[];
  arcOffsets?: number[];
  arcOpacities?: number[];
  arcBlurs?: number[];
  arcWaveAmps?: number[];
  centerGlowRadius?: number;
  centerGlowIntensity?: number;
  speed?: number;
  arcSpacing?: number;
}

const WaveBackground = forwardRef<HTMLDivElement, WaveBackgroundProps>(
  (
    {
      variant = "violet",
      position = "both",
      arcCount,
      arcRadii,
      arcThicknesses,
      arcSpeeds,
      arcOffsets,
      arcOpacities,
      arcBlurs,
      arcWaveAmps,
      centerGlowRadius = 300,
      centerGlowIntensity = 0.08,
      speed = 1,
      arcSpacing = 480,
      children,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const colors = ARC_COLORS[variant || "violet"] as string[];
    const count =
      arcCount !== undefined ? clamp(arcCount, 1, 6) : colors.length;
    const glowColor = CENTER_GLOW_COLORS[variant || "violet"];

    useEffect(() => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const mediaQuery = window.matchMedia("(max-width: 767px)");
      if (mediaQuery.matches) return;

      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      const setCanvasSize = () => {
        const rect = container.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.scale(dpr, dpr);
      };
      setCanvasSize();

      let animId: number;

      const handleMediaChange = (e: MediaQueryListEvent) => {
        if (e.matches) {
          cancelAnimationFrame(animId);
        }
      };

      mediaQuery.addEventListener("change", handleMediaChange);

      const resizeObserver = new ResizeObserver(setCanvasSize);
      resizeObserver.observe(container);

      const arcs: ArcData[] = [];
      for (let i = 0; i < count; i++) {
        const d = DEFAULT_ARC_PARAMS[i];
        arcs.push({
          color: colors[i] ?? "#ffffff",
          radius: arcRadii?.[i] ?? d.radius,
          thickness: arcThicknesses?.[i] ?? d.thickness,
          speed: (arcSpeeds?.[i] ?? d.speed) * speed,
          offset: arcOffsets?.[i] ?? d.offset,
          opacity: arcOpacities?.[i] ?? d.opacity,
          blur: arcBlurs?.[i] ?? d.blur,
          waveAmp: arcWaveAmps?.[i] ?? d.waveAmp,
          segments: d.segments,
        });
      }

      const mirroredArcs: ArcData[] = arcs.map((arc) => ({
        ...arc,
        offset: arc.offset + 3.14,
      }));

      let time = 0;

      const animate = () => {
        const w = canvas.width / (window.devicePixelRatio || 1);
        const h = canvas.height / (window.devicePixelRatio || 1);
        const cX = w / 2;
        const cY = h / 2;

        ctx.clearRect(0, 0, w, h);

        if (position === "both") {
          drawArcsForSide(ctx, cX, cY, time, arcs, "left", arcSpacing);
          drawArcsForSide(ctx, cX, cY, time, mirroredArcs, "right", arcSpacing);
        } else {
          drawArcsForSide(ctx, cX, cY, time, arcs, position, arcSpacing);
        }

        ctx.save();
        const cgGrad = ctx.createRadialGradient(
          cX,
          cY,
          0,
          cX,
          cY,
          centerGlowRadius
        );
        const alphaHigh = Math.round(centerGlowIntensity * 255)
          .toString(16)
          .padStart(2, "0");
        const alphaMid = Math.round(centerGlowIntensity * 0.5 * 255)
          .toString(16)
          .padStart(2, "0");
        cgGrad.addColorStop(0, glowColor + alphaHigh);
        cgGrad.addColorStop(0.5, glowColor + alphaMid);
        cgGrad.addColorStop(1, "transparent");
        ctx.fillStyle = cgGrad;
        ctx.fillRect(0, 0, w, h);
        ctx.restore();

        time += 0.016;
        animId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        cancelAnimationFrame(animId);
        resizeObserver.disconnect();
        mediaQuery.removeEventListener("change", handleMediaChange);
      };
    }, [
      variant,
      position,
      arcCount,
      arcRadii,
      arcThicknesses,
      arcSpeeds,
      arcOffsets,
      arcOpacities,
      arcBlurs,
      arcWaveAmps,
      centerGlowRadius,
      centerGlowIntensity,
      speed,
      arcSpacing,
      glowColor,
      colors,
      count,
    ]);

    const setRefs = (el: HTMLDivElement | null) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current =
        el;
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }
    };

    return (
      <div
        ref={setRefs}
        className={cn(waveBackgroundVariants({ variant }), className)}
        style={style}
        {...rest}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
        />

        {children}
      </div>
    );
  }
);

WaveBackground.displayName = "WaveBackground";

export default WaveBackground;
