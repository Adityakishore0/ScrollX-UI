import { SignupForm } from '@/app/registry/blocks/signup-sections/signup-minimal/components/signup-form';
import { MotionGrid } from '@/components/ui/motion-grid';

export default function SignupPage() {
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex justify-center gap-2 md:justify-start'>
          <a href='#' className='flex items-center gap-2 font-medium'>
            <div className='flex size-4 items-center justify-center rounded-md'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='shrink-0 w-6 h-6 sm:w-6 sm:h-6 md:w-7 md:h-7 text-black dark:text-white'
                viewBox='0 0 24 24'
              >
                <path
                  fill='currentColor'
                  d='M5.999 17a3 3 0 0 1-1.873-.658a2.98 2.98 0 0 1-1.107-2.011a2.98 2.98 0 0 1 .639-2.206l4-5c.978-1.225 2.883-1.471 4.143-.523l1.674 1.254l2.184-2.729a3 3 0 1 1 4.682 3.747l-4 5c-.977 1.226-2.882 1.471-4.143.526l-1.674-1.256l-2.184 2.729A2.98 2.98 0 0 1 5.999 17M10 8a1 1 0 0 0-.781.374l-4 5.001a1 1 0 0 0-.213.734c.03.266.161.504.369.67a.996.996 0 0 0 1.406-.155l3.395-4.244L13.4 12.8c.42.316 1.056.231 1.381-.176l4-5.001a1 1 0 0 0 .213-.734a1 1 0 0 0-.369-.67a.996.996 0 0 0-1.406.156l-3.395 4.242L10.6 8.2A1 1 0 0 0 10 8m9 13H5a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2'
                />
              </svg>
            </div>
            ScrollX Inc.
          </a>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>
            <SignupForm />
          </div>
        </div>
      </div>
      <div className='relative hidden bg-muted lg:block'>
        <MotionGrid
          speed='3s'
          opacity={0.15}
          enableGlow={true}
          lineColor='20, 184, 166'
          className='relative h-full w-full flex flex-col items-center justify-center'
        >
          <div className='relative flex min-h-80 flex-col items-start justify-end overflow-hidden rounded-2xl bg-white p-4 md:p-8 dark:bg-black'>
            <div className='relative z-40 mb-2 flex items-center gap-2'>
              <p className='rounded-md bg-black/10 px-2 py-1 text-xs text-black dark:bg-black/50 dark:text-white'>
                Product Company
              </p>
              <p className='rounded-md bg-black/10 px-2 py-1 text-xs text-black dark:bg-black/50 dark:text-white'>
                Cloud Management
              </p>
            </div>

            <div className='relative z-40 max-w-sm rounded-xl bg-black/5 p-4 backdrop-blur-sm dark:bg-black/50'>
              <h2 className='text-black dark:text-white'>
                ScrollX UI has completely changed how we work. What used to take
                hours every week is now fully automated.
              </h2>

              <p className='mt-4 text-sm text-black/60 dark:text-white/50'>
                Rachel small
              </p>

              <p className='mt-1 text-sm text-black/60 dark:text-white/50'>
                Head of Product,
                <span className='font-bold text-black dark:text-white'>
                  {' '}
                  ScrollX UI
                </span>
              </p>
            </div>

            <div className='mask-r-from-50% absolute -top-48 -right-40 z-20 grid rotate-45 transform grid-cols-4 gap-32'>
              <div className='size-40 shrink-0 rounded-3xl bg-neutral-200 dark:bg-neutral-900 shadow-[0px_2px_0px_0px_var(--color-neutral-300)_inset] dark:shadow-[0px_2px_0px_0px_var(--color-neutral-600)_inset]' />
              <div className='size-40 shrink-0 rounded-3xl bg-neutral-200 dark:bg-neutral-900 shadow-[0px_2px_0px_0px_var(--color-neutral-300)_inset] dark:shadow-[0px_2px_0px_0px_var(--color-neutral-600)_inset]' />
              <div className='size-40 shrink-0 rounded-3xl bg-neutral-200 dark:bg-neutral-900 shadow-[0px_2px_0px_0px_var(--color-neutral-300)_inset] dark:shadow-[0px_2px_0px_0px_var(--color-neutral-600)_inset]' />
              <div className='size-40 shrink-0 rounded-3xl bg-neutral-200 dark:bg-neutral-900 shadow-[0px_2px_0px_0px_var(--color-neutral-300)_inset] dark:shadow-[0px_2px_0px_0px_var(--color-neutral-600)_inset]' />
            </div>

            <div className='mask-r-from-50% absolute top-0 -right-10 z-20 grid rotate-45 transform grid-cols-4 gap-32 opacity-50'>
              <div className='size-40 shrink-0 rounded-3xl bg-neutral-200 dark:bg-neutral-900 shadow-[0px_2px_0px_0px_var(--color-neutral-300)_inset] dark:shadow-[0px_2px_0px_0px_var(--color-neutral-600)_inset]' />
              <div className='size-40 shrink-0 rounded-3xl bg-neutral-200 dark:bg-neutral-900 shadow-[0px_2px_0px_0px_var(--color-neutral-300)_inset] dark:shadow-[0px_2px_0px_0px_var(--color-neutral-600)_inset]' />
              <div className='size-40 shrink-0 rounded-3xl bg-neutral-200 dark:bg-neutral-900 shadow-[0px_2px_0px_0px_var(--color-neutral-300)_inset] dark:shadow-[0px_2px_0px_0px_var(--color-neutral-600)_inset]' />
              <div className='size-40 shrink-0 rounded-3xl bg-neutral-200 dark:bg-neutral-900 shadow-[0px_2px_0px_0px_var(--color-neutral-300)_inset] dark:shadow-[0px_2px_0px_0px_var(--color-neutral-600)_inset]' />
            </div>

            <canvas
              className='mask-t-from-50% absolute inset-0 z-30 h-full w-200 blur-3xl'
              width='1000'
              height='956'
            />
          </div>
        </MotionGrid>
      </div>
    </div>
  );
}
