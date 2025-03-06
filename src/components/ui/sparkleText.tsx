import React from 'react';

import { SparklesCore } from '@/components/ui/sparkles';

interface SparklesTextProps {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
  text: string;
}

const SparklesText: React.FC<SparklesTextProps> = ({
  background = 'transparent',
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 2700,
  className = 'w-full h-full',
  particleColor = '#FFFFFF',
  text,
}) => {
  return (
    <div className='relative w-full h-full flex items-center justify-center text-white text-lg font-semibold'>
      {/* Sparkles Effect */}
      <div className='absolute w-full h-full'>
        <SparklesCore
          background={background}
          minSize={minSize}
          maxSize={maxSize}
          particleDensity={particleDensity}
          className={className}
          particleColor={particleColor}
        />
      </div>

      {/* Text */}
      <h1 className='relative z-10'>{text}</h1>
    </div>
  );
};

export default SparklesText;
