"use client";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import {
  Check,
  Copy,
  ChevronRight,
  File,
  Folder,
  Terminal,
  Code2,
  Download,
  Maximize2,
  Settings,
} from "lucide-react";

type CodeBlockProps = {
  language: string;
  filename: string;
  highlightLines?: number[];
  breadcrumb?: string[];
  showStats?: boolean;
  theme?: "dark" | "light";
} & (
  | {
      code: string;
      tabs?: never;
    }
  | {
      code?: never;
      tabs: Array<{
        name: string;
        code: string;
        language?: string;
        highlightLines?: number[];
      }>;
    }
);

export const CodeBlock = ({
  language,
  filename,
  code,
  highlightLines = [],
  tabs = [],
  breadcrumb = [],
  showStats = true,
  theme = "dark",
}: CodeBlockProps) => {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const tabsExist = tabs.length > 0;

  const copyToClipboard = async () => {
    const textToCopy = tabsExist ? tabs[activeTab].code : code;
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadCode = () => {
    const textToDownload = tabsExist ? tabs[activeTab].code : code;
    const activeFilename = tabsExist ? tabs[activeTab].name : filename;
    if (textToDownload) {
      const blob = new Blob([textToDownload], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = activeFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const activeCode = tabsExist ? tabs[activeTab].code : code;
  const activeLanguage = tabsExist
    ? tabs[activeTab].language || language
    : language;
  const activeHighlightLines = tabsExist
    ? tabs[activeTab].highlightLines || []
    : highlightLines;

  const getLanguageIcon = (lang: string) => {
    switch (lang.toLowerCase()) {
      case "javascript":
      case "jsx":
      case "typescript":
      case "tsx":
        return <Code2 size="1em" className="text-yellow-400" />;
      case "bash":
      case "shell":
        return <Terminal size="1em" className="text-green-400" />;
      default:
        return <File size="1em" className="text-blue-400" />;
    }
  };

  const getCodeStats = (code: string) => {
    const lines = code.split("\n").length;
    const chars = code.length;
    const words = code.split(/\s+/).filter((word) => word.length > 0).length;
    return { lines, chars, words };
  };

  const stats = showStats ? getCodeStats(activeCode || "") : null;

  return (
    <div
      className={`relative w-full rounded-xl overflow-hidden shadow-2xl ${
        theme === "dark" ? "bg-slate-900" : "bg-white"
      } border ${theme === "dark" ? "border-slate-700" : "border-gray-200"}`}
    >
      <div
        className={`flex items-stretch min-h-[3rem] ${
          theme === "dark"
            ? "bg-slate-800 border-b border-slate-700"
            : "bg-gray-50 border-b border-gray-200"
        }`}
      >
        <div className="flex-1 flex items-center min-w-0 px-3">
          <div className="flex gap-2 mr-3 shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          {breadcrumb.length > 0 && (
            <div className="flex items-center min-w-0">
              <Folder
                size="1em"
                className={`shrink-0 ${
                  theme === "dark" ? "text-slate-400" : "text-gray-500"
                }`}
              />
              <div className="flex items-center min-w-0 ml-2">
                {breadcrumb.map((crumb, index) => (
                  <React.Fragment key={index}>
                    <span
                      className={`text-xs truncate ${
                        theme === "dark" ? "text-slate-400" : "text-gray-500"
                      }`}
                    >
                      {crumb}
                    </span>
                    {index < breadcrumb.length - 1 && (
                      <ChevronRight
                        size="0.75em"
                        className={`shrink-0 mx-1 ${
                          theme === "dark" ? "text-slate-500" : "text-gray-400"
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end shrink-0 px-2">
          {stats && (
            <div
              className={`text-xs mx-2 ${
                theme === "dark" ? "text-slate-400" : "text-gray-500"
              } truncate hidden md:block`}
            >
              {stats.lines}L • {stats.words}W
            </div>
          )}

          <div className="flex">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`p-2 hover:${
                theme === "dark" ? "bg-slate-700" : "bg-gray-200"
              } transition-colors`}
              title="Toggle fullscreen"
            >
              <Maximize2
                size="1em"
                className={
                  theme === "dark" ? "text-slate-400" : "text-gray-500"
                }
              />
            </button>
            <button
              onClick={downloadCode}
              className={`p-2 hover:${
                theme === "dark" ? "bg-slate-700" : "bg-gray-200"
              } transition-colors`}
              title="Download code"
            >
              <Download
                size="1em"
                className={
                  theme === "dark" ? "text-slate-400" : "text-gray-500"
                }
              />
            </button>
            <button
              onClick={copyToClipboard}
              className={`p-2 hover:${
                theme === "dark" ? "bg-slate-700" : "bg-gray-200"
              } transition-colors`}
              title="Copy code"
            >
              {copied ? (
                <Check size="1em" className="text-green-400" />
              ) : (
                <Copy
                  size="1em"
                  className={
                    theme === "dark" ? "text-slate-400" : "text-gray-500"
                  }
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {tabsExist && (
        <div
          className={`flex border-b ${
            theme === "dark"
              ? "border-slate-700 bg-slate-800"
              : "border-gray-200 bg-gray-50"
          } overflow-x-auto`}
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex items-center gap-2 px-4 py-2 text-sm transition-all duration-200 border-b-2 shrink-0 ${
                activeTab === index
                  ? theme === "dark"
                    ? "text-white border-blue-400 bg-slate-900"
                    : "text-gray-900 border-blue-500 bg-white"
                  : theme === "dark"
                  ? "text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-700"
                  : "text-gray-600 border-transparent hover:text-gray-800 hover:bg-gray-100"
              }`}
            >
              {getLanguageIcon(tab.language || language)}
              <span className="truncate max-w-[10rem]">{tab.name}</span>
            </button>
          ))}
        </div>
      )}

      {!tabsExist && filename && (
        <div
          className={`flex items-center px-3 py-2 border-b ${
            theme === "dark"
              ? "border-slate-700 bg-slate-800"
              : "border-gray-200 bg-gray-50"
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            {getLanguageIcon(language)}
            <span
              className={`text-sm font-medium truncate ${
                theme === "dark" ? "text-slate-200" : "text-gray-700"
              }`}
            >
              {filename}
            </span>
          </div>
        </div>
      )}

      <div
        className={`relative ${
          isExpanded ? "max-h-screen overflow-auto" : "max-h-96 overflow-auto"
        }`}
      >
        <SyntaxHighlighter
          language={activeLanguage}
          style={theme === "dark" ? atomDark : undefined}
          customStyle={{
            margin: 0,
            padding: "1rem",
            background: "transparent",
            fontSize: "0.875rem",
            lineHeight: "1.5",
          }}
          wrapLines={true}
          showLineNumbers={true}
          lineNumberStyle={{
            minWidth: "3em",
            paddingRight: "1em",
            color: theme === "dark" ? "#64748b" : "#9ca3af",
            borderRight: `1px solid ${
              theme === "dark" ? "#334155" : "#e5e7eb"
            }`,
            marginRight: "1em",
          }}
          lineProps={(lineNumber: number) => ({
            style: {
              backgroundColor: activeHighlightLines.includes(lineNumber)
                ? theme === "dark"
                  ? "rgba(59, 130, 246, 0.1)"
                  : "rgba(59, 130, 246, 0.05)"
                : "transparent",
              display: "block",
              width: "100%",
              borderLeft: activeHighlightLines.includes(lineNumber)
                ? "3px solid #3b82f6"
                : "3px solid transparent",
              paddingLeft: "0.5rem",
            },
          })}
          PreTag="div"
        >
          {String(activeCode)}
        </SyntaxHighlighter>
      </div>

      {showStats && stats && (
        <div
          className={`px-3 py-2 border-t text-xs ${
            theme === "dark"
              ? "border-slate-700 bg-slate-800 text-slate-400"
              : "border-gray-200 bg-gray-50 text-gray-500"
          } flex items-center justify-between min-h-[2.5rem]`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="truncate">{activeLanguage.toUpperCase()}</span>
            <span className="truncate hidden sm:inline">
              {stats.lines} lines
            </span>
            <span className="truncate hidden md:inline">
              {stats.chars} chars
            </span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Settings size="0.75em" />
            <span>UTF-8</span>
          </div>
        </div>
      )}
    </div>
  );
};
