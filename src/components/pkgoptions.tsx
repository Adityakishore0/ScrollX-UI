"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

interface PkgOptionsProps {
  name: string;
}

export default function PkgOptions({ name }: PkgOptionsProps) {
  const [selected, setSelected] = useState("npm");
  const [copySuccess, setCopySuccess] = useState(false);

  const getInstallCommand = (pkgManager: string) => {
    switch (pkgManager) {
      case "pnpm":
        return `pnpm dlx scrollx-ui@latest add ${name}`;
      case "yarn":
        return `npx scrollx-ui@latest add ${name}`;
      case "bun":
        return `bunx --bun scrollx-ui@latest add ${name}`;
      default:
        return `npx scrollx-ui@latest add ${name}`;
    }
  };

  const installCommand = getInstallCommand(selected);
  const packageManagers = ["pnpm", "npm", "yarn", "bun"];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="w-full max-w-4xl rounded-xl bg-black text-white shadow-lg">
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
        <button
          onClick={copyToClipboard}
          className="rounded-md bg-gray-100 p-2 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          title={copySuccess ? "Copied!" : "Copy code"}
        >
          <Copy className={`h-4 w-4 ${copySuccess ? "text-green-500" : ""}`} />
        </button>
      </div>
      <pre className="overflow-x-auto not-prose px-4 py-3 text-sm font-mono text-white">
        <code>{installCommand}</code>
      </pre>
    </div>
  );
}
