'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface Logo {
  name: string;
  image: string;
}

interface LogoCloudWithMinimalAnimationProps {
  title?: string;
  description?: string;
  logos?: Logo[];
  className?: string;
}

const defaultLogos: Logo[] = [
  { image: 'https://scrollxui.dev/assets/logos/phoenix.svg', name: 'Phoenix' },
  { image: 'https://scrollxui.dev/assets/logos/oslo.svg', name: 'Oslo' },
  { image: 'https://scrollxui.dev/assets/logos/theo.svg', name: 'Theo' },
  { image: 'https://scrollxui.dev/assets/logos/kansas.svg', name: 'Kansas' },
  { image: 'https://scrollxui.dev/assets/logos/cairo.svg', name: 'Cairo' },
];

export default function LogoCloudWithMinimalAnimation({
  title = 'Trusted by the best companies',
  description = 'Companies that have been using our product from the very start.',
  logos = defaultLogos,
  className,
}: LogoCloudWithMinimalAnimationProps) {
  const words = title.split(' ');

  return (
    <section className={cn('relative w-full overflow-hidden py-20', className)}>
      <div className='pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.05]' />

      <div className='relative mx-auto max-w-5xl px-6'>
        <div className='text-center mb-12'>
          <h2 className='relative z-10 mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-zinc-100 md:text-5xl lg:text-6xl'>
            {words.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: 'easeInOut',
                }}
                className='mr-[0.25em] inline-block'
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className='mt-4 text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto'
          >
            {description}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className='mt-10'
        >
          <div className='flex flex-wrap items-center justify-center gap-8 md:gap-12'>
            {logos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, filter: 'blur(6px)', scale: 0.96 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.65 + index * 0.08,
                  ease: 'easeOut',
                }}
                className='flex items-center justify-center h-16 w-24 md:h-20 md:w-32'
              >
                <img
                  src={logo.image}
                  alt={logo.name}
                  className='h-8 w-auto object-contain md:h-10 transition-transform duration-200 hover:scale-110'
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
