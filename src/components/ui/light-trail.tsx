"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
  AnimatePresence,
} from "framer-motion";

// Utility function for conditional class names
const cn = (...classes: string[]): string => {
  return classes.filter(Boolean).join(" ");
};

interface ImageType {
  id: number;
  src: string;
  alt: string;
}

interface LightTrailProps {
  className?: string;
  images?: ImageType[];
}

export const LightTrail: React.FC<LightTrailProps> = ({
  className = "",
  images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3",
      alt: "Mountain forest with sunlight through trees",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3",
      alt: "Snowy mountain peaks at night with starry sky",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3",
      alt: "Dramatic mountain landscape with clouds",
    },
  ],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const prevScrollY = useRef<number>(0);

  const [svgWidth, setSvgWidth] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const [showTealLine, setShowTealLine] = useState<boolean>(false);
  const [stickyTranslateY, setStickyTranslateY] = useState<number>(0);
  const [isExitingSticky, setIsExitingSticky] = useState<boolean>(false);

  const progressPerImage = 1 / images.length;

  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    if (contentRef.current) {
      setSvgWidth(contentRef.current.offsetWidth);

      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setSvgWidth(entry.contentRect.width);
        }
      });

      resizeObserver.observe(contentRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = scrollY.get();

      if (currentScrollY > prevScrollY.current) {
        setDirection("down");
      } else {
        setDirection("up");
      }

      prevScrollY.current = currentScrollY;

      if (scrollYProgress.get() > 0.01 && !showTealLine) {
        setShowTealLine(true);
      }

      const progress = scrollYProgress.get();
      const contentProgress = Math.min(progress / 0.9, 1);
      const newIndex = Math.min(
        Math.floor(contentProgress / progressPerImage),
        images.length - 1
      );

      if (newIndex >= 0 && newIndex !== currentImageIndex) {
        setCurrentImageIndex(newIndex);
      }

      if (progress > 0.95) {
        setIsExitingSticky(false);

        const exitProgress = (progress - 0.85) / 0.15;
        const translateY = Math.min(exitProgress * -100, 0);
        setStickyTranslateY(translateY);
      } else {
        setIsExitingSticky(false);
        setStickyTranslateY(0);
      }
    };

    const unsubscribe = scrollY.onChange(handleScroll);
    return () => unsubscribe();
  }, [
    scrollY,
    scrollYProgress,
    progressPerImage,
    images.length,
    currentImageIndex,
    showTealLine,
  ]);

  const x2 = useTransform(scrollYProgress, [0, 0.85], [0, svgWidth - 100]);
  const tealLineWidth = useTransform(scrollYProgress, [0, 0.85], [0, svgWidth]);

  const springX2 = useSpring(x2, {
    stiffness: 500,
    damping: 90,
  });

  const springTealLineWidth = useSpring(tealLineWidth, {
    stiffness: 500,
    damping: 90,
  });

  const imageVariants = {
    enter: (customDirection: "up" | "down") => ({
      x: customDirection === "down" ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: (customDirection: "up" | "down") => ({
      x: customDirection === "down" ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    }),
  };

  const getTealLineOffset = (value: number): number => {
    return svgWidth - value * ((currentImageIndex + 1) / images.length);
  };

  return (
    <div className="min-h-[300vh]   relative">
      <div className="mx-auto max-w-5xl px-4 py-20">
        <div className="h-screen"></div>

        <div ref={containerRef} className="relative h-[200vh]">
          <motion.div
            ref={stickyRef}
            className={cn(
              "sticky top-0 h-screen flex items-center justify-center",
              isExitingSticky ? "" : "transition-opacity duration-300"
            )}
            style={{
              translateY: `${stickyTranslateY}vh`,
              opacity: isExitingSticky
                ? 1 - Math.abs(stickyTranslateY) / 100
                : 1,
            }}
          >
            <motion.div
              className={cn(
                "relative mx-auto h-full w-full max-w-4xl flex items-center",
                className
              )}
            >
              <div ref={contentRef} className="relative overflow-hidden w-full">
                <h1 className="mb-8 text-5xl font-bold italic ">Mountains</h1>
                <p className="mb-12 text-xl  hover:underline">
                  Mountains are large natural elevations of the earth's surface
                  that rise prominently above their surroundings.
                </p>

                <div className="w-full mb-8 flex items-center">
                  <motion.div
                    transition={{
                      duration: 0.2,
                    }}
                    className="flex h-4 w-4 items-center justify-center rounded-full border border-neutral-200 shadow-sm bg-white mr-0 z-10"
                  >
                    <motion.div
                      transition={{
                        duration: 0.2,
                      }}
                      animate={{
                        backgroundColor: showTealLine ? "#10b981" : "#FFFFFF",
                        borderColor: showTealLine ? "#059669" : "#e5e5e5",
                      }}
                      className="h-2 w-2 rounded-full border border-neutral-300"
                    />
                  </motion.div>

                  <svg
                    viewBox={`0 0 ${svgWidth} 2`}
                    width={svgWidth - 8}
                    height="2"
                    className="block"
                    aria-hidden="true"
                    style={{ marginLeft: "-4px" }}
                  >
                    <motion.path
                      d={`M 0 1 H ${svgWidth}`}
                      fill="none"
                      stroke="#9091A0"
                      strokeOpacity="0.16"
                      strokeWidth="2"
                    ></motion.path>

                    {showTealLine && (
                      <motion.path
                        d={`M 0 1 H ${
                          (currentImageIndex + 1) * (svgWidth / images.length)
                        }`}
                        fill="none"
                        stroke="url(#horizontalGradient)"
                        strokeWidth="2"
                        strokeDasharray={svgWidth}
                        strokeDashoffset={
                          springTealLineWidth.get()
                            ? getTealLineOffset(springTealLineWidth.get())
                            : svgWidth
                        }
                        className="motion-reduce:hidden"
                      ></motion.path>
                    )}

                    <defs>
                      <motion.linearGradient
                        id="horizontalGradient"
                        gradientUnits="userSpaceOnUse"
                        x1="0"
                        y1="0"
                        x2={springX2}
                        y2="0"
                      >
                        <stop stopColor="#18CCFC" stopOpacity="0"></stop>
                        <stop stopColor="#18CCFC"></stop>
                        <stop offset="0.325" stopColor="#6344F5"></stop>
                        <stop
                          offset="1"
                          stopColor="#AE48FF"
                          stopOpacity="0"
                        ></stop>
                      </motion.linearGradient>
                    </defs>
                  </svg>
                </div>

                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    custom={direction}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 15,
                    }}
                  >
                    <motion.div
                      className="relative aspect-[16/9] w-full overflow-hidden rounded-lg"
                      animate={{
                        rotate: [0, -1, 1, -1, 0],
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                      }}
                    >
                      <img
                        src={images[currentImageIndex].src}
                        alt={images[currentImageIndex].alt}
                        className="h-full w-full object-cover"
                      />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default function StickyScrollGallery() {
  return <LightTrail />;
}
