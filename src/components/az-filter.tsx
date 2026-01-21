"use client";

import * as React from "react";
import { Drawer } from "vaul";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronUp, X } from "lucide-react";
import { cn } from "@/lib/utils";

import navigation from "@/constants/navItems";

interface AZFilterProps {
  onLetterClick?: (letter: string) => void;
  activeLetter?: string | null;
}

export default function AZFilter({
  onLetterClick,
  activeLetter: externalActiveLetter,
}: AZFilterProps = {}) {
  const [open, setOpen] = React.useState(false);
  const [activeLetter, setActiveLetter] = React.useState<string | null>(
    externalActiveLetter ?? null
  );

  React.useEffect(() => {
    if (externalActiveLetter !== undefined) {
      setActiveLetter(externalActiveLetter);
    }
  }, [externalActiveLetter]);
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  const componentsSection = navigation.find(
    (item) => item.title === "Components"
  );
  const components = componentsSection?.children || [];

  const availableLetters = Array.from(
    new Set(components.map((c) => c.title.charAt(0).toUpperCase()))
  ).sort();

  const handleClick = (letter: string) => {
    setActiveLetter(letter);
    window.dispatchEvent(
      new CustomEvent("filterByLetter", { detail: { letter } })
    );
    if (onLetterClick) {
      onLetterClick(letter);
    }
    setOpen(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, 50);
    }
  };

  React.useEffect(() => {
    if (open) {
      const elements = document.querySelectorAll('[data-aria-hidden="true"]');
      elements.forEach((el) => {
        el.removeAttribute("aria-hidden");
        el.removeAttribute("data-aria-hidden");
      });
    }
  }, [open]);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const DesktopFilterCard = (
    <Card className="w-[220px] p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <h4 className="text-sm font-medium mb-3">Quick Navigation</h4>
      <div className="grid grid-cols-7 gap-1">
        {availableLetters.map((letter) => (
          <Button
            key={letter}
            variant="ghost"
            size="sm"
            onClick={() => handleClick(letter)}
            className={cn(
              "h-8 w-8 p-0 text-xs font-medium transition-colors",
              activeLetter === letter
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            )}
          >
            {letter}
          </Button>
        ))}
      </div>
      <Button
        variant="default"
        size="sm"
        onClick={() => handleClick("ALL")}
        className="w-full mt-2 text-xs"
      >
        Show All
      </Button>
    </Card>
  );

  const MobileFilterContent = (
    <div className="grid grid-cols-7 gap-1.5">
      {availableLetters.map((letter) => (
        <Button
          key={letter}
          variant="ghost"
          size="sm"
          onClick={() => handleClick(letter)}
          className={cn(
            "h-8 w-8 p-0 text-xs font-medium transition-colors",
            activeLetter === letter
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
          )}
        >
          {letter}
        </Button>
      ))}
    </div>
  );

  return (
    <>
      <div className="hidden lg:block">{DesktopFilterCard}</div>

      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2 shadow-lg active:scale-95 transition-transform"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
      </div>

      <Drawer.Root
        open={open}
        onOpenChange={handleOpenChange}
        modal={true}
        dismissible={true}
        preventScrollRestoration={false}
        closeThreshold={0.5}
      >
        <Drawer.Portal
          container={
            typeof document !== "undefined" ? document.body : undefined
          }
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
            className="fixed bottom-0 left-0 right-0 bg-background z-50 rounded-t-2xl shadow-2xl border-t border-border/50 flex flex-col focus:outline-none"
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
              boxShadow:
                "0 -25px 50px -12px rgba(0, 0, 0, 0.4), 0 -8px 16px -8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Drawer.Title className="sr-only">Quick Navigation</Drawer.Title>
            <Drawer.Description className="sr-only">
              Filter components by letter
            </Drawer.Description>

            <div className="mx-auto w-10 h-1.5 bg-muted rounded-full mt-3" />

            <div className="p-4 flex flex-col gap-4 relative">
              <Drawer.Close asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 rounded-full"
                >
                  <X className="h-6 w-6" />
                </Button>
              </Drawer.Close>

              <div className="w-full max-w-sm mx-auto">
                <h3 className="text-base font-medium mb-3 text-center">
                  Quick Navigation
                </h3>
                <Card className="w-full p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  {MobileFilterContent}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleClick("ALL")}
                    className="w-full mt-2 text-xs h-7"
                  >
                    Show All
                  </Button>
                </Card>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
