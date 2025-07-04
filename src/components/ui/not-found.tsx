"use client";

import { useRef, useEffect, useState, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";

interface NotFoundProps {
  particleCount?: number;
  particleSize?: number;
  animate?: boolean;
  imageLight?: string;
  imageDark?: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
  onButtonClick?: () => void;
}

export default function NotFound({
  particleCount = 12500,
  particleSize = 5,
  animate = false,
  imageLight = "/images/404-lightc.png",
  imageDark = "/images/404-darkc.png",
  buttonText = "Back to Home",
  buttonHref = "/",
  className = "",
  onButtonClick,
}: NotFoundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const observer = () => {
      const html = document.documentElement;
      setIsDark(html.classList.contains("dark"));
    };

    observer();

    const mutationObserver = new MutationObserver(observer);
    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => mutationObserver.disconnect();
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
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
      className={`relative h-[24rem] md:h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-black ${className}`}
      style={{ perspective: "1000px" }}
    >
      <Particles
        color={isDark ? "#ffffff" : "#000000"}
        particleCount={particleCount}
        particleSize={particleSize}
        animate={animate}
        className="absolute inset-0 z-0"
      />

      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full transition-transform duration-300 ease-out will-change-transform pointer-events-none z-10"
      >
        <Image
          src={imageLight}
          alt="404 Light"
          fill
          className="object-contain dark:hidden"
          priority
        />
        <Image
          src={imageDark}
          alt="404 Dark"
          fill
          className="object-contain hidden dark:block"
          priority
        />
      </div>

      <Particles
        color={isDark ? "#ffffff" : "#000000"}
        particleCount={particleCount}
        particleSize={particleSize}
        animate={animate}
        className="absolute inset-0 z-20 pointer-events-none"
      />

      <div className="relative z-30 mt-16 md:mt-0">
        <Link href={buttonHref} onClick={onButtonClick}>
          <Button variant="default">{buttonText}</Button>
        </Link>
      </div>
    </div>
  );
}
