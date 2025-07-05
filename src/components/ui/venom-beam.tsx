import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
}

interface VenomBeamProps {
  children?: React.ReactNode;
  className?: string;
}

const VenomBeam: React.FC<VenomBeamProps> = ({ children, className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isDarkRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        isDarkRef.current = document.documentElement.classList.contains("dark");
        if (isDarkRef.current) {
          ctx.fillStyle = "#000000";
        } else {
          ctx.fillStyle = "#f8f8ff";
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    resizeCanvas();

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
        initParticles();
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 80; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 0,
          maxLife: Math.random() * 100 + 50,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
        });
      }
    };

    initParticles();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      isDarkRef.current = document.documentElement.classList.contains("dark");

      if (isDarkRef.current) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      } else {
        ctx.fillStyle = "rgba(248, 248, 255, 0.1)";
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx += (dx / distance) * force * 0.1;
          particle.vy += (dy / distance) * force * 0.1;
        }

        particle.vx *= 0.99;
        particle.vy *= 0.99;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.8;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -0.8;

        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        if (particle.life > particle.maxLife) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.vx = (Math.random() - 0.5) * 2;
          particle.vy = (Math.random() - 0.5) * 2;
          particle.life = 0;
          particle.maxLife = Math.random() * 100 + 50;
        }

        const alpha = particle.opacity * (1 - particle.life / particle.maxLife);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 2
        );

        if (isDarkRef.current) {
          gradient.addColorStop(0, `rgba(200, 200, 255, ${alpha})`);
          gradient.addColorStop(0.5, `rgba(150, 150, 200, ${alpha * 0.8})`);
          gradient.addColorStop(1, `rgba(100, 100, 150, ${alpha * 0.3})`);
        } else {
          gradient.addColorStop(0, `rgba(60, 60, 120, ${alpha})`);
          gradient.addColorStop(0.5, `rgba(80, 80, 140, ${alpha * 0.8})`);
          gradient.addColorStop(1, `rgba(100, 100, 160, ${alpha * 0.3})`);
        }

        ctx.fillStyle = gradient;
        ctx.fill();
      });

      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const alpha = ((100 - distance) / 100) * 0.3;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);

            if (isDarkRef.current) {
              ctx.strokeStyle = `rgba(150, 150, 200, ${alpha})`;
            } else {
              ctx.strokeStyle = `rgba(80, 80, 140, ${alpha})`;
            }
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      if (resizeTimeout) clearTimeout(resizeTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative  h-[24rem] md:h-screen w-full overflow-hidden bg-white dark:bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/60 dark:via-black/20 dark:to-black/60" />

      <div className={`absolute inset-0 ${className}`}>{children}</div>

      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse opacity-60" />
      <div className="absolute top-40 right-20 w-1 h-1 bg-purple-600 dark:bg-purple-400 rounded-full animate-pulse opacity-40" />
      <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-blue-500 dark:bg-blue-300 rounded-full animate-pulse opacity-50" />
      <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-purple-500 dark:bg-purple-300 rounded-full animate-pulse opacity-30" />
    </div>
  );
};

export default VenomBeam;
