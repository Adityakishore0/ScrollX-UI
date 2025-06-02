"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Link from "next/link";
import { X, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeSwitchDemo from "@/components/demos/themeswitch-demo";
import { useCallback, useMemo } from "react";

const navigationItems = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/components/accordion", label: "Components" },
  { href: "/templates", label: "Templates" },
  { href: "/showcase", label: "Showcase" },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const sheetVariants = {
  hidden: {
    y: "100%",
    transition: { type: "tween", ease: "easeInOut", duration: 0.25 },
  },
  visible: {
    y: 0,
    transition: { type: "tween", ease: "easeInOut", duration: 0.25 },
  },
  exit: {
    y: "100%",
    transition: { type: "tween", ease: "easeInOut", duration: 0.25 },
  },
};

export function NavSheet({
  isOpen,
  onClose,
  pathname,
}: {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.y > 100) {
        onClose();
      }
    },
    [onClose]
  );

  const navigationElements = useMemo(() => {
    return navigationItems.map((item) => {
      const isActive =
        (item.href === "/docs/components/accordion" &&
          pathname.startsWith("/docs/components")) ||
        (item.href === "/docs" &&
          pathname.startsWith("/docs") &&
          !pathname.startsWith("/docs/components")) ||
        (item.href !== "/docs" &&
          item.href !== "/docs/components/accordion" &&
          pathname === item.href);

      return (
        <li key={item.href}>
          <Link
            href={item.href}
            onClick={onClose}
            className={`flex w-full py-2 px-3 rounded-lg text-base font-medium transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent"
            }`}
          >
            {item.label}
          </Link>
        </li>
      );
    });
  }, [pathname, onClose]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 z-40"
            onClick={onClose}
            style={{
              willChange: "opacity",
              backfaceVisibility: "hidden",
              perspective: 1000,
            }}
          />

          <motion.div
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            className="fixed bottom-0 left-0 right-0 h-1/2 bg-background z-50 rounded-t-2xl shadow-lg border-t"
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
              perspective: 1000,
              contain: "layout style paint",
            }}
          >
            <div className="p-4 flex flex-col h-full gap-4 relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 rounded-full"
                onClick={onClose}
                style={{ contain: "layout paint" }}
              >
                <X className="h-6 w-6" />
              </Button>

              <div
                className="mx-auto w-10 h-1.5 bg-muted rounded-full"
                style={{ contain: "layout paint" }}
              />

              <div
                className="flex justify-center"
                style={{ contain: "layout paint" }}
              >
                <ThemeSwitchDemo />
              </div>

              <nav
                className="flex-1 overflow-y-auto"
                style={{
                  contain: "layout paint",
                  overscrollBehavior: "contain",
                }}
              >
                <ul className="space-y-2">{navigationElements}</ul>
              </nav>

              <div
                className="flex justify-center pt-2"
                style={{ contain: "layout paint" }}
              >
                <Link
                  href="https://twitter.com/scrollx_ui"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
