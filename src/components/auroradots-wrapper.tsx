"use client";

import { AuroraDots } from "@/components/aurora-dots";
import { useEffect, useState, useMemo } from "react";

interface AuroraDotsWrapperProps {
  className?: string;
  particleColor?: string;
  glowIntensity?: number;
  animationSpeed?: number;
  hoverRadius?: number;
  hoverGlowIntensity?: number;
  children: React.ReactNode;
}

export function AuroraDotsWrapper({
  className,
  particleColor,
  glowIntensity,
  animationSpeed,
  hoverRadius,
  hoverGlowIntensity,
  children,
}: AuroraDotsWrapperProps) {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreenSize();

    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkScreenSize, 150);
    };

    window.addEventListener("resize", debouncedResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  const auroraProps = useMemo(
    () => ({
      className,
      particleColor,
      glowIntensity,
      animationSpeed,
      hoverRadius,
      hoverGlowIntensity,
      interactive: isDesktop,
    }),
    [
      className,
      particleColor,
      glowIntensity,
      animationSpeed,
      hoverRadius,
      hoverGlowIntensity,
      isDesktop,
    ]
  );

  return <AuroraDots {...auroraProps}>{children}</AuroraDots>;
}
