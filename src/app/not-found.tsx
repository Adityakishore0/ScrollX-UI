import { Metadata } from 'next';
import Image from 'next/image';
import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  const AlarmIcon = RiAlarmWarningFill as unknown as React.FC<{
    size?: number;
    className?: string;
  }>;

  return (
    <main>
      <section className='bg-neutral-900'>
        <div className='layout flex min-h-screen items-center justify-center text-neutral-50'>
          <div className='flex flex-col items-center text-center md:items-start md:text-left'>
            <AlarmIcon
              size={60}
              className='drop-shadow-glow animate-flicker text-red-500'
            />
            <h1 className='mt-8 text-neutral-50 text-4xl md:text-6xl'>
              Page Not Found
            </h1>
            <a
              href='/'
              className='mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition'
            >
              Back to home
            </a>
          </div>
          <div className='mt-8 md:mt-0 md:ml-8'>
            <Image
              src='/images/error.png'
              alt='Error Image'
              width={400}
              height={300}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
