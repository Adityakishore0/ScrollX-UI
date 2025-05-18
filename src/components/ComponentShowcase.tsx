"use client";

import { useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ParticlesDemo from "@/components/demos/particles-demo";

export function ComponentShowcase() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Stunning Components
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Explore our library of animated components that will elevate your
              UI
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-5xl mt-12">
          <Tabs defaultValue="cards" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="buttons">Buttons</TabsTrigger>
              <TabsTrigger value="effects">Effects</TabsTrigger>
            </TabsList>
            <TabsContent value="cards" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SpotlightCard />
                <GlowingBorderCard />
              </div>
            </TabsContent>
            <TabsContent value="buttons" className="space-y-8">
              <div className="flex flex-wrap justify-center gap-4">
                <AnimatedButton label="Primary Button" variant="primary" />
                <AnimatedButton label="Secondary Button" variant="secondary" />
                <AnimatedButton label="Outline Button" variant="outline" />
              </div>
            </TabsContent>
            <TabsContent value="effects" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BackgroundGradient>
                  <div className="flex flex-col justify-center items-center h-56 p-4 text-center">
                    <h3 className="text-xl font-bold mb-2">
                      Background Gradient
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      A beautiful animated gradient background effect
                    </p>
                  </div>
                </BackgroundGradient>
                <ParticleEffect />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

function SpotlightCard() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);
  const backgroundImage = useMotionTemplate`radial-gradient(300px circle at ${spotlightX}px ${spotlightY}px, rgba(var(--spotlight-color), 0.15), transparent)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
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
      style={{ "--spotlight-color": "14, 165, 233" } as React.CSSProperties}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ backgroundImage }}
      />
      <CardContent className="flex flex-col justify-center items-center h-full p-6">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Spotlight Card</h3>
          <p className="text-sm text-muted-foreground">
            Hover over this card to see the spotlight effect
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function GlowingBorderCard() {
  return (
    <div className="relative group">
      <div
        className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75
        group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
      />
      <div className="relative flex items-center justify-center h-72 bg-black rounded-lg p-6">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2 text-white">
            Glowing Border Card
          </h3>
          <p className="text-sm text-gray-300">
            Hover over this card to see the glowing border effect
          </p>
        </div>
      </div>
    </div>
  );
}

function AnimatedButton({
  label,
  variant = "primary",
}: {
  label: string;
  variant?: "primary" | "secondary" | "outline";
}) {
  return (
    <motion.button
      className={cn(
        "relative px-6 py-3 text-sm font-medium rounded-md",
        variant === "primary" && "bg-blue-600 text-white",
        variant === "secondary" && "bg-purple-600 text-white",
        variant === "outline" &&
          "bg-transparent text-primary border border-primary"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.button>
  );
}

function BackgroundGradient({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative group rounded-lg p-[1px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 group-hover:opacity-80 blur-sm transition duration-500" />
      <div className="absolute inset-[1px] bg-black rounded-lg" />
      <div className="relative text-white">{children}</div>
    </div>
  );
}

function ParticleEffect() {
  const [particles] = useState(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 1,
      color: ["bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-green-500"][
        Math.floor(Math.random() * 4)
      ],
    }))
  );

  return (
    <div className="relative h-72 overflow-hidden rounded-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-black to-slate-900">
        <ParticlesDemo />
      </div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full p-6 text-center">
        <h3 className="text-xl font-bold mb-2 text-white">Particle Effect</h3>
        <p className="text-sm text-gray-300">
          Animated particles floating in the background
        </p>
      </div>
    </div>
  );
}
