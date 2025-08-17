"use client";
import { useEffect, useRef, useState } from "react";
import SvgComponent from "@/components/svgcomponent";
import DarkSvgComponent from "@/components/darksvgcomponent";

interface ScrollXHeadingProps {
  className?: string;
}

export default function ScrollXHeading({ className }: ScrollXHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const checkDark = () => setIsDarkMode(html.classList.contains("dark"));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative transition-opacity duration-700 ease-out transform-gpu ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {isDarkMode ? (
        <SvgComponent className={`w-auto h-16 sm:h-20 ${className || ""}`} />
      ) : (
        <DarkSvgComponent
          className={`w-auto h-16 sm:h-20 ${className || ""}`}
        />
      )}
    </div>
  );
}
