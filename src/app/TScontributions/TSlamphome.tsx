'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';

const HomeStyle: React.FC = () => {
  const [pulled, setPulled] = useState(false);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-start pt-10 transition-colors duration-500 ${
        pulled ? 'bg-white text-black' : 'bg-black text-white'
      }`}
    >
      {/* Navbar */}
      <motion.div
        initial={{ width: '60%' }}
        animate={{ width: '50%' }}
        transition={{ duration: 1 }}
        className={`relative flex items-center justify-center w-3/5 h-12 border rounded-xl transition-colors duration-500 ${
          pulled ? 'border-black' : 'border-white'
        }`}
      >
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: pulled ? '70px' : '50px' }}
          transition={{ duration: 1 }}
          className={`absolute right-2 top-12 w-1 cursor-pointer transition-colors duration-500 ${
            pulled ? 'bg-black' : 'bg-white'
          }`}
          onClick={() => setPulled(true)}
        ></motion.div>
      </motion.div>

      {/* Animated Divider Line Above Title (Appears on Pull) */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: pulled ? '75%' : 0, opacity: pulled ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className={`border-t mt-4 transition-colors duration-500 ${
          pulled ? 'border-black' : 'border-white'
        }`}
      ></motion.div>

      {/* Heading */}
      <h1 className='mt-6 text-6xl font-bold tracking-wide'>SCROLLX UI</h1>

      {/* Divider Line Between Title and Description (Initially Visible) */}
      <motion.div
        initial={{ width: '75%', opacity: 1 }}
        animate={{ width: pulled ? 0 : '75%', opacity: pulled ? 0 : 1 }}
        transition={{ duration: 1 }}
        className={`border-t mt-4 transition-colors duration-500 ${
          pulled ? 'border-black' : 'border-white'
        }`}
      ></motion.div>

      {/* Description */}
      <p className='mt-4 text-center text-lg max-w-xl'>
        An open-source collection of animated, interactive & fully customizable
        components for building stunning, memorable user interfaces.
      </p>
    </div>
  );
};

export default HomeStyle;
