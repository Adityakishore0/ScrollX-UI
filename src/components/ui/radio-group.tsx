'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot='radio-group'
      className={cn('grid gap-3', className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item asChild {...props}>
      <motion.button
        type='button'
        data-slot='radio-group-item'
        className={cn(
          'border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-2xs transition-[color,box-shadow] outline-hidden focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        whileHover={
          props.disabled
            ? {}
            : {
                scale: 1.15,
                transition: {
                  type: 'spring',
                  stiffness: 600,
                  damping: 25,
                  mass: 0.5,
                },
              }
        }
        whileTap={
          props.disabled
            ? {}
            : {
                scale: 0.9,
                transition: {
                  type: 'spring',
                  stiffness: 600,
                  damping: 25,
                  mass: 0.5,
                },
              }
        }
      >
        <RadioGroupPrimitive.Indicator
          data-slot='radio-group-indicator'
          className='relative flex items-center justify-center'
          asChild
        >
          <motion.div
            initial={{ scale: 0.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.1, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 800,
              damping: 30,
              mass: 0.4,
            }}
          >
            <Circle className='fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2' />
          </motion.div>
        </RadioGroupPrimitive.Indicator>
      </motion.button>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
