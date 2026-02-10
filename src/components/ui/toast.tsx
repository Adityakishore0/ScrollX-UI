'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { motion, AnimatePresence } from 'motion/react';

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface ToastCancel {
  label: string;
  onClick: () => void;
}

type EasingFunction = [number, number, number, number];
type EasingName =
  | 'linear'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut'
  | 'circIn'
  | 'circOut'
  | 'circInOut'
  | 'backIn'
  | 'backOut'
  | 'backInOut'
  | 'anticipate';

type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top'
  | 'bottom';

interface ToastProps {
  id?: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  variant?:
    | 'default'
    | 'success'
    | 'destructive'
    | 'warning'
    | 'info'
    | 'loading';
  position?: ToastPosition;
  duration?: number;
  action?: React.ReactNode | ToastAction;
  cancel?: ToastCancel;
  onClose?: () => void;
  stackIndex?: number;
  isVisible?: boolean;
  isStacked?: boolean;
  isHovered?: boolean;
  stackDirection?: 'up' | 'down';
  isExiting?: boolean;
  totalCount?: number;
  className?: string;
  unstyled?: boolean;
  closeButton?: boolean;
  animation?: {
    enter?: {
      duration?: number;
      ease?: EasingName | EasingFunction;
      type?: 'spring' | 'tween';
      damping?: number;
      stiffness?: number;
    };
    exit?: {
      duration?: number;
      ease?: EasingName | EasingFunction;
    };
  };
}

interface ToastState extends ToastProps {
  id: string;
  timestamp: number;
}

interface ToastOptions {
  id?: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  variant?:
    | 'default'
    | 'success'
    | 'destructive'
    | 'warning'
    | 'info'
    | 'loading';
  position?: ToastPosition;
  duration?: number;
  action?: React.ReactNode | ToastAction;
  cancel?: ToastCancel;
  className?: string;
  unstyled?: boolean;
  closeButton?: boolean;
  animation?: {
    enter?: {
      duration?: number;
      ease?: EasingName | EasingFunction;
      type?: 'spring' | 'tween';
      damping?: number;
      stiffness?: number;
    };
    exit?: {
      duration?: number;
      ease?: EasingName | EasingFunction;
    };
  };
}

type ToastListener = (toasts: ToastState[]) => void;

class ToastManager {
  private toasts: ToastState[] = [];
  private listeners: Set<ToastListener> = new Set();

  subscribe(listener: ToastListener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener([...this.toasts]));
  }

  add(props: ToastProps) {
    const id = props.id || Math.random().toString(36).substr(2, 9);
    const existingIndex = this.toasts.findIndex((toast) => toast.id === id);

    if (existingIndex !== -1) {
      this.toasts[existingIndex] = {
        ...this.toasts[existingIndex],
        ...props,
        id,
      };
      this.notify();
      return id;
    }

    const newToast: ToastState = {
      ...props,
      id,
      timestamp: Date.now(),
    };

    this.toasts = [newToast, ...this.toasts];

    if (this.toasts.length > 10) {
      this.toasts = this.toasts.slice(0, 10);
    }

    this.notify();
    return id;
  }

  update(id: string, props: Partial<ToastProps>) {
    const index = this.toasts.findIndex((toast) => toast.id === id);
    if (index !== -1) {
      this.toasts[index] = { ...this.toasts[index], ...props };
      this.notify();
    }
  }

  remove(id: string) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.notify();
  }

  clear() {
    this.toasts = [];
    this.notify();
  }

  getToasts() {
    return [...this.toasts];
  }
}

const toastManager = new ToastManager();

export function toast(message: string, options?: ToastOptions): string;
export function toast(options: ToastOptions & { title: string }): string;
export function toast(
  options: ToastOptions & { children: React.ReactNode },
): string;
export function toast(
  messageOrOptions:
    | string
    | (ToastOptions & ({ title: string } | { children: React.ReactNode })),
  options?: ToastOptions,
): string {
  let toastProps: ToastOptions &
    ({ title?: string } | { children?: React.ReactNode });

  if (typeof messageOrOptions === 'string') {
    toastProps = {
      title: messageOrOptions,
      ...options,
    };
  } else {
    toastProps = messageOrOptions;
  }

  return toastManager.add(toastProps);
}

toast.success = (message: string, options?: ToastOptions) =>
  toast({ title: message, variant: 'success', ...options });

toast.error = (message: string, options?: ToastOptions) =>
  toast({ title: message, variant: 'destructive', ...options });

