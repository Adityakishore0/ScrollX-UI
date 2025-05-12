import React, { useState, useEffect, useCallback, useRef } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cva } from "class-variance-authority";

const toastVariants = cva(
  "toast-base fixed z-[100] pointer-events-auto flex w-[calc(100%-2rem)] max-w-sm items-center justify-between space-x-4 rounded-lg p-4 pr-8 shadow-lg transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-white text-black border border-gray-200",
        success: "bg-green-100 text-green-900",
        destructive: "bg-red-100 text-red-900",
        warning: "bg-yellow-100 text-yellow-900",
        info: "bg-blue-100 text-blue-900",
      },
      position: {
        "top-right": "top-4 right-4 animate-slide-in-right",
        "top-left": "top-4 left-4 animate-slide-in-left",
        "bottom-right": "bottom-4 right-4 animate-slide-in-right",
        "bottom-left": "bottom-4 left-4 animate-slide-in-left",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "top-right",
    },
  }
);

const ToastIcons = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  destructive: <AlertCircle className="w-5 h-5 text-red-500" />,
  warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
};

interface ToastProps {
  id?: string;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "destructive" | "warning" | "info";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  duration?: number;
  onClose?: () => void;
  action?: React.ReactNode;
}

const Toast: React.FC<ToastProps> = ({
  id,
  title,
  description,
  variant = "default",
  position = "top-right",
  duration = 5000,
  onClose,
  action,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const toastRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const isDragging = useRef(false);
  const isTouchAction = useRef(false);

  const handleClose = useCallback(
    (e?: React.UIEvent) => {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }

      setIsVisible(false);
      setTimeout(() => {
        onClose?.();
      }, 300);
    },
    [onClose]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (e.target instanceof Element) {
        if (
          closeButtonRef.current?.contains(e.target) ||
          e.target.closest('button[role="button"]')
        ) {
          isTouchAction.current = true;
          return;
        }
      }

      e.stopPropagation();

      const clientX =
        "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      const clientY =
        "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

      startX.current = clientX;
      startY.current = clientY;
      isDragging.current = true;
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (isTouchAction.current || !isDragging.current || !toastRef.current)
        return;

      e.stopPropagation();
      e.preventDefault();

      const clientX =
        "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      const diff = clientX - startX.current;

      setTranslateX(diff);
    },
    []
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (isTouchAction.current) {
        isTouchAction.current = false;
        return;
      }

      if (!isDragging.current || !toastRef.current) return;

      e.stopPropagation();

      const toastWidth = toastRef.current.offsetWidth;
      const swipeThreshold = toastWidth * 0.5;

      if (Math.abs(translateX) >= swipeThreshold) {
        handleClose();
      } else {
        setTranslateX(0);
      }

      isDragging.current = false;
    },
    [translateX, handleClose]
  );

  const wrappedAction = action
    ? React.cloneElement(action as React.ReactElement, {
        onClick: (e: React.MouseEvent) => {
          e.stopPropagation();
          const originalOnClick = (action as React.ReactElement).props.onClick;
          if (originalOnClick) {
            originalOnClick(e);
          }
          handleClose();
        },
      })
    : null;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isHovering && duration > 0) {
      timer = setTimeout(() => {
        handleClose();
      }, duration);
    }
    return () => clearTimeout(timer);
  }, [duration, isHovering, handleClose]);

  useEffect(() => {
    const currentRef = toastRef.current;
    if (currentRef) {
      const touchStartOptions = { passive: false };

      currentRef.addEventListener(
        "touchstart",
        handleTouchStart as unknown as EventListener,
        touchStartOptions
      );
      window.addEventListener(
        "touchmove",
        handleTouchMove as unknown as EventListener,
        { passive: false }
      );
      window.addEventListener(
        "touchend",
        handleTouchEnd as unknown as EventListener
      );

      currentRef.addEventListener(
        "mousedown",
        handleTouchStart as unknown as EventListener
      );
      window.addEventListener(
        "mousemove",
        handleTouchMove as unknown as EventListener
      );
      window.addEventListener(
        "mouseup",
        handleTouchEnd as unknown as EventListener
      );
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener(
          "touchstart",
          handleTouchStart as unknown as EventListener
        );
        window.removeEventListener(
          "touchmove",
          handleTouchMove as unknown as EventListener
        );
        window.removeEventListener(
          "touchend",
          handleTouchEnd as unknown as EventListener
        );

        currentRef.removeEventListener(
          "mousedown",
          handleTouchStart as unknown as EventListener
        );
        window.removeEventListener(
          "mousemove",
          handleTouchMove as unknown as EventListener
        );
        window.removeEventListener(
          "mouseup",
          handleTouchEnd as unknown as EventListener
        );
      }
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  if (!isVisible) return null;

  return (
    <div
      ref={toastRef}
      role="alert"
      aria-live="polite"
      className={`${toastVariants({ variant, position })} ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transform: `translateX(${translateX}px)`,
        opacity:
          1 - Math.abs(translateX) / (toastRef.current?.offsetWidth || 300),
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex items-center space-x-3 w-full">
        {variant !== "default" && ToastIcons[variant]}
        <div className="flex-1">
          {title && <div className="font-semibold">{title}</div>}
          {description && (
            <div className="text-sm opacity-80">{description}</div>
          )}
        </div>
      </div>

      {wrappedAction && <div className="ml-auto">{wrappedAction}</div>}

      <button
        ref={closeButtonRef}
        onClick={handleClose}
        className="absolute top-2 right-2 hover:opacity-75 transition-opacity z-10 p-1"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

interface ToastContextType {
  toast: (props: ToastProps) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined
);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = useCallback((props: ToastProps) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((current) => [...current, { ...props, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed inset-0 pointer-events-none flex flex-col items-stretch z-[100]">
        {toasts.map((toastProps) => (
          <Toast
            key={toastProps.id}
            {...toastProps}
            onClose={() => removeToast(toastProps.id!)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export default Toast;
