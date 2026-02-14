'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Select as SelectPrimitive } from 'radix-ui';
import { cn } from '@/lib/utils';
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'motion/react';

const selectVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.2,
    },
  }),
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
          ),
      );
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return isMobile;
};

const SelectContext = React.createContext<{ animate: boolean }>({
  animate: true,
});

function Select({
  animate = true,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root> & {
  animate?: boolean;
}) {
  return (
    <SelectContext.Provider value={{ animate }}>
      <SelectPrimitive.Root data-slot='select' {...props} />
    </SelectContext.Provider>
  );
}

function SelectGroup({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return (
    <SelectPrimitive.Group
      data-slot='select-group'
      className={cn('scroll-my-1 p-1', className)}
      {...props}
    />
  );
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot='select-value' {...props} />;
}

function SelectTrigger({
  className,
  size = 'default',
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: 'sm' | 'default';
}) {
  const { animate } = React.useContext(SelectContext);
  const isMobile = useMobile();

  return (
    <SelectPrimitive.Trigger
      data-slot='select-trigger'
      data-size={size}
      className={cn(
        "border-input data-placeholder:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 gap-1.5 rounded-lg border bg-transparent py-2 pr-2 pl-2.5 text-sm transition-colors select-none focus-visible:ring-3 aria-invalid:ring-3 data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:gap-1.5 [&_svg:not([class*='size-'])]:size-4 flex w-fit items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      asChild={animate && !isMobile}
      {...props}
    >
      {animate && !isMobile ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{ touchAction: 'manipulation' }}
        >
          {children}
          <SelectPrimitive.Icon asChild>
            <ChevronDownIcon className='text-muted-foreground size-4 pointer-events-none' />
          </SelectPrimitive.Icon>
        </motion.button>
      ) : (
        <>
          {children}
          <SelectPrimitive.Icon asChild>
            <ChevronDownIcon className='text-muted-foreground size-4 pointer-events-none' />
          </SelectPrimitive.Icon>
        </>
      )}
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = 'item-aligned',
  align = 'center',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  const { animate } = React.useContext(SelectContext);
  const isMobile = useMobile();

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot='select-content'
        data-align-trigger={position === 'item-aligned'}
        className={cn(
          'bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 min-w-36 rounded-lg shadow-md ring-1 duration-100 relative z-50 max-h-(--radix-select-content-available-height) origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto data-[align-trigger=true]:animate-none',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className,
        )}
        position={position}
        align={align}
        asChild={animate && !isMobile}
        {...props}
      >
        {animate && !isMobile ? (
          <motion.div
            variants={selectVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            style={{
              transformOrigin: 'var(--radix-select-content-transform-origin)',
            }}
          >
            <SelectScrollUpButton />
            <SelectPrimitive.Viewport
              data-position={position}
              className={cn(
                'data-[position=popper]:h-(--radix-select-trigger-height) data-[position=popper]:w-full data-[position=popper]:min-w-(--radix-select-trigger-width)',
                position === 'popper' && '',
              )}
            >
              {React.Children.map(children, (child, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={itemVariants}
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                >
                  {child}
                </motion.div>
              ))}
            </SelectPrimitive.Viewport>
            <SelectScrollDownButton />
          </motion.div>
        ) : (
          <>
            <SelectScrollUpButton />
            <SelectPrimitive.Viewport
              data-position={position}
              className={cn(
                'data-[position=popper]:h-(--radix-select-trigger-height) data-[position=popper]:w-full data-[position=popper]:min-w-(--radix-select-trigger-width)',
                position === 'popper' && '',
              )}
            >
              {children}
            </SelectPrimitive.Viewport>
            <SelectScrollDownButton />
          </>
        )}
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot='select-label'
      className={cn('text-muted-foreground px-1.5 py-1 text-xs', className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMobile();
  const { animate } = React.useContext(SelectContext);

  if (!animate || isMobile) {
    return (
      <SelectPrimitive.Item
        data-slot='select-item'
        className={cn(
          "focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
          className,
        )}
        {...props}
      >
        <span className='pointer-events-none absolute right-2 flex size-4 items-center justify-center'>
          <SelectPrimitive.ItemIndicator>
            <CheckIcon className='pointer-events-none' />
          </SelectPrimitive.ItemIndicator>
        </span>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    );
  }

  return (
    <SelectPrimitive.Item
      data-slot='select-item'
      className={cn(
        "not-data-[variant=destructive]:focus:**:text-accent-foreground gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ touchAction: 'manipulation' }}
      {...props}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            layoutId='selectHoverBackground'
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                type: 'spring',
                stiffness: 260,
                damping: 15,
              },
            }}
            exit={{ opacity: 0 }}
            className='absolute inset-0 rounded-md bg-accent'
          />
        )}
      </AnimatePresence>

      <span className='pointer-events-none absolute right-2 flex size-4 items-center justify-center z-10'>
        <SelectPrimitive.ItemIndicator>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <CheckIcon className='pointer-events-none' />
          </motion.div>
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText asChild>
        <motion.span
          animate={{
            y: isHovered ? -1 : 0,
            x: isHovered ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 500 }}
          className='relative z-10'
        >
          {children}
        </motion.span>
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  const { animate } = React.useContext(SelectContext);
  const isMobile = useMobile();

  return animate && !isMobile ? (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{
        scaleX: 1,
        opacity: 1,
        transition: {
          delay: 0.1,
          type: 'spring',
          stiffness: 400,
          damping: 25,
        },
      }}
    >
      <SelectPrimitive.Separator
        data-slot='select-separator'
        className={cn(
          'bg-border -mx-1 my-1 h-px pointer-events-none',
          className,
        )}
        {...props}
      />
    </motion.div>
  ) : (
    <SelectPrimitive.Separator
      data-slot='select-separator'
      className={cn('bg-border -mx-1 my-1 h-px pointer-events-none', className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot='select-scroll-up-button'
      className={cn(
        "bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot='select-scroll-down-button'
      className={cn(
        "bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
