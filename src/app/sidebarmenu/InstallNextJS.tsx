'use client';

import React, { useContext } from 'react';

import { ThemeContext } from '../context/ThemeContext';

const InstallNextJS: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`${
        theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-50'
      } min-h-screen p-6 flex flex-col items-start`}
    >
      <h1
        className={`text-4xl font-bold mb-4 ${
          theme === 'dark' ? 'text-neutral-50' : 'text-neutral-900'
        }`}
      >
        Install Next.js
      </h1>

      <p
        className={`text-lg mb-6  ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
        }`}
      >
        Install Next.js with Create Next App
      </p>

      <div className='flex'>
        <div className='border-l-2 border-neutral-700 ml-3 mr-4'></div>

        <div className='space-y-4'>
          <div className='bg-neutral-900 p-4 rounded-lg  md:w-[65vw]  '>
            <h2 className='text-xl text-neutral-50 font-semibold mb-2'>
              Create a new project
            </h2>
            <div className='bg-black p-2 rounded-md text-green-400 font-mono'>
              npx create-next-app@latest
            </div>
          </div>

          <div className='bg-neutral-900 p-4 rounded-lg md:w-[65vw] mt-6'>
            <h2 className='text-xl text-neutral-50 font-semibold mb-2'>
              On installation, you'll see the following prompts:
            </h2>
            <div className='bg-black p-3 rounded-md text-neutral-50 font-mono text-sm'>
              <p className='mt-1'>What is your project named? my-app</p>
              <p className='mt-1'>Would you like to use TypeScript? No / Yes</p>
              <p className='mt-1'>Would you like to use ESLint? No / Yes</p>
              <p className='mt-1'>
                Would you like to use Tailwind CSS? No / Yes
              </p>
              <p className='mt-1'>
                Would you like to use `src/` directory? No / Yes
              </p>
              <p className='mt-1'>
                Would you like to use App Router? (recommended) No / Yes
              </p>
              <p className='mt-1'>
                Would you like to customize the default import alias (@/*)? No /
                Yes
              </p>
              <p className='mt-1'>
                What import alias would you like configured? @/*
              </p>
            </div>
          </div>

          <div className='bg-neutral-900 p-4 rounded-lg md:w-[65vw] mt-6'>
            <h2 className='text-xl text-neutral-50 font-semibold mb-2'>
              Start the app
            </h2>
            <div className='bg-black p-2 rounded-md text-neutral-50 font-mono'>
              <p>cd my-app</p>
              <p>npm run dev</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallNextJS;
