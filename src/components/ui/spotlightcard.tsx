"use client";

import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface SpotlightCardProps extends React.ComponentProps<typeof Card> {
  title?: string;
  description?: string;
  spotlightColor?: string;
  children?: React.ReactNode;
}

export function SpotlightCard({
  title,
  description,
  spotlightColor = "14, 165, 233",
  children,
  className,
  ...props
}: SpotlightCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  const backgroundImage = useMotionTemplate`radial-gradient(300px circle at ${spotlightX}px ${spotlightY}px, rgba(${spotlightColor}, 0.15), transparent)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    mouseX.set(x);
    mouseY.set(y);
    spotlightX.set(x);
    spotlightY.set(y);
  };

  return (
    <Card
      className="group relative overflow-hidden border rounded-lg h-72"
      style={{ "--spotlight-color": spotlightColor } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ backgroundImage }}
      />
      <CardContent className="flex flex-col justify-center items-center h-full p-6">
        {children ? (
          children
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
