"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Particles } from "@/components/ui/particles";

export default function NotFound() {
  const [isDark, setIsDark] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const match = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setIsDark(match.matches);
    update();
    match.addEventListener("change", update);
    return () => match.removeEventListener("change", update);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const { left, top, width, height } = container.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = ((y - height / 2) / height) * -10;
    const rotateY = ((x - width / 2) / width) * 10;

    image.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: isDark ? "#000" : "#fff",
        perspective: "1000px",
      }}
    >
      <Particles
        color={isDark ? "#ffffff" : "#000000"}
        particleCount={12500}
        particleSize={5}
        animate={false}
        className="absolute inset-0 z-0"
      />

      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full transition-transform duration-300 ease-out will-change-transform pointer-events-none z-10"
      >
        <Image
          src={isDark ? "/images/404-darkc.png" : "/images/404-lightc.png"}
          alt="404"
          fill
          className="object-contain"
          priority
        />
      </div>

      <Particles
        color={isDark ? "#ffffff" : "#000000"}
        particleCount={12500}
        particleSize={5}
        animate={false}
        className="absolute inset-0 z-20 pointer-events-none"
      />

      <div className="relative z-30">
        <Link href="/">
          <button
            className={`h-9 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${
              isDark
                ? "bg-white text-black hover:bg-neutral-200"
                : "bg-black text-white hover:bg-neutral-800"
            }`}
          >
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
