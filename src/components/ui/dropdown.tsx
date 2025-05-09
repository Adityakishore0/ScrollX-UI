"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface MenuItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface DropdownProps {
  menuItems?: MenuItem[];
  triggerText?: string;
  menuTitle?: string;
  onSelect?: (title: string) => void;
  maxHeight?: string | number;
  buttonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "success"
    | "warning"
    | "info"
    | "dark"
    | "light"
    | "gradient"
    | "glass";
  buttonSize?: "default" | "sm" | "lg" | "icon";
}

const Dropdown: React.FC<DropdownProps> = ({
  menuItems = [],
  triggerText = "Menu",
  menuTitle = "Menu Options",
  onSelect,
  maxHeight = "16rem",
  buttonVariant = "default",
  buttonSize = "default",
}) => {
  const [open, setOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
      );
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleSelect = (title: string) => {
    if (onSelect) onSelect(title);
    setOpen(false);
  };

  return (
    <div ref={dropdownRef}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant={buttonVariant}
            size={buttonSize}
            className="flex items-center gap-2"
          >
            <span>{triggerText}</span>
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.span>
          </Button>
        </DropdownMenuTrigger>

        <AnimatePresence>
          {open && (
            <DropdownMenuContent forceMount asChild sideOffset={5}>
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  rotateX: 40,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateX: 0,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 15,
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  rotateX: 10,
                  y: 10,
                  transition: { duration: 0.2 },
                }}
                className={cn(
                  "w-72 rounded-xl border shadow-xl z-50 overflow-hidden [perspective:800px] [transform-style:preserve-3d]",
                  "bg-white/80 border-neutral-900/10",
                  "dark:bg-neutral-900/80 dark:border-neutral-50/10"
                )}
                style={{ transformOrigin: "top" }}
              >
                <div
                  className={cn(
                    "absolute inset-0 z-0",
                    "bg-gradient-to-br from-indigo-500/10 to-purple-500/10",
                    "dark:from-indigo-500/20 dark:to-purple-500/20"
                  )}
                ></div>

                <div className="absolute inset-0 backdrop-blur-sm z-10"></div>

                <div className="p-2 sticky top-0 z-20">
                  <DropdownMenuLabel
                    className={cn(
                      "px-3 py-2 font-bold",
                      "text-neutral-900",
                      "dark:text-neutral-50"
                    )}
                  >
                    {menuTitle}
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator
                    className={cn(
                      "my-1 h-px",
                      "bg-neutral-900/10",
                      "dark:bg-white/10"
                    )}
                  />
                </div>

                <div
                  className="relative z-20 overflow-y-auto scrollbar-visible"
                  style={{
                    maxHeight:
                      typeof maxHeight === "number"
                        ? `${maxHeight}px`
                        : maxHeight,
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(155, 155, 155, 0.5) transparent",
                  }}
                >
                  <style jsx global>{`
                    .scrollbar-visible::-webkit-scrollbar {
                      width: 6px;
                      display: block;
                    }
                    .scrollbar-visible::-webkit-scrollbar-track {
                      background: transparent;
                    }
                    .scrollbar-visible::-webkit-scrollbar-thumb {
                      background-color: rgba(155, 155, 155, 0.5);
                      border-radius: 20px;
                    }
                    .scrollbar-visible::-webkit-scrollbar-thumb:hover {
                      background-color: rgba(155, 155, 155, 0.7);
                    }
                  `}</style>
                  {menuItems && menuItems.length > 0 ? (
                    menuItems.map((item, idx) => (
                      <DropdownMenuItem
                        key={idx}
                        className="focus:outline-none focus:bg-transparent"
                        onMouseEnter={
                          !isMobile ? () => setHoveredIndex(idx) : undefined
                        }
                        onMouseLeave={
                          !isMobile ? () => setHoveredIndex(null) : undefined
                        }
                        asChild
                      >
                        <motion.div
                          className="relative rounded-lg overflow-hidden"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            transition: {
                              delay: idx * 0.05,
                              duration: 0.2,
                            },
                          }}
                        >
                          <AnimatePresence>
                            {!isMobile && hoveredIndex === idx && (
                              <motion.div
                                layoutId="hoverBackground"
                                initial={{ opacity: 0 }}
                                animate={{
                                  opacity: 1,
                                  scale: 1.05,
                                  transition: {
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 15,
                                  },
                                }}
                                exit={{ opacity: 0 }}
                                className={cn(
                                  "absolute inset-0 rounded-lg",
                                  "bg-gradient-to-r from-indigo-500/10 to-purple-500/10",
                                  "dark:from-indigo-500/20 dark:to-purple-500/20"
                                )}
                              />
                            )}
                          </AnimatePresence>
                          <button
                            className={cn(
                              "flex items-center w-full p-2 rounded-lg relative z-20 text-left gap-3",
                              "text-neutral-900",
                              "dark:text-neutral-50"
                            )}
                            onClick={() => handleSelect(item.title)}
                          >
                            <motion.div
                              animate={{
                                scale:
                                  !isMobile && hoveredIndex === idx ? 1.1 : 1,
                                rotate:
                                  !isMobile && hoveredIndex === idx ? 5 : 0,
                              }}
                              transition={{ type: "spring", stiffness: 500 }}
                            >
                              {item.icon}
                            </motion.div>
                            <div className="flex flex-col items-start">
                              <motion.span
                                animate={{
                                  y: !isMobile && hoveredIndex === idx ? -2 : 0,
                                  x: !isMobile && hoveredIndex === idx ? 2 : 0,
                                }}
                                className={cn(
                                  "font-semibold",
                                  "text-neutral-900",
                                  "dark:text-neutral-50"
                                )}
                              >
                                {item.title}
                              </motion.span>
                              <motion.span
                                animate={{
                                  y: !isMobile && hoveredIndex === idx ? 2 : 0,
                                  x: !isMobile && hoveredIndex === idx ? 2 : 0,
                                  opacity:
                                    !isMobile && hoveredIndex === idx ? 1 : 0.7,
                                }}
                                className={cn(
                                  "text-xs",
                                  "text-neutral-700",
                                  "dark:text-neutral-300"
                                )}
                              >
                                {item.description}
                              </motion.span>
                            </div>
                          </button>
                        </motion.div>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div
                      className={cn(
                        "p-3 text-center",
                        "text-neutral-900",
                        "dark:text-neutral-50"
                      )}
                    >
                      No menu items available
                    </div>
                  )}
                </div>
              </motion.div>
            </DropdownMenuContent>
          )}
        </AnimatePresence>
      </DropdownMenu>
    </div>
  );
};

export default Dropdown;