toast.warning = (message: string, options?: ToastOptions) =>
  toast({ title: message, variant: 'warning', ...options });

toast.info = (message: string, options?: ToastOptions) =>
  toast({ title: message, variant: 'info', ...options });

toast.loading = (message: string, options?: ToastOptions) =>
  toast({ title: message, variant: 'loading', duration: Infinity, ...options });

toast.custom = (children: React.ReactNode, options?: ToastOptions) =>
  toast({ children, unstyled: true, closeButton: false, ...options });

toast.promise = <T,>(
  promise: Promise<T>,
  options: {
    loading: string | { title?: string; children?: React.ReactNode };
    success:
      | string
      | { title?: string; children?: React.ReactNode }
      | ((data: T) => string | { title?: string; children?: React.ReactNode });
    error:
      | string
      | { title?: string; children?: React.ReactNode }
      | ((
          error: Error,
        ) => string | { title?: string; children?: React.ReactNode });
  },
  toastOptions?: ToastOptions,
): Promise<T> => {
  const loadingContent =
    typeof options.loading === 'string'
      ? { title: options.loading }
      : options.loading;

  const id = toast.loading(loadingContent.title || '', {
    ...toastOptions,
    ...loadingContent,
  });

  promise
    .then((data) => {
      const successContent =
        typeof options.success === 'function'
          ? options.success(data)
          : options.success;

      const content =
        typeof successContent === 'string'
          ? { title: successContent }
          : successContent;

      toastManager.update(id, {
        variant: 'success',
        duration: 5000,
        ...content,
      });
    })
    .catch((error: Error) => {
      const errorContent =
        typeof options.error === 'function'
          ? options.error(error)
          : options.error;

      const content =
        typeof errorContent === 'string'
          ? { title: errorContent }
          : errorContent;

      toastManager.update(id, {
        variant: 'destructive',
        duration: 5000,
        ...content,
      });
    });

  return promise;
};

toast.dismiss = (id?: string) => {
  if (id) {
    toastManager.remove(id);
  } else {
    toastManager.clear();
  }
};

const toastVariants = cva(
  'toast-base fixed z-100 pointer-events-auto flex w-[calc(100%-2rem)] max-w-sm min-h-20 items-center justify-between space-x-4 rounded-lg p-4 pr-8 shadow-lg',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground border border-border',
        success:
          'bg-green-100 text-green-900 border-green-200 dark:bg-green-950 dark:text-green-50 dark:border-green-800',
        destructive:
          'bg-red-100 text-red-900 border-red-200 dark:bg-red-950 dark:text-red-50 dark:border-red-800',
        warning:
          'bg-yellow-100 text-yellow-900 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-50 dark:border-yellow-800',
        info: 'bg-blue-100 text-blue-900 border-blue-200 dark:bg-blue-950 dark:text-blue-50 dark:border-blue-800',
        loading:
          'bg-blue-100 text-blue-900 border-blue-200 dark:bg-blue-950 dark:text-blue-50 dark:border-blue-800',
      },
      position: {
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        top: 'top-4 left-1/2',
        bottom: 'bottom-4 left-1/2',
      },
    },
    defaultVariants: {
      variant: 'default',
      position: 'top-right',
    },
  },
);

const ToastIcons = {
  success: (
    <CheckCircle className='h-5 w-5 text-green-600 dark:text-green-400 shrink-0' />
  ),
  destructive: (
    <AlertCircle className='h-5 w-5 text-red-600 dark:text-red-400 shrink-0' />
  ),
  warning: (
    <AlertCircle className='h-5 w-5 text-yellow-600 dark:text-yellow-400 shrink-0' />
  ),
  info: <Info className='h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0' />,
  loading: (
    <div className='h-5 w-5 border-2 border-blue-600 border-t-transparent dark:border-blue-400 dark:border-t-transparent rounded-full animate-spin shrink-0' />
  ),
};

