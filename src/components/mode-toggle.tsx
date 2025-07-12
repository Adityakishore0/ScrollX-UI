"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ModeToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  modes?: string[];
  icons?: React.ReactNode[];
  showActiveIconOnly?: boolean;
  showInactiveIcons?: "all" | "none" | "next";
  variant?: "default" | "icon-click";
  effect?: "ripple" | "slide" | "scale" | "morph" | "wave";
}

export const ModeToggle = React.forwardRef<HTMLDivElement, ModeToggleProps>(
  (
    {
      className,
      modes = ["light", "dark", "system"],
      icons = [
        <Sun key="sun-icon" size={16} />,
        <Moon key="moon-icon" size={16} />,
        <Laptop key="laptop-icon" size={16} />,
      ],
      showActiveIconOnly = false,
      showInactiveIcons = "next",
      variant = "icon-click",
      effect = "ripple",
      ...props
    },
    ref
  ) => {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [showEffect, setShowEffect] = React.useState(false);
    const [effectPos, setEffectPos] = React.useState({ x: 0, y: 0 });
    const [effectColor, setEffectColor] = React.useState("white");
    const lastResolvedTheme = React.useRef(resolvedTheme);
    const [mounted, setMounted] = React.useState(false);
    const [isTransitioning, setIsTransitioning] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    React.useEffect(() => {
      if (!mounted) return;
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = (e: MediaQueryListEvent) => {
        if (theme !== "system") return;
        const newSystemTheme = e.matches ? "dark" : "light";
        if (newSystemTheme !== lastResolvedTheme.current) {
          const color = newSystemTheme === "dark" ? "black" : "white";
          const center = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
          };
          setEffectColor(color);
          setEffectPos(center);
          setShowEffect(true);
          setTimeout(() => setShowEffect(false), 600);
          lastResolvedTheme.current = newSystemTheme;
        }
      };
      mql.addEventListener("change", listener);
      return () => mql.removeEventListener("change", listener);
    }, [theme, mounted]);

    if (!mounted) return null;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const supportsBlend =
      typeof CSS !== "undefined" &&
      CSS.supports("mix-blend-mode", "difference");

    const currentModeIndex =
      modes.indexOf(theme || "") !== -1 ? modes.indexOf(theme || "") : 0;

    const isIconVisible = (index: number) => {
      if (index === currentModeIndex) return true;
      if (showInactiveIcons === "none") return false;
      if (showInactiveIcons === "next")
        return index === (currentModeIndex + 1) % modes.length;
      return true;
    };

    const triggerThemeEffect = (
      newTheme: string,
      e: React.MouseEvent<HTMLDivElement>
    ) => {
      if (isTransitioning) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      setEffectPos({ x, y });

      const current = resolvedTheme ?? "light";
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      const targetResolvedTheme =
        newTheme === "system" ? systemTheme : newTheme;

      if (targetResolvedTheme !== current) {
        setIsTransitioning(true);
        const color = targetResolvedTheme === "dark" ? "black" : "white";
        setEffectColor(color);
        setShowEffect(true);

        setTimeout(() => {
          setTheme(newTheme);
        }, 150);

        setTimeout(() => {
          setShowEffect(false);
          setIsTransitioning(false);
        }, 500);
      } else {
        setTheme(newTheme);
      }

      lastResolvedTheme.current = targetResolvedTheme;
    };

    const switchWidth = modes.length === 2 ? "w-14" : "w-20";

    const renderEffect = () => {
      const baseStyle = {
        top: effectPos.y,
        left: effectPos.x,
        backgroundColor: effectColor,
      };

      switch (effect) {
        case "ripple":
          return (
            <motion.div
              className="fixed pointer-events-none z-40 will-change-transform will-change-opacity"
              style={{
                ...baseStyle,
                borderRadius: "9999px",
                mixBlendMode: "normal",
              }}
              initial={{
                width: 0,
                height: 0,
                x: "-50%",
                y: "-50%",
                opacity: 0.7,
              }}
              animate={{
                width: "150vmax",
                height: "150vmax",
                x: "-50%",
                y: "-50%",
                opacity: 0,
                transition: { duration: 0.5, ease: "easeOut" },
              }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            />
          );

        case "slide":
          return (
            <motion.div
              className="fixed pointer-events-none z-40 will-change-transform"
              style={{
                ...baseStyle,
                width: "100vw",
                height: "100vh",
                x: "-50%",
                y: "-50%",
                mixBlendMode: "normal",
              }}
              initial={{
                scaleX: 0,
                transformOrigin: "center",
                opacity: 0.8,
              }}
              animate={{
                scaleX: 1,
                opacity: 0,
                transition: { duration: 0.4, ease: "easeOut" },
              }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            />
          );

        case "scale":
          return (
            <motion.div
              className="fixed pointer-events-none z-40 will-change-transform"
              style={{
                ...baseStyle,
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                x: "-50%",
                y: "-50%",
                mixBlendMode: "normal",
              }}
              initial={{
                scale: 0,
                opacity: 0.6,
              }}
              animate={{
                scale: 35,
                opacity: 0,
                transition: { duration: 0.5, ease: "easeOut" },
              }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            />
          );

        case "morph":
          return (
            <motion.div
              className="fixed pointer-events-none z-40 will-change-transform"
              style={{
                ...baseStyle,
                x: "-50%",
                y: "-50%",
                mixBlendMode: "normal",
              }}
              initial={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                opacity: 0.7,
              }}
              animate={{
                width: "100vmax",
                height: "100vmax",
                borderRadius: "20%",
                opacity: 0,
                transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
              }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            />
          );

        case "wave":
          return (
            <motion.div
              className="fixed pointer-events-none z-40 will-change-transform"
              style={{
                ...baseStyle,
                x: "-50%",
                y: "-50%",
                mixBlendMode: "normal",
              }}
              initial={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                opacity: 0.8,
              }}
              animate={{
                width: ["20px", "80px", "140px", "150vmax"],
                height: ["20px", "80px", "140px", "150vmax"],
                opacity: [0.8, 0.5, 0.3, 0],
                transition: {
                  duration: 0.6,
                  ease: "easeOut",
                  times: [0, 0.2, 0.4, 1],
                },
              }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            />
          );

        default:
          return null;
      }
    };

    return (
      <>
        <div
          className={cn(
            "relative inline-flex h-8 rounded-full border border-input bg-background p-1 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            switchWidth,
            className
          )}
          ref={ref}
          onClick={
            variant === "default"
              ? (e: React.MouseEvent<HTMLDivElement>) => {
                  const nextIndex = (currentModeIndex + 1) % modes.length;
                  triggerThemeEffect(modes[nextIndex], e);
                }
              : undefined
          }
          {...props}
        >
          {showActiveIconOnly ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background z-10"
                animate={{ scale: isTransitioning ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {icons[currentModeIndex]}
              </motion.div>
            </div>
          ) : (
            <>
              <div className="flex w-full h-full items-center justify-between">
                {icons.map((icon, idx) => {
                  const visible = isIconVisible(idx);
                  return (
                    <motion.div
                      key={idx}
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full z-10 transition-opacity duration-200 cursor-pointer",
                        currentModeIndex === idx
                          ? "text-background"
                          : "text-muted-foreground",
                        visible ? "opacity-100" : "opacity-0"
                      )}
                      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                        if (variant === "icon-click") {
                          e.stopPropagation();
                          triggerThemeEffect(modes[idx], e);
                        }
                      }}
                      animate={{
                        scale:
                          currentModeIndex === idx && isTransitioning ? 1.2 : 1,
                        rotate:
                          currentModeIndex === idx && isTransitioning ? 360 : 0,
                      }}
                      transition={{
                        scale: { duration: 0.2 },
                        rotate: { duration: 0.4, ease: "easeInOut" },
                      }}
                    >
                      {icon}
                    </motion.div>
                  );
                })}
              </div>
              <motion.div
                className={cn(
                  "absolute top-1 h-6 w-6 rounded-full bg-foreground z-5",
                  currentModeIndex === 0
                    ? "left-1"
                    : currentModeIndex === 1
                    ? modes.length === 2
                      ? "left-7"
                      : "left-[calc(50%-12px)]"
                    : "left-[calc(100%-28px)]"
                )}
                layout
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8,
                }}
              />
            </>
          )}
        </div>

        <AnimatePresence>{showEffect && renderEffect()}</AnimatePresence>
      </>
    );
  }
);

ModeToggle.displayName = "ModeToggle";
