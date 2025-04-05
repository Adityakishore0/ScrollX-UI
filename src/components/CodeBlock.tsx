"use client";

import { useState } from "react";

export default function CodeBlock({
  children,
  language,
}: {
  children: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded text-sm"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre
        className={`language-${language} p-4 rounded bg-gray-900 text-white overflow-x-auto`}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}
