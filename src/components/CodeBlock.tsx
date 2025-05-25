"use client";
import React, { useState } from "react";
import { Copy, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
  className?: string;
}

export default function CodeBlock({
  children,
  language,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const extractText = (node: React.ReactNode): string => {
    if (typeof node === "string") {
      return node;
    }
    if (React.isValidElement(node) && node.props?.children) {
      return extractText(node.props.children);
    }
    if (Array.isArray(node)) {
      return node.map(extractText).join("");
    }
    return "";
  };

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
    const textToCopy = extractText(children);

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
    <div className="relative">
      <button
        onClick={copyToClipboard}
        className={cn(
          "absolute right-4 top-4 z-20 rounded-md p-2 transition-all duration-200",
          "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700",
          copied && "bg-green-100 dark:bg-green-900/30",
          copyFailed && "bg-red-100 dark:bg-red-900/30"
        )}
        title={copied ? "Copied!" : copyFailed ? "Copy failed" : "Copy code"}
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
            className={cn(
              "rounded-md border px-3 py-2 shadow-lg backdrop-blur-sm",
              copied
                ? "bg-green-100/90 dark:bg-green-900/80 border-green-200 dark:border-green-700"
                : "bg-red-100/90 dark:bg-red-900/80 border-red-200 dark:border-red-700"
            )}
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

      <pre
        className={cn(
          "my-4 overflow-x-auto rounded-lg border border-neutral-800",
          "bg-[#1f2937] dark:bg-black p-4 pr-16",
          "text-[12px] text-[#d4d4d4]",
          className
        )}
      >
        <code className={`not-prose ${language ? `language-${language}` : ""}`}>
          {children}
        </code>
      </pre>
    </div>
  );
}
