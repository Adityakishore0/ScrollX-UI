'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { cn } from '@/lib/utils';

const dropdownVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    rotateX: 40,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    rotateX: 10,
    y: 10,
    transition: {
      duration: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.2,
    },
  }),
  exit: {
    opacity: 0,
    x: -20,
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

const DropdownMenuContext = React.createContext<{ animate: boolean }>({
  animate: true,
});

function DropdownMenu({
  animate = true,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root> & {
  animate?: boolean;
}) {
  return (
    <DropdownMenuContext.Provider value={{ animate }}>
      <DropdownMenuPrimitive.Root data-slot='dropdown-menu' {...props} />
    </DropdownMenuContext.Provider>
  );
}

function DropdownMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  const { animate } = React.useContext(DropdownMenuContext);

  return (
    <DropdownMenuPrimitive.Trigger
      data-slot='dropdown-menu-trigger'
      className={cn(
        'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200',
        'hover:shadow-lg',
        className,
      )}
      asChild
      {...props}
    >
      <motion.div
        whileHover={animate ? { scale: 1.02 } : undefined}
        whileTap={animate ? { scale: 0.98 } : undefined}
        transition={
          animate ? { type: 'spring', stiffness: 400, damping: 25 } : undefined
        }
        className='flex items-center gap-2 cursor-pointer'
        style={{ touchAction: 'manipulation' }}
      >
        {children}
      </motion.div>
    </DropdownMenuPrimitive.Trigger>
  );
}

interface DropdownMenuContentProps extends React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
> {
  className?: string;
  sideOffset?: number;
  children?: React.ReactNode;
  maxHeight?: string | number;
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  maxHeight = '16rem',
  children,
  ...props
}: DropdownMenuContentProps) {
  const { animate } = React.useContext(DropdownMenuContext);

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot='dropdown-menu-content'
        sideOffset={sideOffset}
        className='z-50'
        asChild
        {...props}
      >
        <motion.div
          variants={animate ? dropdownVariants : undefined}
          initial={animate ? 'hidden' : undefined}
          animate={animate ? 'visible' : undefined}
          exit={animate ? 'exit' : undefined}
          className={cn(
            'w-72 rounded-xl border shadow-xl overflow-hidden perspective-midrange transform-3d',
            'bg-[#ffffff] border-neutral-900/10',
            'dark:bg-[#262626] dark:border-neutral-50/10',
            className,
          )}
          style={{
            transformOrigin:
              'var(--radix-dropdown-menu-content-transform-origin)',
          }}
        >
          <div
            className='relative z-20 overflow-y-auto scrollbar-visible'
            style={{
              maxHeight:
                typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(155, 155, 155, 0.5) transparent',
            }}
          >
            <style jsx global>{`
              .scrollbar-visible::-webkit-scrollbar {
                width: 6px;
                display: block;
              }
              .scrollbar-visible::-webkit-scrollbar-track {
                background: transparent;
              }
              .scrollbar-visible::-webkit-scrollbar-thumb {
                background-color: rgba(155, 155, 155, 0.5);
                border-radius: 20px;
              }
              .scrollbar-visible::-webkit-scrollbar-thumb:hover {
                background-color: rgba(155, 155, 155, 0.7);
              }
            `}</style>
            <div className='p-2'>
              {React.Children.map(children, (child, index) =>
                animate ? (
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
                ) : (
                  <div key={index}>{child}</div>
                ),
              )}
            </div>
          </div>
        </motion.div>
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = 'default',
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMobile();
  const { animate } = React.useContext(DropdownMenuContext);

  return (
    <DropdownMenuPrimitive.Item
      data-slot='dropdown-menu-item'
      data-inset={inset}
      data-variant={variant}
      className={cn(
        'relative flex cursor-pointer items-center gap-3 rounded-lg p-2 text-sm outline-hidden select-none overflow-hidden',
        'transition-all duration-200 ease-out',
        'focus:outline-hidden focus:bg-transparent',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        'data-inset:pl-8',
        'text-neutral-900 dark:text-neutral-50',
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      style={{ touchAction: 'manipulation' }}
      asChild
      {...props}
    >
      <motion.div
        className='relative w-full'
        initial={animate ? { opacity: 0, x: -20 } : undefined}
        animate={animate ? { opacity: 1, x: 0 } : undefined}
      >
        <AnimatePresence>
          {!isMobile && isHovered && (
            <motion.div
              layoutId={animate ? 'hoverBackground' : undefined}
              initial={animate ? { opacity: 0 } : undefined}
              animate={
                animate
                  ? {
                      opacity: 1,
                      scale: 1.05,
                      transition: {
                        type: 'spring',
                        stiffness: 260,
                        damping: 15,
                      },
                    }
                  : { opacity: 1 }
              }
              exit={animate ? { opacity: 0 } : undefined}
              className={cn(
                'absolute inset-0 rounded-lg',
                variant === 'destructive'
                  ? 'bg-red-500/10 dark:bg-red-500/20'
                  : 'bg-[#f5f5f5] dark:bg-[#404040]',
              )}
            />
          )}
        </AnimatePresence>

        <div
          className={cn(
            'relative z-10 w-full flex items-center gap-3',
            variant === 'destructive' && 'text-red-600 dark:text-red-400',
          )}
        >
          {React.Children.map(children, (child, index) => {
            if (
              React.isValidElement(child) &&
              (child.type === 'svg' ||
                (child.props &&
                  typeof child.props === 'object' &&
                  'className' in child.props &&
                  typeof child.props.className === 'string' &&
                  child.props.className.includes('lucide')))
            ) {
              return (
                <motion.div
                  key={index}
                  animate={
                    animate
                      ? {
                          scale: !isMobile && isHovered ? 1.1 : 1,
                          rotate: !isMobile && isHovered ? 5 : 0,
                        }
                      : undefined
                  }
                  transition={
                    animate ? { type: 'spring', stiffness: 500 } : undefined
                  }
                >
                  {child}
                </motion.div>
              );
            }

            if (typeof child === 'string') {
              return (
                <motion.span
                  key={index}
                  animate={
                    animate
                      ? {
                          y: !isMobile && isHovered ? -1 : 0,
                          x: !isMobile && isHovered ? 1 : 0,
                        }
                      : undefined
                  }
                  transition={
                    animate ? { type: 'spring', stiffness: 500 } : undefined
                  }
                  className='font-medium flex-1'
                >
                  {child}
                </motion.span>
              );
            }

            return child;
          })}
        </div>
      </motion.div>
    </DropdownMenuPrimitive.Item>
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> & {
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMobile();
  const { animate } = React.useContext(DropdownMenuContext);

  const handleSelect = (e: Event) => {
    e.preventDefault();
    setTimeout(() => {
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);
    }, 150);
    if (props.onSelect) props.onSelect(e);
  };

  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot='dropdown-menu-checkbox-item'
      className={cn(
        'relative flex cursor-pointer items-center gap-3 rounded-lg py-2 pr-3 pl-8 text-sm outline-hidden select-none overflow-hidden',
        'transition-all duration-200 ease-out',
        'focus:outline-hidden focus:bg-transparent',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        'text-neutral-900 dark:text-neutral-50',
        '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4',
        className,
      )}
      checked={checked}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onSelect={handleSelect}
      style={{ touchAction: 'manipulation' }}
      asChild
      {...props}
    >
      <motion.div className='relative w-full'>
        <AnimatePresence>
          {!isMobile && isHovered && (
            <motion.div
              layoutId={animate ? 'checkboxHoverBackground' : undefined}
              initial={animate ? { opacity: 0 } : undefined}
              animate={
                animate
                  ? {
                      opacity: 1,
                      scale: 1.05,
                      transition: {
                        type: 'spring',
                        stiffness: 260,
                        damping: 15,
                      },
                    }
                  : { opacity: 1 }
              }
              exit={animate ? { opacity: 0 } : undefined}
              className='absolute inset-0 rounded-lg bg-[#f5f5f5] dark:bg-[#404040]'
            />
          )}
        </AnimatePresence>

        <span className='pointer-events-none absolute left-2 flex size-4 items-center justify-center'>
          <DropdownMenuPrimitive.ItemIndicator>
            <motion.div
              initial={animate ? { scale: 0 } : undefined}
              animate={animate ? { scale: 1 } : undefined}
              transition={
                animate
                  ? { type: 'spring', stiffness: 400, damping: 25 }
                  : undefined
              }
            >
              <CheckIcon className='size-4' />
            </motion.div>
          </DropdownMenuPrimitive.ItemIndicator>
        </span>

        <motion.div
          animate={
            animate
              ? {
                  y: !isMobile && isHovered ? -1 : 0,
                  x: !isMobile && isHovered ? 1 : 0,
                }
              : undefined
          }
          transition={animate ? { type: 'spring', stiffness: 500 } : undefined}
          className='relative z-10'
        >
          {children}
        </motion.div>
      </motion.div>
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot='dropdown-menu-radio-group'
      {...props}
    />
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> & {
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMobile();
  const { animate } = React.useContext(DropdownMenuContext);

  const handleSelect = (e: Event) => {
    e.preventDefault();
    setTimeout(() => {
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);
    }, 150);
    if (props.onSelect) props.onSelect(e);
  };

  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot='dropdown-menu-radio-item'
      className={cn(
        'relative flex cursor-pointer items-center gap-3 rounded-lg py-2 pr-3 pl-8 text-sm outline-hidden select-none overflow-hidden',
        'transition-all duration-200 ease-out',
        'focus:outline-hidden focus:bg-transparent',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        'text-neutral-900 dark:text-neutral-50',
        '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-2.5',
        className,
      )}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onSelect={handleSelect}
      style={{ touchAction: 'manipulation' }}
      asChild
      {...props}
    >
      <motion.div className='relative w-full'>
        <AnimatePresence>
          {!isMobile && isHovered && (
            <motion.div
              layoutId={animate ? 'radioHoverBackground' : undefined}
              initial={animate ? { opacity: 0 } : undefined}
              animate={
                animate
                  ? {
                      opacity: 1,
                      scale: 1.05,
                      transition: {
                        type: 'spring',
                        stiffness: 260,
                        damping: 15,
                      },
                    }
                  : { opacity: 1 }
              }
              exit={animate ? { opacity: 0 } : undefined}
              className='absolute inset-0 rounded-lg bg-[#f5f5f5] dark:bg-[#404040]'
            />
          )}
        </AnimatePresence>

        <span className='pointer-events-none absolute left-2 flex size-4 items-center justify-center'>
          <DropdownMenuPrimitive.ItemIndicator>
            <motion.div
              initial={animate ? { scale: 0 } : undefined}
              animate={animate ? { scale: 1 } : undefined}
              transition={
                animate
                  ? { type: 'spring', stiffness: 400, damping: 25 }
                  : undefined
              }
            >
              <CircleIcon className='size-2 fill-current' />
            </motion.div>
          </DropdownMenuPrimitive.ItemIndicator>
        </span>

        <motion.div
          animate={
            animate
              ? {
                  y: !isMobile && isHovered ? -1 : 0,
                  x: !isMobile && isHovered ? 1 : 0,
                }
              : undefined
          }
          transition={animate ? { type: 'spring', stiffness: 500 } : undefined}
          className='relative z-10'
        >
          {children}
        </motion.div>
      </motion.div>
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
  className?: string;
}) {
  return (
    <div className='p-2 sticky top-0 z-20'>
      <DropdownMenuPrimitive.Label
        data-slot='dropdown-menu-label'
        data-inset={inset}
        className={cn(
          'px-3 py-2 text-sm font-bold text-neutral-900 dark:text-neutral-50',
          'data-inset:pl-8',
          className,
        )}
        {...props}
      />
    </div>
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator> & {
  className?: string;
}) {
  const { animate } = React.useContext(DropdownMenuContext);

  return (
    <motion.div
      initial={animate ? { scaleX: 0, opacity: 0 } : undefined}
      animate={
        animate
          ? {
              scaleX: 1,
              opacity: 1,
              transition: {
                delay: 0.1,
                type: 'spring',
                stiffness: 400,
                damping: 25,
              },
            }
          : undefined
      }
      className='flex justify-center py-1'
    >
      <DropdownMenuPrimitive.Separator
        data-slot='dropdown-menu-separator'
        className={cn(
          'my-1 h-px w-full bg-neutral-900/10 dark:bg-white/10',
          className,
        )}
        {...props}
      />
    </motion.div>
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot='dropdown-menu-shortcut'
      className={cn(
        'ml-auto text-xs tracking-widest text-neutral-500 dark:text-neutral-400',
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot='dropdown-menu-sub' {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMobile();
  const { animate } = React.useContext(DropdownMenuContext);

  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot='dropdown-menu-sub-trigger'
      data-inset={inset}
      className={cn(
        'relative flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm outline-hidden select-none overflow-hidden',
        'transition-all duration-200 ease-out',
        'focus:outline-hidden',
        'text-neutral-900 dark:text-neutral-50',
        'data-inset:pl-8',
        'data-[state=open]:bg-[#f5f5f5] dark:data-[state=open]:bg-[#404040]',
        !isMobile && isHovered && 'bg-[#f5f5f5] dark:bg-[#404040]',
        className,
      )}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      style={{ touchAction: 'manipulation' }}
      {...props}
    >
      <div className='w-full flex items-center gap-3'>
        <motion.div
          animate={
            animate
              ? {
                  y: !isMobile && isHovered ? -1 : 0,
                  x: !isMobile && isHovered ? 1 : 0,
                }
              : undefined
          }
          transition={animate ? { type: 'spring', stiffness: 500 } : undefined}
          className='flex-1'
        >
          {children}
        </motion.div>
        <motion.div
          animate={
            animate
              ? {
                  rotate: !isMobile && isHovered ? 90 : 0,
                  scale: !isMobile && isHovered ? 1.1 : 1,
                }
              : undefined
          }
          transition={animate ? { type: 'spring', stiffness: 500 } : undefined}
        >
          <ChevronRightIcon className='ml-auto size-4' />
        </motion.div>
      </div>
    </DropdownMenuPrimitive.SubTrigger>
  );
}

interface DropdownMenuSubContentProps extends React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubContent
> {
  className?: string;
  children?: React.ReactNode;
}

function DropdownMenuSubContent({
  className,
  children,
  ...props
}: DropdownMenuSubContentProps) {
  const { animate } = React.useContext(DropdownMenuContext);

  return (
    <DropdownMenuPrimitive.SubContent
      data-slot='dropdown-menu-sub-content'
      className='z-50'
      asChild
      {...props}
    >
      <motion.div
        variants={animate ? dropdownVariants : undefined}
        initial={animate ? 'hidden' : undefined}
        animate={animate ? 'visible' : undefined}
        exit={animate ? 'exit' : undefined}
        className={cn(
          'min-w-32 rounded-xl border shadow-xl overflow-hidden perspective-midrange transform-3d',
          'bg-[#ffffff] border-neutral-900/10',
          'dark:bg-[#262626] dark:border-neutral-50/10',
          className,
        )}
        style={{
          transformOrigin:
            'var(--radix-dropdown-menu-content-transform-origin)',
        }}
      >
        <div className='p-1 w-full relative z-20'>
          {React.Children.map(children, (child, index) =>
            animate ? (
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
            ) : (
              <div key={index}>{child}</div>
            ),
          )}
        </div>
      </motion.div>
    </DropdownMenuPrimitive.SubContent>
  );
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot='dropdown-menu-group' {...props} />
  );
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot='dropdown-menu-portal' {...props} />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
