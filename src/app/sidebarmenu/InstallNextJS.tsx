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
              <p className='mt-1'>
                <span className='text-yellow-400'>What</span> is your
                <span className='text-teal-400'> project</span> named?
                <span className='text-green-400'> "my-app"</span>
              </p>
              <p className='mt-1'>
                <span className='text-blue-400'>Would you like to use</span>
                <span className='text-purple-400'> TypeScript</span>?
                <span className='text-red-400'> No</span> /
                <span className='text-green-400'> Yes</span>
              </p>
              <p className='mt-1'>
                <span className='text-blue-400'>Would you like to use</span>
                <span className='text-yellow-400'> ESLint</span>?
                <span className='text-red-400'> No</span> /
                <span className='text-green-400'> Yes</span>
              </p>
              <p className='mt-1'>
                <span className='text-blue-400'>Would you like to use</span>
                <span className='text-teal-400'> Tailwind CSS</span>?
                <span className='text-red-400'> No</span> /
                <span className='text-green-400'> Yes</span>
              </p>
              <p className='mt-1'>
                <span className='text-blue-400'>Would you like to use</span>
                <span className='text-purple-400'> `src/`</span> directory?
                <span className='text-red-400'> No</span> /
                <span className='text-green-400'> Yes</span>
              </p>
              <p className='mt-1'>
                <span className='text-blue-400'>Would you like to use</span>
                <span className='text-teal-400'> App Router</span>? (
                <span className='text-yellow-400'>recommended</span>)
                <span className='text-red-400'> No</span> /
                <span className='text-green-400'> Yes</span>
              </p>
              <p className='mt-1'>
                <span className='text-blue-400'>Would you like to</span>
                <span className='text-green-400'> customize</span> the default
                import alias
                <span className='text-yellow-400'> (@/*)</span>?
                <span className='text-red-400'> No</span> /
                <span className='text-green-400'> Yes</span>
              </p>
              <p className='mt-1'>
                <span className='text-yellow-400'>What</span> import alias would
                you like configured?
                <span className='text-teal-400'> "@/*"</span>
              </p>
            </div>
          </div>

          <div className='bg-neutral-900 p-4 rounded-lg md:w-[65vw] mt-6'>
            <h2 className='text-xl text-neutral-50 font-semibold mb-2'>
              Start the app
            </h2>
            <div className='bg-black p-2 rounded-md text-neutral-50 font-mono'>
              <p>
                <span className='text-green-400'>$</span>
                <span className='text-yellow-400'> cd</span>
                <span className='text-teal-400'> my-app</span>
              </p>
              <p>
                <span className='text-green-400'>$</span>
                <span className='text-yellow-400'> npm</span>
                <span className='text-teal-400'> run dev</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallNextJS;
