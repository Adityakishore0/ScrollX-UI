"use client";

import * as React from "react";
import { Copy, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  expandButtonTitle?: string;
  content?: string;
}

export function CodeBlockWrapper({
  expandButtonTitle = "View Code",
  className,
  children,
  content,
  ...props
}: CodeBlockProps) {
  const [isOpened, setIsOpened] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(false);
  const [copyFailed, setCopyFailed] = React.useState(false);

  const isClipboardSupported = (): boolean => {
    try {
      return !!(
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      );
    } catch {
      return false;
    }
  };

  const modernCopy = async (text: string): Promise<boolean> => {
    try {
      if (!isClipboardSupported()) return false;
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  };

  const legacyCopy = (text: string): boolean => {
    try {
      if (typeof document === "undefined") return false;

      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.cssText = `
        position: fixed;
        top: -9999px;
        left: -9999px;
        width: 1px;
        height: 1px;
        opacity: 0;
        pointer-events: none;
        z-index: -1;
      `;

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      textArea.setSelectionRange(0, text.length);

      const success = document.execCommand && document.execCommand("copy");
      document.body.removeChild(textArea);

      return !!success;
    } catch {
      return false;
    }
  };

  const safeVibrate = (): void => {
    try {
      if (
        typeof navigator !== "undefined" &&
        navigator.vibrate &&
        typeof navigator.vibrate === "function"
      ) {
        navigator.vibrate([50, 30, 50]);
      }
    } catch {}
  };

  const copyToClipboard = async (): Promise<void> => {
    const textToCopy = content || "";

    if (!textToCopy.trim()) {
      setCopyFailed(true);
      setShowMessage(true);
      setTimeout(() => {
        setCopyFailed(false);
        setShowMessage(false);
      }, 2000);
      return;
    }

    let success = false;
    success = await modernCopy(textToCopy);

    if (!success) {
      success = legacyCopy(textToCopy);
    }

    if (success) {
      safeVibrate();
      setCopied(true);
      setCopyFailed(false);
    } else {
      setCopied(false);
      setCopyFailed(true);
    }

    setShowMessage(true);
    setTimeout(() => {
      setCopied(false);
      setCopyFailed(false);
      setShowMessage(false);
    }, 2000);
  };

  return (
    <Collapsible open={isOpened} onOpenChange={setIsOpened}>
      <div className={cn("relative", className)} {...props}>
        <div
          className={cn(
            "relative overflow-hidden bg-[#1f2937] dark:bg-black rounded-md"
          )}
        >
          <div className="relative">
            <button
              onClick={copyToClipboard}
              className={`absolute right-4 top-4 z-20 rounded-md p-2 transition-all duration-200 ${
                copied
                  ? "bg-green-100 dark:bg-green-900/30"
                  : copyFailed
                  ? "bg-red-100 dark:bg-red-900/30"
                  : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              }`}
              title={
                copied ? "Copied!" : copyFailed ? "Copy failed" : "Copy code"
              }
              type="button"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
              ) : copyFailed ? (
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>

            {showMessage && (
              <div className="absolute right-4 top-16 z-30 animate-in fade-in-0 slide-in-from-top-2 duration-300">
                <div
                  className={`rounded-md border px-3 py-2 shadow-lg backdrop-blur-sm ${
                    copied
                      ? "bg-green-100/90 dark:bg-green-900/80 border-green-200 dark:border-green-700"
                      : "bg-red-100/90 dark:bg-red-900/80 border-red-200 dark:border-red-700"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <span className="text-sm font-medium text-green-800 dark:text-green-200">
                          Copied!
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                        <span className="text-sm font-medium text-red-800 dark:text-red-200">
                          Copy failed
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <CollapsibleContent
            forceMount
            className={cn(
              "overflow-hidden bg-[#1f2937] dark:bg-black transition-all duration-300",
              !isOpened && "max-h-32"
            )}
          >
            <div
              className={cn(
                "relative w-full h-full max-h-[650px] [&_pre]:my-0 [&_pre]:h-full [&_pre]:w-full",
                isOpened
                  ? `
                  overflow-y-auto
                  overflow-x-hidden
                  bg-[#1f2937] dark:bg-black
                  [&::-webkit-scrollbar]:w-[3px]
                  [&::-webkit-scrollbar-thumb]:rounded-full
                  [&::-webkit-scrollbar-thumb]:bg-zinc-400/50
                  dark:[&::-webkit-scrollbar-thumb]:bg-zinc-700
                  hover:[&::-webkit-scrollbar-thumb]:bg-zinc-400
                  dark:hover:[&::-webkit-scrollbar-thumb]:bg-zinc-600
                  [&::-webkit-scrollbar-track]:bg-transparent
                  [scrollbar-width:thin]
                  [scrollbar-color:rgb(161_161_170_/_0.5)_transparent]
                  dark:[scrollbar-color:rgb(63_63_70)_transparent]
                  [&_pre]:overflow-x-auto
                  [&_pre::-webkit-scrollbar]:hidden
                  [&_pre]:[-ms-overflow-style:none]
                  [&_pre]:[scrollbar-width:none]
                `
                  : "overflow-hidden"
              )}
            >
              {children}
            </div>
          </CollapsibleContent>

          <div
            className={cn(
              "absolute flex items-center justify-center bg-gradient-to-b from-[#1f2937]/30 to-[#1f2937]/90 dark:from-black/30 dark:to-black/90 p-2",
              isOpened ? "inset-x-0 bottom-0 h-12" : "inset-0"
            )}
          >
            <CollapsibleTrigger asChild>
              <Button variant="secondary" className="h-8 text-xs">
                {isOpened ? "Collapse" : expandButtonTitle}
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
      </div>
    </Collapsible>
  );
}
