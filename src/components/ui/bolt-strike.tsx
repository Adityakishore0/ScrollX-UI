'use client';
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type BoltStrikeProps = {
  color?: string;
  speed?: number;
  intensity?: number;
  className?: string;
  children?: React.ReactNode;
};

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 4;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = 0;
    this.maxLife = 30 + Math.random() * 30;
    this.size = 2 + Math.random() * 2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.96;
    this.vy *= 0.96;
    this.life++;
  }

  draw(ctx: CanvasRenderingContext2D, color: string) {
    const alpha = Math.max(0, 1 - this.life / this.maxLife);
    const radius = Math.max(0.1, this.size * alpha);
    ctx.shadowBlur = 10;
    ctx.shadowColor = color;
    ctx.fillStyle =
      color +
      Math.floor(alpha * 255)
        .toString(16)
        .padStart(2, '0');
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  isDead() {
    return this.life >= this.maxLife;
  }
}

class Lightning {
  segments: Array<{ x: number; y: number }>;
  life: number;
  maxLife: number;
  thickness: number;

  constructor(startX: number, startY: number, endX: number, endY: number) {
    this.segments = [];
    this.life = 0;
    this.maxLife = 12;
    this.thickness = 1.5 + Math.random() * 2;
    this.generate(startX, startY, endX, endY);
  }

  generate(startX: number, startY: number, endX: number, endY: number) {
    const distance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
    const steps = Math.max(6, Math.floor(distance / 25));
    const roughness = distance / 12;

    this.segments.push({ x: startX, y: startY });

    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      const x =
        startX + (endX - startX) * t + (Math.random() - 0.5) * roughness;
      const y =
        startY + (endY - startY) * t + (Math.random() - 0.5) * roughness;
      this.segments.push({ x, y });
    }

    this.segments.push({ x: endX, y: endY });
  }

  update() {
    this.life++;
  }

  draw(ctx: CanvasRenderingContext2D, color: string) {
    const alpha = Math.max(0, 1 - this.life / this.maxLife);

    ctx.shadowBlur = 25;
    ctx.shadowColor = color;
    ctx.strokeStyle =
      color +
      Math.floor(alpha * 255)
        .toString(16)
        .padStart(2, '0');
    ctx.lineWidth = this.thickness * 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    this.segments.forEach((seg, i) => {
      if (i === 0) ctx.moveTo(seg.x, seg.y);
      else ctx.lineTo(seg.x, seg.y);
    });
    ctx.stroke();

    ctx.lineWidth = this.thickness * 0.7;
    ctx.strokeStyle =
      '#ffffff' +
      Math.floor(alpha * 220)
        .toString(16)
        .padStart(2, '0');
    ctx.beginPath();
    this.segments.forEach((seg, i) => {
      if (i === 0) ctx.moveTo(seg.x, seg.y);
      else ctx.lineTo(seg.x, seg.y);
    });
    ctx.stroke();

    ctx.shadowBlur = 0;
  }

  isDead() {
    return this.life >= this.maxLife;
  }
}

class Spark {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  size: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.life = 0;
    this.maxLife = 20;
    this.size = 8 + Math.random() * 12;
  }

  update() {
    this.life++;
  }

  draw(ctx: CanvasRenderingContext2D, color: string) {
    const alpha = Math.max(0, 1 - this.life / this.maxLife);
    const currentSize = Math.max(
      0.1,
      this.size * (1 - this.life / this.maxLife),
    );

    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      currentSize,
    );
    gradient.addColorStop(
      0,
      '#ffffff' +
        Math.floor(alpha * 255)
          .toString(16)
          .padStart(2, '0'),
    );
    gradient.addColorStop(
      0.3,
      color +
        Math.floor(alpha * 255)
          .toString(16)
          .padStart(2, '0'),
    );
    gradient.addColorStop(1, color + '00');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
    ctx.fill();
  }

  isDead() {
    return this.life >= this.maxLife;
  }
}

function BoltStrike({
  color = '#7c3aed',
  speed = 1,
  intensity = 1,
  className = '',
  children,
}: BoltStrikeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Particle[] = [];
    const lightnings: Lightning[] = [];
    const sparks: Spark[] = [];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.08 * intensity) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;

        sparks.push(new Spark(x, y));

        const branches = 3 + Math.floor(Math.random() * 4);
        for (let i = 0; i < branches; i++) {
          const angle = (Math.PI * 2 * i) / branches + Math.random() * 0.5;
          const dist = 60 + Math.random() * 100;
          const endX = x + Math.cos(angle) * dist;
          const endY = y + Math.sin(angle) * dist;
          lightnings.push(new Lightning(x, y, endX, endY));
        }

        for (let i = 0; i < 15; i++) {
          particles.push(new Particle(x, y));
        }
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        sparks[i].update();
        if (sparks[i].isDead()) {
          sparks.splice(i, 1);
        } else {
          sparks[i].draw(ctx, color);
        }
      }

      for (let i = lightnings.length - 1; i >= 0; i--) {
        lightnings[i].update();
        if (lightnings[i].isDead()) {
          lightnings.splice(i, 1);
        } else {
          lightnings[i].draw(ctx, color);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        if (particles[i].isDead()) {
          particles.splice(i, 1);
        } else {
          particles[i].draw(ctx, color);
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [color, speed, intensity]);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <canvas
        ref={canvasRef}
        className='absolute inset-0 w-full h-full'
        style={{ pointerEvents: 'none' }}
      />
      {children && <div className='relative z-10'>{children}</div>}
    </div>
  );
}

export { BoltStrike };
