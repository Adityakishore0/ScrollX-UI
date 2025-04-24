"use client";

import React, { useState } from "react";
import { Copy } from "lucide-react";
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

  const extractText = (node: React.ReactNode): string => {
    if (typeof node === "string") {
      return node;
    }
    if (React.isValidElement(node) && node.props.children) {
      return extractText(node.props.children);
    }
    if (Array.isArray(node)) {
      return node.map(extractText).join("");
    }
    return "";
  };

  const copyToClipboard = () => {
    const textToCopy = extractText(children);
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={copyToClipboard}
        className="absolute right-4 top-4 z-20 rounded-md bg-gray-100 p-2 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
        title={copied ? "Copied!" : "Copy code"}
      >
        <Copy className={cn("h-4 w-4", copied ? "text-green-500" : "")} />
      </button>
      <pre
        className={cn(
          "my-4 overflow-x-auto rounded-lg border border-neutral-800",
          "bg-[#1f2937] dark:bg-black p-4",
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
