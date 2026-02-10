'use client';

import { SocialOrbit } from '@/components/ui/social-orbit';

export default function SocialOrbitDemo() {
  return (
    <div className='w-75 h-75 rounded-2xl bg-white dark:bg-neutral-950 relative shadow-2xl overflow-hidden'>
      <div className='absolute top-0 right-0 w-60 h-60 rounded-full bg-neutral-100/20 dark:bg-neutral-800/20 blur-3xl'></div>

      <div className='relative z-10 flex flex-col h-full justify-between p-5'>
        <div>
          <h2 className='text-3xl font-extrabold text-neutral-900 dark:text-white leading-snug'>
            Social Orbit
          </h2>
          <p className='mt-3 text-neutral-600 dark:text-neutral-400 text-sm max-w-xs'>
            orbits your socials in smooth motion — where icons spin, ripple, and
            glow with purpose
          </p>
        </div>
      </div>

      <div className='absolute bottom-0 right-0 w-50 h-50'>
        <div className='absolute bottom-0 right-0 translate-x-5 translate-y-5'>
          <div className='relative origin-bottom-right scale-100 translate-x-[20%] translate-y-[43%]'>
            <SocialOrbit
              rippleCount={3}
              text='SCROLLX*UI*COMPONENTS*'
              rippleDuration={2}
              textOrbitIndex={1}
              textDuration={20}
              orbitDuration={30}
              iconDelay={200}
              iconDuration={800}
            >
              <div className='flex items-center justify-center w-16 h-16 rounded-full'>
                <svg
                  data-testid='geist-icon'
                  height='32'
                  strokeLinejoin='round'
                  viewBox='0 0 16 16'
                  width='32'
                >
                  <path
                    d='M8 0C8.26264 0 8.5144 0.104413 8.7002 0.290039L10.4639 2.05273H12.9551C13.0853 2.05258 13.2146 2.07819 13.335 2.12793C13.4554 2.17773 13.5651 2.25063 13.6572 2.34277C13.7494 2.43492 13.8223 2.54461 13.8721 2.66504C13.9218 2.7854 13.9474 2.91468 13.9473 3.04492V5.53711L15.71 7.2998C15.8956 7.4856 16 7.73736 16 8C16 8.26264 15.8956 8.5144 15.71 8.7002L13.9473 10.4639V12.9551C13.9474 13.0853 13.9218 13.2146 13.8721 13.335C13.8223 13.4554 13.7494 13.5651 13.6572 13.6572C13.5651 13.7494 13.4554 13.8223 13.335 13.8721C13.2146 13.9218 13.0853 13.9474 12.9551 13.9473H10.4639L8.7002 15.71C8.5144 15.8956 8.26264 16 8 16C7.73736 16 7.4856 15.8956 7.2998 15.71L5.53613 13.9473H3.04492C2.49748 13.9473 2.05273 13.5037 2.05273 12.9551V10.4639L0.290039 8.7002C0.104413 8.5144 0 8.26264 0 8C0 7.73736 0.104413 7.4856 0.290039 7.2998L2.05273 5.53613V3.04492C2.05258 2.91468 2.07819 2.7854 2.12793 2.66504C2.17773 2.54461 2.25063 2.43492 2.34277 2.34277C2.43492 2.25063 2.54461 2.17773 2.66504 2.12793C2.7854 2.07819 2.91468 2.05258 3.04492 2.05273H5.53711L7.2998 0.290039C7.4856 0.104413 7.73736 0 8 0ZM6.9375 8.5332L5.875 7.4707L4.81445 8.53125L6.40723 10.124C6.70012 10.4169 7.17488 10.4169 7.46777 10.124L11.1855 6.40625L10.125 5.3457L6.9375 8.5332Z'
                    fill='currentColor'
                  ></path>
                </svg>
              </div>
            </SocialOrbit>
          </div>
        </div>
      </div>
    </div>
  );
}
