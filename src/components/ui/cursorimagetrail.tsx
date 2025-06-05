"use client";

import React, { useRef, ReactNode, MouseEventHandler } from "react";
import { motion, useAnimate } from "framer-motion";

interface CursorImageTrailProps {
  children: ReactNode;
  images: string[];
  renderImageBuffer: number;
  rotationRange: number;
  animationStyle?: "dynamic" | "minimal";
}

const CursorImageTrail = ({
  children,
  images,
  renderImageBuffer,
  rotationRange,
  animationStyle = "dynamic",
}: CursorImageTrailProps) => {
  const [scope, animate] = useAnimate();
  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  };

  const renderNextImage = () => {
    const index = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${index}"]`;
    const el = document.querySelector(selector) as HTMLElement;
    if (!el || !scope.current) return;

    const containerRect = scope.current.getBoundingClientRect();
    const relativeX = lastRenderPosition.current.x - containerRect.left;
    const relativeY = lastRenderPosition.current.y - containerRect.top;

    el.style.left = `${relativeX}px`;
    el.style.top = `${relativeY}px`;
    el.style.zIndex = `${imageRenderCount.current}`;

    const rotation = Math.random() * rotationRange;

    if (animationStyle === "dynamic") {
      const scale = 0.8 + Math.random() * 0.4;
      const skewX = Math.random() * 10;
      const skewY = Math.random() * 10;

      animate(
        selector,
        {
          opacity: [0, 1],
          transform: [
            `translate(-50%, -30%) scale(${scale}) rotate(${
              index % 2 === 0 ? rotation : -rotation
            }deg) skew(${skewX}deg, ${skewY}deg)`,
            `translate(-50%, -50%) scale(1.1) rotate(${
              index % 2 === 0 ? -rotation : rotation
            }deg) skew(0deg, 0deg)`,
          ],
        },
        { type: "spring", stiffness: 150, damping: 20 }
      );

      animate(
        selector,
        {
          opacity: [1, 0],
          y: ["0%", "-40%"],
        },
        {
          duration: 0.8,
          ease: "easeOut",
          delay: 2,
        }
      );
    } else {
      animate(
        selector,
        {
          opacity: [0, 1],
          transform: [
            `translate(-50%, -30%) scale(0.5) rotate(${
              index % 2 === 0 ? rotation : -rotation
            }deg)`,
            `translate(-50%, -50%) scale(1.2) rotate(${
              index % 2 === 0 ? -rotation : rotation
            }deg)`,
          ],
        },
        { type: "spring", stiffness: 150, damping: 20 }
      );

      animate(
        selector,
        {
          opacity: [1, 0],
          y: ["0%", "-40%"],
        },
        {
          duration: 0.8,
          ease: "easeOut",
          delay: 2,
        }
      );
    }

    imageRenderCount.current += 1;
  };

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const { clientX, clientY } = e;
    const distance = calculateDistance(
      clientX,
      clientY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );
    if (distance >= renderImageBuffer) {
      lastRenderPosition.current = { x: clientX, y: clientY };
      renderNextImage();
    }
  };

  return (
    <div
      ref={scope as React.RefObject<HTMLDivElement>}
      className="relative w-full h-full overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {children}

      {images.map((img, index) => (
        <motion.img
          key={index}
          data-mouse-move-index={index}
          src={img}
          alt={`Mouse move image ${index}`}
          className={
            animationStyle === "dynamic"
              ? "pointer-events-none absolute h-48 w-auto rounded-xl border border-black/30 bg-white/70 dark:border-white/20 dark:bg-neutral-900 opacity-0 shadow-md transition-all duration-300"
              : "pointer-events-none absolute h-48 w-auto rounded-xl border border-black bg-neutral-100 opacity-0 dark:border-neutral-800 dark:bg-neutral-900 backdrop-blur-md saturate-150"
          }
          initial={false}
        />
      ))}
    </div>
  );
};

export default CursorImageTrail;
