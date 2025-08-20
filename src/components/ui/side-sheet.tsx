"use client";
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  forwardRef,
  ReactElement,
} from "react";
import { createPortal } from "react-dom";
import {
  motion,
  useAnimation,
  PanInfo,
  useMotionValue,
  useTransform,
  HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";

type SheetSide = "left" | "right";

interface SideSheetContextValue {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  contentProps: {
    width: string;
    className: string;
    closeThreshold: number;
    side: SheetSide;
  };
}

const SideSheetContext = createContext<SideSheetContextValue | null>(null);

const useSideSheetContext = () => {
  const context = useContext(SideSheetContext);
  if (!context) {
    throw new Error(
      "SideSheet compound components must be used within SideSheet"
    );
  }
  return context;
};

interface SideSheetRootProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  className?: string;
  side?: SheetSide;
  width?: string;
  closeThreshold?: number;
}

const SideSheetRoot = ({
  children,
  open,
  onOpenChange,
  defaultOpen,
  className,
  side = "right",
  width = "400px",
  closeThreshold = 0.3,
}: SideSheetRootProps) => {
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
    width,
    className: className || "",
    closeThreshold,
    side,
  };

  return (
    <SideSheetContext.Provider
      value={{ isOpen, onOpenChange: handleOpenChange, contentProps }}
    >
      {children}
    </SideSheetContext.Provider>
  );
};

interface SideSheetPortalProps {
  children: React.ReactNode;
  container?: HTMLElement;
  className?: string;
}

const SideSheetPortal = ({
  children,
  container,
  className,
}: SideSheetPortalProps) => {
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

interface SideSheetOverlayProps extends HTMLMotionProps<"div"> {
  className?: string;
}

const SideSheetOverlay = forwardRef<HTMLDivElement, SideSheetOverlayProps>(
  ({ className, ...props }, ref) => {
    const { isOpen, onOpenChange } = useSideSheetContext();

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
SideSheetOverlay.displayName = "SideSheetOverlay";

interface SideSheetTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
}

const SideSheetTrigger = ({
  asChild,
  children,
  className,
}: SideSheetTriggerProps) => {
  const { onOpenChange } = useSideSheetContext();

  const handleClick = () => {
    onOpenChange(true);
  };

  if (asChild && React.isValidElement(children)) {
    const child = children as ReactElement<{
      className?: string;
      onClick?: (e: React.MouseEvent) => void;
    }>;
    return React.cloneElement(child, {
      className: cn(child.props.className, className),
      onClick: (e: React.MouseEvent) => {
        child.props.onClick?.(e);
        handleClick();
      },
    });
  }

  return (
    <div onClick={handleClick} className={cn("", className)}>
      {children}
    </div>
  );
};

interface SideSheetContentProps {
  children?: React.ReactNode;
  className?: string;
}

const SideSheetContent = ({
  children,
  className = "",
}: SideSheetContentProps) => {
  const { isOpen, onOpenChange, contentProps } = useSideSheetContext();
  const { width, closeThreshold, side } = contentProps;
  const controls = useAnimation();
  const x = useMotionValue(0);
  useTransform(x, [-100, 0], [0, 1]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [sheetWidth, setSheetWidth] = useState(0);

  const onClose = useCallback(() => onOpenChange(false), [onOpenChange]);

  const calculateWidth = useCallback(() => {
    if (typeof window !== "undefined") {
      const vw = window.innerWidth;

      let calculatedWidth;
      if (vw <= 640) {
        calculatedWidth = vw * 0.9;
      } else if (vw <= 1024) {
        calculatedWidth = vw * 0.7;
      } else {
        if (width.includes("px")) {
          calculatedWidth = parseInt(width);
        } else if (width.includes("vw")) {
          calculatedWidth = (parseInt(width) / 100) * vw;
        } else if (width.includes("%")) {
          calculatedWidth = (parseInt(width) / 100) * vw;
        } else {
          calculatedWidth = 400;
        }
      }

      return Math.min(calculatedWidth, vw * 0.95);
    }
    return 400;
  }, [width]);

  useEffect(() => {
    const updateWidth = () => {
      setSheetWidth(calculateWidth());
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, [calculateWidth]);

  const getInitialX = useCallback(() => {
    return side === "left" ? -(sheetWidth + 50) : sheetWidth + 50;
  }, [side, sheetWidth]);

  const getPositionStyles = useCallback(() => {
    if (side === "left") {
      return {
        left: 0,
        top: 0,
        bottom: 0,
      };
    } else {
      return {
        right: 0,
        top: 0,
        bottom: 0,
      };
    }
  }, [side]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      controls.start({
        x: 0,
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
        x: getInitialX(),
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
  }, [isOpen, controls, getInitialX]);

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
      const threshold = sheetWidth * closeThreshold;
      let shouldClose = false;

      if (side === "left") {
        shouldClose = info.offset.x < -threshold || info.velocity.x < -800;
      } else {
        shouldClose = info.offset.x > threshold || info.velocity.x > 800;
      }

      if (shouldClose) {
        onClose();
      } else {
        controls.start({
          x: 0,
          transition: {
            type: "spring",
            stiffness: 500,
            damping: 40,
          },
        });
      }
    },
    [controls, onClose, closeThreshold, sheetWidth, side]
  );

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) {
        onClose();
      }
    },
    [onClose]
  );

  const getDragConstraints = useCallback(() => {
    if (side === "left") {
      return { left: -sheetWidth, right: 0 };
    } else {
      return { left: 0, right: sheetWidth };
    }
  }, [side, sheetWidth]);

  if (sheetWidth === 0) return null;

  return (
    <SideSheetPortal>
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
          drag="x"
          dragConstraints={getDragConstraints()}
          dragElastic={0}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          animate={controls}
          initial={{ x: getInitialX() }}
          className={cn(
            "absolute bg-white dark:bg-[#0A0A0A] shadow-2xl",
            side === "left" ? "rounded-r-lg" : "rounded-l-lg",
            className
          )}
          style={{
            width: sheetWidth,
            ...getPositionStyles(),
          }}
        >
          <div className="h-full overflow-hidden">
            <div
              className="h-full overflow-y-auto px-6 py-6 scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {children}
            </div>
          </div>

          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 flex items-center",
              side === "left" ? "right-0 pr-2" : "left-0 pl-2"
            )}
          >
            <div className="w-2 h-16 rounded-full bg-muted cursor-grab active:cursor-grabbing" />
          </div>
        </motion.div>
      </div>
    </SideSheetPortal>
  );
};

