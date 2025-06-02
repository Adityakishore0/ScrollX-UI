"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Scrollxx from "@/svg/Scrollx.svg";
import Scrollxdark from "@/svg/Scrollxdark.svg";
import { useState, useEffect, useMemo } from "react";
import BadgeDemo from "@/components/demos/badge-demo";
import LustreTextDemo from "@/components/demos/lustretext-demo";
import { SeparatorPro } from "@/components/ui/seperatorpro";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnimatedButton } from "@/components/ui/animated-button";
import BackgroundMeteors from "@/components/ui/backgroundmeteors";
import ThemeSwitchIcon from "@/components/demos/themeswitchicon";

export function HeroSection() {
  const { theme, systemTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDarkMode =
    isMounted &&
    (theme === "dark" || (theme === "system" && systemTheme === "dark"));

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 10 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", damping: 25, stiffness: 150 },
      },
    }),
    []
  );

  const textRevealVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", damping: 25, stiffness: 150 },
      },
    }),
    []
  );

  const componentCardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring", damping: 15, stiffness: 70 },
      },
      hover: {
        scale: 1.05,
        transition: { type: "spring", damping: 15, stiffness: 300 },
      },
    }),
    []
  );

  return (
    <section
      className="relative w-full py-8 md:py-12 overflow-hidden min-h-[90vh] flex items-center justify-center 
      bg-gradient-to-b from-white to-gray-50 
      dark:from-[#0c0c0c] dark:via-[#000000] dark:to-[#0c0c0c]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <BackgroundMeteors>
          {isDarkMode && (
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
              <div className="relative w-full h-full">
                <img
                  src="https://site-assets.plasmic.app/1224f19c59fb4925a4b32af4aac4d43f.svg"
                  alt=""
                  className="w-full h-auto absolute top-0 left-0 opacity-[0.18]"
                  style={{
                    objectFit: "cover",
                    objectPosition: "top",
                    maskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0))",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0))",
                  }}
                />
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0)_70%)] 
                  mix-blend-screen opacity-40 
                  blur-[20px] animate-pulse-subtle"
                  />

                  <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0)_60%)] 
                  mix-blend-lighten opacity-30 
                  blur-[15px]"
                  />
                </div>
                <div
                  className="absolute inset-0 border border-white/5 
                mix-blend-overlay pointer-events-none"
                />
              </div>
            </div>
          )}

          <div className="absolute w-full h-full opacity-15 dark:opacity-25">
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true"
            >
              <circle cx="512" cy="512" r="512" fill="url(#gradient)" />
              <defs>
                <radialGradient id="gradient">
                  <stop stopColor="#3b82f6" />
                  <stop offset="0.5" stopColor="#8b5cf6" />
                  <stop offset="1" stopColor="#ec4899" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </BackgroundMeteors>
      </div>

      <div className="container relative px-4 md:px-6 mx-auto max-w-6xl z-10">
        <motion.div
          className="flex justify-center mb-8 md:mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {isMounted &&
            (isDarkMode ? (
              <Scrollxx className="w-full max-w-3xl h-24 sm:h-32 md:h-40" />
            ) : (
              <Scrollxdark className="w-full max-w-3xl h-24 sm:h-32 md:h-40" />
            ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mx-auto">
          <motion.div
            className="lg:col-span-6 space-y-6 text-center lg:text-left min-h-[300px] flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl"
              variants={textRevealVariants}
            >
              An open source collection of{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                animated, interactive
              </span>{" "}
              components
            </motion.h1>

            <motion.p
              className="text-gray-600 dark:text-gray-300 md:text-lg mx-auto lg:mx-0 max-w-lg"
              variants={textRevealVariants}
            >
              Create stunning interfaces with handcrafted components. ScrollX-UI
              combines modern UI frameworks for elegant, efficient designs.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center sm:items-start gap-3 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <Button
                asChild
                size="lg"
                className="w-max bg-gradient-to-r from-blue-500 to-purple-500 hover:to-pink-500 text-white"
              >
                <Link href="/docs/components/accordion">Browse Components</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="w-max border-gray-300 dark:border-gray-700"
              >
                <Link href="/docs">Documentation</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:col-span-6 flex flex-col gap-4 items-center justify-center text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <SeparatorPro
                variant="dots"
                orientation="vertical"
                className="h-14"
              />

              <motion.div
                className="inline-flex"
                variants={componentCardVariants}
                whileHover="hover"
              >
                <div className="backdrop-blur-lg rounded-xl p-2">
                  <ThemeSwitchIcon />
                </div>
              </motion.div>

              <SeparatorPro
                variant="dots"
                orientation="vertical"
                className="h-14"
              />

              <motion.div
                className="inline-flex"
                variants={componentCardVariants}
                whileHover="hover"
              >
                <div className="backdrop-blur-lg rounded-xl p-2">
                  <Avatar variant="normal">
                    <AvatarImage
                      src="https://github.com/Adityakishore0.png"
                      alt="@Ahdeetai"
                    />
                    <AvatarFallback>AK</AvatarFallback>
                  </Avatar>
                </div>
              </motion.div>

              <SeparatorPro
                variant="dots"
                orientation="vertical"
                className="h-14"
              />
              <SeparatorPro
                variant="default"
                className="my-4 w-full block lg:hidden"
              />

              <motion.div
                className="inline-flex w-full lg:w-auto justify-center"
                variants={componentCardVariants}
                whileHover="hover"
              >
                <div className="backdrop-blur-lg rounded-xl p-2">
                  <AnimatedButton
                    className="bg-green-500 text-white"
                    variant="default"
                    size="sm"
                    glow={true}
                    textEffect="normal"
                    uppercase={true}
                    rounded="custom"
                    asChild={false}
                    hideAnimations={false}
                    shimmerColor="#39FF14"
                    shimmerSize="0.15em"
                    shimmerDuration="3s"
                    borderRadius="100px"
                    background="rgba(0, 0, 0, 1)"
                  >
                    ScrollX UI
                  </AnimatedButton>
                </div>
              </motion.div>

              <SeparatorPro
                variant="dots"
                orientation="vertical"
                className="h-14 hidden lg:block"
              />
            </div>

            <SeparatorPro
              variant="wave"
              className="my-4 w-full max-w-sm mx-auto"
            />

            <div className="flex flex-wrap gap-4 items-center justify-center">
              <SeparatorPro
                variant="dots"
                orientation="vertical"
                className="h-14"
              />

              <motion.div
                className="inline-flex"
                variants={componentCardVariants}
                whileHover="hover"
              >
                <div className="backdrop-blur-lg rounded-xl p-2">
                  <LustreTextDemo />
                </div>
              </motion.div>

              <SeparatorPro
                variant="dots"
                orientation="vertical"
                className="h-14"
              />
              <SeparatorPro
                variant="default"
                className="my-4 w-full block lg:hidden"
              />

              <motion.div
                className="inline-flex"
                variants={componentCardVariants}
                whileHover="hover"
              >
                <div className="backdrop-blur-lg rounded-xl p-2">
                  <BadgeDemo />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
