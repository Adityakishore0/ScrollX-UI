"use client";

import { useState } from "react";
import { Copy, Check, AlertCircle } from "lucide-react";

interface DepsOptionsProps {
  name: string;
}

export default function DepsOptions({ name }: DepsOptionsProps) {
  const [selected, setSelected] = useState("npm");
  const [copied, setCopied] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const getInstallCommand = (pkgManager: string) => {
    switch (pkgManager) {
      case "pnpm":
        return `pnpm add ${name}`;
      case "yarn":
        return `yarn add ${name}`;
      case "bun":
        return `bun add ${name}`;
      default:
        return `npm install ${name}`;
    }
  };

  const installCommand = getInstallCommand(selected);
  const packageManagers = ["pnpm", "npm", "yarn", "bun"];

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
    if (!installCommand.trim()) {
      setCopyFailed(true);
      setShowMessage(true);
      setTimeout(() => {
        setCopyFailed(false);
        setShowMessage(false);
      }, 2000);
      return;
    }

    let success = false;
    success = await modernCopy(installCommand);

    if (!success) {
      success = legacyCopy(installCommand);
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
    <div className="relative w-full max-w-4xl rounded-xl bg-black text-white shadow-lg">
      <div className="flex items-center justify-between px-4 pt-4 text-sm text-gray-400">
        <div className="flex space-x-6">
          {packageManagers.map((pkg) => (
            <button
              key={pkg}
              className={`border-b-2 transition-colors ${
                selected === pkg
                  ? "border-white text-white"
                  : "border-transparent hover:text-gray-300"
              }`}
              onClick={() => setSelected(pkg)}
            >
              {pkg}
            </button>
          ))}
        </div>

        <div className="relative">
          <button
            onClick={copyToClipboard}
            className={`rounded-md p-2 transition-all duration-200 ${
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
            <div className="absolute right-0 top-12 z-30 animate-in fade-in-0 slide-in-from-top-2 duration-300">
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
      </div>

      <pre className="overflow-x-auto not-prose px-4 py-3 text-sm font-mono text-white">
        <code>{installCommand}</code>
      </pre>
    </div>
  );
}
