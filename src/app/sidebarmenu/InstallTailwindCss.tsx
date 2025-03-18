'use client';

import React, { useContext } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { ThemeContext } from '../context/ThemeContext';

const InstallTailwindCss: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  const codeString = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: { extend: {} },
  plugins: [],
};`;

  const codeString1 = `@tailwind base; 
@tailwind components;
@tailwind utilities;`;

  const codeStringtype = `export default function Home() { 
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}`;

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
        Install Tailwind CSS
      </h1>

      <p
        className={`text-lg mb-6  ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
        }`}
      >
        Install Tailwind CSS with Next.js
      </p>

      <div className='flex'>
        <div className='border-l-2 border-neutral-700 ml-3 mr-4'></div>

        <div className='space-y-4'>
          <div className='bg-neutral-900 p-4 rounded-lg md:w-[65vw]'>
            <h2 className='text-xl text-neutral-50 font-semibold mb-2'>
              Create your project
            </h2>
            <div className='bg-black p-2 rounded-md text-green-400 font-mono'>
              npx create-next-app@latest my-project --typescript --eslint
              <br />
              cd my-project
            </div>
          </div>

          <div className='bg-neutral-900 p-4 rounded-lg md:w-[65vw] mt-6'>
            <h2 className='text-xl text-neutral-50 font-semibold mb-2'>
              Install Tailwind CSS
            </h2>
            <div className='bg-black p-3 rounded-md text-neutral-50 font-mono text-sm'>
              <p>
                <span className='text-yellow-300'>npm</span> install -D
                <span className='text-teal-300'>
                  {' '}
                  tailwindcss postcss autoprefixer
                </span>
              </p>
              <p>
                <span className='text-yellow-300'>npx</span> tailwindcss init -p
              </p>
            </div>
          </div>

          <div className='bg-neutral-900 p-4 rounded-lg md:w-[65vw] mt-6'>
            <h2 className='text-xl text-neutral-50 font-semibold mb-2'>
              Configure your template paths
            </h2>
            <div className='bg-black p-2 rounded-md text-neutral-50 font-mono'>
              <SyntaxHighlighter
                language='javascript'
                style={dracula}
                wrapLongLines={false} // Ensures horizontal scrolling
                customStyle={{
                  background: '#000',
                  overflowX: 'auto', // Enables horizontal scrolling
                  whiteSpace: 'pre', // Ensures proper code formatting
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {codeString}
              </SyntaxHighlighter>

              {/* Hide scrollbar for Chrome/Safari */}
              <style>
                {`
                 ::-webkit-scrollbar {
                   display: none;
                 }
               `}
              </style>
            </div>
          </div>

          <div className='bg-neutral-900 p-4 rounded-lg md:w-[65vw] mt-6'>
            <h2 className='text-xl text-neutral-50 font-semibold mb-2'>
              Add Tailwind directives to your CSS
            </h2>
            <div className='bg-black p-2 rounded-md text-neutral-50 font-mono'>
              <SyntaxHighlighter
                language='css'
                style={dracula}
                wrapLongLines={false} // Ensures horizontal scrolling
                customStyle={{
                  background: '#000',
                  overflowX: 'auto', // Enables horizontal scrolling
                  whiteSpace: 'pre', // Ensures proper code formatting
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {codeString1}
              </SyntaxHighlighter>

              {/* Hide scrollbar for Chrome/Safari */}
              <style>
                {`
                 ::-webkit-scrollbar {
                   display: none;
                 }
               `}
              </style>
            </div>
          </div>

          <div className='bg-neutral-900 p-4 rounded-lg md:w-[65vw] mt-6'>
            <h2 className='text-xl text-neutral-50 font-semibold mb-2'>
              Start your build process
            </h2>
            <div className='bg-black p-2 rounded-md text-green-400 font-mono'>
              npm run dev
            </div>
          </div>

          <div className='bg-neutral-900 p-4 rounded-lg md:w-[65vw] mt-6'>
            <h2 className='text-xl text-neutral-50 font-semibold mb-2'>
              Start using Tailwind
            </h2>
            <div className='bg-black p-2 rounded-md text-neutral-50 font-mono'>
              <SyntaxHighlighter
                language='typescript'
                style={dracula}
                wrapLongLines={false} // Ensures horizontal scrolling
                customStyle={{
                  background: '#000',
                  overflowX: 'auto', // Enables horizontal scrolling
                  whiteSpace: 'pre', // Ensures proper code formatting
                  scrollbarWidth: 'none', // Hides scrollbar in Firefox
                  msOverflowStyle: 'none', // Hides scrollbar in IE/Edge
                }}
              >
                {codeStringtype}
              </SyntaxHighlighter>

              {/* Hide scrollbar for Chrome/Safari */}
              <style>
                {`
                  ::-webkit-scrollbar {
                    display: none;
                  }
                `}
              </style>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallTailwindCss;
