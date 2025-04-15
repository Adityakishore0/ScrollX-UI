"use client";

import * as React from "react";
import { Copy } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
  const [copySuccess, setCopySuccess] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content || "");
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Collapsible open={isOpened} onOpenChange={setIsOpened}>
      <div
        className={cn(
          "relative overflow-hidden bg-[#1f2937] dark:bg-black rounded-md",
          className
        )}
        {...props}
      >
        <button
          onClick={copyToClipboard}
          className="absolute right-4 top-4 z-20 rounded-md bg-gray-100 p-2 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          title={copySuccess ? "Copied!" : "Copy code"}
        >
          <Copy className={`h-4 w-4 ${copySuccess ? "text-green-500" : ""}`} />
        </button>
        <CollapsibleContent
          forceMount
          className={cn(
            "overflow-hidden bg-[#1f2937] dark:bg-black",
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
                  [&::-webkit-scrollbar]{w-[3px]}
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
    </Collapsible>
  );
}