const ToastComponent: React.FC<ToastProps> = ({
  id,
  title,
  description,
  children,
  variant = 'default',
  position = 'top-right',
  duration = 5000,
  onClose,
  action,
  cancel,
  stackIndex = 0,
  isVisible = true,
  isStacked = false,
  isHovered = false,
  stackDirection = 'down',
  isExiting = false,
  totalCount = 1,
  className,
  unstyled = false,
  closeButton = true,
  animation,
}) => {
  const [translateX, setTranslateX] = useState(0);
  const [toastWidth, setToastWidth] = useState(320);
  const [toastHeight, setToastHeight] = useState(88);
  const toastRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const isTouchAction = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (toastRef.current) {
      setToastWidth(toastRef.current.offsetWidth);
      setToastHeight(toastRef.current.offsetHeight + 8);
    }
  }, [children, title, description]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClose = useCallback(
    (e?: React.UIEvent) => {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }
      onClose?.();
    },
    [onClose],
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
        'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      startX.current = clientX;
      isDragging.current = true;
    },
    [],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (isTouchAction.current || !isDragging.current || !toastRef.current)
        return;

      e.stopPropagation();
      e.preventDefault();

      const clientX =
        'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      const diff = clientX - startX.current;

      if (isMobile) {
        setTranslateX(diff);
      } else {
        if (position.includes('right') && diff > 0) {
          setTranslateX(diff);
        } else if (position.includes('left') && diff < 0) {
          setTranslateX(diff);
        }
      }
    },
    [position, isMobile],
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
      const swipeThreshold = toastWidth * 0.3;

      if (Math.abs(translateX) >= swipeThreshold) {
        handleClose();
      } else {
        setTranslateX(0);
      }

      isDragging.current = false;
    },
    [translateX, handleClose],
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isHovered && duration !== Infinity && duration > 0 && !isExiting) {
      timer = setTimeout(() => {
        handleClose();
      }, duration);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [duration, isHovered, handleClose, isExiting]);

  useEffect(() => {
    const currentRef = toastRef.current;
    if (currentRef) {
      const touchStartOptions = { passive: false };
      currentRef.addEventListener(
        'touchstart',
        handleTouchStart as unknown as EventListener,
        touchStartOptions,
      );
      window.addEventListener(
        'touchmove',
        handleTouchMove as unknown as EventListener,
        { passive: false },
      );
      window.addEventListener(
        'touchend',
        handleTouchEnd as unknown as EventListener,
      );

      currentRef.addEventListener(
        'mousedown',
        handleTouchStart as unknown as EventListener,
      );
      window.addEventListener(
        'mousemove',
        handleTouchMove as unknown as EventListener,
      );
      window.addEventListener(
        'mouseup',
        handleTouchEnd as unknown as EventListener,
      );
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener(
          'touchstart',
          handleTouchStart as unknown as EventListener,
        );
        window.removeEventListener(
          'touchmove',
          handleTouchMove as unknown as EventListener,
        );
        window.removeEventListener(
          'touchend',
          handleTouchEnd as unknown as EventListener,
        );

        currentRef.removeEventListener(
          'mousedown',
          handleTouchStart as unknown as EventListener,
        );
        window.removeEventListener(
          'mousemove',
          handleTouchMove as unknown as EventListener,
        );
        window.removeEventListener(
          'mouseup',
          handleTouchEnd as unknown as EventListener,
        );
      }
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  if (!isVisible) return null;

  const getTransform = () => {
    const isCenter = position === 'top' || position === 'bottom';

    if (isStacked && stackIndex > 0) {
      const offset = stackIndex * 8;
      const scale = Math.max(0.85, 1 - stackIndex * 0.05);
      if (stackDirection === 'up') {
        return isCenter
          ? `translateX(-50%) translateY(-${offset}px) scale(${scale})`
          : `translateX(${translateX}px) translateY(-${offset}px) scale(${scale})`;
      } else {
        return isCenter
          ? `translateX(-50%) translateY(${offset}px) scale(${scale})`
          : `translateX(${translateX}px) translateY(${offset}px) scale(${scale})`;
      }
    } else if (!isStacked && stackIndex > 0) {
      const expandedOffset = stackIndex * toastHeight;
      if (stackDirection === 'up') {
        return isCenter
          ? `translateX(-50%) translateY(-${expandedOffset}px)`
          : `translateX(${translateX}px) translateY(-${expandedOffset}px)`;
      } else {
        return isCenter
          ? `translateX(-50%) translateY(${expandedOffset}px)`
          : `translateX(${translateX}px) translateY(${expandedOffset}px)`;
      }
    }

    if (isCenter) {
      return translateX !== 0
        ? `translateX(calc(-50% + ${translateX}px))`
        : `translateX(-50%)`;
    }

    return `translateX(${translateX}px)`;
  };

  const calculateOpacity = () => {
    if (translateX !== 0) {
      return Math.max(0.3, 1 - Math.abs(translateX) / toastWidth);
    }
    if (isStacked && stackIndex >= 3) {
      return 0.4;
    }
    return 1;
  };

  const getZIndex = () => {
    return 1100 - stackIndex;
  };

  const renderAction = () => {
    if (!action) return null;

    if (React.isValidElement(action)) {
      const actionElement = action as React.ReactElement<{
        onClick?: (e: React.MouseEvent) => void;
      }>;
      return (
        <div
          className='flex items-center gap-2 ml-auto shrink-0'
          onClick={(e) => e.stopPropagation()}
        >
          {React.cloneElement(actionElement, {
            onClick: (e: React.MouseEvent) => {
              e.stopPropagation();
              if (actionElement.props.onClick) {
                actionElement.props.onClick(e);
              }
              handleClose();
            },
          })}
        </div>
      );
    }

    if (
      typeof action === 'object' &&
      action !== null &&
      'label' in action &&
      'onClick' in action
    ) {
      const actionObj = action as ToastAction;
      return (
        <div
          className='flex items-center gap-2 shrink-0 w-full sm:w-auto sm:ml-auto'
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              actionObj.onClick();
              handleClose();
            }}
            className='text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1 rounded transition-colors'
          >
            {actionObj.label}
          </button>
        </div>
      );
    }

    return null;
  };

  const defaultEnterAnimation = {
    duration: 0.3,
    type: 'spring' as const,
    damping: 30,
    stiffness: 400,
  };

  const defaultExitAnimation = {
    duration: 0.2,
    ease: 'easeIn' as const,
  };

  const enterAnimation = animation?.enter || defaultEnterAnimation;
  const exitAnimation = animation?.exit || defaultExitAnimation;

  if (unstyled && children) {
    const isCenter = position === 'top' || position === 'bottom';
    return (
      <motion.div
        ref={toastRef}
        initial={{
          x: isCenter ? '-50%' : position.includes('right') ? 400 : -400,
          y: position === 'top' ? -100 : position === 'bottom' ? 100 : 0,
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          x: isCenter ? '-50%' : 0,
          y: 0,
          opacity: calculateOpacity(),
          scale: stackIndex > 0 ? Math.max(0.85, 1 - stackIndex * 0.05) : 1,
          transform: getTransform(),
        }}
        exit={{
          x: isCenter ? '-50%' : position.includes('right') ? 400 : -400,
          y: position === 'top' ? -100 : position === 'bottom' ? 100 : 0,
          opacity: 0,
          scale: 0.9,
          transition: exitAnimation as never,
        }}
        transition={enterAnimation as never}
        className={className}
        style={{
          zIndex: getZIndex(),
          pointerEvents: 'auto',
        }}
      >
        {children}
        {closeButton && (
          <button
            ref={closeButtonRef}
            onClick={handleClose}
            className='absolute top-2 right-2 text-current/70 hover:text-current transition-colors'
            aria-label='Close'
          >
            <X className='h-4 w-4' />
          </button>
        )}
      </motion.div>
    );
  }

  const isCenter = position === 'top' || position === 'bottom';

  return (
    <motion.div
      ref={toastRef}
      className={
        unstyled
          ? className
          : `${toastVariants({ variant, position })} ${className || ''}`
      }
      initial={{
        x: isCenter ? '-50%' : position.includes('right') ? 400 : -400,
        y: position === 'top' ? -100 : position === 'bottom' ? 100 : 0,
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        x: isCenter ? '-50%' : 0,
        y: 0,
        opacity: calculateOpacity(),
        scale: stackIndex > 0 ? Math.max(0.85, 1 - stackIndex * 0.05) : 1,
        transform: getTransform(),
      }}
      exit={{
        x: isCenter ? '-50%' : position.includes('right') ? 400 : -400,
        y: position === 'top' ? -100 : position === 'bottom' ? 100 : 0,
        opacity: 0,
        scale: 0.9,
        transition: exitAnimation as never,
      }}
      transition={enterAnimation as never}
      style={{
        zIndex: getZIndex(),
        pointerEvents: 'auto',
      }}
    >
      <div className='flex flex-col sm:flex-row items-start gap-3 flex-1 min-w-0'>
        {variant !== 'default' &&
          ToastIcons[variant as keyof typeof ToastIcons]}
        <div className='flex-1 min-w-0 w-full'>
          {children ? (
            <div className='flex-1'>{children}</div>
          ) : (
            <>
              {title && (
                <div className='font-semibold text-sm leading-tight mb-1'>
                  {title}
                </div>
              )}
              {description && (
                <div className='text-xs opacity-90 leading-relaxed'>
                  {description}
                </div>
              )}
            </>
          )}
        </div>
        {renderAction()}
        {cancel && (
          <div
            className='flex items-center gap-2 shrink-0 w-full sm:w-auto sm:ml-2'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                cancel.onClick();
                handleClose();
              }}
              className='text-xs font-medium bg-muted text-muted-foreground hover:bg-muted/80 px-3 py-1 rounded transition-colors'
            >
              {cancel.label}
            </button>
          </div>
        )}
      </div>
      {isStacked && stackIndex === 0 && totalCount > 3 && (
        <div className='absolute -bottom-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md'>
          +{totalCount - 3}
        </div>
      )}
      {closeButton && (
        <button
          ref={closeButtonRef}
          onClick={handleClose}
          className='absolute top-2 right-2 text-current/70 hover:text-current transition-colors'
          aria-label='Close'
        >
          <X className='h-4 w-4' />
        </button>
      )}
    </motion.div>
  );
};

