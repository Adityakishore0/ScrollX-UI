"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface DriftCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export default function DriftCard({
  children,
  className,
  style,
  ...props
}: DriftCardProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const offsetX = ((x - centerX) / centerX) * 12;
    const offsetY = ((y - centerY) / centerY) * 12;
    setPosition({ x: offsetX, y: offsetY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border shadow-2xl p-3 bg-card",
        className
      )}
      style={style}
      {...props}
    >
      <div
        className="relative flex-1 rounded-2xl border border-border p-2 h-full w-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          background:
            "repeating-linear-gradient(45deg, hsl(var(--muted) / 0.3) 0px, hsl(var(--muted) / 0.3) 10px, hsl(var(--border) / 1) 10px, hsl(var(--border) / 1) 11px)",
        }}
      >
        <div
          className="absolute inset-2 opacity-10 rounded-2xl pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(315deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 1px, transparent 0, transparent 50%)",
            backgroundSize: "10px 10px",
          }}
        />

        <div
          className="absolute inset-2 rounded-2xl bg-card shadow-lg flex items-center justify-center transition-all duration-300 ease-out"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
