"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LustreText from "@/components/ui/lustretext";
import { useTheme } from "next-themes";
import Globe from "@/components/ui/globe";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.4,
      duration: 0.8,
    },
  },
};

const textVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 15 },
  },
};

declare module "@/components/ui/badge" {
  interface BadgeProps {
    shiny?: boolean;
    shinySpeed?: number;
  }
}

interface HeroUIProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  features?: string[];
  className?: string;
  globeBaseColor?: {
    light: [number, number, number];
    dark: [number, number, number];
  };
  globeMarkerColor?: {
    light: [number, number, number];
    dark: [number, number, number];
  };
  globeGlowColor?: {
    light: [number, number, number];
    dark: [number, number, number];
  };
}

export default function HeroUI({
  title = "ScrollX UI",
  subtitle = "Where Interactions Spark Joy",
  badgeText = "✨ Now Open Source",
  primaryCTA = "Get Started",
  secondaryCTA = "Documentation",
  features = [
    "TypeScript First",
    "Dark Mode",
    "100% Customizable",
    "MIT Licensed",
  ],
  className = "",
  globeBaseColor = {
    light: [0.98, 0.98, 0.98],
    dark: [0.12, 0.12, 0.12],
  },
  globeMarkerColor = {
    light: [0.2, 0.5, 0.9],
    dark: [0.1, 0.8, 1],
  },
  globeGlowColor = {
    light: [0.3, 0.3, 0.3],
    dark: [1, 1, 1],
  },
}: HeroUIProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section
      ref={ref}
      className={cn(
        "relative overflow-hidden min-h-[90vh] flex items-center",
        className
      )}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px]" />
        <motion.div
          className="absolute top-20 left-1/4 w-60 h-60 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[30rem] lg:h-[30rem] bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-6 sm:py-8 md:py-16 lg:py-24">
        <div className="relative min-h-[60vh] md:min-h-[70vh]">
          <motion.div
            className="absolute right-0 bottom-4 top-auto w-[70%] md:top-2 md:bottom-auto md:w-1/2 lg:top-[-60px] lg:right-[-40px] xl:top-[-80px] xl:right-[-60px] transition-all duration-500"
            style={{ y }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            <div className="w-full h-[220px] md:h-[300px] lg:h-[400px] xl:h-[450px]">
              <Globe
                baseColor={
                  theme === "dark"
                    ? (globeBaseColor.dark as [number, number, number])
                    : (globeBaseColor.light as [number, number, number])
                }
                markerColor={
                  theme === "dark"
                    ? (globeMarkerColor.dark as [number, number, number])
                    : (globeMarkerColor.light as [number, number, number])
                }
                glowColor={
                  theme === "dark"
                    ? (globeGlowColor.dark as [number, number, number])
                    : (globeGlowColor.light as [number, number, number])
                }
              />
            </div>
          </motion.div>

          <motion.div
            className="relative z-20 w-full md:w-7/12 lg:w-1/2 pt-6 sm:pt-8 md:pt-16 lg:pt-24 md:ml-8 lg:ml-16 md:-mt-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Badge
              variant="destructive"
              className="w-fit mb-4"
              shiny
              shinySpeed={3}
            >
              {badgeText}
            </Badge>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
              variants={textVariants}
            >
              <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 bg-clip-text text-transparent">
                {title}
              </span>
              <span className="text-foreground mt-2 block">
                {subtitle.includes("Interactions") ? (
                  <>
                    Where{" "}
                    <LustreText
                      text="Interactions"
                      speed={8}
                      className="inline"
                    />{" "}
                    <span className="border-b-4 border-cyan-400/50">
                      Spark Joy
                    </span>
                  </>
                ) : (
                  subtitle
                )}
              </span>
            </motion.h1>

            <motion.div
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mt-4"
              variants={textVariants}
            >
              Animated, accessible, and customizable components built with{" "}
              <Badge variant="default" className="mx-1">
                Framer Motion
              </Badge>{" "}
              and{" "}
              <Badge variant="default" className="mx-1">
                Tailwind CSS
              </Badge>
            </motion.div>

            <motion.div
              className="flex gap-4 mt-6 max-[375px]:flex-col max-[375px]:w-full max-[375px]:gap-3"
              variants={textVariants}
            >
              <Button
                size="lg"
                className="group relative overflow-hidden rounded-xl px-8 py-6 text-lg font-semibold shadow-xl max-[375px]:w-full max-[375px]:px-4 max-[375px]:py-4"
              >
                <LustreText
                  text={primaryCTA}
                  speed={6}
                  className="relative z-10 bg-white dark:bg-red-950 text-[clamp(0.75rem,2vw,1.25rem)]"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="rounded-xl px-8 py-6 text-lg font-semibold border-2 backdrop-blur-sm max-[375px]:w-full max-[375px]:px-4 max-[375px]:py-4"
              >
                <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  {secondaryCTA}
                </span>
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center gap-8 mt-12 opacity-70"
              variants={textVariants}
            >
              <div className="flex gap-4 flex-wrap">
                {features.map((text) => (
                  <Badge
                    key={text}
                    variant="outline"
                    className="py-1.5 px-3 text-sm border-muted-foreground/30 bg-background/50"
                  >
                    {text}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
