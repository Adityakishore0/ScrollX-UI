"use client";
import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollAreaProProps
  extends React.ComponentProps<typeof ScrollAreaPrimitive.Root> {
  className?: string;
  children: React.ReactNode;
  crossDirectionalScroll?: boolean;
  autoHide?: boolean;
  showProgress?: "horizontal" | "vertical";
  onScrollChange?: (progress: { x: number; y: number }) => void;
}

interface ScrollBarProProps
  extends React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> {
  className?: string;
  show?: boolean;
  autoHide?: boolean;
  isScrolling?: boolean;
  orientation?: "vertical" | "horizontal";
}

const isMobileDevice = (): boolean => {
  if (typeof window !== "undefined") {
    if (window.innerWidth <= 1024) return true;
    const hasTouchScreen =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const mobileUserAgent =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i.test(
        navigator.userAgent
      );
    if (hasTouchScreen && mobileUserAgent) return true;
    if (window.innerWidth <= 1366 && hasTouchScreen) return true;
  }
  return false;
};

function ScrollBarPro({
  className,
  orientation = "vertical",
  show = true,
  autoHide = false,
  isScrolling = false,
  ...props
}: ScrollBarProProps) {
  if (!autoHide && !isScrolling) {
    return (
      <ScrollAreaPrimitive.ScrollAreaScrollbar
        data-slot="scroll-area-scrollbar"
        orientation={orientation}
        className={cn(
          "flex touch-none p-px transition-colors select-none",
          orientation === "vertical" &&
            "h-full w-2.5 border-l border-l-transparent",
          orientation === "horizontal" &&
            "h-2.5 flex-col border-t border-t-transparent",
          className
        )}
        {...props}
      >
        <ScrollAreaPrimitive.ScrollAreaThumb
          data-slot="scroll-area-thumb"
          className="bg-border relative flex-1 rounded-full"
        />
      </ScrollAreaPrimitive.ScrollAreaScrollbar>
    );
  }

  return (
    <AnimatePresence>
      {(!autoHide || show) && (
        <motion.div
          initial={{ opacity: autoHide ? 0 : 1 }}
          animate={{ opacity: show ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ScrollAreaPrimitive.ScrollAreaScrollbar
            data-slot="scroll-area-scrollbar"
            orientation={orientation}
            className={cn(
              "flex touch-none select-none transition-all duration-300",
              orientation === "vertical" &&
                "h-full border-l border-l-transparent",
              orientation === "horizontal" &&
                "flex-col border-t border-t-transparent",
              "p-0.5 xs:p-px",
              orientation === "vertical" &&
                "w-1.5 xs:w-2 sm:w-2.5 md:w-2 lg:w-2.5",
              orientation === "horizontal" &&
                "h-1.5 xs:h-2 sm:h-2.5 md:h-2 lg:h-2.5",
              "hover:w-2 hover:h-2 xs:hover:w-2.5 xs:hover:h-2.5 sm:hover:w-3 sm:hover:h-3 md:hover:w-2.5 md:hover:h-2.5 lg:hover:w-3 lg:hover:h-3",
              className
            )}
            {...props}
          >
            <motion.div
              animate={{
                scale: isScrolling ? 1.1 : 1,
                backgroundColor: isScrolling ? "#3b82f6" : "#d1d5db",
              }}
              transition={{ duration: 0.2 }}
              className="relative flex-1 rounded-full"
            >
              <ScrollAreaPrimitive.ScrollAreaThumb
                data-slot="scroll-area-thumb"
                className="bg-current relative flex-1 rounded-full"
              />
            </motion.div>
          </ScrollAreaPrimitive.ScrollAreaScrollbar>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ScrollAreaPro({
  className,
  children,
  crossDirectionalScroll = false,
  autoHide = false,
  showProgress,
  onScrollChange,
  ...props
}: ScrollAreaProProps) {
  const [isScrolling, setIsScrolling] = React.useState<boolean>(false);
  const [showScrollbars, setShowScrollbars] = React.useState<boolean>(
    !autoHide
  );
  const [isFullyVisible, setIsFullyVisible] = React.useState<boolean>(true);
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const [containerHeight, setContainerHeight] = React.useState(0);
  const [isScrollingY, setIsScrollingY] = React.useState(false);
  const scrollTimeoutVerticalRef = React.useRef<NodeJS.Timeout | null>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const scrollX = useMotionValue(0);
  const scrollY = useMotionValue(0);
  const progressBarScaleX = useTransform(scrollX, [0, 100], [0, 1]);
  const progressBarScaleY = useTransform(scrollY, [0, 100], [0, 1]);

  const verticalScrollProgress = useMotionValue(0);
  const progressHeight = containerHeight - 20;
  const y1 = useTransform(
    verticalScrollProgress,
    [0, 0.8],
    [50, progressHeight]
  );
  const y2 = useTransform(
    verticalScrollProgress,
    [0, 1],
    [50, Math.max(50, progressHeight - 200)]
  );

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(isMobileDevice());
    };
    checkMobile();

    const updateContainerHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };

    updateContainerHeight();

    window.addEventListener("resize", checkMobile);
    window.addEventListener("orientationchange", checkMobile);
    window.addEventListener("resize", updateContainerHeight);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("orientationchange", checkMobile);
      window.removeEventListener("resize", updateContainerHeight);
    };
  }, []);

  const handleScroll = React.useCallback((): void => {
    if (!viewportRef.current) return;
    const element = viewportRef.current;
    const maxScrollX = element.scrollWidth - element.clientWidth;
    const maxScrollY = element.scrollHeight - element.clientHeight;
    const progressX =
      maxScrollX > 0 ? (element.scrollLeft / maxScrollX) * 100 : 0;
    const progressY =
      maxScrollY > 0 ? (element.scrollTop / maxScrollY) * 100 : 0;
    scrollX.set(progressX);
    scrollY.set(progressY);
    verticalScrollProgress.set(progressY / 100);
    onScrollChange?.({ x: progressX, y: progressY });
    if (autoHide) {
      setIsScrolling(true);
      setShowScrollbars(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (scrollTimeoutVerticalRef.current) {
        clearTimeout(scrollTimeoutVerticalRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
        setShowScrollbars(false);
      }, 1500);
    }
    if (showProgress === "vertical") {
      setIsScrollingY(true);
      if (scrollTimeoutVerticalRef.current) {
        clearTimeout(scrollTimeoutVerticalRef.current);
      }
      scrollTimeoutVerticalRef.current = setTimeout(() => {
        setIsScrollingY(false);
      }, 2000);
    }
  }, [
    autoHide,
    onScrollChange,
    scrollX,
    scrollY,
    showProgress,
    verticalScrollProgress,
  ]);

  const handleWheel = React.useCallback(
    (e: WheelEvent): void => {
      if (
        !crossDirectionalScroll ||
        !viewportRef.current ||
        !isFullyVisible ||
        isMobile
      )
        return;
      if (Math.abs(e.deltaY) > 0) {
        e.preventDefault();
        viewportRef.current.scrollBy({
          left: e.deltaY,
          behavior: "auto",
        });
      }
    },
    [crossDirectionalScroll, isFullyVisible, isMobile]
  );

  const handleTouchStart = React.useCallback(
    (e: TouchEvent): void => {
      if (
        !crossDirectionalScroll ||
        !viewportRef.current ||
        !isFullyVisible ||
        isMobile
      )
        return;
      const touch = e.touches[0];
      viewportRef.current.dataset.touchStartY = touch.clientY.toString();
    },
    [crossDirectionalScroll, isFullyVisible, isMobile]
  );

  const handleTouchMove = React.useCallback(
    (e: TouchEvent): void => {
      if (
        !crossDirectionalScroll ||
        !viewportRef.current ||
        !isFullyVisible ||
        isMobile
      )
        return;
      const element = viewportRef.current;
      const startY = parseFloat(element.dataset.touchStartY || "0");
      const touch = e.touches[0];
      const deltaY = touch.clientY - startY;
      if (Math.abs(deltaY) > 10) {
        e.preventDefault();
        const currentScrollLeft = element.scrollLeft;
        const maxScrollLeft = element.scrollWidth - element.clientWidth;
        const scrollAmount = -deltaY * 2;
        const newScrollLeft = Math.max(
          0,
          Math.min(maxScrollLeft, currentScrollLeft + scrollAmount)
        );
        element.scrollTo({ left: newScrollLeft, behavior: "auto" });
        element.dataset.touchStartY = touch.clientY.toString();
      }
    },
    [crossDirectionalScroll, isFullyVisible, isMobile]
  );

  React.useEffect(() => {
    const element = viewportRef.current;
    if (!element) return;
    element.addEventListener("scroll", handleScroll, { passive: true });
    if (crossDirectionalScroll && isFullyVisible && !isMobile) {
      element.addEventListener("wheel", handleWheel, { passive: false });
      element.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      element.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
    }
    return () => {
      element.removeEventListener("scroll", handleScroll);
      if (crossDirectionalScroll && !isMobile) {
        element.removeEventListener("wheel", handleWheel);
        element.removeEventListener("touchstart", handleTouchStart);
        element.removeEventListener("touchmove", handleTouchMove);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [
    handleScroll,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    crossDirectionalScroll,
    isFullyVisible,
    isMobile,
  ]);

  React.useEffect(() => {
    if (!crossDirectionalScroll || isMobile) return;
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsFullyVisible(entry.intersectionRatio >= 0.9),
      { threshold: 0.9 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [crossDirectionalScroll, isMobile]);

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.offsetHeight);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <ScrollAreaPrimitive.Root
      ref={containerRef}
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        data-slot="scroll-area-viewport"
        className={cn(
          "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
          "max-w-full min-w-0 min-h-0",
          crossDirectionalScroll && !isMobile
            ? "overflow-x-auto overflow-y-hidden"
            : "overflow-auto",
          crossDirectionalScroll && !isFullyVisible && !isMobile && "opacity-75"
        )}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>

      {(!crossDirectionalScroll || isMobile) && (
        <ScrollBarPro
          orientation="vertical"
          show={showScrollbars}
          autoHide={autoHide}
          isScrolling={isScrolling}
        />
      )}
      <ScrollBarPro
        orientation="horizontal"
        show={showScrollbars}
        autoHide={autoHide}
        isScrolling={isScrolling}
      />
      <ScrollAreaPrimitive.Corner />

      <AnimatePresence>
        {showProgress === "vertical" && isScrollingY && containerHeight > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-3 right-0 flex items-start pointer-events-none"
          >
            <motion.div
              initial={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              animate={{
                boxShadow:
                  verticalScrollProgress.get() > 0
                    ? "none"
                    : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
              transition={{ duration: 0.2, delay: 0.5 }}
              className="border-neutral-200 flex h-4 w-4 items-center justify-center rounded-full border shadow-sm"
            >
              <motion.div
                initial={{ backgroundColor: "#10b981", borderColor: "#059669" }}
                animate={{
                  backgroundColor:
                    verticalScrollProgress.get() > 0 ? "white" : "#10b981",
                  borderColor:
                    verticalScrollProgress.get() > 0 ? "white" : "#059669",
                }}
                transition={{ duration: 0.2, delay: 0.5 }}
                className="h-2 w-2 rounded-full border border-neutral-300 bg-white"
              />
            </motion.div>

            <svg
              viewBox={`0 0 20 ${progressHeight}`}
              width="20"
              height={progressHeight}
              className="block"
              aria-hidden="true"
            >
              <motion.path
                d={`M 10 0 V ${progressHeight}`}
                fill="none"
                stroke="#9091A0"
                strokeOpacity="0.16"
              />
              <motion.path
                d={`M 10 0 V ${progressHeight}`}
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="1.25"
                className="motion-reduce:hidden"
              />
              <defs>
                <motion.linearGradient
                  id="gradient"
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  x2="0"
                  y1={y1}
                  y2={y2}
                >
                  <stop stopColor="#18CCFC" stopOpacity="0" />
                  <stop stopColor="#18CCFC" />
                  <stop offset="0.325" stopColor="#6344F5" />
                  <stop offset="1" stopColor="#AE48FF" stopOpacity="0" />
                </motion.linearGradient>
              </defs>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showProgress === "horizontal" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gray-200/50 dark:bg-gray-700/50"
              style={{ height: "clamp(2px, 0.3vw, 6px)" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 origin-left"
                style={{ scaleX: progressBarScaleX }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScrollAreaPrimitive.Root>
  );
}

export { ScrollAreaPro, ScrollBarPro };
