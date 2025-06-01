"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeSwitchDemo from "@/components/demos/themeswitch-demo";

const navigationItems = [
  { href: "/docs/components/accordion", label: "Components" },
  { href: "/templates", label: "Templates" },
  { href: "/docs", label: "Docs" },
  { href: "/showcase", label: "Showcase" },
];

export function NavSheet({
  isOpen,
  onClose,
  pathname,
}: {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={(
              _: MouseEvent | TouchEvent | PointerEvent,
              info: { offset: { y: number } }
            ) => {
              if (info.offset.y > 100) onClose();
            }}
            className="fixed bottom-0 left-0 right-0 h-1/2 bg-background z-50 rounded-t-2xl shadow-lg border-t"
          >
            <div className="p-4 flex flex-col h-full gap-4 relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 rounded-full"
                onClick={onClose}
              >
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 180 }}
                  exit={{ rotate: 0 }}
                >
                  <X className="h-6 w-6" />
                </motion.span>
              </Button>

              <div className="mx-auto w-10 h-1.5 bg-muted rounded-full" />

              <div className="flex justify-center">
                <ThemeSwitchDemo />
              </div>

              <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-2">
                  {navigationItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`flex w-full py-2 px-3 rounded-lg text-base font-medium transition-colors ${
                          pathname === item.href
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex justify-center pt-2">
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
