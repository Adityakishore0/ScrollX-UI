"use client";
import React, { useState, createContext, useContext, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FolderProps {
  color?: string;
  tabColor?: string;
  size?: "xxs" | "xs" | "sm" | "md";
  className?: string;
  children: ReactNode;
}

interface FolderContentProps {
  className?: string;
  children: ReactNode;
}

const FolderContext = createContext<{
  isOpen: boolean;
  size: "xxs" | "xs" | "sm" | "md";
}>({ isOpen: false, size: "sm" });

export const FolderContent: React.FC<FolderContentProps> = ({
  className,
  children,
}) => {
  const { isOpen, size } = useContext(FolderContext);
  const cardSizeClasses = {
    xxs: "w-32 h-24 md:w-40 md:h-28",
    xs: "w-40 h-28 md:w-48 md:h-32",
    sm: "w-52 h-36 md:w-60 md:h-40",
    md: "w-64 h-44 md:w-72 md:h-48",
  };
  const peekClasses = {
    xxs: !isOpen
      ? "-translate-y-1 md:translate-y-2 group-hover:-translate-y-6 md:group-hover:-translate-y-8 z-20"
      : "-translate-y-12 md:-translate-y-16 hover:scale-105 z-30",
    xs: !isOpen
      ? "-translate-y-2 md:translate-y-4 group-hover:-translate-y-8 md:group-hover:-translate-y-12 z-20"
      : "-translate-y-16 md:-translate-y-20 hover:scale-105 z-30",
    sm: !isOpen
      ? "-translate-y-2 md:translate-y-4 group-hover:-translate-y-8 md:group-hover:-translate-y-12 z-20"
      : "-translate-y-16 md:-translate-y-20 hover:scale-105 z-30",
    md: !isOpen
      ? "-translate-y-2 md:translate-y-4 group-hover:-translate-y-8 md:group-hover:-translate-y-12 z-20"
      : "-translate-y-16 md:-translate-y-20 hover:scale-105 z-30",
  };
  const bottomClasses = {
    xxs: "bottom-2 md:bottom-3",
    xs: "bottom-3 md:bottom-4",
    sm: "bottom-4 md:bottom-8",
    md: "bottom-6 md:bottom-10",
  };
  return (
    <div
      className={cn(
        "absolute left-1/2 -translate-x-1/2 bg-card border border-border rounded-xl shadow-2xl transition-all duration-300 ease-in-out flex items-center justify-center px-3 py-4",
        cardSizeClasses[size],
        bottomClasses[size],
        peekClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
};

const Folder: React.FC<FolderProps> = ({
  color = "hsl(173, 80%, 70%)",
  tabColor = "hsl(173, 84%, 42%)",
  size = "sm",
  className,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen((prev) => !prev);
  const sizeClasses = {
    xxs: "w-40 h-28 md:w-48 md:h-32",
    xs: "w-48 h-32 md:w-56 md:h-36",
    sm: "w-64 h-44 md:w-72 md:h-48",
    md: "w-80 h-56 md:w-96 md:h-64",
  };
  return (
    <FolderContext.Provider value={{ isOpen, size }}>
      <div
        className={cn(
          "w-full max-w-2xl flex items-center justify-center",
          className
        )}
      >
        <div
          onClick={handleClick}
          className={cn(
            "group relative cursor-pointer transition-all duration-200 ease-in",
            !isOpen && "hover:-translate-y-1"
          )}
        >
          <div className={cn("relative", sizeClasses[size])}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 225 171"
              className="absolute top-0 left-0 w-full h-full"
              fill={color}
            >
              <path d="M0.798828 10.9374C0.798828 5.39412 5.29256 0.900391 10.8358 0.900391H61.2051C65.7717 0.900391 70.2784 1.93905 74.3843 3.93778L89.013 11.0589C93.1189 13.0576 97.6257 14.0963 102.192 14.0963H214.762C220.305 14.0963 224.799 18.59 224.799 24.1333V153.17C224.799 162.871 216.935 170.735 207.234 170.735H18.3636C8.66286 170.735 0.798828 162.871 0.798828 153.17V10.9374Z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 225 171"
              className="absolute top-0 left-0 w-full h-full pointer-events-none z-40"
              fill={tabColor}
            >
              <path d="M61.2051 0.900391C65.7717 0.900391 70.2784 1.93905 74.3843 3.93778L89.013 11.0589C93.1189 13.0576 97.6257 14.0963 102.192 14.0963H214.762C220.305 14.0963 224.799 18.59 224.799 24.1333V24.1333C224.799 18.59 220.305 14.0963 214.762 14.0963H102.192C97.6257 14.0963 93.1189 13.0576 89.013 11.0589L74.3843 3.93778C70.2784 1.93905 65.7717 0.900391 61.2051 0.900391H10.8358C5.29256 0.900391 0.798828 5.39412 0.798828 10.9374V10.9374C0.798828 5.39412 5.29256 0.900391 10.8358 0.900391H61.2051Z" />
            </svg>
            <div
              className={cn(
                "absolute z-30 origin-bottom transition-all duration-300 ease-in-out pointer-events-none top-[24px] h-[calc(100%-24px)] rounded-[5px_15px_15px_15px]",
                sizeClasses[size],
                isOpen
                  ? "skew-x-12 scale-y-[0.6]"
                  : "group-hover:skew-x-12 group-hover:scale-y-[0.6]"
              )}
              style={{ backgroundColor: color }}
            ></div>
            <div
              className={cn(
                "absolute z-30 origin-bottom transition-all duration-300 ease-in-out pointer-events-none top-[24px] h-[calc(100%-24px)] rounded-[5px_15px_15px_15px]",
                sizeClasses[size],
                isOpen
                  ? "-skew-x-12 scale-y-[0.6]"
                  : "group-hover:-skew-x-12 group-hover:scale-y-[0.6]"
              )}
              style={{ backgroundColor: color }}
            ></div>
            {children}
          </div>
        </div>
      </div>
    </FolderContext.Provider>
  );
};

export { Folder };
