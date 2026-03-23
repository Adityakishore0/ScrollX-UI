'use client';

import { motion } from 'motion/react';

function GlitchText({ text }: { text: string }) {
  return (
    <span className='relative inline-block'>
      <span className='relative z-10'>{text}</span>
      <motion.span
        aria-hidden
        className='absolute inset-0 text-cyan-500/60 dark:text-cyan-400/50'
        animate={{ x: [0, 3, -3, 0], opacity: [1, 0.8, 0.8, 1] }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
          repeatDelay: 4,
          delay: 0.05,
        }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export default function NotFoundwithGlitchyText() {
  return (
    <div className='min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center overflow-hidden transition-colors duration-500'>
      <div className='flex flex-col items-center text-center px-6 max-w-2xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className='relative select-none mb-6'
        >
          <span
            className='block text-[clamp(7rem,22vw,14rem)] font-black leading-none tracking-tighter text-transparent'
            style={{
              WebkitTextStroke: '2px',
              WebkitTextStrokeColor:
                'color-mix(in srgb, currentColor 18%, transparent)',
              fontFamily: '"Courier New", monospace',
            }}
          >
            <GlitchText text='404' />
          </span>

          <motion.div
            className='absolute inset-0 flex items-center justify-center'
            animate={{ opacity: [0.05, 0.12, 0.05] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span
              className='block text-[clamp(7rem,22vw,14rem)] font-black leading-none tracking-tighter text-zinc-900 dark:text-white blur-2xl'
              style={{ fontFamily: '"Courier New", monospace' }}
            >
              404
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25, ease: 'easeOut' }}
          className='mb-2 flex items-center gap-2'
        >
          <span className='h-px w-8 bg-zinc-400 dark:bg-zinc-600' />
          <span className='font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400'>
            Error / Page not found
          </span>
          <span className='h-px w-8 bg-zinc-400 dark:bg-zinc-600' />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
          className='text-2xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4'
          style={{ fontFamily: '"Courier New", monospace' }}
        >
          This page doesn&apos;t exist.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.45, ease: 'easeOut' }}
          className='text-sm md:text-base text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed mb-10 font-mono'
        >
          The page you&apos;re looking for has been removed, renamed, or never
          existed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          className='flex flex-col sm:flex-row gap-3'
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className='inline-flex items-center gap-2 rounded-none border border-zinc-900 bg-zinc-900 px-6 py-2.5 text-sm font-mono font-semibold text-zinc-50 transition-colors hover:bg-zinc-800 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              aria-hidden='true'
            >
              <path d='M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8' />
              <path d='M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
            </svg>
            Go Home
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className='inline-flex items-center gap-2 rounded-none border border-zinc-300 bg-transparent px-6 py-2.5 text-sm font-mono font-semibold text-zinc-700 transition-colors hover:border-zinc-500 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-400 dark:hover:text-zinc-100'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              aria-hidden='true'
            >
              <path d='M19 12H5' />
              <path d='m12 5-7 7 7 7' />
            </svg>
            Go Back
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.75 }}
          className='mt-12 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600'
        >
          HTTP 404 &mdash; Not Found
        </motion.p>
      </div>
    </div>
  );
}
