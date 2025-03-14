'use client';

import { Code, Eye } from 'lucide-react';
import { useContext, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

import TSkeyboard from '@/app/TScontributions/TSkeyboard';

import { ThemeContext } from '../context/ThemeContext';

const codeString1 = `import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

const codeString2 = `import SparklesText from '@/components/ui/TSDivreveal';

<TSdivreveal 
  backgroundColour="white"
  textColor="white"
  descriptionColor="gray-300"
  cardHeight="h-72"
  cardWidth="w-60"
/>`;

const codeString = `import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface DivrevealProps {
  backgroundColour?: string;
  textColor?: string;
  descriptionColor?: string;
  cardHeight?: string;
  cardWidth?: string;
}

const Divreveal: React.FC<DivrevealProps> = ({
  backgroundColour = "white",
  textColor = "white",
  descriptionColor = "gray-300",
  cardHeight = "h-96",
  cardWidth = "w-60",
}) => {
  const images = [
    { src: "/images/Earbuds.png", name: "Earbuds", description: "Wireless and noise-canceling." },
    { src: "/images/Watch.png", name: "Watch", description: "Smart features with a sleek design." },
    { src: "/images/Shoes.png", name: "Shoes", description: "Comfortable and stylish sneakers." },
  ];

  return (
    <div className={twMerge(clsx("mt-6 w-full min-h-[40vh] p-4 bg-black rounded-lg relative flex justify-center items-center", 
    \`bg-\${backgroundColour}\`))}>
      <div className="grid grid-cols-1 gap-6 max-w-6xl lg:grid-cols-3">
        {images.map((image, index) => (
          <HoverCard key={index} image={image} textColor={textColor} descriptionColor={descriptionColor} cardHeight={cardHeight} cardWidth={cardWidth} />
        ))}
      </div>
    </div>
  );
};

interface HoverCardProps {
  image: { src: string; name: string; description: string };
  textColor: string;
  descriptionColor: string;
  cardHeight: string;
  cardWidth: string;
}

const HoverCard: React.FC<HoverCardProps> = ({ image, textColor, descriptionColor, cardHeight, cardWidth }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const toggleReveal = () => setIsRevealed((prev) => !prev);

  return (
    <div className={twMerge(clsx("relative bg-white shadow-2xl rounded-xl overflow-hidden group", cardHeight, cardWidth))}>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <Image src={image.src} alt={image.name} width={350} height={400} className="object-cover w-full h-full rounded-xl" />
      </div>
      <div
        className={twMerge(clsx(
          "absolute bottom-0 left-0 w-full flex flex-col justify-center items-center bg-black transition-all duration-500 rounded-b-xl group-hover:h-16",
          isRevealed ? "h-16" : "h-full"
        ))}
      >
        <h2 className={twMerge(clsx("text-lg font-bold transition-all duration-500 group-hover:text-2xl", \`text-\${textColor}\`))}>
          {image.name}
        </h2>
        <p className={twMerge(clsx("text-sm transition-opacity duration-500", \`text-\${descriptionColor}\`, isRevealed ? "opacity-0" : "opacity-100", "group-hover:opacity-0"))}>
          {image.description}
        </p>

        <button
          onClick={toggleReveal}
          className={twMerge(clsx("absolute bottom-2 flex justify-center items-center text-xl", \`text-\${textColor}\`))}
        >
          {isRevealed ? "▲" : "▼"}
        </button>
      </div>
    </div>
  );
};
export default Divreveal;`;

const Smoothkeyboard: React.FC = () => {
  const [isCodeVisible, setIsCodeVisible] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [expanded, setExpanded] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleCopy = () => {
    const code = `import SparklesText from '@/components/ui/TSdivreveal';

<TSdivreveal 
  backgroundColour="white"
  textColor="white"
  descriptionColor="gray-300"
  cardHeight="h-72"
  cardWidth="w-60"
/>`;
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };
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
        Div Reveal Effect
      </h1>

      <p
        className={`text-lg mb-6  ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
        }`}
      >
        A sleek, minimal carousel with smooth transitions and a reveal effect.
      </p>

      <div className='flex'>
        <div className='border-l-2 border-neutral-700 ml-3 mr-4'></div>

        <div className='space-y-4'>
          <div className='mt-6 flex flex-row text-neutral-50 gap-4 w-full justify-end max-w-[1200px] lg:pr-52 md:pr-32 sm:pr-16 px-4 mx-auto'>
            <button
              className='flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg'
              onClick={() => setIsCodeVisible(false)}
            >
              <Eye size={18} /> Preview
            </button>
            <button
              className='flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg'
              onClick={() => setIsCodeVisible(true)}
            >
              <Code size={18} /> Code
            </button>
          </div>
          <div className='mt-6 md:w-[65vw] min-h-[40vh] p-4 bg-black rounded-lg relative flex justify-center items-center '>
            {isCodeVisible ? (
              <>
                <SyntaxHighlighter
                  language='typescript'
                  style={dracula}
                  wrapLongLines
                  customStyle={{ background: '#000' }}
                >
                  {codeString2}
                </SyntaxHighlighter>
                <button
                  className='absolute top-2 right-2 bg-gray-700 p-2 rounded'
                  onClick={handleCopy}
                >
                  {isCopied ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='1.5em'
                      height='1.5em'
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='#01ff19'
                        d='M.41 13.41L6 19l1.41-1.42L1.83 12m20.41-6.42L11.66 16.17L7.5 12l-1.43 1.41L11.66 19l12-12M18 7l-1.41-1.42l-6.35 6.35l1.42 1.41z'
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='1.5em'
                      height='1.5em'
                      viewBox='0 0 48 48'
                    >
                      <g
                        fill='none'
                        stroke='#fff'
                        strokeLinejoin='round'
                        strokeWidth='4'
                      >
                        <path
                          strokeLinecap='round'
                          d='M13 12.432v-4.62A2.813 2.813 0 0 1 15.813 5h24.374A2.813 2.813 0 0 1 43 7.813v24.375A2.813 2.813 0 0 1 40.188 35h-4.672'
                        />
                        <path d='M32.188 13H7.811A2.813 2.813 0 0 0 5 15.813v24.374A2.813 2.813 0 0 0 7.813 43h24.375A2.813 2.813 0 0 0 35 40.188V15.811A2.813 2.813 0 0 0 32.188 13Z' />
                      </g>
                    </svg>
                  )}
                </button>
              </>
            ) : (
              <TSkeyboard />
            )}
          </div>

          <div className='bg-neutral-900 p-4 rounded-lg  md:w-[65vw]  '>
            <h2 className='text-xl text-neutral-50 font-semibold mb-2'>
              Install dependencies
            </h2>
            <div className='bg-black p-2 rounded-md text-green-400 font-mono'>
              npm i motion clsx tailwind-merge
            </div>
          </div>

          <div className='bg-neutral-900 p-4 rounded-lg  md:w-[65vw]  '>
            <h2 className='text-xl text-neutral-50 font-semibold mb-2'>
              Add util file
            </h2>
            <p className=' p-3 rounded-md text-neutral-50 font-mono text-sm'>
              lib/utils.ts
            </p>
            <div className='bg-black p-2 rounded-md text-green-400 font-mono overflow-auto'>
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
          <div className='bg-neutral-900 p-4 rounded-lg  md:w-[65vw]  '>
            <h2 className='text-xl text-neutral-50 font-semibold mb-2'>
              Copy the source code
            </h2>
            <p className=' p-3 rounded-md text-neutral-50 font-mono text-sm'>
              components/ui/Divreveal.tsx
            </p>
            <div className='bg-black p-2 rounded-md text-green-400 font-mono overflow-hidden relative'>
              {/* Code block with height limit */}
              <div
                className={`overflow-auto transition-all duration-300 ${
                  expanded ? 'max-h-[1000px]' : 'max-h-[200px] blur-sm'
                }`}
              >
                <SyntaxHighlighter
                  language='typescript'
                  style={dracula}
                  wrapLongLines={false}
                  customStyle={{
                    background: '#000',
                    overflowX: 'auto',
                    whiteSpace: 'pre',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                >
                  {codeString}
                </SyntaxHighlighter>
              </div>

              {/* Show More / Show Less button */}
              <div className='flex justify-center mt-2'>
                <button
                  className='bg-gray-800 text-white py-1 px-4 rounded-md text-sm'
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? ' Collapse' : 'Expand'}
                </button>
              </div>

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

export default Smoothkeyboard;
