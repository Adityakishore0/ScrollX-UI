"use client";
import React, { useState, useEffect, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface AvatarData {
  src: string;
  alt: string;
  fallback: string;
  name: string;
}

export interface FacescapeProps {
  avatars: AvatarData[];
  className?: string;
  colorDuration?: number;
  variant?: "circle" | "square" | "squircle";
}

const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 };

const useBreakpoint = (breakpoint: "sm" | "md" | "lg" | "xl" | "2xl") => {
  const [isBelow, setIsBelow] = useState(false);
  useEffect(() => {
    const handleResize = () =>
      setIsBelow(window.innerWidth < BREAKPOINTS[breakpoint]);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isBelow;
};

const FacescapeItem = React.forwardRef<
  HTMLDivElement,
  {
    className?: string;
    src: string;
    alt: string;
    fallback: string;
    name: string;
    colorDuration?: number;
    autoAnimate?: boolean;
    variant?: "circle" | "square" | "squircle";
  }
>(
  (
    {
      className,
      src,
      alt,
      fallback,
      name,
      colorDuration = 3000,
      autoAnimate = false,
      variant = "squircle",
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isColorful, setIsColorful] = useState(false);
    const [isLarge, setIsLarge] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!autoAnimate || !itemRef.current) return;
      const observer = new IntersectionObserver(
        ([entry]) => setIsVisible(entry.isIntersecting),
        { threshold: 0.3 }
      );
      observer.observe(itemRef.current);
      return () => observer.disconnect();
    }, [autoAnimate]);

    useEffect(() => {
      let colorTimeout: NodeJS.Timeout | undefined;
      let sizeTimeout: NodeJS.Timeout | undefined;
      const active = autoAnimate ? isVisible : isHovered;
      if (active) {
        setIsColorful(true);
        setIsLarge(true);
      } else {
        if (isColorful)
          colorTimeout = setTimeout(() => setIsColorful(false), colorDuration);
        if (isLarge)
          sizeTimeout = setTimeout(() => setIsLarge(false), colorDuration);
      }
      return () => {
        if (colorTimeout) clearTimeout(colorTimeout);
        if (sizeTimeout) clearTimeout(sizeTimeout);
      };
    }, [isHovered, isVisible, autoAnimate, isColorful, isLarge, colorDuration]);

    const shapeClass = {
      circle: "rounded-full",
      square: "rounded-none",
      squircle: "rounded-md",
    }[variant];

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              ref={itemRef}
              className={cn(
                "relative cursor-pointer transition-all duration-500 ease-in-out transform-gpu origin-center",
                isLarge ? "scale-150 z-10" : "scale-100",
                isColorful
                  ? "grayscale-0 contrast-100 brightness-100 opacity-100"
                  : "grayscale contrast-50 brightness-75 opacity-60",
                className
              )}
              onMouseEnter={() => !autoAnimate && setIsHovered(true)}
              onMouseLeave={() => !autoAnimate && setIsHovered(false)}
              {...props}
            >
              <Avatar className={cn("h-8 w-8", shapeClass)}>
                <AvatarImage src={src} alt={alt} />
                <AvatarFallback>{fallback}</AvatarFallback>
              </Avatar>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

FacescapeItem.displayName = "FacescapeItem";

const Facescape = React.forwardRef<HTMLDivElement, FacescapeProps>(
  (
    {
      avatars,
      className,
      colorDuration = 3000,
      variant = "squircle",
      ...props
    },
    ref
  ) => {
    const isMobileOrTablet = useBreakpoint("lg");
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap w-full justify-center gap-x-3 gap-y-4",
          className
        )}
        {...props}
      >
        {avatars.map((avatar, index) => (
          <div
            key={index}
            className="flex justify-center items-center w-10 h-10"
          >
            <FacescapeItem
              src={avatar.src}
              alt={avatar.alt}
              fallback={avatar.fallback}
              name={avatar.name}
              colorDuration={colorDuration}
              autoAnimate={isMobileOrTablet}
              variant={variant}
            />
          </div>
        ))}
      </div>
    );
  }
);

Facescape.displayName = "Facescape";

export { Facescape };
