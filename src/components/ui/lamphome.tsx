"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface NavItem {
  href: string;
  label: string;
}

interface LamphomeProps {
  title?: string;
  description?: string;
  logoSrc?: string;
  logoAlt?: string;
  navItems?: NavItem[];
  children?: React.ReactNode;
  className?: string;
}

export function Lamphome({
  title,
  description,
  logoSrc,
  logoAlt,
  navItems = [],
  children,
  className = "",
}: LamphomeProps) {
  const [chainPulled, setChainPulled] = useState(false);
  const [chainLength, setChainLength] = useState(48);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showGlow, setShowGlow] = useState(false);
  const [glowPosition, setGlowPosition] = useState<"above" | "below">("below");

  const titleRef = useRef<HTMLHeadingElement>(null);
  const navBarRef = useRef<HTMLDivElement>(null);

  const { theme, setTheme, resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  useEffect(() => {
    if (resolvedTheme === "dark") {
      setChainPulled(true);
      setShowGlow(true);
      setGlowPosition("above");
      setChainLength(72);
    } else {
      setChainPulled(false);
      setShowGlow(false);
      setGlowPosition("below");
      setChainLength(48);
    }
  }, [resolvedTheme]);

  const calculateGlowPosition = (currentDragY: number) => {
    if (!titleRef.current || !navBarRef.current) return "below";
    const navBarRect = navBarRef.current.getBoundingClientRect();
    const titleRect = titleRef.current.getBoundingClientRect();
    const chainEndY = navBarRect.bottom + chainLength + currentDragY;
    const titleCenterY = titleRect.top + titleRect.height / 2;
    return chainEndY < titleCenterY ? "above" : "below";
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);
    const finalDragY = Math.max(0, info.offset.y);
    if (finalDragY > 8) {
      const newTheme = theme === "dark" ? "light" : "dark";
      setTheme(newTheme);
      setChainPulled(newTheme === "dark");
      setChainLength(newTheme === "dark" ? 72 : 48);
      setShowGlow(newTheme === "dark");
    }
    setTimeout(() => {
      setDragY(0);
    }, 100);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div
      className={`min-h-full w-full flex flex-col items-center justify-start pt-2 [@media(min-width:480px)]:pt-4 [@media(min-width:768px)]:pt-6 [@media(min-width:1024px)]:pt-8 transition-all duration-500 text-gray-900 dark:text-white ${className}`}
    >
      <motion.div
        ref={navBarRef}
        initial={{ width: "95%" }}
        animate={{ width: "95%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex items-center justify-between w-full max-w-4xl h-auto py-3 px-3 [@media(min-width:768px)]:px-6 bg-white/80 dark:bg-neutral-950 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {logoSrc && (
          <div className="flex-shrink-0">
            <Image
              src={logoSrc}
              alt={logoAlt || "Logo"}
              width={28}
              height={28}
              className="cursor-pointer hover:scale-110 transition-transform duration-200"
            />
          </div>
        )}

        <nav className="hidden [@media(min-width:640px)]:flex items-center space-x-4 [@media(min-width:768px)]:space-x-6">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-sm [@media(min-width:768px)]:text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleMobileMenu}
            className="[@media(min-width:640px)]:hidden flex justify-center items-center p-2 bg-gray-100 dark:bg-neutral-900 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-200"
          >
            <motion.svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </motion.svg>
          </button>
        </div>

        <div className="absolute right-3 top-full mt-2 flex flex-col items-center group z-10">
          <motion.div
            className="w-1 bg-gradient-to-b from-gray-400 to-gray-600 dark:from-gray-500 dark:to-gray-300 rounded-full shadow-sm relative"
            animate={{
              height: chainLength + dragY,
              scaleY: 1,
            }}
            transition={{
              duration: isDragging ? 0.05 : 0.6,
              ease: isDragging ? "linear" : "easeOut",
              type: isDragging ? "tween" : "spring",
              stiffness: isDragging ? undefined : 200,
              damping: isDragging ? undefined : 20,
            }}
            style={{
              height: `${chainLength + dragY}px`,
              transformOrigin: "top center",
            }}
          >
            {dragY > 4 && (
              <div className="absolute inset-0 flex flex-col justify-evenly">
                {Array.from({
                  length: Math.floor((chainLength + dragY) / 8),
                }).map((_, i) => (
                  <div
                    key={i}
                    className="w-full h-0.5 bg-gray-500 dark:bg-gray-400 rounded-full opacity-40"
                  />
                ))}
              </div>
            )}
          </motion.div>
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 12 }}
            dragElastic={0}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrag={(
              event: MouseEvent | TouchEvent | PointerEvent,
              info: PanInfo
            ) => {
              const newDragY = Math.max(0, info.offset.y);
              setDragY(newDragY);
              if (newDragY > 4) {
                const position = calculateGlowPosition(newDragY);
                setGlowPosition(position);
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileDrag={{
              scale: 1.12,
              boxShadow: `0 ${6 + dragY * 0.3}px ${
                14 + dragY * 0.3
              }px rgba(0,0,0,0.3)`,
            }}
            className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 dark:from-yellow-300 dark:to-yellow-500 rounded-full shadow-lg border-2 border-yellow-500 dark:border-yellow-400 transition-shadow duration-200 relative overflow-hidden cursor-grab active:cursor-grabbing"
            animate={{
              rotateZ: chainPulled ? 180 : 0,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            style={{ position: "relative", top: -20, y: 0 }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-300 to-transparent opacity-60"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col space-y-0.5">
                <motion.div
                  className="w-3 h-0.5 bg-yellow-700 dark:bg-yellow-200 rounded-full opacity-60"
                  animate={{ scaleX: 1 + dragY * 0.02 }}
                />
                <motion.div
                  className="w-3 h-0.5 bg-yellow-700 dark:bg-yellow-200 rounded-full opacity-60"
                  animate={{ scaleX: 1 + dragY * 0.02 }}
                />
                <motion.div
                  className="w-3 h-0.5 bg-yellow-700 dark:bg-yellow-200 rounded-full opacity-60"
                  animate={{ scaleX: 1 + dragY * 0.02 }}
                />
              </div>
            </div>
            {isDarkMode && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-yellow-500/90 dark:bg-yellow-400/90 rounded-full backdrop-blur-sm"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-800"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              </motion.div>
            )}
            {!isDragging && !chainPulled && (
              <motion.div
                className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap pointer-events-none bg-white/80 dark:bg-slate-800/80 px-2 py-1 rounded-full"
                initial={{ opacity: 0, y: -5 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [0, -2, -2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              >
                Pull to toggle theme!
              </motion.div>
            )}
            {isDragging && dragY > 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: dragY > 8 ? 1 : 0.7,
                  scale: dragY > 8 ? 1.1 : 1,
                }}
                className={`absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-xs text-white px-3 py-1.5 rounded-full whitespace-nowrap pointer-events-none font-medium transition-all duration-200 ${
                  glowPosition === "above" ? "bg-purple-600" : "bg-amber-600"
                }`}
              >
                {dragY > 8
                  ? `🌟 Release for ${
                      glowPosition === "above" ? "Dark" : "Light"
                    } Mode!`
                  : `Pull ${Math.round(8 - dragY)}px more`}
              </motion.div>
            )}
            {!isDragging && dragY > 0 && (
              <motion.div
                className="absolute inset-0 rounded-full bg-yellow-300 opacity-30"
                initial={{ scale: 1.2, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            )}
          </motion.div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 [@media(min-width:640px)]:hidden bg-white dark:bg-neutral-950 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg backdrop-blur-sm z-50"
            >
              <nav className="flex flex-col py-2">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {isDarkMode && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: showGlow ? "80%" : 0,
            opacity: showGlow ? 1 : 0,
          }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-3xl mt-6 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
          style={{
            boxShadow: showGlow
              ? "0 0 20px #A855F7, 0 0 40px rgba(168, 85, 247, 0.6), 0 0 60px rgba(168, 85, 247, 0.4)"
              : "none",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showGlow ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 w-full h-20 pointer-events-none"
            style={{
              background: showGlow
                ? "radial-gradient(ellipse, rgba(168, 85, 247, 0.3) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 100%)"
                : "none",
              filter: showGlow ? "blur(15px)" : "none",
            }}
          />
        </motion.div>
      )}
      {title && (
        <motion.h1
          ref={titleRef}
          className="mt-6 [@media(min-width:480px)]:mt-8 text-xl [@media(min-width:480px)]:text-2xl [@media(min-width:640px)]:text-3xl [@media(min-width:768px)]:text-4xl [@media(min-width:1024px)]:text-5xl [@media(min-width:1280px)]:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent text-center px-4 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {title}
        </motion.h1>
      )}
      {!isDarkMode && (
        <motion.div
          initial={{ width: "60%", opacity: 1 }}
          animate={{
            width: "60%",
            opacity: 1,
          }}
          transition={{ duration: 0.8 }}
          className="border-t mt-4 max-w-2xl border-gray-300"
        />
      )}
      {description && (
        <motion.p
          className="mt-4 [@media(min-width:480px)]:mt-6 text-center text-xs [@media(min-width:480px)]:text-sm [@media(min-width:640px)]:text-base [@media(min-width:768px)]:text-lg text-gray-600 dark:text-gray-300 max-w-xs [@media(min-width:480px)]:max-w-md [@media(min-width:768px)]:max-w-2xl px-4 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {description}
        </motion.p>
      )}
      {children && (
        <motion.div
          className="mt-6 [@media(min-width:480px)]:mt-8 w-full flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
