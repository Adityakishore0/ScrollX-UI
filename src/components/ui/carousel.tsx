"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselContextProps = {
  activeIndex: number;
  totalCards: number;
  goToPrevious: () => void;
  goToNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  setTotalCards: (total: number) => void;
};

const CarouselContext = createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

function Carousel({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalCards, setTotalCards] = useState(0);

  const goToPrevious = React.useCallback(() => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const goToNext = React.useCallback(() => {
    setActiveIndex((prev) => Math.min(totalCards - 1, prev + 1));
  }, [totalCards]);

  const hasPrevious = activeIndex > 0;
  const hasNext = activeIndex < totalCards - 1;

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        goToPrevious();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        goToNext();
      }
    },
    [goToPrevious, goToNext]
  );

  return (
    <CarouselContext.Provider
      value={{
        activeIndex,
        totalCards,
        goToPrevious,
        goToNext,
        hasPrevious,
        hasNext,
        setTotalCards,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative flex flex-col", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
        <div className="flex justify-between mt-4">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
    </CarouselContext.Provider>
  );
}

type CarouselContentProps = {
  maxVisible?: number;
  stackOffset?: number;
};

function CarouselContent({
  maxVisible = 3,
  stackOffset = 20,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselContentProps) {
  const { activeIndex, setTotalCards } = useCarousel();
  const childrenArray = React.Children.toArray(children);
  const totalCards = childrenArray.length;
  const [contentHeight, setContentHeight] = React.useState<number | null>(null);
  const firstCardRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTotalCards(totalCards);
  }, [totalCards, setTotalCards]);

  useEffect(() => {
    const updateHeight = () => {
      if (firstCardRef.current) {
        const height = firstCardRef.current.offsetHeight;
        setContentHeight(height);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [activeIndex, children]);

  const visibleCards = [];
  for (let i = 0; i < maxVisible; i++) {
    const cardIndex = activeIndex + i;
    if (cardIndex < totalCards) {
      visibleCards.push({
        content: childrenArray[cardIndex],
        index: cardIndex,
      });
    }
  }

  const additionalHeight = (maxVisible - 1) * stackOffset;
  const totalHeight = contentHeight ? contentHeight + additionalHeight : 0;

  return (
    <div
      data-slot="carousel-content"
      className={cn("relative w-full", className)}
      style={totalHeight ? { height: `${totalHeight}px` } : undefined}
      {...props}
    >
      {visibleCards.map((card, stackIndex) => (
        <div
          key={card.index}
          ref={stackIndex === 0 ? firstCardRef : null}
          role="group"
          aria-roledescription="slide"
          data-slot="carousel-item"
          className="absolute w-full transition-all duration-300 ease-in-out"
          style={{
            zIndex: maxVisible - stackIndex,
            top: `${stackIndex * stackOffset}px`,
            opacity: 1 - stackIndex * 0.15,
            transform: `scale(${1 - stackIndex * 0.05})`,
          }}
        >
          {card.content}
        </div>
      ))}
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={className} {...props} />;
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { goToPrevious, hasPrevious } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn("size-8 rounded-full", className)}
      disabled={!hasPrevious}
      onClick={goToPrevious}
      {...props}
    >
      <ChevronUp className="size-4" />
      <span className="sr-only">Previous card</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { goToNext, hasNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn("size-8 rounded-full", className)}
      disabled={!hasNext}
      onClick={goToNext}
      {...props}
    >
      <ChevronDown className="size-4" />
      <span className="sr-only">Next card</span>
    </Button>
  );
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
