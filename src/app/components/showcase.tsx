import { Code, Eye } from 'lucide-react';
import { FC, useContext, useState } from 'react';

import TrueFocus from '@/components/ui/glitchtext';

import { ThemeContext } from '@/app/context/ThemeContext';

const CopyPasteUI: FC = () => {
  const [isCodeVisible, setIsCodeVisible] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);

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
        <div className='flex justify-center gap-2 mb-4'>
          <span className='bg-white text-neutral-900 px-2 py-1 rounded-lg font-bold'>
            JS
          </span>
          <span className='bg-white text-neutral-900 px-2 py-1 rounded-lg font-bold'>
            TS
          </span>
          <span className='bg-white text-neutral-900 px-2 py-1 rounded-lg font-bold'>
            CSS
          </span>
        </div>
        <h1 className='text-3xl font-semibold'>Simply copy & paste</h1>
        <p className='text-gray-400'>
          Pick your favourite technologies, copy, enjoy!
        </p>
      </div>

      {/* Buttons in Reverse Order, Slightly Moved Left */}
      <div className='mt-6 flex  flex-row text-neutral-50 gap-4 w-full justify-end pr-[27rem]'>
        <button
          className='flex items-center gap-2   bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg'
          onClick={() => setIsCodeVisible(true)}
        >
          <Code size={18} /> Code
        </button>
        <button
          className='flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg'
          onClick={() => setIsCodeVisible(false)}
        >
          <Eye size={18} /> Preview
        </button>
      </div>

      {/* Code Block */}
      <div className='mt-6 max-w-[512px] h-[224px] w-full  p-4 bg-gray-900 rounded-lg'>
        {isCodeVisible ? (
          <pre className='text-green-400 text-sm'>
            {`import TrueFocus from "@/components/ui/glitchtext";

 <TrueFocus
   sentence='Website Generator'
   manualMode={false}
   blurAmount={5}
   borderColor='teal'
   animationDuration={2}
   pauseBetweenAnimations={1}
 />`}
          </pre>
        ) : (
          <div className='w-full h-full flex items-center justify-center text-white text-lg font-semibold'>
            <TrueFocus
              sentence='Website Generator'
              manualMode={false}
              blurAmount={5}
              borderColor='teal'
              animationDuration={2}
              pauseBetweenAnimations={1}
            />
          </div>
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
