"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface FlipStackCard {
  id: number;
  content?: React.ReactNode;
}

interface FlipStackProps {
  cards?: FlipStackCard[];
}

export default function FlipStack({
  cards = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
}: FlipStackProps) {
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.3 }
    );
    const currentRef = containerRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      window.removeEventListener("resize", checkMobile);
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  useEffect(() => {
    if (!isMobile || !isInView) return;
    const interval = setInterval(() => {
      setActiveIndex((prev: number) => (prev + 1) % cards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isMobile, isInView, cards.length]);

  const getRotation = (index: number) => {
    const rotations = [-8, 5, -3, 7, -5, 4, -6, 8, -2, 3];
    return rotations[index % rotations.length];
  };

  const isActive = (index: number) => index === activeIndex;

  const getCardVariants = (index: number) => {
    const totalCards = cards.length;
    const centerIndex = Math.floor(totalCards / 2);
    const positionFromCenter = index - centerIndex;
    if (isMobile) {
      return {
        initial: {
          opacity: 0,
          scale: 0.9,
          z: -100,
          rotate: getRotation(index),
          y: 100,
        },
        animate: {
          opacity: isActive(index) ? 1 : 0.7,
          scale: isActive(index) ? 1 : 0.95,
          z: isActive(index) ? 0 : -100,
          rotate: isActive(index) ? 0 : getRotation(index),
          zIndex: isActive(index) ? 40 : totalCards + 2 - index,
          y: isActive(index) ? [0, -80, 0] : 0,
        },
      };
    }
    return {
      initial: {
        x: 0,
        y: index * 8 + 100,
        rotate: getRotation(index),
        scale: 1,
        zIndex: totalCards - index,
      },
      animate: {
        x: positionFromCenter * 140,
        y: Math.abs(positionFromCenter) * 30,
        rotate: positionFromCenter * 12,
        scale: 1,
        zIndex: totalCards - Math.abs(positionFromCenter),
      },
    };
  };

  return (
    <div className="h-full w-full py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <div
            ref={containerRef}
            className="relative h-96 w-full max-w-md mx-auto"
          >
            {isMobile ? (
              <div className="relative h-full w-full">
                <AnimatePresence>
                  {cards.map((card, index: number) => {
                    const variants = getCardVariants(index);
                    return (
                      <motion.div
                        key={card.id}
                        className="absolute inset-0 origin-bottom"
                        initial="initial"
                        animate={isInView ? "animate" : "initial"}
                        exit={{
                          opacity: 0,
                          scale: 0.9,
                          z: 100,
                          rotate: getRotation(index),
                        }}
                        variants={variants}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        <Card className="w-full h-full shadow-2xl border-0 bg-white dark:bg-gray-800 overflow-hidden">
                          <CardContent className="p-0 h-full flex items-center justify-center">
                            {card.content}
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            ) : (
              <div
                className="relative h-full w-full flex items-center justify-center"
                style={{ perspective: "1000px" }}
              >
                {cards.map((card, index: number) => {
                  const variants = getCardVariants(index);
                  return (
                    <motion.div
                      key={card.id}
                      className="absolute origin-bottom"
                      initial="initial"
                      animate={isInView ? "animate" : "initial"}
                      variants={variants}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                    >
                      <Card className="w-80 h-96 shadow-2xl border-0 bg-white dark:bg-gray-800 overflow-hidden">
                        <CardContent className="p-0 h-full flex items-center justify-center">
                          {card.content}
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
