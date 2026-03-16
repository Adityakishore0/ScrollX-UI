'use client';

import { motion, type Variants } from 'motion/react';
import { cn } from '@/lib/utils';
import { Twitter, Github, Linkedin } from 'lucide-react';

interface FooterColumn {
  heading: string;
  links: { text: string; url: string }[];
}

interface FooterBrandProps {
  brandName?: string;
  tagline?: string;
  columns?: FooterColumn[];
  socials?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
  copyright?: string;
  legalLinks?: { text: string; url: string }[];
  className?: string;
}

const defaultColumns: FooterColumn[] = [
  {
    heading: 'Product',
    links: [
      { text: 'Features', url: '#' },
      { text: 'Pricing', url: '#' },
      { text: 'Changelog', url: '#' },
      { text: 'Roadmap', url: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { text: 'About', url: '#' },
      { text: 'Blog', url: '#' },
      { text: 'Careers', url: '#' },
      { text: 'Press', url: '#' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { text: 'Documentation', url: '#' },
      { text: 'API Reference', url: '#' },
      { text: 'Status', url: '#' },
      { text: 'Community', url: '#' },
    ],
  },
];

const defaultLegalLinks = [
  { text: 'Terms', url: '#' },
  { text: 'Privacy', url: '#' },
  { text: 'Cookies', url: '#' },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function FooterWithFadedBrand({
  brandName = 'NeuralOS',
  tagline = 'Intelligence, Engineered.',
  columns = defaultColumns,
  socials = { twitter: '#', github: '#', linkedin: '#' },
  copyright = '© 2026 NeuralOS, Inc. All rights reserved.',
  legalLinks = defaultLegalLinks,
  className,
}: FooterBrandProps) {
  return (
    <footer
      className={cn(
        'w-full relative overflow-hidden bg-white dark:bg-neutral-950 select-none',
        className,
      )}
    >
      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        className='relative z-10 px-8 pt-16 pb-10 md:px-16 md:pt-16'
      >
        <motion.p
          variants={itemVariants}
          className='text-xs font-semibold tracking-[0.2em] uppercase mb-10 text-zinc-400 dark:text-zinc-500'
        >
          {tagline}
        </motion.p>

        <div className='flex flex-col gap-10 md:flex-row md:justify-between md:items-start'>
          <div className='grid grid-cols-2 gap-x-12 gap-y-8 md:grid-cols-3 md:gap-x-20'>
            {columns.map((col, ci) => (
              <motion.div key={ci} variants={itemVariants}>
                <p className='text-[11px] font-semibold tracking-widest uppercase mb-4 text-zinc-400 dark:text-zinc-500'>
                  {col.heading}
                </p>
                <ul className='flex flex-col gap-3'>
                  {col.links.map((link, li) => (
                    <li key={li}>
                      <a
                        href={link.url}
                        className='text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors duration-200'
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className='md:text-right'>
            <p className='text-[11px] font-semibold tracking-widest uppercase mb-4 text-zinc-400 dark:text-zinc-500'>
              Social
            </p>
            <div className='flex items-center gap-3 md:justify-end'>
              {socials.twitter && (
                <a
                  href={socials.twitter}
                  aria-label='Twitter / X'
                  className='flex items-center justify-center w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-300 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white transition-all duration-200'
                >
                  <Twitter className='w-3.75 h-3.75' />
                </a>
              )}
              {socials.github && (
                <a
                  href={socials.github}
                  aria-label='GitHub'
                  className='flex items-center justify-center w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-300 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white transition-all duration-200'
                >
                  <Github className='w-3.75 h-3.75' />
                </a>
              )}
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  aria-label='LinkedIn'
                  className='flex items-center justify-center w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-300 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white transition-all duration-200'
                >
                  <Linkedin className='w-3.75 h-3.75' />
                </a>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className='mt-12 border-t border-zinc-300 dark:border-zinc-800'
        />

        <motion.div
          variants={itemVariants}
          className='mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between'
        >
          <p className='text-xs text-zinc-400 dark:text-zinc-500'>
            {copyright}
          </p>
          <div className='flex items-center gap-5'>
            {legalLinks.map((l, i) => (
              <a
                key={i}
                href={l.url}
                className='text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors'
              >
                {l.text}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className='inset-x-0 mt-20 bg-linear-to-b from-neutral-50 to-neutral-200 bg-clip-text text-center font-bold text-transparent dark:from-neutral-950 dark:to-neutral-800'
        style={{
          fontSize: 'clamp(3rem, 15vw, 13rem)',
        }}
      >
        {brandName}
      </motion.p>
    </footer>
  );
}

export { FooterWithFadedBrand };
