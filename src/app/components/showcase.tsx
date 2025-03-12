import { Code, Eye } from 'lucide-react';
import { FC, useContext, useState } from 'react';

import SparklesText from '@/components/ui/sparkleText';

import { ThemeContext } from '@/app/context/ThemeContext';
import Image from 'next/image';
const CopyPasteUI: FC = () => {
  const [isCodeVisible, setIsCodeVisible] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);

  const handleCopy = () => {
    const code = `import SparklesText from '@/components/ui/sparkleText';

<SparklesText
  background="transparent"
  minSize={0.4}
  maxSize={1}
  particleDensity={2700}
  className="w-full h-full"
  particleColor="#FFFFFF"
  text="SCROLLX UI"
/>`;
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        theme === 'dark'
          ? 'bg-neutral-900 text-neutral-50'
          : 'bg-neutral-50 text-neutral-900'
      } p-6`}
    >
      
      <div className='text-center'>
        <div className='flex justify-center gap-2 mb-4'></div>

        <h1 className='text-3xl font-semibold'>
          Simple copy & paste components,
        </h1>
        <p
          className={`${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
          } mt-5  transition-colors duration-300`}
        >
          Pick your favourite technologies,
          <br /> Copy paste the code into your ui folder <br /> use the
          components in your projects. It's that simple, really.!
        </p>
      </div>

      {/* Buttons in Reverse Order, Slightly Moved Left */}
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

      {/* Code Block */}
      <div className='mt-6 max-w-[512px] h-[224px] w-full  p-4 bg-black rounded-lg relative'>
        {isCodeVisible ? (
          <>
            <pre className='text-neutral-50 text-xs'>
              {`import SparklesText from '@/components/ui/sparkleText';


<SparklesText
  background="transparent"
  minSize={0.4}
  maxSize={1}
  particleDensity={2700}
  className="w-full h-full"
  particleColor="#FFFFFF"
  text="SCROLLX UI"
/>`}
            </pre>
            <button
              className='absolute top-2 right-2 bg-gray-700 p-1 rounded'
              onClick={handleCopy}
            >
              {isCopied ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='1.2em'
                  height='1.2em'
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
                  width='1.2em'
                  height='1.2em'
                  viewBox='0 0 48 48'
                >
                  <g
                    fill='none'
                    stroke='#fff'
                    stroke-linejoin='round'
                    stroke-width='4'
                  >
                    <path
                      stroke-linecap='round'
                      d='M13 12.432v-4.62A2.813 2.813 0 0 1 15.813 5h24.374A2.813 2.813 0 0 1 43 7.813v24.375A2.813 2.813 0 0 1 40.188 35h-4.672'
                    />
                    <path d='M32.188 13H7.811A2.813 2.813 0 0 0 5 15.813v24.374A2.813 2.813 0 0 0 7.813 43h24.375A2.813 2.813 0 0 0 35 40.188V15.811A2.813 2.813 0 0 0 32.188 13Z' />
                  </g>
                </svg>
              )}
            </button>
          </>
        ) : (
          <SparklesText
            background='transparent'
            minSize={0.4}
            maxSize={1}
            particleDensity={2700}
            className='w-full h-full'
            particleColor='#FFFFFF'
            text='SCROLLX UI'
          />
        )}
      </div>

      {/* Scrolling Text */}
      <div className='overflow-hidden w-full py-4 mt-[12rem]'>
        {' '}
        {/* Increased margin-top from mt-12 to mt-24 */}
        <div className="flex whitespace-nowrap animate-[scroll_10s_linear_infinite] space-x-48 min-w-max">
  {Array(2)
    .fill([
      { name: 'Google', src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg'  },
      { name: 'Microsoft', src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
      { name: 'Apple', src: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
      { name: 'Amazon', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
      { name: 'Tesla', src: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg' },
      { name: 'Facebook', src: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png' },
      { name: 'Samsung', src: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
      { name: 'IBM', src: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
      { name: 'Intel', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Intel_logo_%282020%2C_dark_blue%29.svg/1623px-Intel_logo_%282020%2C_dark_blue%29.svg.png' },
      { name: 'Adobe', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Adobe_Corporate_wordmark.svg/1920px-Adobe_Corporate_wordmark.svg.png' },
      { name: 'Oracle', src: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg' },
      { name: 'Nvidia', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/NVIDIA_logo.svg/1920px-NVIDIA_logo.svg.png' },
      { name: 'Sony', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sony_logo.svg/800px-Sony_logo.svg.png' },
      { name: 'Coca-Cola', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/1920px-Coca-Cola_logo.svg.png' },
      { name: 'Pepsi', src: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Pepsi_2023.svg' },
    ])
    .flat()
    .map((company, index) => (
      <Image
        key={index}
        src={company.src}
        alt={company.name}
        width={100}
        height={40} 
        className="h-10 w-auto object-contain" 
      />
    ))}
</div>

      </div>
      <style>
  {`
    @keyframes scroll {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); } /* Moves full duplicated content */
    }
    .animate-scroll {
      display: flex;
      animation: scroll 20s linear infinite; /* Adjust speed */
      width: max-content;
    }
  `}
</style>
    </div>
  );
};

export default CopyPasteUI;
