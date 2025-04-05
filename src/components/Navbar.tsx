"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { SearchModal } from "@/components/SearchModal";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  const routes = [
    {
      href: "/components",
      label: "Components",
      active: pathname === "/components",
    },
    {
      href: "/templates",
      label: "Templates",
      active: pathname === "/templates",
    },
    { href: "/docs", label: "Docs", active: pathname === "/docs" },
    { href: "/showcase", label: "Showcase", active: pathname === "/showcase" },
  ];

  const defaultStyles =
    "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60";

  return (
    <>
      <header
        className={cn(
          pathname !== "/"
            ? "sticky top-0 z-50 w-full border-b border-border bg-background"
            : defaultStyles,
          className
        )}
      >
        <div className="container flex h-16 max-w-screen-2xl items-center">
          <div className="mr-8">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                ScrollX-UI
              </span>
            </Link>
          </div>
          <nav className="hidden flex-1 items-center space-x-6 md:flex">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  route.active ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex relative justify-start items-center text-sm text-muted-foreground dark:text-white py-2 w-fit border border-transparent shadow-md dark:shadow-none px-4 rounded-xl bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition"
            >
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
                className="h-4 w-4 text-neutral-500 dark:text-neutral-300"
              >
                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                <path d="M21 21l-6 -6"></path>
              </svg>
              <span className="transition-colors hover:text-foreground/80 text-foreground/60 dark:text-neutral-200 text-xs sm:text-sm font-medium pl-2 pr-4">
                Search{" "}
                <span className="hidden xl:inline-block">Components</span>
              </span>
              <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>

            {/* GitHub & Mode Toggle */}
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <Link
                  href="https://github.com/scrollx-ui/scrollx-ui"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <ModeToggle />
            </nav>
          </div>
        </div>
      </header>
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
