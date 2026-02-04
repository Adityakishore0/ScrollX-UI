"use client";

import { cn } from "@/lib/utils";
import { useRef, useCallback } from "react";

interface IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ForwardRefExoticComponent<
    {
      size?: number;
    } & React.RefAttributes<IconHandle>
  >;
  className?: string;
  iconSize?: number;
  iconSizeMobile?: number;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  className,
  iconSize = 48,
  iconSizeMobile,
}: FeatureCardProps) {
  const iconRef = useRef<IconHandle>(null);
  const mobileSize = iconSizeMobile ?? iconSize;

  const handleMouseEnter = useCallback(() => {
    iconRef.current?.startAnimation();
  }, []);

  const handleMouseLeave = useCallback(() => {
    iconRef.current?.stopAnimation();
  }, []);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-gray-600 [contain:layout_style_paint]",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="h-full p-8 flex flex-col">
        <div className="flex-1 flex items-center justify-center text-white">
          <div className="md:hidden">
            <Icon ref={iconRef} size={mobileSize} />
          </div>
          <div className="hidden md:block">
            <Icon ref={iconRef} size={iconSize} />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
