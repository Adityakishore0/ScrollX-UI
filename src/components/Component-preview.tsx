"use client";
import React, { useState, useEffect } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { twMerge } from "tailwind-merge";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Copy, Check, AlertCircle } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import componentsRegistry from "@/app/registry/registry";
import { getComponentSourceAction } from "../actions/getComponentSourceAction";

type ComponentPreviewProps = {
  name: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function ComponentPreview({
  name,
  description,
  className = "",
  children,
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState("preview");
  const [sourceCode, setSourceCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const Component = componentsRegistry[name];

  useEffect(() => {
    const fetchSourceCode = async () => {
      try {
        const result = await getComponentSourceAction(name);
        setSourceCode(result.source);
      } catch (error) {
        console.error("Error fetching source code:", error);
        setSourceCode(`// Error loading source code for ${name}`);
      }
    };
    fetchSourceCode();
  }, [name]);

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

  const copyToClipboard = async () => {
    const textToCopy = sourceCode;

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
    try {
      success = await modernCopy(textToCopy);
      if (!success) {
        success = legacyCopy(textToCopy);
      }
    } catch (err) {
      console.error("Copy failed:", err);
      success = false;
    }

    if (success) {
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
    <>
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List className="flex border-b border-gray-200 dark:border-gray-800">
          {["preview", "code"].map((tab) => (
            <Tabs.Trigger
              key={tab}
              value={tab}
              className={twMerge(
                "relative px-4 py-2 text-sm font-medium rounded-t-md overflow-hidden transition-colors duration-500",
                activeTab === tab
                  ? "text-white dark:text-black"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              )}
            >
              <span className="relative z-10 capitalize">{tab}</span>
              <span
                className={twMerge(
                  "absolute bottom-0 left-0 h-full w-full origin-bottom scale-y-0 transition-transform duration-500 ease-out z-0",
                  activeTab === tab
                    ? "scale-y-100 bg-black dark:bg-white"
                    : "bg-transparent"
                )}
              />
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <div className="my-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
          <Tabs.Content value="preview">
            <div
              className={twMerge(
                "preview flex min-h-[350px] w-full justify-center items-center p-10 not-prose",
                className
              )}
            >
              {Component ? (
                <Component />
              ) : children ? (
                children
              ) : (
                <p>Component "{name}" not found in registry</p>
              )}
            </div>
          </Tabs.Content>
          <Tabs.Content value="code" asChild>
            <ScrollArea.Root className="relative">
              <button
                onClick={copyToClipboard}
                className={`absolute right-4 top-4 z-10 rounded-md p-2 transition-colors ${
                  copied
                    ? "bg-green-100 dark:bg-green-900/30"
                    : copyFailed
                    ? "bg-red-100 dark:bg-red-900/30"
                    : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                }`}
                title={
                  copied ? "Copied!" : copyFailed ? "Copy failed" : "Copy code"
                }
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                ) : copyFailed ? (
                  <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>

              {(copied || copyFailed) && (
                <div className="absolute right-4 top-12 z-30 animate-in fade-in-0 slide-in-from-top-2 duration-300">
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

              <ScrollArea.Viewport className="h-full max-h-[350px] w-full overflow-auto">
                <div className="relative min-w-full">
                  {activeTab === "code" && (
                    <div className="h-full w-full bg-[#1f2937] dark:bg-black">
                      <SyntaxHighlighter
                        language="tsx"
                        style={vscDarkPlus}
                        customStyle={{
                          fontSize: "12px",
                          backgroundColor: "transparent",
                          color: "#d4d4d4",
                          borderRadius: "8px",
                          padding: "1rem",
                          width: "100%",
                          height: "100%",
                          margin: 0,
                          overflowX: "auto",
                          whiteSpace: "pre",
                        }}
                        wrapLines={false}
                        wrapLongLines={false}
                      >
                        {sourceCode}
                      </SyntaxHighlighter>
                    </div>
                  )}
                </div>
              </ScrollArea.Viewport>

              <ScrollArea.Scrollbar
                orientation="vertical"
                className="flex w-2 touch-none select-none bg-[#1f2937] dark:bg-black p-0.5"
              >
                <ScrollArea.Thumb className="relative flex-1 rounded-full bg-gray-300 dark:bg-gray-600" />
              </ScrollArea.Scrollbar>

              <ScrollArea.Scrollbar orientation="horizontal" className="hidden">
                <ScrollArea.Thumb className="relative flex-1 rounded-full bg-gray-300 dark:bg-gray-600" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </>
  );
}
