"use client";

import Link from "next/link";
import { Github, Twitter, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-12">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start md:gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              ScrollX-UI
            </span>
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            An open source collection of animated, interactive & fully
            customizable components.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-6">
          <nav className="flex flex-col items-center gap-2 md:flex-row md:gap-4 lg:gap-6">
            <Link
              href="/components"
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
              href="https://github.com/scrollx-ui/scrollx-ui"
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
        <p className="mb-4 text-center text-sm text-muted-foreground md:mb-0 md:text-left">
          © {new Date().getFullYear()} ScrollX-UI. Built with{" "}
          <Heart className="inline-block h-4 w-4 text-red-500" /> by the
          community.
        </p>
        <div className="flex flex-col items-center gap-2 md:flex-row md:items-start md:gap-4 lg:gap-6">
          <Link
            href="/privacy"
            className="text-xs text-muted-foreground hover:underline"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-xs text-muted-foreground hover:underline"
          >
            Terms
          </Link>
          <Link
            href="/license"
            className="text-xs text-muted-foreground hover:underline"
          >
            License
          </Link>
        </div>
      </div>
    </footer>
  );
}
