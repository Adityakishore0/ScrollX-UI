'use client';

import React, { useContext } from 'react';

import { ThemeContext } from '../context/ThemeContext';

const InstallTailwindCss: React.FC = () => {
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
              npm install -D tailwindcss postcss autoprefixer
              <br />
              npx tailwindcss init -p
            </div>
          </div>

          <div className='bg-neutral-900 p-4 rounded-lg md:w-[65vw] mt-6'>
            <h2 className='text-xl text-neutral-50 font-semibold mb-2'>
              Configure your template paths
            </h2>
            <div className='bg-black p-2 rounded-md text-neutral-50 font-mono'>
              <p>
                {`/** @type {import('tailwindcss').Config} */`}
                <br />
                {`module.exports = {`}
                <br />
                &nbsp;&nbsp;content: [
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{`"./app/**/*.{js,ts,jsx,tsx,mdx}",`}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{`"./pages/**/*.{js,ts,jsx,tsx,mdx}",`}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                {`"./components/**/*.{js,ts,jsx,tsx,mdx}",`}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{`"./src/**/*.{js,ts,jsx,tsx,mdx}",`}
                <br />
                &nbsp;&nbsp;],
                <br />
                &nbsp;&nbsp;{`theme: { extend: {} },`}
                <br />
                &nbsp;&nbsp;plugins: [],
                <br />
                {`};`}
              </p>
            </div>
          </div>

          <div className='bg-neutral-900 p-4 rounded-lg md:w-[65vw] mt-6'>
            <h2 className='text-xl text-neutral-50 font-semibold mb-2'>
              Add Tailwind directives to your CSS
            </h2>
            <div className='bg-black p-2 rounded-md text-neutral-50 font-mono'>
              <p>globals.css</p>
              <p>@tailwind base;</p>
              <p>@tailwind components;</p>
              <p>@tailwind utilities;</p>
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
              <p>index.tsx</p>
              <p>export default function Home() &#123;</p>
              <p>
                &nbsp;&nbsp;return &lt;h1 className="text-3xl font-bold
                underline"&gt;Hello world!&lt;/h1&gt;;
              </p>
              <p>&#125;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallTailwindCss;
