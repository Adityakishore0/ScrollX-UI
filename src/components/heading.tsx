"use client";

import { useEffect, useRef, useState } from "react";

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
      <h1
        className={`tracking-wide select-none transition-transform duration-700 ease-out ${
          isDarkMode ? "text-white" : "text-black"
        } ${className || ""}`}
        style={{
          fontFamily:
            "'Brush Script MT', 'Brush Script Std', 'Lucida Handwriting', 'Apple Chancery', fantasy",
          textShadow: isDarkMode
            ? "0 2px 8px rgba(255,255,255,0.15), 0 0 20px rgba(255,255,255,0.1)"
            : "0 2px 8px rgba(0,0,0,0.2), 0 0 20px rgba(0,0,0,0.1)",
          transform: "rotate(-1deg)",
          letterSpacing: "0.02em",
        }}
      >
        ScrollX U
        <span
          style={{
            fontFamily: "'fantasy', 'Playfair Display', serif",
            fontStyle: "italic",
            fontWeight: 600,
            display: "inline-block",
            transform: "skewX(-14deg)",
          }}
        >
          I
        </span>
      </h1>

      <div
        className="absolute left-4 right-4 h-1 rounded-full transition-transform duration-1000 ease-out origin-left scale-x-0"
        style={{
          bottom: "-2px",
          background: isDarkMode
            ? "linear-gradient(90deg, transparent 0%, #808080 10%, #606060 90%, transparent 100%)"
            : "linear-gradient(90deg, transparent 0%, #404040 10%, #202020 90%, transparent 100%)",
          transform: visible
            ? "rotate(-1deg) scaleY(0.8) scaleX(1)"
            : "rotate(-1deg) scaleY(0.8) scaleX(0)",
        }}
      />
    </div>
  );
}
