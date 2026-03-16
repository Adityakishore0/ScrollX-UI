'use client';

import { motion, type Variants } from 'motion/react';
import { cn } from '@/lib/utils';

interface FooterColumn {
  heading: string;
  links: { text: string; url: string }[];
}

interface FooterWithMinimalOutlineProps {
  brandName?: string;
  columns?: FooterColumn[];
  copyright?: string;
  className?: string;
}

const defaultColumns: FooterColumn[] = [
  {
    heading: 'Product',
    links: [
      { text: 'AI Assistant', url: '#' },
      { text: 'Automation', url: '#' },
      { text: 'Analytics', url: '#' },
      { text: 'Integrations', url: '#' },
      { text: 'API', url: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { text: 'About Us', url: '#' },
      { text: 'Careers', url: '#' },
      { text: 'Blog', url: '#' },
      { text: 'Press Kit', url: '#' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { text: 'Documentation', url: '#' },
      { text: 'Help Center', url: '#' },
      { text: 'Community', url: '#' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { text: 'Privacy', url: '#' },
      { text: 'Terms', url: '#' },
      { text: 'Security', url: '#' },
    ],
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function FooterWithMinimalOutline({
  brandName = 'Syntara',
  columns = defaultColumns,
  copyright = '© 2026 Syntara AI',
  className,
}: FooterWithMinimalOutlineProps) {
  return (
    <footer
      className={cn(
        'relative w-full overflow-hidden bg-white px-8 py-20 dark:bg-neutral-950',
        className,
      )}
    >
      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        className='mx-auto flex max-w-7xl flex-col items-start justify-between text-sm text-neutral-500 sm:flex-row md:px-8'
      >
        <motion.div variants={itemVariants}>
          <div className='mr-0 mb-4 md:mr-4 md:flex'>
            <a
              className='relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black'
              href='#'
            >
              <span className='font-medium text-black dark:text-white'>
                {brandName}
              </span>
            </a>
          </div>
          <div className='mt-2 ml-2'>{copyright}</div>
          <div className='mt-2 ml-2 text-sm text-neutral-500'>
            All right reserved.
          </div>
        </motion.div>

        <div className='mt-10 grid grid-cols-2 items-start gap-10 sm:grid-cols-4 sm:mt-0'>
          {columns.map((col, ci) => (
            <motion.div
              key={ci}
              variants={itemVariants}
              className='flex w-full flex-col justify-center space-y-4'
            >
              <p className='font-bold text-neutral-600 transition-colors dark:text-neutral-300'>
                {col.heading}
              </p>
              <ul className='list-none space-y-4 text-neutral-600 transition-colors dark:text-neutral-300'>
                {col.links.map((link, li) => (
                  <li key={li} className='list-none'>
                    <a
                      className='transition-colors hover:text-neutral-800'
                      href={link.url}
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className='inset-x-0 mt-20 text-center font-bold text-transparent dark:[--stroke:#d4d4d4] [--stroke:#525252]'
        style={{
          fontSize: 'clamp(3rem, 15vw, 13rem)',
          WebkitTextStroke: '1.5px var(--stroke, #525252)',
        }}
      >
        {brandName}
      </motion.p>
    </footer>
  );
}

export { FooterWithMinimalOutline };
