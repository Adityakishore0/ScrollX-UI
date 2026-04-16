'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ColumnLines } from '@/components/ui/columnlines';

interface DownloadWithColumnLinesProps {
  badge?: string;
  headline?: string;
  subheadline?: string;
  linuxHref?: string;
  windowsHref?: string;
}

const LinuxIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 512 512'
    className={className}
  >
    <path
      fill='currentColor'
      d='M186.575 162.152c18.146 15.312 47.429 31.274 72.844 41.233c-21.862-15.866-43.618-33.749-65.334-57.155c18.076-38.546 39.66-91.786 61.912-146.132c36.28 92.698 103.9 232.202 194.486 397.718c-24.61-13.513-46.908-21.207-69.93-27.152c7.63 4.355 25.665 14.197 37.237 22.108c18.28 12.497 35.198 26.163 51.107 39.249c14.2 26.11 28.574 52.76 43.103 79.88c-72.256-41.837-142.473-75.727-200-86.195c18.833-104.471-54.88-166.107-96.76-99.61c-16.126 25.603-20.487 67.787-12.84 99.133C129.667 439.235 58.503 478.44 0 511.902c68.143-123.477 137.038-248.649 186.575-349.75'
    />
  </svg>
);

const WindowsIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    className={className}
  >
    <path
      fill='currentColor'
      d='M3 5.557L10.373 4.6v7.05H3V5.557zm0 12.886L10.373 19.4v-6.896H3v5.94zm8.189-13.02L21 3v8.65h-9.811V5.423zm0 13.154V13.35H21V21l-9.811-1.457z'
    />
  </svg>
);

export default function DownloadWithColumnLines({
  badge = 'Backed by practicality',
  headline = 'Operate swiftly with precise accuracy',
  subheadline = 'Our state of the art tool allows you to operate swiftly with precise accuracy',
  linuxHref = '#',
  windowsHref = '#',
}: DownloadWithColumnLinesProps) {
  return (
    <ColumnLines
      columnWidth={80}
      columnCount={14}
      radialFadeStart={30}
      radialFadeEnd={70}
      className='relative min-h-screen w-full bg-zinc-50 dark:bg-zinc-950'
    >
      <div className='relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center px-4 py-20'>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-6'
        >
          <span className='inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white dark:bg-white dark:text-zinc-900'>
            <span className='h-2 w-2 rounded-full bg-blue-500' />
            {badge}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='mb-4 max-w-2xl text-center text-5xl font-bold leading-tight text-zinc-900 md:text-6xl dark:text-zinc-100'
        >
          {headline.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < headline.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </motion.h1>

        {subheadline && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='mb-10 max-w-md text-center text-base text-zinc-500 dark:text-zinc-400'
          >
            {subheadline}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='flex flex-wrap items-center justify-center gap-3'
        >
          <a
            href={linuxHref}
            className='flex items-center gap-2.5 rounded-xl border-2 border-zinc-900 px-6 py-2.5 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-900 hover:text-white dark:border-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-900'
          >
            <LinuxIcon className='h-4 w-4' />
            Download for Linux
          </a>
          <a
            href={windowsHref}
            className='flex items-center gap-2.5 rounded-xl border-2 border-zinc-900 px-6 py-2.5 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-900 hover:text-white dark:border-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-900'
          >
            <WindowsIcon className='h-4 w-4' />
            Download for Windows
          </a>
        </motion.div>
      </div>
    </ColumnLines>
  );
}
