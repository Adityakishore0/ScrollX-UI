"use client";

import { Drawer } from "vaul";
import Link from "next/link";
import { X, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useRef } from "react";
import ThemeSwitchIcon from "@/components/demos/themeswitchicon";

const navigationItems = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/components", label: "Components" },
  { href: "/templates", label: "Templates" },
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
  const timeoutRef = useRef<NodeJS.Timeout>();

  const navigationElements = useMemo(() => {
    return navigationItems.map((item) => {
      const isActive =
        (item.href === "/docs/components" &&
          pathname.startsWith("/docs/components")) ||
        (item.href === "/docs" &&
          pathname.startsWith("/docs") &&
          !pathname.startsWith("/docs/components")) ||
        (item.href !== "/docs" &&
          item.href !== "/docs/components" &&
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

  useEffect(() => {
    if (isOpen) {
      const elements = document.querySelectorAll('[data-aria-hidden="true"]');
      elements.forEach((el) => {
        el.removeAttribute("aria-hidden");
        el.removeAttribute("data-aria-hidden");
      });
    }
  }, [isOpen]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        onClose();
      }, 50);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={handleOpenChange}
      modal={true}
      dismissible={true}
      preventScrollRestoration={false}
      closeThreshold={0.5}
    >
      <Drawer.Portal
        container={typeof document !== "undefined" ? document.body : undefined}
      >
        <Drawer.Overlay
          className="fixed inset-0 bg-black/50 z-40"
          style={{
            pointerEvents: "auto",
            willChange: "opacity",
            backfaceVisibility: "hidden",
          }}
        />
        <Drawer.Content
          className="fixed bottom-0 left-0 right-0 h-1/2 bg-background z-50 rounded-t-2xl shadow-2xl border-t border-border/50 flex flex-col focus:outline-none"
          style={{
            willChange: "transform",
            backfaceVisibility: "hidden",
            boxShadow:
              "0 -25px 50px -12px rgba(0, 0, 0, 0.4), 0 -8px 16px -8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Drawer.Title className="sr-only">Navigation Menu</Drawer.Title>
          <Drawer.Description className="sr-only">
            Navigate to different sections of the website
          </Drawer.Description>

          <div className="mx-auto w-10 h-1.5 bg-muted rounded-full mt-3" />

          <div className="p-4 flex flex-col h-full gap-4 relative">
            <Drawer.Close asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 rounded-full"
              >
                <X className="h-6 w-6" />
              </Button>
            </Drawer.Close>

            <div className="flex justify-center">
              <ThemeSwitchIcon />
            </div>

            <nav className="flex-1 overflow-y-auto">
              <ul className="space-y-2">{navigationElements}</ul>
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
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
