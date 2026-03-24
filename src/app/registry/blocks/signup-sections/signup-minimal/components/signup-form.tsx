'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { motion } from 'motion/react';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className='flex flex-col gap-5'
      >
        <div className='flex flex-col gap-1'>
          <h1 className='text-3xl font-bold tracking-tight text-foreground'>
            Create your account
          </h1>
          <p className='text-sm text-muted-foreground'>
            Fill in the form below to get started
          </p>
        </div>

        <Button
          variant='outline'
          type='button'
          className='w-full h-11 font-medium'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            className='w-4 h-4 mr-2'
          >
            <path
              d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
              fill='currentColor'
            />
          </svg>
          Continue with Google
        </Button>

        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>or</span>
          </div>
        </div>

        <div className='grid gap-3'>
          <div className='space-y-1.5'>
            <Label htmlFor='name'>Full Name</Label>
            <Input id='name' type='text' placeholder='John Doe' required />
          </div>
          <div className='space-y-1.5'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='m@example.com'
              required
            />
          </div>
          <div className='space-y-1.5'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              placeholder='At least 8 characters'
              required
            />
          </div>
        </div>

        <Button type='submit' className='w-full h-11 font-semibold'>
          Create Account
        </Button>

        <p className='text-sm text-muted-foreground text-center'>
          Already have an account?{' '}
          <a
            href='#'
            className='font-semibold text-foreground underline underline-offset-4'
          >
            Sign in
          </a>
        </p>
      </motion.div>
    </form>
  );
}