interface ToastStackProps {
  toasts: ToastState[];
  position: string;
  onRemoveToast: (id: string) => void;
}

const ToastStack: React.FC<ToastStackProps> = ({
  toasts,
  position,
  onRemoveToast,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (isMobile) return;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovered(true);
  }, [isMobile]);

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const { clientX, clientY } = e;

      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        return;
      }

      hoverTimeoutRef.current = setTimeout(() => {
        setIsHovered(false);
        hoverTimeoutRef.current = null;
      }, 150);
    },
    [isMobile],
  );

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleRemoveToast = useCallback(
    (id: string) => {
      const toastToRemove = toasts.find((t: ToastState) => t.id === id);
      if (
        toastToRemove &&
        toasts.filter((t: ToastState) => t.position === toastToRemove.position)
          .length === 1
      ) {
        setIsHovered(false);
        setIsTapped(false);
      }
      onRemoveToast(id);
    },
    [toasts, onRemoveToast],
  );

  const handleStackInteraction = () => {
    if (isMobile) {
      setIsTapped(!isTapped);
    }
  };

  const getVisibleToasts = () => {
    const maxVisible = 3;
    const shouldStack = toasts.length > 1;
    const isExpanded = isMobile ? isTapped : isHovered;

    if (shouldStack && !isExpanded) {
      return toasts.slice(0, maxVisible);
    }

    return toasts.slice(0, maxVisible);
  };

  const visibleToasts = getVisibleToasts();

  const getStackDirection = (pos: string) => {
    return pos.includes('bottom') ? 'up' : 'down';
  };

  const stackDirection = getStackDirection(position);
  const shouldStack = toasts.length > 1;
  const isExpanded = isMobile ? isTapped : isHovered;

  if (toasts.length === 0) return null;

  return (
    <div
      className='fixed pointer-events-none z-1000'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleStackInteraction}
    >
      <AnimatePresence mode='popLayout'>
        {visibleToasts.map((toastProps, index) => (
          <ToastComponent
            key={toastProps.id}
            {...toastProps}
            stackIndex={index}
            isStacked={shouldStack && !isExpanded}
            isHovered={isHovered || isTapped}
            stackDirection={stackDirection}
            totalCount={toasts.length}
            onClose={() => handleRemoveToast(toastProps.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastState[]>(toastManager.getToasts());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const unsubscribe = toastManager.subscribe(setToasts);
    return () => {
      unsubscribe();
    };
  }, []);

  const handleRemoveToast = useCallback((id: string) => {
    toastManager.remove(id);
  }, []);

  const processedToasts = toasts.map((toast) => {
    if (isMobile && toast.position !== 'top' && toast.position !== 'bottom') {
      return {
        ...toast,
        position: 'top-right' as const,
      };
    }
    return toast;
  });

  const toastsByPosition = processedToasts.reduce(
    (acc, toast) => {
      const position = toast.position || 'top-right';
      if (!acc[position]) {
        acc[position] = [];
      }
      acc[position].push(toast);
      return acc;
    },
    {} as Record<string, ToastState[]>,
  );

  if (toasts.length === 0) return null;

  return (
    <>
      {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
        <ToastStack
          key={position}
          toasts={positionToasts}
          position={position}
          onRemoveToast={handleRemoveToast}
        />
      ))}
    </>
  );
}

export const useToast = () => {
  return { toast };
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default ToastComponent;
