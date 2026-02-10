'use client';

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '@/lib/utils';

type AvatarProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Root
> & {
  variant?: 'close-friends' | 'normal' | 'none';
};

const Avatar = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, variant = 'none', ...props }, ref) => {
  const ringClass =
    variant === 'close-friends'
      ? 'bg-linear-to-tr from-green-400 to-green-600'
      : variant === 'normal'
        ? 'bg-[conic-gradient(at_top_right,#f09433,#e6683c,#dc2743,#cc2366,#bc1888,#f09433)]'
        : '';

  return variant === 'none' ? (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full',
        className,
      )}
      {...props}
    />
  ) : (
    <div
      className={cn(
        'h-14 w-14 rounded-full p-0.5',
        ringClass,
        'flex items-center justify-center',
      )}
    >
      <div className='h-full w-full rounded-full bg-black flex items-center justify-center overflow-hidden'>
        <AvatarPrimitive.Root
          ref={ref}
          className={cn(
            'h-full w-full rounded-full overflow-hidden',
            className,
          )}
          {...props}
        />
      </div>
    </div>
  );
});
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('h-full w-full object-cover not-prose', className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium',
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
