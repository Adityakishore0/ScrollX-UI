"use client";

import * as React from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";
import { PanelLeftClose, PanelRightClose } from "lucide-react";

interface SplitterProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onResize"> {
  onResize?: (leftSize: number, rightSize: number) => void;
  allowFullCollapse?: boolean;
  minSize?: number;
  maxSize?: number;
  defaultSize?: number;
  snapThreshold?: number;
  smoothTransition?: boolean;
}

type SplitterPanelProps = React.HTMLAttributes<HTMLDivElement>;

interface SplitterHandleProps {
  className?: string;
  withHandle?: boolean;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onTouchStart?: (e: React.TouchEvent<HTMLDivElement>) => void;
  isDragging?: boolean;
  isLeftCollapsed?: boolean;
  isRightCollapsed?: boolean;
  isLeftNearCollapse?: boolean;
  isRightNearCollapse?: boolean;
}

function Splitter({
  className,
  children,
  onResize,
  style,
  allowFullCollapse = true,
  minSize = 0,
  maxSize = 100,
  defaultSize = 50,
  snapThreshold = 5,
  smoothTransition = true,
  ...props
}: SplitterProps) {
  const [leftWidth, setLeftWidth] = React.useState<number>(defaultSize);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [startPosition, setStartPosition] = React.useState<number>(0);
  const [startWidth, setStartWidth] = React.useState<number>(0);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const animationFrameRef = React.useRef<number | undefined>(undefined);

  React.useEffect(() => {
    if (containerRef.current) {
      const computedStyle = getComputedStyle(containerRef.current);
      const cssDefaultSize = parseFloat(
        computedStyle.getPropertyValue("--splitter-default-size")
      );
      const initialSize = !isNaN(cssDefaultSize) ? cssDefaultSize : defaultSize;
      setLeftWidth(initialSize);
    }
  }, [defaultSize]);

  const handleInteractionStart = React.useCallback(
    (clientX: number): void => {
      if (!containerRef.current) return;

      setIsDragging(true);
      setStartPosition(clientX);
      setStartWidth(leftWidth);

      document.body.style.userSelect = "none";
      document.body.style.webkitUserSelect = "none";
      document.body.style.touchAction = "none";
      document.body.style.cursor = "col-resize";

      containerRef.current.classList.add("splitter-active");
    },
    [leftWidth]
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    handleInteractionStart(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.touches.length === 1) {
      handleInteractionStart(e.touches[0].clientX);
    }
  };

  const handleMove = React.useCallback(
    (clientX: number): void => {
      if (!isDragging || !containerRef.current) return;

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const deltaX = clientX - startPosition;
        const deltaPercent = (deltaX / rect.width) * 100;
        const newLeftWidth = startWidth + deltaPercent;

        const effectiveMinSize = allowFullCollapse ? 0 : minSize;
        const effectiveMaxSize = allowFullCollapse ? 100 : maxSize;

        let clampedWidth = Math.min(
          Math.max(newLeftWidth, effectiveMinSize),
          effectiveMaxSize
        );

        if (allowFullCollapse) {
          if (clampedWidth <= snapThreshold) {
            clampedWidth = 0;
          } else if (clampedWidth >= 100 - snapThreshold) {
            clampedWidth = 100;
          }
        }

        setLeftWidth(clampedWidth);
        onResize?.(clampedWidth, 100 - clampedWidth);
      });
    },
    [
      isDragging,
      startPosition,
      startWidth,
      onResize,
      allowFullCollapse,
      minSize,
      maxSize,
      snapThreshold,
    ]
  );

  const handleMouseMove = React.useCallback(
    (e: MouseEvent): void => {
      handleMove(e.clientX);
    },
    [handleMove]
  );

  const handleTouchMove = React.useCallback(
    (e: TouchEvent): void => {
      e.preventDefault();
      if (e.touches.length === 1) {
        handleMove(e.touches[0].clientX);
      }
    },
    [handleMove]
  );

  const handleInteractionEnd = React.useCallback((): void => {
    setIsDragging(false);

    document.body.style.userSelect = "";
    document.body.style.webkitUserSelect = "";
    document.body.style.touchAction = "";
    document.body.style.cursor = "";

    if (containerRef.current) {
      containerRef.current.classList.remove("splitter-active");
    }

    if (animationFrameRef.current !== undefined) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }
  }, []);

  const handleMouseUp = React.useCallback(
    (e: MouseEvent): void => {
      handleInteractionEnd();
    },
    [handleInteractionEnd]
  );

  const handleTouchEnd = React.useCallback(
    (e: TouchEvent): void => {
      handleInteractionEnd();
    },
    [handleInteractionEnd]
  );

  React.useEffect(() => {
    if (isDragging) {
      const options = { passive: false, capture: true };

      document.addEventListener("mousemove", handleMouseMove, options);
      document.addEventListener("mouseup", handleMouseUp, options);

      document.addEventListener("touchmove", handleTouchMove, options);
      document.addEventListener("touchend", handleTouchEnd, options);
      document.addEventListener("touchcancel", handleTouchEnd, options);

      document.addEventListener(
        "selectstart",
        (e) => e.preventDefault(),
        options
      );
      window.addEventListener("blur", handleInteractionEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove, {
        capture: true,
      });
      document.removeEventListener("mouseup", handleMouseUp, { capture: true });
      document.removeEventListener("touchmove", handleTouchMove, {
        capture: true,
      });
      document.removeEventListener("touchend", handleTouchEnd, {
        capture: true,
      });
      document.removeEventListener("touchcancel", handleTouchEnd, {
        capture: true,
      });
      document.removeEventListener("selectstart", (e) => e.preventDefault(), {
        capture: true,
      });
      window.removeEventListener("blur", handleInteractionEnd);
    };
  }, [
    isDragging,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
    handleInteractionEnd,
  ]);

  React.useEffect(() => {
    return () => {
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const childrenArray = React.Children.toArray(children);
  const panels = childrenArray.filter(
    (child): child is React.ReactElement =>
      React.isValidElement(child) && typeof child.type !== "string"
  );

  const leftPanel = panels[0];
  const rightPanel = panels[1];
  const handle = panels.find(
    (child) => React.isValidElement(child) && child.type === SplitterHandle
  );

  const isLeftCollapsed = leftWidth <= 0.1;
  const isRightCollapsed = leftWidth >= 99.9;
  const isLeftNearCollapse = leftWidth <= snapThreshold && leftWidth > 0.1;
  const isRightNearCollapse =
    leftWidth >= 100 - snapThreshold && leftWidth < 99.9;

  return (
    <div
      data-slot="splitter-root"
      ref={containerRef}
      className={cn(
        "flex h-full w-full overflow-hidden relative",
        `[--splitter-default-size:${defaultSize}]`,
        `[--splitter-min-size:${allowFullCollapse ? 0 : minSize}]`,
        `[--splitter-max-size:${allowFullCollapse ? 100 : maxSize}]`,
        smoothTransition &&
          !isDragging &&
          "transition-all duration-200 ease-out",
        className
      )}
      style={{
        ...style,
        touchAction: "none",
      }}
      {...props}
    >
      <motion.div
        style={{
          width: `${leftWidth}%`,
        }}
        className={cn(
          "overflow-hidden relative",
          isLeftCollapsed && "pointer-events-none"
        )}
        animate={{
          opacity: isLeftCollapsed ? 0 : 1,
          scale: isLeftCollapsed ? 0.98 : 1,
        }}
        transition={{
          duration: smoothTransition ? 0.2 : 0,
          ease: "easeOut",
        }}
      >
        <div
          className={cn(
            "w-full h-full",
            (isLeftNearCollapse || isLeftCollapsed) && "blur-[1px]",
            smoothTransition && "transition-all duration-200"
          )}
        >
          {leftPanel}
        </div>
      </motion.div>

      {handle ? (
        React.cloneElement(handle as React.ReactElement<SplitterHandleProps>, {
          onMouseDown: handleMouseDown,
          onTouchStart: handleTouchStart,
          isDragging,
          isLeftCollapsed,
          isRightCollapsed,
          isLeftNearCollapse,
          isRightNearCollapse,
        })
      ) : (
        <SplitterHandle
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          isDragging={isDragging}
          isLeftCollapsed={isLeftCollapsed}
          isRightCollapsed={isRightCollapsed}
          isLeftNearCollapse={isLeftNearCollapse}
          isRightNearCollapse={isRightNearCollapse}
        />
      )}

      <motion.div
        style={{
          width: `${100 - leftWidth}%`,
        }}
        className={cn(
          "overflow-hidden relative",
          isRightCollapsed && "pointer-events-none"
        )}
        animate={{
          opacity: isRightCollapsed ? 0 : 1,
          scale: isRightCollapsed ? 0.98 : 1,
        }}
        transition={{
          duration: smoothTransition ? 0.2 : 0,
          ease: "easeOut",
        }}
      >
        <div
          className={cn(
            "w-full h-full",
            (isRightNearCollapse || isRightCollapsed) && "blur-[1px]",
            smoothTransition && "transition-all duration-200"
          )}
        >
          {rightPanel}
        </div>
      </motion.div>
    </div>
  );
}

function SplitterPanel({ className, children, ...props }: SplitterPanelProps) {
  return (
    <div
      data-slot="splitter-panel"
      className={cn("h-full w-full", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function SplitterHandle({
  className,
  withHandle = true,
  onMouseDown,
  onTouchStart,
  isDragging,
  isLeftCollapsed,
  isRightCollapsed,
  isLeftNearCollapse,
  isRightNearCollapse,
}: SplitterHandleProps) {
  const motionProps: HTMLMotionProps<"div"> = {
    className: cn(
      "relative flex items-center justify-center cursor-col-resize select-none z-20",
      "bg-border/80 backdrop-blur-sm",
      "hover:bg-accent/80 active:bg-accent",
      "dark:bg-border/80 dark:hover:bg-accent/80 dark:active:bg-accent",
      isDragging && "bg-accent dark:bg-accent shadow-lg scale-110",
      (isLeftCollapsed || isRightCollapsed) &&
        "bg-accent/90 dark:bg-accent/90 shadow-md",
      (isLeftNearCollapse || isRightNearCollapse) &&
        "bg-warning/60 dark:bg-warning/60",
      "transition-all duration-200 ease-out",
      "touch-manipulation",
      className
    ),
    style: {
      width: isDragging ? "10px" : "8px",
      minWidth: "8px",
      cursor: "col-resize",
    },
    onMouseDown,
    onTouchStart,
    animate: {
      width: isDragging ? "10px" : "8px",
      boxShadow: isDragging
        ? "0 0 20px rgba(0,0,0,0.2), 0 0 40px rgba(59,130,246,0.3)"
        : "0 2px 8px rgba(0,0,0,0.1)",
    },
    whileHover: {
      width: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    },
    transition: { duration: 0.15, ease: "easeOut" },
  };

  return (
    <motion.div data-slot="splitter-handle" {...motionProps}>
      {withHandle && !isLeftCollapsed && !isRightCollapsed && (
        <motion.div
          className={cn(
            "absolute inset-y-0 w-full flex items-center justify-center"
          )}
          animate={{
            opacity: isDragging ? 1 : 0.7,
          }}
        >
          <div
            className={cn(
              "flex flex-col gap-1",
              "transition-colors duration-200"
            )}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={cn(
                  "w-1 h-1 rounded-full bg-muted-foreground/60",
                  isDragging && "bg-muted-foreground",
                  (isLeftCollapsed || isRightCollapsed) &&
                    "bg-muted-foreground/80"
                )}
                animate={{
                  scale: isDragging ? 1.2 : 1,
                  opacity: isDragging ? 1 : 0.6,
                }}
                transition={{ delay: i * 0.05 }}
              />
            ))}
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {isLeftCollapsed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center text-accent-foreground pointer-events-none"
          >
            <div className="bg-accent rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
              <PanelRightClose className="w-4 h-4" />
            </div>
          </motion.div>
        )}
        {isRightCollapsed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center text-accent-foreground pointer-events-none"
          >
            <div className="bg-accent rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
              <PanelLeftClose className="w-4 h-4" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SplitterResizer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="splitter-resizer"
      className={cn(
        "group flex h-full w-px items-center justify-center bg-border",
        "hover:w-2 hover:bg-accent transition-all duration-150",
        "dark:bg-border dark:hover:bg-accent",
        className
      )}
      {...props}
    >
      <div className="h-4 w-[3px] rounded-sm bg-muted-foreground/30 group-hover:bg-muted-foreground/60 transition-colors" />
    </div>
  );
}

const addGlobalStyles = (() => {
  let styleElement: HTMLStyleElement | null = null;

  return () => {
    if (typeof document !== "undefined" && !styleElement) {
      styleElement = document.createElement("style");
      styleElement.textContent = `
        .splitter-active {
          user-select: none !important;
          -webkit-user-select: none !important;
          touch-action: none !important;
        }
        .splitter-active * {
          pointer-events: none !important;
        }
        .splitter-active [data-slot="splitter-handle"] {
          pointer-events: auto !important;
        }
      `;
      document.head.appendChild(styleElement);
    }
  };
})();

if (typeof document !== "undefined") {
  addGlobalStyles();
}

Splitter.displayName = "Splitter";
SplitterPanel.displayName = "SplitterPanel";
SplitterHandle.displayName = "SplitterHandle";
SplitterResizer.displayName = "SplitterResizer";

export { Splitter, SplitterPanel, SplitterHandle, SplitterResizer };
