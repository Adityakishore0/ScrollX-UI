"use client";

import * as React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";
import { CodeBlockWrapper } from "@/components/code-block-wrapper";
import { getParentSourceAction } from "@/actions/getParentSourceAction";

interface ComponentSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
}

export function ComponentSource({
  name,
  className,
  ...props
}: ComponentSourceProps) {
  const [source, setSource] = React.useState<string>("");

  React.useEffect(() => {
    const loadSource = async () => {
      const result = await getParentSourceAction(name);
      setSource(result.source);
    };
    loadSource();
  }, [name]);

  return (
    <CodeBlockWrapper
      expandButtonTitle="Expand"
      className={cn("my-6 overflow-hidden rounded-md", className)}
      content={source}
    >
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
        }}
        wrapLines={true}
        wrapLongLines={true}
        className="h-full w-full bg-[#1f2937] dark:bg-black"
      >
        {source}
      </SyntaxHighlighter>
    </CodeBlockWrapper>
  );
}
