'use client';
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Cluster {
  cx: number;
  cy: number;
  radius: number;
  count: number;
}

interface Particle {
  x: number;
  y: number;
  baseOpacity: number;
  phase: number;
}

interface AuroraDotsProps {
  particleColor?: string;
  particleSize?: number;
  glowIntensity?: number;
  hoverGlowIntensity?: number;
  animationSpeed?: number;
  hoverRadius?: number;
  interactive?: boolean;
  clusters?: Cluster[];
  className?: string;
  children?: React.ReactNode;
}

export function AuroraDots({
  particleColor = '34, 211, 238',
  particleSize = 2,
  glowIntensity = 0.3,
  hoverGlowIntensity = 0.5,
  animationSpeed = 3,
  hoverRadius = 10,
  interactive = true,
  clusters = [
    { cx: 20, cy: 15, radius: 8, count: 45 },
    { cx: 45, cy: 12, radius: 6, count: 35 },
    { cx: 70, cy: 18, radius: 10, count: 60 },
    { cx: 85, cy: 14, radius: 7, count: 40 },
    { cx: 15, cy: 35, radius: 9, count: 50 },
    { cx: 35, cy: 40, radius: 7, count: 42 },
    { cx: 55, cy: 38, radius: 8, count: 48 },
    { cx: 75, cy: 35, radius: 6, count: 38 },
    { cx: 88, cy: 40, radius: 7, count: 40 },
    { cx: 10, cy: 60, radius: 8, count: 45 },
    { cx: 30, cy: 58, radius: 9, count: 52 },
    { cx: 50, cy: 62, radius: 7, count: 42 },
    { cx: 68, cy: 60, radius: 10, count: 58 },
    { cx: 85, cy: 65, radius: 8, count: 46 },
    { cx: 18, cy: 82, radius: 7, count: 40 },
    { cx: 42, cy: 85, radius: 8, count: 48 },
    { cx: 65, cy: 80, radius: 9, count: 50 },
    { cx: 82, cy: 88, radius: 6, count: 35 },
  ],
  className,
  children,
}: AuroraDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number | undefined>(undefined);
  const autoHoverPosRef = useRef({ x: 0.5, y: 0.5, angle: 0 });
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !animationRef.current) {
          animate();
        }
      },
      { threshold: 0 },
    );

    observer.observe(container);

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Particle[] = [];
    clusters.forEach((cluster) => {
      for (let i = 0; i < cluster.count; i++) {
        const angle = (i / cluster.count) * Math.PI * 2;
        const radiusVariation = Math.random() * cluster.radius;
        const angleOffset = (Math.random() - 0.5) * 0.5;
        const x =
          (cluster.cx + Math.cos(angle + angleOffset) * radiusVariation) / 100;
        const y =
          (cluster.cy + Math.sin(angle + angleOffset) * radiusVariation) / 100;

        particles.push({
          x,
          y,
          baseOpacity: 0.2 + Math.random() * 0.1,
          phase: Math.random() * Math.PI * 2,
        });
      }
    });

    particlesRef.current = particles;

    const [r, g, b] = particleColor.split(',').map(Number);
    const startTime = Date.now();
    const fpsInterval = 1000 / 30;
    let lastFrameTime = Date.now();

    const animate = () => {
      if (!isVisibleRef.current) {
        animationRef.current = undefined;
        return;
      }

      const now = Date.now();
      const elapsed = now - lastFrameTime;

      if (elapsed > fpsInterval) {
        lastFrameTime = now - (elapsed % fpsInterval);
        const totalElapsed = (now - startTime) / 1000;

        autoHoverPosRef.current.angle += 0.01;
        const radius = 0.3;
        autoHoverPosRef.current.x =
          0.5 + Math.cos(autoHoverPosRef.current.angle) * radius;
        autoHoverPosRef.current.y =
          0.5 + Math.sin(autoHoverPosRef.current.angle) * radius;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
          const px = particle.x * canvas.width;
          const py = particle.y * canvas.height;

          const wave = Math.sin(totalElapsed / animationSpeed + particle.phase);
          let opacity =
            particle.baseOpacity + wave * glowIntensity + glowIntensity;
          let size = particleSize;
          let blur = particleSize * 3;
          let glowAlpha = glowIntensity;

          const autoHoverX = autoHoverPosRef.current.x * canvas.width;
          const autoHoverY = autoHoverPosRef.current.y * canvas.height;
          const autoDx = px - autoHoverX;
          const autoDy = py - autoHoverY;
          const autoDistance = Math.sqrt(autoDx * autoDx + autoDy * autoDy);
          const autoNormalizedDistance =
            autoDistance / ((canvas.width * hoverRadius) / 100);

          if (autoNormalizedDistance < 1) {
            const factor = 1 - autoNormalizedDistance;
            opacity = Math.min(1, opacity + factor * 0.6);
            size *= 1 + factor * 0.5;
            blur = size * 5;
            glowAlpha = Math.min(1, glowAlpha + factor * hoverGlowIntensity);
          }

          if (interactive) {
            const dx = px - mouseRef.current.x;
            const dy = py - mouseRef.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const normalizedDistance =
              distance / ((canvas.width * hoverRadius) / 100);

            if (normalizedDistance < 1) {
              const factor = 1 - normalizedDistance;
              opacity = Math.min(1, opacity + factor * 0.5);
              size *= 1 + factor * 0.4;
              blur = size * 5;
              glowAlpha = hoverGlowIntensity;
            }
          }

          ctx.save();
          ctx.shadowBlur = blur;
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${glowAlpha})`;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(
            1,
            Math.max(0, opacity),
          )})`;
          ctx.beginPath();
          ctx.arc(px, py, size / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    clusters,
    particleColor,
    particleSize,
    glowIntensity,
    hoverGlowIntensity,
    animationSpeed,
    hoverRadius,
    interactive,
  ]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 };
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full h-full', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        className='absolute inset-0 w-full h-full pointer-events-none'
      />
      {children && (
        <div className='relative z-10 w-full h-full'>{children}</div>
      )}
    </div>
  );
}
