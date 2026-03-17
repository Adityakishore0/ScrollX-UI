'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { OrbButton } from '@/components/ui/orb-button';

interface CTAWithFloatingGalleryProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  className?: string;
}

const galleryImages = [
  {
    url: 'https://scrollxui.dev/assets/blocks/hero-sections.png',
    alt: 'Hero Sections',
    delay: 0,
  },
  {
    url: 'https://scrollxui.dev/assets/blocks/footers.png',
    alt: 'Footers',
    delay: 0.1,
  },
  {
    url: 'https://scrollxui.dev/assets/blocks/bento.png',
    alt: 'Bento Grids',
    delay: 0.2,
  },
  {
    url: 'https://scrollxui.dev/assets/blocks/pricing-sections.png',
    alt: 'Pricing Sections',
    delay: 0.15,
  },
  {
    url: 'https://scrollxui.dev/assets/blocks/contact-sections.png',
    alt: 'Contact Sections',
    delay: 0.25,
  },
  {
    url: 'https://scrollxui.dev/assets/blocks/testimonials.png',
    alt: 'Logo Cloud',
    delay: 0.3,
  },
];

export default function CTAWithFloatingGallery({
  title = 'Launch Rapidly with Production-Ready UI Blocks',
  description = 'Ship polished landing pages in hours. Pick a block, customize it, and move from idea to release without rebuilding layout primitives.',
  buttonLabel = 'Get All Blocks',
  className,
}: CTAWithFloatingGalleryProps) {
  const words = title.split(' ');
  const leftImages = galleryImages.slice(0, 3);
  const rightImages = galleryImages.slice(3);

  return (
    <section
      className={cn(
        'mx-auto my-20 grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 md:my-28 md:grid-cols-2 md:gap-16 md:px-8',
        className,
      )}
    >
      <div className='max-w-xl'>
        <h2 className='text-3xl font-bold tracking-tight text-balance text-zinc-900 md:text-4xl dark:text-white'>
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              initial={{ opacity: 0, filter: 'blur(6px)', y: 12 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: 'easeInOut',
              }}
              className='mr-2 inline-block'
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='mt-6 max-w-lg text-base text-zinc-600 md:text-base dark:text-zinc-400'
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className='mt-8'
        >
          <OrbButton>
            <span className='flex items-center gap-2'>{buttonLabel}</span>
          </OrbButton>
        </motion.div>
      </div>

      <div className='relative overflow-hidden rounded-2xl bg-white/60 p-3 dark:bg-zinc-950/50'>
        <div className='pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-linear-to-b from-white to-transparent dark:from-zinc-950'></div>
        <div className='pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-linear-to-t from-white to-transparent dark:from-zinc-950'></div>

        <div className='grid grid-cols-2 gap-3 overflow-hidden'>
          <div className='flex flex-col gap-3'>
            {leftImages.map((image) => (
              <motion.div
                key={image.alt}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: image.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className='overflow-hidden rounded-xl shadow-sm ring-1 shadow-black/10 ring-black/5 dark:shadow-white/10 dark:ring-white/5'
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className='h-44 w-full object-cover'
                />
              </motion.div>
            ))}
          </div>

          <div className='mt-10 flex flex-col gap-3'>
            {rightImages.map((image) => (
              <motion.div
                key={image.alt}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: image.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className='overflow-hidden rounded-xl shadow-sm ring-1 shadow-black/10 ring-black/5 dark:shadow-white/10 dark:ring-white/5'
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className='h-44 w-full object-cover'
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
