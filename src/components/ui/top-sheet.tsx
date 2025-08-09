"use client";
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  forwardRef,
} from "react";
import { createPortal } from "react-dom";
import {
  motion,
  useAnimation,
  PanInfo,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface TopSheetContextValue {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  contentProps: {
    height: string;
    className: string;
    closeThreshold: number;
  };
}

const TopSheetContext = createContext<TopSheetContextValue | null>(null);

const useTopSheetContext = () => {
  const context = useContext(TopSheetContext);
  if (!context) {
    throw new Error(
      "TopSheet compound components must be used within TopSheet"
    );
  }
  return context;
};

interface TopSheetRootProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  className?: string;
}

const TopSheetRoot = ({
  children,
  open,
  onOpenChange,
  defaultOpen,
  className,
}: TopSheetRootProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (onOpenChange) {
        onOpenChange(newOpen);
      }
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
    },
    [onOpenChange, isControlled]
  );

  const contentProps = {
    height: "55vh",
    className: className || "",
    closeThreshold: 0.3,
  };

  return (
    <TopSheetContext.Provider
      value={{ isOpen, onOpenChange: handleOpenChange, contentProps }}
    >
      {children}
    </TopSheetContext.Provider>
  );
};

interface TopSheetPortalProps {
  children: React.ReactNode;
  container?: HTMLElement;
  className?: string;
}

const TopSheetPortal = ({
  children,
  container,
  className,
}: TopSheetPortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  const portalContent = className ? (
    <div className={className}>{children}</div>
  ) : (
    children
  );

  return createPortal(portalContent, container || document.body);
};

interface TopSheetOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const TopSheetOverlay = forwardRef<HTMLDivElement, TopSheetOverlayProps>(
  ({ className, ...props }, ref) => {
    const { isOpen, onOpenChange } = useTopSheetContext();

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
          onOpenChange(false);
        }
      },
      [onOpenChange]
    );

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={handleClick}
        className={cn(
          "absolute inset-0 bg-black/20 backdrop-blur-sm",
          className
        )}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        {...props}
      />
    );
  }
);
TopSheetOverlay.displayName = "TopSheetOverlay";

interface TopSheetTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
}

const TopSheetTrigger = ({
  asChild,
  children,
  className,
}: TopSheetTriggerProps) => {
  const { onOpenChange } = useTopSheetContext();

  const handleClick = () => {
    onOpenChange(true);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...children.props,
      className: cn(children.props.className, className),
      onClick: (e: React.MouseEvent) => {
        children.props.onClick?.(e);
        handleClick();
      },
    });
  }

  return (
    <button onClick={handleClick} type="button" className={cn("", className)}>
      {children}
    </button>
  );
};

interface TopSheetContentProps {
  children?: React.ReactNode;
  height?: string;
  className?: string;
  closeThreshold?: number;
}

