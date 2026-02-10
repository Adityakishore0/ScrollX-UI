'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import WaveBackground from '@/components/wavebackground';
import { useMemo } from 'react';
import ScrollXHeading from '@/components/heading';
import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
} from '@/components/ui/announcement';
import { ArrowUpRightIcon } from 'lucide-react';
import { LayeredButton } from '@/components/ui/layered-button';
import { useWavePerformance } from '@/utils/wave-performance';
import { useVisibility } from '@/utils/visibility';

export function HeroSection() {
  const waveSettings = useWavePerformance();
  const [sectionRef, isVisible] = useVisibility();

  const variants = useMemo(
    () => ({
      container: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1, delayChildren: 0.15 },
        },
      },
      item: {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { type: 'spring' as const, damping: 25, stiffness: 120 },
        },
      },
    }),
    [],
  );

  return (
    <div ref={sectionRef}>
      <WaveBackground
        variant='violet'
        position='both'
        speed={isVisible ? waveSettings.speed : 0}
        arcCount={isVisible ? waveSettings.arcCount : 0}
        centerGlowIntensity={isVisible ? waveSettings.centerGlowIntensity : 0}
        centerGlowRadius={waveSettings.centerGlowRadius}
        arcRadii={waveSettings.arcRadii}
        arcWaveAmps={waveSettings.arcWaveAmps}
        arcSpacing={waveSettings.arcSpacing}
        className='relative w-full py-8 md:py-12 overflow-hidden min-h-[90vh] flex flex-col items-center justify-center bg-linear-to-b from-white to-gray-50 dark:from-[#0c0c0c] dark:via-[#000000] dark:to-[#0c0c0c] select-none'
      >
        <div className='w-full flex flex-col items-center px-4 sm:px-6 md:px-8'>
          <Link href='/docs/changelog' className='relative z-10 mb-10'>
            <Announcement
              movingBorder
              className='group cursor-pointer border-transparent hover:border-border transition-colors'
            >
              <AnnouncementTag lustre className='text-[8px] sm:text-xs'>
                <span className='inline-flex items-center gap-2'>
                  <span className='size-2 rounded-full dot-announcement' />
                  v2.0 Released
                </span>
              </AnnouncementTag>
              <AnnouncementTitle className='flex items-center gap-2 text-[10px] sm:text-xs truncate'>
                📢 Tailwind v4 & React 19 and more..
                <ArrowUpRightIcon
                  size={14}
                  className='transition-transform group-hover:translate-x-1 group-hover:-translate-y-1'
                />
              </AnnouncementTitle>
            </Announcement>
          </Link>

          <motion.div
            className='relative z-10 w-full max-w-5xl text-center'
            variants={variants.container}
            initial='hidden'
            animate='visible'
          >
            <motion.div
              className='flex justify-center mb-4'
              variants={variants.item}
            >
              <ScrollXHeading />
            </motion.div>

            <motion.h1 variants={variants.item} className='leading-tight'>
              <span className='block text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100'>
                Motion-Rich Components
              </span>
              <span className='block text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-700 dark:text-neutral-300'>
                Built for Modern Developers
              </span>
            </motion.h1>

            <motion.p
              variants={variants.item}
              className='mt-6 text-base sm:text-lg text-black/70 dark:text-white/70 max-w-2xl mx-auto'
            >
              Expressive motion systems crafted to bring
              <br className='hidden sm:block' />
              your web interfaces fully to life
            </motion.p>

            <motion.div
              variants={variants.item}
              className='mt-10 flex justify-center'
            >
              <LayeredButton
                size='lg'
                className='rounded-full bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900'
              >
                <Link href='/docs/components'>Browse Components</Link>
              </LayeredButton>
            </motion.div>
          </motion.div>
        </div>
      </WaveBackground>
    </div>
  );
}
