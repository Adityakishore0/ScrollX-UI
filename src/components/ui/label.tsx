'use client';

import * as React from 'react';
import { motion, useInView, HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

interface LabelProps extends Omit<HTMLMotionProps<'label'>, 'direction'> {
  direction?: 'left' | 'right' | 'top' | 'bottom';
  disableAnimation?: boolean;
}

function mergeRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') ref(value);
      else (ref as React.MutableRefObject<T | null>).current = value;
    });
  };
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ direction = 'left', disableAnimation, className, ...props }, ref) => {
    const localRef = React.useRef<HTMLLabelElement>(null);
    const isInView = useInView(localRef, { once: false, margin: '-50px' });

    const variants = {
      left: { initial: { x: -20 }, animate: { x: 0 } },
      right: { initial: { x: 20 }, animate: { x: 0 } },
      top: { initial: { y: -20 }, animate: { y: 0 } },
      bottom: { initial: { y: 20 }, animate: { y: 0 } },
    };

    const baseClasses = cn(
      'flex items-center gap-2 text-sm leading-none font-medium select-none user-select-none',
      'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className,
    );

    if (disableAnimation) {
      return (
        <motion.label
          ref={mergeRefs(ref, localRef)}
          className={baseClasses}
          {...props}
        />
      );
    }

    return (
      <motion.label
        ref={mergeRefs(ref, localRef)}
        initial={variants[direction].initial}
        animate={
          isInView ? variants[direction].animate : variants[direction].initial
        }
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={baseClasses}
        {...props}
      />
    );
  },
);

Label.displayName = 'Label';

export { Label };
