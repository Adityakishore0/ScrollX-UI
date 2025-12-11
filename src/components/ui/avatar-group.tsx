"use client";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Avatar {
  imageUrl: string;
  name: string;
}

interface AvatarGroupProps {
  className?: string;
  avatarUrls: Avatar[];
}

const AvatarGroup = ({ className, avatarUrls }: AvatarGroupProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setHoveredIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleInteraction = (
    index: number,
    e: React.MouseEvent | React.TouchEvent
  ) => {
    e.preventDefault();
    setHoveredIndex(hoveredIndex === index ? null : index);
  };

  return (
    <div
      ref={containerRef}
      className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}
    >
      {avatarUrls.map((avatar, index) => {
        const isHovered = hoveredIndex === index;
        const showName = isHovered;

        return (
          <div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onTouchEnd={(e) => handleInteraction(index, e)}
            onClick={(e) => handleInteraction(index, e)}
            className={cn(
              "relative flex items-center gap-0 rounded-full cursor-pointer touch-none",
              "transition-all duration-500 ease-out",
              " hover:z-10",
              showName ? "pr-6 pl-2 py-2" : "p-0.5"
            )}
          >
            <div className="relative flex-shrink-0">
              <img
                src={avatar.imageUrl}
                alt={avatar.name}
                width={40}
                height={40}
                className={cn(
                  "h-10 w-10 rounded-full object-cover border-2 border-white dark:border-gray-800",
                  "transition-all duration-500 ease-out",
                  "hover:scale-105"
                )}
              />
            </div>

            <div
              className={cn(
                "grid transition-all duration-500 ease-out",
                showName
                  ? "grid-cols-[1fr] opacity-100 ml-2"
                  : "grid-cols-[0fr] opacity-0 ml-0"
              )}
            >
              <div className="overflow-hidden">
                <span
                  className={cn(
                    "text-sm font-medium whitespace-nowrap block",
                    "transition-colors duration-300 text-foreground"
                  )}
                >
                  {avatar.name}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { AvatarGroup };
