'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import Scrollxx from '@/svg/Scrollxx.svg';

type AnimatedSVGTextProps = {
  svgUrl?: string;
  svgName?: string;
};

const AnimatedSVGText: React.FC<AnimatedSVGTextProps> = ({
  svgUrl = '',
  svgName = 'AMAZON',
}) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    fetch(svgUrl)
      .then((response) => response.text())
      .then((data) => setSvgContent(data))
      .catch();
  }, [svgUrl]);

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-black'>
      {/* External SVG Animation - Pops up from bottom */}
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        dangerouslySetInnerHTML={{ __html: svgContent || '' }}
      />

      {/* Inline SVG - Centered */}
      <Scrollxx className='h-[3rem] w-[3rem]' />

      {/* Text Animation - Centered Below SVG */}
      <div className='flex gap-4 text-5xl font-extrabold text-white mt-4 font-serif tracking-wide'>
        {svgName.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ y: 80, opacity: 0, scale: 0.5 }}
            animate={{
              y: [80, -50, 0],
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 1.0 + index * 0.2,
              duration: 1,
              ease: 'easeInOut',
            }}
            className='inline-block'
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

const Demo = () => {
  return <AnimatedSVGText />;
};

export default Demo;
