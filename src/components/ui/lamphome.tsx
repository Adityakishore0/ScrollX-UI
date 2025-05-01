"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

interface LamphomeProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export function Lamphome({
  title = "SCROLLX UI",
  description = "An open-source collection of animated, interactive & fully customizable components for building stunning, memorable user interfaces.",
  children,
}: LamphomeProps) {
  const [pulled, setPulled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (theme === "dark") {
      setPulled(true);
    }
  }, [theme]);

  useEffect(() => {
    if (mounted) {
      setTheme(pulled ? "dark" : "light");
    }
  }, [pulled, setTheme, mounted]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-6 md:pt-10 transition-colors duration-500 bg-white text-black dark:bg-slate-950 dark:text-white">
      <motion.div
        initial={{ width: "90%" }}
        animate={{ width: "90%" }}
        transition={{ duration: 1 }}
        className="relative flex items-center justify-between w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-5xl h-auto py-2 px-3 md:px-4 border rounded-xl transition-colors duration-500 border-black dark:border-white"
      >
        <Image
          src="/favicon/favicon-16x16.png"
          alt="Logo"
          width={24}
          height={24}
          className="cursor-pointer "
        />

        <div className="flex space-x-2 md:space-x-6 justify-center items-center">
          <Link
            href="/"
            className="text-base md:text-lg font-medium hover:underline"
          >
            Home
          </Link>
          <Link
            href="/docs"
            className="text-base md:text-lg font-medium hover:underline"
          >
            Docs
          </Link>

          <div className="hidden md:flex relative items-center w-fit border border-transparent shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:shadow-[0px_2px_3px_-1px_rgba(255,255,255,0.1),0px_1px_0px_0px_rgba(255,255,255,0.02),0px_0px_0px_1px_rgba(255,255,255,0.05)] rounded-xl">
            <input
              type="text"
              placeholder="Search Components"
              className="text-sm text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 py-2 px-4 w-32 lg:w-56 border-none bg-transparent focus:outline-none"
            />
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-gray-100 dark:bg-gray-800 px-1.5 font-mono text-xs font-medium opacity-100 lg:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
            <button className="flex justify-center items-center px-3 py-2 bg-black text-white dark:bg-white dark:text-black rounded-r-xl transition-colors duration-300 hover:bg-gray-800 dark:hover:bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                <path d="M21 21l-6 -6"></path>
              </svg>
            </button>
          </div>

          <button className="md:hidden flex justify-center items-center p-2 bg-black text-white dark:bg-white dark:text-black rounded-lg transition-colors duration-300 hover:bg-gray-800 dark:hover:bg-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
              <path d="M21 21l-6 -6"></path>
            </svg>
          </button>
        </div>

        {mounted && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: pulled ? "4.5rem" : "3rem" }}
            transition={{ duration: 1 }}
            className="absolute right-2 top-12 w-1 cursor-pointer z-[999] transition-colors duration-500 bg-black dark:bg-white"
            onClick={() => setPulled((prev) => !prev)}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full transition-colors duration-500 bg-black dark:bg-white"></div>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: mounted && theme === "dark" ? "75%" : 0,
          opacity: mounted && theme === "dark" ? 1 : 0,
        }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative border-t border-cyan-400 mt-4 transition-all duration-500"
        style={{
          boxShadow:
            mounted && theme === "dark"
              ? "0 0 1.875rem #00FFFF, 0 0 3.75rem rgba(0, 255, 255, 0.8), 0 0 6.25rem rgba(0, 255, 255, 0.6), 0 0 9.375rem rgba(0, 255, 255, 0.3)"
              : "none",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: mounted && theme === "dark" ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-full left-1/2 transform -translate-x-1/2 w-full h-32"
          style={{
            background:
              mounted && theme === "dark"
                ? "radial-gradient(circle, rgba(0, 255, 255, 0.7) 0%, rgba(0, 255, 255, 0.3) 50%, rgba(0, 255, 255, 0) 100%)"
                : "none",
            filter: mounted && theme === "dark" ? "blur(1.875rem)" : "none",
          }}
        ></motion.div>
      </motion.div>

      <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-center px-4">
        {title}
      </h1>

      <motion.div
        initial={{ width: "75%", opacity: 1 }}
        animate={{
          width: mounted && theme === "dark" ? 0 : "75%",
          opacity: mounted && theme === "dark" ? 0 : 1,
        }}
        transition={{ duration: 1 }}
        className="border-t mt-4 transition-colors duration-500 border-black dark:border-white"
      ></motion.div>

      <p className="mt-4 text-center text-base sm:text-lg max-w-xs sm:max-w-md md:max-w-xl px-4">
        {description}
      </p>

      <div className="mt-8">{children}</div>
    </div>
  );
}