interface SideSheetHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const SideSheetHeader = ({ children, className }: SideSheetHeaderProps) => {
  return (
    <div className={cn("flex flex-col space-y-1.5 text-left pb-4", className)}>
      {children}
    </div>
  );
};

interface SideSheetTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SideSheetTitle = ({ children, className }: SideSheetTitleProps) => {
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

interface SideSheetDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const SideSheetDescription = ({
  children,
  className,
}: SideSheetDescriptionProps) => {
  return (
    <p className={cn("text-sm text-gray-600 dark:text-gray-400", className)}>
      {children}
    </p>
  );
};

interface SideSheetFooterProps {
  children: React.ReactNode;
  className?: string;
}

const SideSheetFooter = ({ children, className }: SideSheetFooterProps) => {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4",
        className
      )}
    >
      {children}
    </div>
  );
};

interface SideSheetCloseProps {
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
}

const SideSheetClose = ({
  asChild,
  children,
  className,
}: SideSheetCloseProps) => {
  const { onOpenChange } = useSideSheetContext();

  const handleClick = () => {
    onOpenChange(false);
  };

  if (asChild && React.isValidElement(children)) {
    const child = children as ReactElement<{
      className?: string;
      onClick?: (e: React.MouseEvent) => void;
    }>;
    return React.cloneElement(child, {
      className: cn(child.props.className, className),
      onClick: (e: React.MouseEvent) => {
        child.props.onClick?.(e);
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

const SideSheet = SideSheetRoot;

export {
  SideSheet,
  SideSheetPortal,
  SideSheetOverlay,
  SideSheetTrigger,
  SideSheetClose,
  SideSheetContent,
  SideSheetHeader,
  SideSheetFooter,
  SideSheetTitle,
  SideSheetDescription,
};
