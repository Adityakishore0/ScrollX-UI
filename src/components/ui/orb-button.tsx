'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const OrbButtonVariants = cva(
  'group relative inline-flex items-center whitespace-nowrap font-bold transition-all duration-500 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 overflow-hidden rounded-full border border-black/30 dark:border-white/30 hover:border-black/60 dark:hover:border-white/60 data-[touched=true]:border-black/60 dark:data-[touched=true]:border-white/60 bg-transparent',
  {
    variants: {
      size: {
        default:
          'h-11 text-sm pl-4 pr-4 gap-3 hover:pl-1.5 hover:gap-2 data-[touched=true]:pl-1.5 data-[touched=true]:gap-2',
        sm: 'h-9 text-xs pl-4 pr-4 gap-3 hover:pl-1.5 hover:gap-2 data-[touched=true]:pl-1.5 data-[touched=true]:gap-2',
        lg: 'h-13 text-base pl-5 pr-5 gap-3 hover:pl-2 hover:gap-2 data-[touched=true]:pl-2 data-[touched=true]:gap-2',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export interface OrbButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof OrbButtonVariants> {
  Icon?: React.ComponentType<{ className?: string }>;
  icon?: React.ReactNode;
  dotClassName?: string;
}

const OrbButton = React.forwardRef<HTMLButtonElement, OrbButtonProps>(
  ({ className, size, children, Icon, icon, dotClassName, ...props }, ref) => {
    const buttonSize = size ?? 'default';
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);

    const dotExpanded = {
      sm: 'group-hover:w-6 group-hover:h-6 group-data-[touched=true]:w-6 group-data-[touched=true]:h-6',
      default:
        'group-hover:w-8 group-hover:h-8 group-data-[touched=true]:w-8 group-data-[touched=true]:h-8',
      lg: 'group-hover:w-9 group-hover:h-9 group-data-[touched=true]:w-9 group-data-[touched=true]:h-9',
    }[buttonSize];

    const handleTouchStart = () => {
      if (buttonRef.current) buttonRef.current.dataset.touched = 'true';
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (buttonRef.current) buttonRef.current.dataset.touched = 'false';
      }, 1500);
    };

    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, []);

    const resolvedIcon = Icon ? (
      <Icon className='w-3 h-3' />
    ) : icon ? (
      icon
    ) : (
      <ChevronRight className='w-3 h-3' />
    );

    return (
      <button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        onTouchStart={handleTouchStart}
        className={cn(OrbButtonVariants({ size }), className)}
        {...props}
      >
        <span
          className={cn(
            'relative shrink-0 rounded-full flex items-center justify-center bg-black dark:bg-white transition-all duration-500 w-2.5 h-2.5',
            dotExpanded,
            dotClassName,
          )}
        >
          <span className='text-white dark:text-black flex items-center justify-center opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-data-[touched=true]:opacity-100 group-data-[touched=true]:scale-100'>
            {resolvedIcon}
          </span>
        </span>
        <span className='relative z-10 uppercase tracking-widest text-black dark:text-white transition-transform duration-500 group-hover:translate-x-1.25 group-data-[touched=true]:translate-x-1.25'>
          {children}
        </span>
      </button>
    );
  },
);

OrbButton.displayName = 'OrbButton';

export { OrbButton, OrbButtonVariants };
