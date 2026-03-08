'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FeatureItem {
  title: string;
  alt?: string;
  content: string | React.ReactNode;
}

function FeatureMedia({
  content,
  alt,
}: {
  content: string | React.ReactNode;
  alt?: string;
}) {
  if (typeof content !== 'string') {
    return <div className='w-full h-full'>{content}</div>;
  }

  const isVideo = /\.(mp4|webm|ogg)$/i.test(content);
  const isImage =
    /\.(jpg|jpeg|png|webp|gif|avif|svg)$/i.test(content) ||
    /unsplash|images\./i.test(content);

  if (isVideo) {
    return (
      <video
        src={content}
        autoPlay
        muted
        loop
        playsInline
        className='w-full h-full object-cover'
      />
    );
  }

  if (isImage) {
    return (
      <img src={content} alt={alt} className='w-full h-full object-cover' />
    );
  }

  return (
    <div className='flex items-center justify-center w-full h-full p-8'>
      <p className='text-sm text-muted-foreground leading-relaxed'>{content}</p>
    </div>
  );
}

const items: FeatureItem[] = [
  {
    title: 'Copy & paste components, instantly.',
    alt: 'Drop in fully-styled, accessible components with a single CLI command.',
    content: 'https://scrollxui.dev/assets/copypasteinstantly.webm',
  },
  {
    title: 'Install components & blocks via CLI.',
    alt: 'Run a single command to add any component directly into your codebase — no package to manage.',
    content: 'https://scrollxui.dev/assets/installviacli.webm',
  },
  {
    title: 'Tailwind-first styling you actually own.',
    alt: 'No black-box CSS. The source lives in your project — tweak anything, anytime.',
    content: 'https://scrollxui.dev/images/tailwind.png',
  },
  {
    title: 'Dark mode out of the box.',
    alt: 'Theme switching with CSS variables. Light, dark, or fully custom — zero extra work.',
    content: 'https://scrollxui.dev/assets/darkmode.webm',
  },
  {
    title: 'Responsive by default, every time.',
    alt: 'Every component adapts seamlessly across mobile, tablet, and desktop — no extra work needed.',
    content: 'https://scrollxui.dev/assets/responsive.webm',
  },
];

export default function FeaturesWithPanel() {
  const [active, setActive] = React.useState(0);

  return (
    <section className='relative w-full py-24'>
      <div className='mx-auto max-w-6xl px-6'>
        <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-16 lg:items-start'>
          <div>
            <h2 className='text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl mb-10'>
              Features.
            </h2>

            <ul className='flex flex-col gap-1'>
              {items.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.07,
                    ease: 'easeOut',
                  }}
                  onClick={() => setActive(index)}
                  className={cn(
                    'flex flex-col px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-200 lg:flex-row lg:items-center lg:gap-4',
                    active === index
                      ? 'ring-1 ring-foreground'
                      : 'ring-1 ring-transparent',
                  )}
                >
                  <div className='flex flex-row items-center gap-4 w-full lg:contents'>
                    <span
                      className={cn(
                        'size-7 rounded-full flex items-center justify-center text-xs font-medium shrink-0 transition-colors duration-200',
                        active === index
                          ? 'bg-foreground text-background'
                          : 'bg-muted text-muted-foreground',
                      )}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={cn(
                        'text-sm font-medium transition-colors duration-200',
                        active === index
                          ? 'text-foreground'
                          : 'text-muted-foreground',
                      )}
                    >
                      {item.title}
                    </span>
                  </div>

                  <AnimatePresence initial={false}>
                    {active === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        className='w-full overflow-hidden lg:hidden'
                      >
                        <Card className='w-full mt-3 overflow-hidden p-0 gap-0 aspect-4/3 relative'>
                          <div className='absolute inset-0'>
                            <FeatureMedia
                              content={item.content}
                              alt={item.alt}
                            />
                          </div>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className='hidden lg:block sticky top-10'>
            <Card className='relative w-full aspect-4/3 overflow-hidden p-0 gap-0'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className='absolute inset-0'
                >
                  <FeatureMedia
                    content={items[active].content}
                    alt={items[active].alt}
                  />
                </motion.div>
              </AnimatePresence>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
