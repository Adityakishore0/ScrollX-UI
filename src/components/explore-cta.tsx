import { MorphyButton } from '@/components/ui/morphy-button';
import Link from 'next/link';

const ExploreCta = () => {
  return (
    <section className='relative z-22 w-full py-20 bg-linear-to-b from-white to-gray-50 dark:from-[#0b0b0b] dark:via-[#090909] dark:to-[#0b0b0b]'>
      <div className='mx-auto max-w-300 px-5 lg:px-8'>
        <div
          className='relative mx-auto flex w-full max-w-300 flex-col items-center gap-6 rounded-[50px] px-12 py-16 text-center shadow-[0_12px_32px_rgba(0,0,0,0.18)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.06)] overflow-hidden select-none transition-all duration-300'
          style={{
            background:
              'linear-gradient(135deg, #8B7AFF, #A593FF, #6B5AEF, #7B6AFF, #5B4ADF, #9B8AFF)',
          }}
        >
          <div
            className='pointer-events-none absolute inset-0 z-1 rounded-[50px]'
            style={{
              backgroundImage: "url('/images/grain.webp')",
              backgroundSize: '400px 400px',
              backgroundRepeat: 'repeat',
              filter: 'brightness(4) contrast(1.2)',
              mixBlendMode: 'lighten',
              opacity: 1,
            }}
          />

          <span className='relative z-2 block text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight dark:text-white text-black'>
            Start Exploring
          </span>
          <span className='relative z-2 block max-w-150 text-base sm:text-lg font-medium leading-tight dark:text-white/80 text-black/80'>
            Components, Motion, and UI Primitives — All in One Place
          </span>
          <Link
            href='/docs/components'
            className='relative z-2 text-base font-medium tracking-tight transition-all'
          >
            <MorphyButton animate='reverse'>Browse Components</MorphyButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExploreCta;
