"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useState, useEffect, useMemo } from "react";
import BadgeDemo from "@/components/demos/badge-demo";
import LustreTextDemo from "@/components/demos/lustretext-demo";
import { SeparatorPro } from "@/components/ui/seperatorpro";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnimatedButton } from "@/components/ui/animated-button";
import ThemeSwitchIcon from "@/components/demos/themeswitchicon";
import ScrollXHeading from "@/components/heading";
import Typeanimation from "@/components/ui/typeanimation";

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

  const logoVariants = useMemo(
    () => ({
      hidden: { opacity: 0, scale: 0.8, y: -20 },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 20,
          stiffness: 100,
          duration: 1.2,
        },
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
      <div className="container relative px-4 md:px-6 mx-auto max-w-6xl z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mx-auto">
          <motion.div
            className="lg:col-span-6 space-y-6 text-center lg:text-left min-h-[300px] flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="flex justify-center lg:justify-start mb-4"
              variants={logoVariants}
              initial="hidden"
              animate="visible"
            >
              <ScrollXHeading />
            </motion.div>
            <motion.h1
              className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl leading-tight"
              variants={textRevealVariants}
            >
              <span className="block sm:hidden mr-2">
                An open source collection
              </span>
              <span className="hidden sm:inline">An open source</span>
              <br className="hidden sm:block" />
              <span className="mr-2 sm:hidden">of</span>
              <span className="hidden sm:inline mr-2">collection of</span>
              <Typeanimation
                words={["animated", "beautiful"]}
                typingSpeed="slow"
                deletingSpeed="slow"
                gradientFrom="red-500"
                gradientTo="yellow-500"
                pauseDuration={2000}
                className="inline font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500"
              />
              <br />
              components
            </motion.h1>
            <motion.p
              className="text-gray-600 dark:text-gray-300 md:text-lg mx-auto lg:mx-0 max-w-lg"
              variants={textRevealVariants}
            >
              Create stunning interfaces with handcrafted components.
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
                <Link href="/docs/components">Browse Components</Link>
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
            className="relative lg:col-span-6 flex flex-col gap-4 items-center justify-center text-center px-6 py-10 rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-800/70 shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)] backdrop-blur-xl overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="absolute top-0 right-0 w-10 h-10 bg-gradient-to-br from-red-500 to-yellow-500 rounded-bl-full opacity-80 pointer-events-none transition-opacity duration-700 ease-out" />
            <div className="absolute bottom-0 left-0 w-10 h-10 bg-gradient-to-br from-red-500 to-yellow-500 rounded-tr-full opacity-80 pointer-events-none transition-opacity duration-700 ease-out" />
            <div className="absolute top-0 left-0 w-10 h-10 bg-gradient-to-br from-red-500 to-yellow-500 rounded-br-full pointer-events-none hidden lg:block opacity-0" />
            <div className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-br from-red-500 to-yellow-500 rounded-tl-full pointer-events-none hidden lg:block opacity-0" />
            <div className="absolute top-0 left-0 w-10 h-10 bg-gradient-to-br from-red-500 to-yellow-500 rounded-br-full pointer-events-none lg:hidden opacity-0 animate-[fadeIn_0.6s_ease-out_forwards_0.2s]" />
            <div className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-br from-red-500 to-yellow-500 rounded-tl-full pointer-events-none lg:hidden opacity-0 animate-[fadeIn_0.6s_ease-out_forwards_0.4s]" />

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
                <div className="backdrop-blur-lg rounded-xl p-2 border border-white/10 bg-white/5">
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
                <div className="backdrop-blur-lg rounded-xl p-2 border border-white/10 bg-white/5">
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
                <div className="backdrop-blur-lg rounded-xl p-2 border border-white/10 bg-white/5">
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
                className="hidden sm:flex h-14"
              />
              <motion.div
                className="inline-flex"
                variants={componentCardVariants}
                whileHover="hover"
              >
                <div className="backdrop-blur-lg rounded-xl p-2 border border-white/10 bg-white/5">
                  <LustreTextDemo />
                </div>
              </motion.div>
              <SeparatorPro
                variant="dots"
                orientation="vertical"
                className="hidden sm:flex h-14"
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
                <div className="backdrop-blur-lg rounded-xl p-2 border border-white/10 bg-white/5">
                  <BadgeDemo />
                </div>
              </motion.div>
            </div>
          </motion.div>
          <style jsx>{`
            @keyframes fadeIn {
              0% {
                opacity: 0;
                transform: scale(0.95);
              }
              100% {
                opacity: 0.8;
                transform: scale(1);
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
