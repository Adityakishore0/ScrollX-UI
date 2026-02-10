'use client';
import * as React from 'react';
import { motion } from 'motion/react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center gap-2 font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden [&_svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary/90',
        destructive: 'bg-red-600 text-white hover:bg-red-500',
        outline:
          'border-2 border-gray-500 bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800',
        secondary: 'bg-gray-500 text-white hover:bg-gray-400',
        success: 'bg-green-600 text-white hover:bg-green-500',
        warning: 'bg-yellow-400 text-black hover:bg-yellow-300',
        info: 'bg-blue-600 text-white hover:bg-blue-500',
        gradient: 'bg-linear-to-r from-purple-600 to-pink-500 text-white',
        link: 'text-primary underline-offset-4 hover:underline bg-transparent shadow-none',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:gap-2',
        sm: 'h-8 rounded-md px-3 text-xs has-[>svg]:gap-1.5',
        lg: 'h-10 rounded-md px-8 has-[>svg]:gap-2.5',
        xl: 'h-24 px-20 text-2xl has-[>svg]:gap-3',
        icon: 'h-9 w-9',
        'icon-sm': 'h-12 w-12',
        'icon-lg': 'h-20 w-20',
      },
      radius: {
        default: 'rounded-full',
        sm: 'rounded-lg',
        lg: 'rounded-4xl',
        none: 'rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      radius: 'default',
    },
  },
);

interface VariantColorsType {
  fromBg: string;
  toBg: string;
  stroke?: string;
}

const variantColors: Record<
  NonNullable<VariantProps<typeof buttonVariants>['variant']>,
  VariantColorsType
> = {
  default: { fromBg: '#4a6b3f', toBg: '#d5e798', stroke: '#d5e798' },
  destructive: { fromBg: '#dc2626', toBg: '#fca5a5', stroke: '#fca5a5' },
  outline: {
    fromBg: 'transparent',
    toBg: 'transparent',
    stroke: 'currentColor',
  },
  secondary: { fromBg: '#64748b', toBg: '#cbd5e1', stroke: '#cbd5e1' },
  success: { fromBg: '#16a34a', toBg: '#86efac', stroke: '#86efac' },
  warning: { fromBg: '#eab308', toBg: '#fde047', stroke: '#fde047' },
  info: { fromBg: '#3b82f6', toBg: '#93c5fd', stroke: '#93c5fd' },
  gradient: { fromBg: '#8b5cf6', toBg: '#ec4899', stroke: '#ec4899' },
  link: { fromBg: 'transparent', toBg: 'transparent', stroke: 'currentColor' },
};

interface WavyTextProps {
  text: string;
  isHovered: boolean;
  className?: string;
  duration: number;
  delay: number;
}

const WavyText: React.FC<WavyTextProps> = ({
  text,
  isHovered,
  className = '',
  duration,
  delay,
}) => {
  const chars = text.split('');
  return (
    <span className='relative z-20 inline-flex'>
      {chars.map((char, index) => (
        <motion.span
          key={index}
          className={className}
          animate={isHovered ? { y: [0, -8, 0] } : { y: 0 }}
          transition={{
            duration,
            delay: index * delay,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

interface WavyButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  animationDuration?: number;
  strokeWidth?: number;
  splitDelay?: number;
  asChild?: boolean;
  disableTextAnimation?: boolean;
}

const WavyButton = React.forwardRef<HTMLButtonElement, WavyButtonProps>(
  (
    {
      className,
      variant = 'default',
      size,
      radius,
      children,
      animationDuration = 0.8,
      strokeWidth = 30,
      splitDelay = 0.04,
      asChild = false,
      disableTextAnimation = false,
      ...props
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const colors = variantColors[variant ?? 'default'];
    const Component: React.ElementType = asChild ? Slot : motion.button;

    const handleTouchStart = () => {
      setIsHovered(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setIsHovered(false);
      }, 2000);
    };

    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    return (
      <Component
        ref={ref}
        className={cn(buttonVariants({ variant, size, radius, className }))}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        animate={
          !asChild
            ? { backgroundColor: isHovered ? colors.toBg : colors.fromBg }
            : undefined
        }
        transition={
          !asChild
            ? { duration: animationDuration, ease: [0.4, 0, 0.2, 1] }
            : undefined
        }
        {...props}
      >
        <svg
          viewBox='0 0 260 64'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='absolute inset-0 w-full h-full z-10 pointer-events-none'
          preserveAspectRatio='none'
        >
          <defs>
            <clipPath id='clip-wave'>
              <rect width='260' height='64' fill='white' />
            </clipPath>
          </defs>
          <g clipPath='url(#clip-wave)'>
            <motion.path
              d='M-11.7907 25.5948C-1.99079 7.39406 53.3086 -7.30655 91.8081 -10.8067C130.308 -14.3068 164.607 -12.2068 129.608 1.79383C94.6081 15.7944 37.9088 5.29517 -4.79076 43.0967C-47.4903 80.8983 1.50917 68.9978 11.3091 61.2975C21.1089 53.5972 55.4086 37.4965 79.2083 36.0965C103.008 34.6964 153.407 32.5939 174.407 1.79383C195.407 -29.0063 219.207 -29.0063 196.807 13.6955C174.407 56.3973 105.808 57.7985 84.8083 61.2975C63.8085 64.7965 44.9087 67.5966 32.3089 78.0971C19.709 88.5975 127.508 83.6962 157.607 72.4968C187.707 61.2975 218.507 24.8948 227.607 -1.00624C236.707 -26.9073 261.906 -7.3065 252.806 7.39411C243.706 22.0947 217.807 55.6961 207.307 66.8966C196.807 78.0971 219.207 96.9978 236.007 72.4968C252.806 47.9958 280.106 15.7945 285.706 7.39411'
              stroke={colors.stroke}
              strokeWidth={strokeWidth}
              pathLength={1}
              initial={{ pathLength: 0 }}
              animate={isHovered ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{
                duration: animationDuration,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
          </g>
        </svg>

        <div
          className={cn(
            'relative z-20 inline-flex items-center',
            isHovered
              ? 'text-white dark:text-black'
              : 'text-black dark:text-white',
          )}
        >
          {typeof children === 'string' && !disableTextAnimation ? (
            <WavyText
              text={children}
              isHovered={isHovered}
              duration={animationDuration}
              delay={splitDelay}
            />
          ) : (
            children
          )}
        </div>
      </Component>
    );
  },
);

WavyButton.displayName = 'WavyButton';

export default WavyButton;
