"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  Transition,
  animate,
} from "framer-motion";
import { useDrag } from "@use-gesture/react";
import { cn } from "@/lib/utils";

export type DrawerDirection = "bottom" | "top" | "left" | "right";

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  direction?: DrawerDirection;
  shouldScaleBackground?: boolean;
  modal?: boolean;
  dismissible?: boolean;
  depth?: boolean;
  snapPoints?: number[];
  defaultSnapPoint?: number;
}

interface DrawerContextValue {
  direction: DrawerDirection;
  close: () => void;
}

const DrawerContext = React.createContext<DrawerContextValue | null>(null);

const useDrawer = () => {
  const context = React.useContext(DrawerContext);
  if (!context) throw new Error("useDrawer must be used within a Drawer");
  return context;
};

const SPRING_CONFIG: Transition = {
  type: "spring",
  damping: 30,
  stiffness: 400,
  mass: 0.5,
};

const VELOCITY_THRESHOLD = 300;
const DISTANCE_THRESHOLD = 0.4;

const getDirectionStyles = (direction: DrawerDirection, depth?: boolean) => {
  const baseStyles = "fixed z-50 bg-background border flex flex-col";
  const depthStyles = depth ? "shadow-2xl" : "shadow-lg";

  switch (direction) {
    case "bottom":
      return {
        container: `${baseStyles} inset-x-0 bottom-0 rounded-t-xl border-t ${depthStyles}`,
        dragHandle:
          "mx-auto mt-3 mb-1 h-1.5 w-12 rounded-full bg-muted-foreground/40 cursor-grab active:cursor-grabbing",
        size: "h-[50vh] max-h-[90vh]",
      };
    case "top":
      return {
        container: `${baseStyles} inset-x-0 top-0 rounded-b-xl border-b ${depthStyles}`,
        dragHandle:
          "mx-auto mb-3 mt-1 h-1.5 w-12 rounded-full bg-muted-foreground/40 cursor-grab active:cursor-grabbing",
        size: "h-[50vh] max-h-[90vh]",
      };
    case "left":
      return {
        container: `${baseStyles} inset-y-0 left-0 rounded-r-xl border-r ${depthStyles} w-80 max-w-[90vw]`,
        dragHandle:
          "my-auto ml-3 w-1.5 h-12 rounded-full bg-muted-foreground/40 cursor-grab active:cursor-grabbing",
        size: "h-full",
      };
    case "right":
      return {
        container: `${baseStyles} inset-y-0 right-0 rounded-l-xl border-l ${depthStyles} w-80 max-w-[90vw]`,
        dragHandle:
          "my-auto mr-3 w-1.5 h-12 rounded-full bg-muted-foreground/40 cursor-grab active:cursor-grabbing",
        size: "h-full",
      };
  }
};

