'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const morphyButtonVariants = cva(
  'group relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 overflow-hidden [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 rounded-full',
  {
    variants: {
      size: {
        default: 'h-9 px-6 py-2',
        sm: 'h-8 px-5 text-xs',
        lg: 'h-10 px-10',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export interface MorphyButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof morphyButtonVariants> {
  asChild?: boolean;
  dotClassName?: string;
  animate?: 'normal' | 'reverse';
}

const MorphyButton = React.forwardRef<HTMLButtonElement, MorphyButtonProps>(
  (
    {
      className,
      size,
      asChild = false,
      children,
      dotClassName,
      animate = 'normal',
      ...props
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const Comp = asChild ? Slot : 'button';
    const buttonSize = size || 'default';

    const handleTouchStart = () => {
      setIsHovered(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsHovered(false), 1500);
    };

    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, []);

    const active = animate === 'reverse' ? !isHovered : isHovered;

    const userHasTextColor = className?.includes('text-');

    return (
      <Comp
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        className={cn(
          morphyButtonVariants({ size }),
          'transition-colors duration-700 ease-in-out border',
          active ? 'border-black dark:border-white' : 'border-transparent',
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            'absolute inset-0 transition-colors duration-700 ease-in-out rounded-[inherit]',
            active ? 'bg-zinc-200 dark:bg-zinc-800' : 'bg-black dark:bg-white',
          )}
        />
        <div
          className={cn(
            'absolute top-1/2 -translate-y-1/2 rounded-full transition-all duration-700 ease-in-out bg-black dark:bg-white',
            'w-[200%] h-[200%] -left-full',
            buttonSize === 'sm' &&
              (active ? 'w-2 h-2 left-3' : 'w-[200%] h-[200%] -left-full'),
            buttonSize === 'default' &&
              (active ? 'w-2.5 h-2.5 left-3' : 'w-[200%] h-[200%] -left-full'),
            buttonSize === 'lg' &&
              (active ? 'w-3 h-3 left-4' : 'w-[200%] h-[200%] -left-full'),
            dotClassName,
          )}
        />
        <span
          className={cn(
            'relative z-10 font-bold transition-all duration-700 ease-in-out',
            active ? 'translate-x-1.5' : 'translate-x-0',
            !userHasTextColor &&
              (active
                ? 'text-black dark:text-white'
                : 'text-white dark:text-black'),
          )}
        >
          {children}
        </span>
      </Comp>
    );
  },
);

MorphyButton.displayName = 'MorphyButton';

export { MorphyButton, morphyButtonVariants };
