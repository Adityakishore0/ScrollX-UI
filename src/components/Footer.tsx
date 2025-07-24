"use client";

import Link from "next/link";
import { Github, Twitter, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import ScrollXHeading from "@/components/heading";

export function Footer() {
  const [isHeartHovered, setIsHeartHovered] = useState(false);

  return (
    <footer className="w-full border-t py-6 md:py-12">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start md:gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <ScrollXHeading className="w-auto h-4 sm:h-5 whitespace-nowrap" />
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            An open source collection of animated, interactive & fully
            customizable components.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-6">
          <nav className="flex flex-col items-center gap-2 md:flex-row md:gap-4 lg:gap-6">
            <Link
              href="/docs/components"
              className="text-sm font-medium hover:underline"
            >
              Components
            </Link>
            <Link href="/docs" className="text-sm font-medium hover:underline">
              Documentation
            </Link>
            <Link
              href="/templates"
              className="text-sm font-medium hover:underline"
            >
              Templates
            </Link>
            <Link
              href="/showcase"
              className="text-sm font-medium hover:underline"
            >
              Showcase
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/Adityakishore0/ScrollX-UI"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://twitter.com/scrollx_ui"
              target="_blank"
              rel="noreferrer"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="container mt-6 flex flex-col items-center md:flex-row md:justify-between">
        <Link
          href="https://github.com/Adityakishore0/ScrollX-UI"
          target="_blank"
          rel="noreferrer"
          className="mb-4 text-center text-sm text-muted-foreground md:mb-0 md:text-left group relative"
          onMouseEnter={() => setIsHeartHovered(true)}
          onMouseLeave={() => setIsHeartHovered(false)}
        >
          <span className="relative inline-block">
            © {new Date().getFullYear()} ScrollX-UI. Built with{" "}
            <Heart
              className={`inline-block h-4 w-4 text-red-500 transition-all duration-300 ${
                isHeartHovered
                  ? "animate-pulse shadow-lg shadow-red-500/50"
                  : ""
              }`}
              style={{
                filter: isHeartHovered
                  ? "drop-shadow(0 0 5px rgba(239, 68, 68, 0.7))"
                  : "none",
              }}
            />{" "}
            by the Ahdeetai.
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
          </span>
        </Link>
      </div>
    </footer>
  );
}
