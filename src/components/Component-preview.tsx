"use client";
import React, { useState, useEffect } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Copy } from "lucide-react";
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
  const [copySuccess, setCopySuccess] = useState(false);
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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(sourceCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List className="flex border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <Tabs.Trigger
            value="preview"
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "preview"
                ? "border-b-2 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            }`}
          >
            Preview
          </Tabs.Trigger>
          <Tabs.Trigger
            value="code"
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "code"
                ? "border-b-2 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            }`}
          >
            Code
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="preview" className="p-4">
          <div
            className={`preview flex min-h-[350px] w-full justify-center items-center p-10 ${className}`}
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
              className="absolute right-4 top-4 z-10 rounded-md bg-gray-100 p-2 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              title={copySuccess ? "Copied!" : "Copy code"}
            >
              <Copy
                className={`h-4 w-4 ${copySuccess ? "text-green-500" : ""}`}
              />
            </button>
            <ScrollArea.Viewport className="h-full max-h-[350px] w-full">
              <div className="relative">
                {activeTab === "code" && (
                  <>
                    <pre className="language-tsx p-4 text-sm overflow-x-auto">
                      <code>{sourceCode}</code>
                    </pre>
                  </>
                )}
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              orientation="vertical"
              className="flex w-2.5 touch-none select-none bg-gray-100 dark:bg-gray-800 p-0.5"
            >
              <ScrollArea.Thumb className="relative flex-1 rounded-full bg-gray-300 dark:bg-gray-600" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </Tabs.Content>
      </Tabs.Root>
      {description && (
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </div>
      )}
    </div>
  );
}