const TopSheetContent = ({
  children,
  height = "55vh",
  className = "",
  closeThreshold = 0.3,
}: TopSheetContentProps) => {
  const { isOpen, onOpenChange } = useTopSheetContext();
  const controls = useAnimation();
  const y = useMotionValue(0);
  useTransform(y, [-100, 0], [0, 1]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [sheetHeight, setSheetHeight] = useState(0);

  const onClose = useCallback(() => onOpenChange(false), [onOpenChange]);

  const calculateHeight = useCallback(() => {
    if (typeof window !== "undefined") {
      const vh = window.innerHeight;
      const vw = window.innerWidth;

      let calculatedHeight;
      if (vw <= 640) {
        calculatedHeight = vh * 0.6;
      } else if (vw <= 1024) {
        calculatedHeight = vh * 0.55;
      } else {
        calculatedHeight = vh * 0.5;
      }

      if (height.includes("vh")) {
        calculatedHeight = (parseInt(height) / 100) * vh;
      } else if (height.includes("px")) {
        calculatedHeight = parseInt(height);
      }

      return Math.min(calculatedHeight, vh * 0.8);
    }
    return 400;
  }, [height]);

  useEffect(() => {
    const updateHeight = () => {
      setSheetHeight(calculateHeight());
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, [calculateHeight]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      controls.start({
        y: 0,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 40,
          mass: 0.8,
        },
      });
    } else {
      document.body.style.overflow = "";
      controls.start({
        y: -(sheetHeight + 50),
        transition: {
          type: "tween",
          ease: [0.25, 0.46, 0.45, 0.94],
          duration: 0.3,
        },
      });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, controls, sheetHeight]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const shouldClose =
        info.offset.y < -(sheetHeight * closeThreshold) ||
        info.velocity.y < -800;
      if (shouldClose) {
        onClose();
      } else {
        controls.start({
          y: 0,
          transition: {
            type: "spring",
            stiffness: 500,
            damping: 40,
          },
        });
      }
    },
    [controls, onClose, closeThreshold, sheetHeight]
  );

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) {
        onClose();
      }
    },
    [onClose]
  );

  if (sheetHeight === 0) return null;

  return (
    <TopSheetPortal>
      <div
        className={cn(
          "fixed inset-0 z-[999]",
          !isOpen && "pointer-events-none"
        )}
      >
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={handleOverlayClick}
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
        />
        <motion.div
          drag="y"
          dragConstraints={{ top: -sheetHeight, bottom: 0 }}
          dragElastic={{ top: 0.1, bottom: 0 }}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          animate={controls}
          initial={{ y: -(sheetHeight + 50) }}
          className={cn(
            "absolute left-0 right-0 top-0 w-full bg-white dark:bg-[#0A0A0A] shadow-2xl",
            className
          )}
          style={{
            height: sheetHeight,
            borderBottomLeftRadius: "16px",
            borderBottomRightRadius: "16px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="flex-1 overflow-hidden">
            <div
              className="h-full overflow-y-auto px-4 pt-6 pb-10 scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {children}
            </div>
          </div>

          <div className="flex justify-center pb-4 pt-1">
            <div className="h-2 w-16 rounded-full bg-gray-300 dark:bg-gray-600 cursor-grab active:cursor-grabbing" />
          </div>
        </motion.div>
      </div>
    </TopSheetPortal>
  );
};

interface TopSheetHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const TopSheetHeader = ({ children, className }: TopSheetHeaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-center pb-4",
        className
      )}
    >
      {children}
    </div>
  );
};

interface TopSheetTitleProps {
  children: React.ReactNode;
  className?: string;
}

const TopSheetTitle = ({ children, className }: TopSheetTitleProps) => {
  return (
    <h3
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
};

interface TopSheetDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const TopSheetDescription = ({
  children,
  className,
}: TopSheetDescriptionProps) => {
  return (
    <p className={cn("text-sm text-gray-600 dark:text-gray-400", className)}>
      {children}
    </p>
  );
};

interface TopSheetFooterProps {
  children: React.ReactNode;
  className?: string;
}

const TopSheetFooter = ({ children, className }: TopSheetFooterProps) => {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-center sm:space-x-2 pt-4",
        className
      )}
    >
      {children}
    </div>
  );
};

interface TopSheetCloseProps {
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
}

const TopSheetClose = ({
  asChild,
  children,
  className,
}: TopSheetCloseProps) => {
  const { onOpenChange } = useTopSheetContext();

  const handleClick = () => {
    onOpenChange(false);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...children.props,
      className: cn(children.props.className, className),
      onClick: (e: React.MouseEvent) => {
        children.props.onClick?.(e);
        handleClick();
      },
    });
  }

  return (
    <button onClick={handleClick} type="button" className={cn("", className)}>
      {children}
    </button>
  );
};

const TopSheet = TopSheetRoot;

export {
  TopSheet,
  TopSheetPortal,
  TopSheetOverlay,
  TopSheetTrigger,
  TopSheetClose,
  TopSheetContent,
  TopSheetHeader,
  TopSheetFooter,
  TopSheetTitle,
  TopSheetDescription,
};