const Drawer: React.FC<DrawerProps> = ({
  open,
  onOpenChange,
  children,
  direction = "bottom",
  shouldScaleBackground = false,
  modal = true,
  dismissible = true,
  depth = false,
  snapPoints,
  defaultSnapPoint,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const dragY = useMotionValue(0);
  const dragX = useMotionValue(0);
  const styles = getDirectionStyles(direction, depth);

  const close = React.useCallback(() => onOpenChange(false), [onOpenChange]);

  React.useEffect(() => {
    if (open) {
      dragY.set(0);
      dragX.set(0);
    }
  }, [open, dragX, dragY]);

  const bind = useDrag(
    ({ active, movement: [mx, my], velocity: [vx, vy], first, last }) => {
      if (first && containerRef.current) {
        containerRef.current.style.transition = "none";
      }

      if (direction === "bottom") {
        if (active) {
          dragY.set(Math.max(0, my));
        } else if (last) {
          const containerHeight = containerRef.current?.offsetHeight || 0;
          const shouldClose =
            vy > VELOCITY_THRESHOLD ||
            my > containerHeight * DISTANCE_THRESHOLD;

          if (shouldClose && dismissible) {
            close();
          } else {
            animate(dragY, 0, SPRING_CONFIG);
          }
        }
      } else if (direction === "top") {
        if (active) {
          dragY.set(Math.min(0, my));
        } else if (last) {
          const containerHeight = containerRef.current?.offsetHeight || 0;
          const shouldClose =
            vy < -VELOCITY_THRESHOLD ||
            Math.abs(my) > containerHeight * DISTANCE_THRESHOLD;

          if (shouldClose && dismissible) {
            close();
          } else {
            animate(dragY, 0, SPRING_CONFIG);
          }
        }
      } else if (direction === "left") {
        if (active) {
          dragX.set(Math.min(0, mx));
        } else if (last) {
          const containerWidth = containerRef.current?.offsetWidth || 0;
          const shouldClose =
            vx < -VELOCITY_THRESHOLD ||
            Math.abs(mx) > containerWidth * DISTANCE_THRESHOLD;

          if (shouldClose && dismissible) {
            close();
          } else {
            animate(dragX, 0, SPRING_CONFIG);
          }
        }
      } else if (direction === "right") {
        if (active) {
          dragX.set(Math.max(0, mx));
        } else if (last) {
          const containerWidth = containerRef.current?.offsetWidth || 0;
          const shouldClose =
            vx > VELOCITY_THRESHOLD || mx > containerWidth * DISTANCE_THRESHOLD;

          if (shouldClose && dismissible) {
            close();
          } else {
            animate(dragX, 0, SPRING_CONFIG);
          }
        }
      }
    },
    {
      axis: direction === "left" || direction === "right" ? "x" : "y",
      pointer: { touch: true },
      filterTaps: true,
      rubberband: true,
      enabled: open && dismissible,
    }
  );

  const contextValue = React.useMemo(
    () => ({
      direction,
      close,
    }),
    [direction, close]
  );

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open && dismissible) close();
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      if (modal) document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "";
      };
    }
  }, [open, close, dismissible, modal]);

  const getInitialTransform = () => {
    switch (direction) {
      case "bottom":
        return { y: "100%" };
      case "top":
        return { y: "-100%" };
      case "left":
        return { x: "-100%" };
      case "right":
        return { x: "100%" };
    }
  };

  return (
    <DrawerContext.Provider value={contextValue}>
      <AnimatePresence>
        {open && (
          <>
            {modal && (
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                onClick={dismissible ? close : undefined}
              />
            )}

            <motion.div
              key="drawer"
              ref={containerRef}
              initial={getInitialTransform()}
              animate={{
                y:
                  direction === "bottom" || direction === "top" ? 0 : undefined,
                x:
                  direction === "left" || direction === "right" ? 0 : undefined,
              }}
              exit={getInitialTransform()}
              transition={SPRING_CONFIG}
              style={{
                y:
                  direction === "bottom" || direction === "top"
                    ? dragY
                    : undefined,
                x:
                  direction === "left" || direction === "right"
                    ? dragX
                    : undefined,
              }}
              className={cn(
                styles.container,
                styles.size,
                "overflow-hidden touch-none"
              )}
              {...(dismissible ? bind() : {})}
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DrawerContext.Provider>
  );
};

const DrawerTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => (
  <button ref={ref} {...props}>
    {children}
  </button>
));
DrawerTrigger.displayName = "DrawerTrigger";

const DrawerContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { showHandle?: boolean }
>(({ className, children, showHandle = true, ...props }, ref) => {
  const { direction } = useDrawer();
  const styles = getDirectionStyles(direction);

  return (
    <div
      ref={ref}
      className={cn("flex h-full flex-col touch-none", className)}
      {...props}
    >
      {showHandle && (
        <div
          className={cn(
            "flex shrink-0 select-none touch-none",
            direction === "left" || direction === "right"
              ? "flex-col justify-center p-2"
              : "justify-center p-2"
          )}
        >
          <div className={styles.dragHandle} />
        </div>
      )}
      <div className="flex-1 overflow-auto overscroll-contain touch-auto">
        {children}
      </div>
    </div>
  );
});
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 p-4 text-center sm:text-left",
      className
    )}
    {...props}
  />
));
DrawerHeader.displayName = "DrawerHeader";

const DrawerTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DrawerTitle.displayName = "DrawerTitle";

const DrawerDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DrawerDescription.displayName = "DrawerDescription";

const DrawerFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-4 pt-2",
      className
    )}
    {...props}
  />
));
DrawerFooter.displayName = "DrawerFooter";

const DrawerClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, onClick, ...props }, ref) => {
  const { close } = useDrawer();

  return (
    <button
      ref={ref}
      onClick={(e) => {
        onClick?.(e);
        close();
      }}
      {...props}
    >
      {children}
    </button>
  );
});
DrawerClose.displayName = "DrawerClose";

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
};
