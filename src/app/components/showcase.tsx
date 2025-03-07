import { Code, Eye } from 'lucide-react';
import { FC, useContext, useState } from 'react';

import SparklesText from '@/components/ui/sparkleText';

import { ThemeContext } from '@/app/context/ThemeContext';

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
      {/* Header */}
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
      <div className='overflow-hidden w-full py-4 mt-[18rem]'>
        {' '}
        {/* Increased margin-top from mt-12 to mt-24 */}
        <div className='flex whitespace-nowrap animate-[scroll_10s_linear_infinite] space-x-48 min-w-max'>
          {Array(2)
            .fill(['Google', 'Microsoft', 'Apple', 'Amazon', 'Tesla'])
            .flat()
            .map((company, index) => (
              <span
                key={index}
                className={`text-neutral-900 text-lg font-semibold ${
                  theme === 'dark'
                    ? 'text-white neon-green'
                    : 'text-black neon-green'
                }`}
              >
                {company}
              </span>
            ))}
        </div>
      </div>

      <style>
        {`
          @keyframes scroll {
            from { transform: translateX(100%); }
            to { transform: translateX(-100%); }
          }
          .animate-[scroll_10s_linear_infinite] {
            animation: scroll 10s linear infinite;
          }
          .neon-green {
            position: relative;
          }
          .neon-green::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            background: rgba(0, 255, 0, 0.5);
            filter: blur(5px);
            z-index: -1;
            transform: translate(-50%, -50%);
          }
        `}
      </style>
    </div>
  );
};

export default CopyPasteUI;
