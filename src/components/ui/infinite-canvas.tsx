"use client";
import React, {
  useState,
  useRef,
  useEffect,
  Children,
  cloneElement,
  ReactElement,
  useCallback,
  useMemo,
} from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  x?: number;
  y?: number;
}

export const Card: React.FC<CardProps> = ({
  className = "",
  children,
  x = 0,
  y = 0,
}) => {
  return (
    <div className={className} data-x={x} data-y={y}>
      {children}
    </div>
  );
};

interface InfiniteCanvasProps {
  className?: string;
  children: React.ReactNode;
  cardWidth?: number;
  cardHeight?: number;
  spacing?: number;
  showControls?: boolean;
  showZoom?: boolean;
  showStatus?: boolean;
  showInstructions?: boolean;
}

const InfiniteCanvas: React.FC<InfiniteCanvasProps> = ({
  className = "",
  children,
  cardWidth = 280,
  cardHeight = 220,
  spacing = 30,
  showControls = true,
  showZoom = true,
  showStatus = true,
  showInstructions = true,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  const cellWidth = cardWidth + spacing;
  const cellHeight = cardHeight + spacing;

  const childArray = useMemo(() => Children.toArray(children), [children]);
  const childCount = childArray.length;

  const getVisibleCards = useCallback(() => {
    const canvas = canvasRef.current;
    const viewportWidth = canvas ? canvas.offsetWidth : window.innerWidth;
    const viewportHeight = canvas ? canvas.offsetHeight : window.innerHeight;
    const buffer = Math.ceil(3 / zoom);

    const startCol =
      Math.floor((-position.x / zoom - viewportWidth / 2) / cellWidth) - buffer;
    const endCol =
      Math.ceil((-position.x / zoom + viewportWidth / 2) / cellWidth) + buffer;
    const startRow =
      Math.floor((-position.y / zoom - viewportHeight / 2) / cellHeight) -
      buffer;
    const endRow =
      Math.ceil((-position.y / zoom + viewportHeight / 2) / cellHeight) +
      buffer;

    const cards = [];
    for (let j = startRow; j <= endRow; j++) {
      for (let i = startCol; i <= endCol; i++) {
        const index = Math.abs(i * 7 + j * 13) % childCount;
        cards.push({
          id: `${i}-${j}`,
          x: i * cellWidth + spacing / 2,
          y: j * cellHeight + spacing / 2,
          childIndex: index,
        });
      }
    }
    return cards;
  }, [
    position.x,
    position.y,
    zoom,
    childCount,
    cellWidth,
    cellHeight,
    spacing,
  ]);

  interface VisibleCard {
    id: string;
    x: number;
    y: number;
    childIndex: number;
  }

  const [visibleCards, setVisibleCards] = useState<VisibleCard[]>([]);

  useEffect(() => {
    setVisibleCards(getVisibleCards());
  }, [position, zoom, childCount, getVisibleCards]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!isActive) return;
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    },
    [isActive, position.x, position.y]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isActive || !isDragging) return;

      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: newX, y: newY });
      });
    },
    [isActive, isDragging, dragStart.x, dragStart.y]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const getTouchDistance = useCallback((touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!isActive) return;
      if (e.touches.length === 2) {
        setLastTouchDistance(getTouchDistance(e.touches));
      } else if (e.touches.length === 1) {
        setIsDragging(true);
        setDragStart({
          x: e.touches[0].clientX - position.x,
          y: e.touches[0].clientY - position.y,
        });
      }
    },
    [isActive, position.x, position.y, getTouchDistance]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isActive) return;
      if (e.touches.length === 2) {
        e.preventDefault();
        const newDistance = getTouchDistance(
          e.touches as unknown as React.TouchList
        );
        if (lastTouchDistance > 0) {
          const delta = newDistance - lastTouchDistance;
          const zoomSpeed = 0.01;
          const newZoom = Math.max(0.3, Math.min(3, zoom + delta * zoomSpeed));

          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
          }

          rafRef.current = requestAnimationFrame(() => {
            setZoom(newZoom);
          });
        }
        setLastTouchDistance(newDistance);
      } else if (e.touches.length === 1 && isDragging) {
        const newX = e.touches[0].clientX - dragStart.x;
        const newY = e.touches[0].clientY - dragStart.y;

        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }

        rafRef.current = requestAnimationFrame(() => {
          setPosition({ x: newX, y: newY });
        });
      }
    },
    [
      isActive,
      isDragging,
      dragStart.x,
      dragStart.y,
      lastTouchDistance,
      zoom,
      getTouchDistance,
    ]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setLastTouchDistance(0);
  }, []);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!isActive) return;
      e.preventDefault();
      const delta = e.deltaY;
      const zoomSpeed = 0.001;
      const newZoom = Math.max(0.3, Math.min(3, zoom - delta * zoomSpeed));

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        setZoom(newZoom);
      });
    },
    [isActive, zoom]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && isActive) {
      canvas.addEventListener("wheel", handleWheel, { passive: false });
      canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
      return () => {
        canvas.removeEventListener("wheel", handleWheel);
        canvas.removeEventListener("touchmove", handleTouchMove);
      };
    }
  }, [handleWheel, handleTouchMove, isActive]);

  useEffect(() => {
    if (isActive) {
      const originalOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;

      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
      };
    }
  }, [isActive]);

  const transformStyle = useMemo(
    () => ({
      transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
      position: "absolute" as const,
      left: "50%",
      top: "50%",
      width: 0,
      height: 0,
      willChange: "transform",
    }),
    [position.x, position.y, zoom]
  );

  return (
    <div
      ref={canvasRef}
      className={cn("relative overflow-hidden select-none", className)}
      style={{
        cursor: isActive ? (isDragging ? "grabbing" : "grab") : "default",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div style={transformStyle}>
        {visibleCards.map((card) => {
          const child = childArray[card.childIndex];

          return (
            <div
              key={card.id}
              className="absolute"
              style={{
                transform: `translate(${card.x}px, ${card.y}px)`,
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                transformOrigin: "center center",
              }}
            >
              <div className="pointer-events-none w-full h-full flex items-start justify-start">
                {React.isValidElement(child)
                  ? cloneElement(child as ReactElement, {
                      x: card.x,
                      y: card.y,
                    })
                  : child}
              </div>
            </div>
          );
        })}
      </div>

      {showInstructions && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm dark:text-white text-black px-4 py-2 rounded-full text-xs sm:text-sm pointer-events-none whitespace-nowrap">
          Drag to pan • Scroll to zoom
        </div>
      )}

      {showZoom && (
        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm dark:text-white text-black px-3 py-1.5 rounded-full text-xs sm:text-sm pointer-events-none">
          {Math.round(zoom * 100)}%
        </div>
      )}

      {showStatus && (
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/10 backdrop-blur-sm dark:text-white text-black px-3 py-1.5 rounded-full text-xs sm:text-sm pointer-events-none">
          <div
            className={`w-2 h-2 rounded-full ${
              isActive ? "bg-green-400 animate-pulse" : "bg-red-400"
            }`}
          ></div>
        </div>
      )}

      {showControls && (
        <button
          onClick={() => setIsActive(!isActive)}
          className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm dark:text-white text-black px-4 py-1.5 rounded-full text-xs sm:text-sm transition-colors pointer-events-auto whitespace-nowrap"
        >
          {isActive ? "Disable" : "Enable"}
        </button>
      )}
    </div>
  );
};

export { InfiniteCanvas };
