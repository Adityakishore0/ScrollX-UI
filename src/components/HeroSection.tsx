"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Scrollxx from "@/svg/Scrollx.svg";
import Scrollxdark from "@/svg/Scrollxdark.svg";
import { useState, useEffect } from "react";

export function HeroSection() {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // Set isMounted to true when component mounts on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative w-full py-8 md:py-12 lg:py-16 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full opacity-10 dark:opacity-20">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:translate-y-0 lg:-translate-x-1/2"
          >
            <circle
              cx="512"
              cy="512"
              r="512"
              fill="url(#gradient)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="gradient">
                <stop stopColor="#3b82f6" />
                <stop offset="0.5" stopColor="#8b5cf6" />
                <stop offset="1" stopColor="#ec4899" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="container relative px-4 md:px-6 mx-auto max-w-7xl">
        {/* SVG positioned at top and center with reduced spacing */}
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="w-11/12 max-w-3xl h-24 sm:h-28 md:h-32 lg:h-40 relative flex items-center justify-center">
            {isMounted ? (
              theme === "dark" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <Scrollxx className="w-full h-full object-contain" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <Scrollxdark className="w-full h-full object-contain" />
                </motion.div>
              )
            ) : (
              // Placeholder during server-side rendering
              <div className="w-full h-full flex items-center justify-center" />
            )}
          </div>
        </div>

        {/* Split layout with description on left and graph on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side: Text and buttons */}
          <motion.div
            className="text-left space-y-6 order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-3">
              <motion.h1
                className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                An open source collection of{" "}
                <span className="inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  animated, interactive
                </span>{" "}
                components
              </motion.h1>
              <motion.p
                className="max-w-xl text-base text-gray-600 dark:text-gray-300 md:text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                Create stunning and memorable user interfaces with premium,
                handcrafted components. ScrollX-UI blends the best of modern UI
                frameworks to deliver elegance, efficiency, and seamless design.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-medium px-6 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Link href="/components">Browse Components</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-2 font-medium px-6 py-2 rounded-md shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Link href="/docs">Read Documentation</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right side: Graph and statistics */}
          <motion.div
            className="order-1 lg:order-2 flex flex-col space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Graph container with overlay text */}
            <div className="relative h-48 sm:h-56 md:h-64 lg:h-80 w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm rounded-2xl p-4 overflow-hidden border border-gray-200 dark:border-white/10 shadow-md">
              {/* Graph title */}
              <div className="absolute top-3 left-4 z-10">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-100">
                  Performance Metrics
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Last 6 months
                </p>
              </div>

              {/* Graph legend */}
              <div className="absolute top-3 right-4 flex items-center space-x-4 z-10">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    Engagement
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-white/60"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    Baseline
                  </span>
                </div>
              </div>

              {/* The graph SVG */}
              {isMounted ? (
                <svg
                  viewBox="0 0 600 300"
                  className="w-full h-full"
                  style={{
                    overflow: "visible",
                  }}
                >
                  {/* Grid lines (subtle) */}
                  <g className="opacity-20">
                    <line
                      x1="0"
                      y1="75"
                      x2="600"
                      y2="75"
                      stroke={isMounted && theme === "dark" ? "white" : "#333"}
                      strokeWidth="1"
                      strokeDasharray="5,5"
                    />
                    <line
                      x1="0"
                      y1="150"
                      x2="600"
                      y2="150"
                      stroke={isMounted && theme === "dark" ? "white" : "#333"}
                      strokeWidth="1"
                      strokeDasharray="5,5"
                    />
                    <line
                      x1="0"
                      y1="225"
                      x2="600"
                      y2="225"
                      stroke={isMounted && theme === "dark" ? "white" : "#333"}
                      strokeWidth="1"
                      strokeDasharray="5,5"
                    />
                  </g>

                  {/* Main graph line (animated productivity line) */}
                  <motion.path
                    d="M0,220 C60,240 100,100 180,50 C240,20 300,150 360,120 C420,90 480,130 520,100 C560,70 600,100 600,100"
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />

                  {/* Secondary graph line */}
                  <motion.path
                    d="M0,180 C70,200 140,190 210,170 C280,150 350,180 420,170 C490,160 530,180 600,160"
                    fill="none"
                    stroke={
                      isMounted && theme === "dark"
                        ? "rgba(255,255,255,0.4)"
                        : "rgba(100,100,100,0.5)"
                    }
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      duration: 1.5,
                      delay: 0.5,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Area under the main graph line for visual effect */}
                  <motion.path
                    d="M0,220 C60,240 100,100 180,50 C240,20 300,150 360,120 C420,90 480,130 520,100 C560,70 600,100 600,100 L600,300 L0,300 Z"
                    fill="url(#areaGradient)"
                    fillOpacity="0.2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                  />

                  {/* Data points for main graph */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                  >
                    <circle
                      cx="0"
                      cy="220"
                      r="4"
                      fill={isMounted && theme === "dark" ? "white" : "#6366f1"}
                    />
                    <circle
                      cx="180"
                      cy="50"
                      r="4"
                      fill={isMounted && theme === "dark" ? "white" : "#6366f1"}
                    />
                    <circle
                      cx="360"
                      cy="120"
                      r="4"
                      fill={isMounted && theme === "dark" ? "white" : "#6366f1"}
                    />
                    <circle
                      cx="520"
                      cy="100"
                      r="4"
                      fill={isMounted && theme === "dark" ? "white" : "#6366f1"}
                    />
                    <circle
                      cx="600"
                      cy="100"
                      r="4"
                      fill={isMounted && theme === "dark" ? "white" : "#6366f1"}
                    />
                  </motion.g>

                  {/* Data points for secondary graph */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                  >
                    <circle
                      cx="0"
                      cy="180"
                      r="3"
                      fill={
                        isMounted && theme === "dark"
                          ? "rgba(255,255,255,0.6)"
                          : "rgba(100,100,100,0.7)"
                      }
                    />
                    <circle
                      cx="210"
                      cy="170"
                      r="3"
                      fill={
                        isMounted && theme === "dark"
                          ? "rgba(255,255,255,0.6)"
                          : "rgba(100,100,100,0.7)"
                      }
                    />
                    <circle
                      cx="420"
                      cy="170"
                      r="3"
                      fill={
                        isMounted && theme === "dark"
                          ? "rgba(255,255,255,0.6)"
                          : "rgba(100,100,100,0.7)"
                      }
                    />
                    <circle
                      cx="600"
                      cy="160"
                      r="3"
                      fill={
                        isMounted && theme === "dark"
                          ? "rgba(255,255,255,0.6)"
                          : "rgba(100,100,100,0.7)"
                      }
                    />
                  </motion.g>

                  {/* Gradient definitions */}
                  <defs>
                    <linearGradient
                      id="lineGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                    <linearGradient
                      id="areaGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              ) : (
                // Placeholder for server-side rendering
                <div className="w-full h-full" />
              )}
            </div>

            {/* Stats below the graph */}
            <div className="grid grid-cols-3 gap-3">
              <motion.div
                className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-3 border border-gray-200 dark:border-white/10 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Components
                </p>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  240+
                </p>
                <p className="text-xs text-green-500">↑ 24% increase</p>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-3 border border-gray-200 dark:border-white/10 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Downloads
                </p>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  18.3k
                </p>
                <p className="text-xs text-green-500">↑ 36% increase</p>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-3 border border-gray-200 dark:border-white/10 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Stars
                </p>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  5.2k
                </p>
                <p className="text-xs text-green-500">↑ 18% increase</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
