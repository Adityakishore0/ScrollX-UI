"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface HyperlinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  underlineClassName?: string;
}

const Hyperlink: React.FC<HyperlinkProps> = ({
  href,
  children,
  className,
  underlineClassName,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative inline-block text-sm font-medium tracking-wide text-foreground",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute left-0 w-full h-[1.5px] bg-muted-foreground/30 -bottom-2" />
      <span
        className={cn(
          "absolute left-0 w-full h-[1.5px] bg-foreground transform scale-x-0 transition-transform duration-500 ease-out -bottom-2",
          isHovered ? "scale-x-100 origin-left" : "scale-x-0 origin-right",
          underlineClassName
        )}
      />
    </a>
  );
};

export { Hyperlink };
