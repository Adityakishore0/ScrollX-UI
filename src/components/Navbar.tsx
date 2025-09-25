"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { SearchModal } from "@/components/SearchModal";
import { NavSheet } from "@/components/navsheet";
import ScrollXHeading from "@/components/heading";
import { Kbd, KbdKey, KbdSeparator } from "@/components/ui/kbd";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setIsMobileMenuOpen(false);
        setIsSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSearchOpen = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(true);
  };

  const handleMobileMenuOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSearchOpen(false);

    setTimeout(() => {
      setIsMobileMenuOpen(true);
    }, 10);
  };

  const routes = [
    {
      href: "/docs/components",
      label: "Components",
      active: pathname === "/docs/components/accordion",
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 w-6 h-6 sm:w-6 sm:h-6 md:w-7 md:h-7"
                viewBox="0 0 24 24"
              >
                <defs>
                  <linearGradient
                    id="myGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#myGradient)"
                  d="M5.999 17a3 3 0 0 1-1.873-.658a2.98 2.98 0 0 1-1.107-2.011a2.98 2.98 0 0 1 .639-2.206l4-5c.978-1.225 2.883-1.471 4.143-.523l1.674 1.254l2.184-2.729a3 3 0 1 1 4.682 3.747l-4 5c-.977 1.226-2.882 1.471-4.143.526l-1.674-1.256l-2.184 2.729A2.98 2.98 0 0 1 5.999 17M10 8a1 1 0 0 0-.781.374l-4 5.001a1 1 0 0 0-.213.734c.03.266.161.504.369.67a.996.996 0 0 0 1.406-.155l3.395-4.244L13.4 12.8c.42.316 1.056.231 1.381-.176l4-5.001a1 1 0 0 0 .213-.734a1 1 0 0 0-.369-.67a.996.996 0 0 0-1.406.156l-3.395 4.242L10.6 8.2A1 1 0 0 0 10 8m9 13H5a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2"
                />
              </svg>
              <ScrollXHeading className="w-auto h-4 sm:h-5 whitespace-nowrap" />
            </Link>
          </div>

          <nav className="hidden flex-1 items-center space-x-6 lg:flex">
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
              onClick={handleSearchOpen}
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
              <Kbd className="pointer-events-none hidden h-5 select-none items-center rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">
                <KbdKey aria-label="Meta">⌘</KbdKey>
                <KbdKey>K</KbdKey>
              </Kbd>
            </button>

            <nav className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <Link
                  href="https://github.com/Adityakishore0/ScrollX-UI"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>

              <div className="hidden lg:block">
                <ModeToggle />
              </div>

              <div className="block lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleMobileMenuOpen}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <NavSheet
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
