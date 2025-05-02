"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
  AnimatePresence,
} from "framer-motion";

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
  title?: string;
  description?: string;
  images?: ImageType[];
  containerHeight?: string;
  scrollHeight?: string;
}

export const LightTrail: React.FC<LightTrailProps> = ({
  className = "",
  title = "Mountains",
  description = "Mountains are large natural elevations of the earth's surface that rise prominently above their surroundings.",
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
  containerHeight = "100%",
  scrollHeight = "200vh",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prevScrollY = useRef<number>(0);
  const isInViewRef = useRef<boolean>(false);

  const [svgWidth, setSvgWidth] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const [showTealLine, setShowTealLine] = useState<boolean>(false);
  const [stickyTranslateY, setStickyTranslateY] = useState<number>(0);
  const [isExitingSticky, setIsExitingSticky] = useState<boolean>(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const scrollableRange = 0.85;
  const progressPerImage = scrollableRange / images.length;

  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
    container: wrapperRef,
  });

  
  useEffect(() => {
    if (wrapperRef.current) {
      const wrapper = wrapperRef.current;

      const updateSize = () => {
        if (wrapper) {
          setContainerSize({
            width: wrapper.offsetWidth,
            height: wrapper.offsetHeight,
          });
        }
      };

      updateSize();
      const resizeObserver = new ResizeObserver(updateSize);
      resizeObserver.observe(wrapper);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  
  useEffect(() => {
    if (contentRef.current) {
      const content = contentRef.current;

      setSvgWidth(content.offsetWidth);

      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setSvgWidth(entry.contentRect.width);
        }
      });

      resizeObserver.observe(content);
      return () => resizeObserver.disconnect();
    }
  }, [containerSize]);

  
  useEffect(() => {
    if (stickyRef.current) {
      const stickyElement = stickyRef.current;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isInViewRef.current = entry.isIntersecting;
          });
        },
        { threshold: 0.5 } 
      );

      observer.observe(stickyElement);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  
  useEffect(() => {
    const handleScroll = () => {
      
      if (!isInViewRef.current) return;

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
      const normalizedProgress = Math.min(progress / scrollableRange, 1);
      const imageIndex = Math.min(
        Math.floor(normalizedProgress * images.length),
        images.length - 1
      );

      if (imageIndex >= 0 && imageIndex !== currentImageIndex) {
        setCurrentImageIndex(imageIndex);
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

  const x2 = useTransform(
    scrollYProgress,
    [0, scrollableRange],
    [0, svgWidth - 100]
  );
  const tealLineWidth = useTransform(
    scrollYProgress,
    [0, scrollableRange],
    [0, svgWidth]
  );

  const springX2 = useSpring(x2, {
    stiffness: 700,
    damping: 70,
  });

  const springTealLineWidth = useSpring(tealLineWidth, {
    stiffness: 700,
    damping: 70,
  });

  const imageVariants = {
    enter: (customDirection: "up" | "down") => ({
      x: customDirection === "down" ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        duration: 0.2,
      },
    },
    exit: (customDirection: "up" | "down") => ({
      x: customDirection === "down" ? -50 : 50,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        duration: 0.2,
      },
    }),
  };

  const getTealLineOffset = (value: number): number => {
    return svgWidth - value * ((currentImageIndex + 1) / images.length);
  };

  const getStickyStyle = () => {
    if (containerSize.height < 500) {
      return {
        position: "relative" as const,
        top: 0,
        height: "auto",
      };
    }

    return {
      position: "sticky" as const,
      top: 0,
      height: containerSize.height
        ? `${Math.min(containerSize.height, 600)}px`
        : "auto",
    };
  };

  return (
    <div
      ref={wrapperRef}
      className="relative overflow-auto w-full"
      style={{ height: containerHeight }}
    >
      <div className="w-full px-4 py-6">
        <div
          ref={containerRef}
          className="relative"
          style={{ height: scrollHeight }}
        >
          <motion.div
            ref={stickyRef}
            className={cn(
              "flex items-center justify-center w-full",
              isExitingSticky ? "" : "transition-opacity duration-300"
            )}
            style={{
              ...getStickyStyle(),
              translateY: containerSize.height
                ? `${(stickyTranslateY * containerSize.height) / 100}px`
                : 0,
              opacity: isExitingSticky
                ? 1 - Math.abs(stickyTranslateY) / 100
                : 1,
            }}
          >
            <motion.div
              className={cn(
                "relative mx-auto w-full h-full flex items-center",
                className
              )}
            >
              <div ref={contentRef} className="relative overflow-hidden w-full">
                <h1 className="mb-4 text-3xl md:text-5xl font-bold italic">
                  {title}
                </h1>
                <p className="mb-6 md:mb-12 text-lg md:text-xl hover:underline">
                  {description}
                </p>

                <div className="w-full mb-6 flex items-center">
                  <motion.div
                    transition={{
                      duration: 0.1,
                    }}
                    className="flex h-4 w-4 items-center justify-center rounded-full border border-neutral-200 shadow-sm bg-white mr-0 z-10"
                  >
                    <motion.div
                      transition={{
                        duration: 0.1,
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
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                      <img
                        src={images[currentImageIndex].src}
                        alt={images[currentImageIndex].alt}
                        className="h-full w-full object-cover"
                      />
                    </div>
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
