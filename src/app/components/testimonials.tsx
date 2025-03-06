import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';

import { ThemeContext } from '@/app/context/ThemeContext';

interface Testimonial {
  name: string;
  handle: string;
  review: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Ava Thompson',
    handle: '@ava_thompson',
    review:
      'Scrollout AI is a game-changer! The animations are smooth, and the UI is beyond stunning.',
  },
  {
    name: 'Elijah Carter',
    handle: '@elijah_ui',
    review:
      'Absolutely mesmerizing! The attention to detail in Scrollout AI is incredible.',
  },
  {
    name: 'Sophia Martinez',
    handle: '@sophia_codes',
    review:
      "As a front-end developer, I love how intuitive and powerful Scrollout AI is. It's a must-have tool!",
  },
  {
    name: 'Michael Brown',
    handle: '@michaelb_dev',
    review:
      'This changed the way I build interfaces. The animations are top-notch!',
  },
  {
    name: 'Liam Anderson',
    handle: '@liamdesigns',
    review:
      'The best UI toolkit I’ve ever used! Smooth animations and top-notch performance.',
  },
  {
    name: 'Olivia Hayes',
    handle: '@olivia_h',
    review:
      'This is absolutely mind-blowing. AI-powered UI is the future, and Scrollout AI is leading the way!',
  },
  {
    name: 'Daniel Lee',
    handle: '@daniel_dev',
    review:
      'Brilliant execution! The user experience feels effortless and elegant.',
  },
  {
    name: 'Sarah Green',
    handle: '@sarahgreen',
    review:
      'I can’t stop recommending this. It makes everything feel premium and polished!',
  },
  {
    name: 'Mia Patel',
    handle: '@miapatel',
    review: 'Scrollout AI took my web app to the next level. Highly recommend!',
  },
  {
    name: 'James Walker',
    handle: '@jameswalker',
    review:
      'This is the future of web design! Can’t believe something this good is available for free.',
  },
  {
    name: 'Emma Johnson',
    handle: '@emma_uiux',
    review:
      'Phenomenal work! Every detail is thoughtfully crafted for an amazing experience.',
  },
  {
    name: 'Ethan Roberts',
    handle: '@ethan_rob',
    review: 'This toolkit has completely changed my workflow. Incredible work!',
  },
];

const Testimonial: React.FC = () => {
  const [reverse, setReverse] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    const interval = setInterval(() => {
      setReverse((prev) => !prev);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id='testimonials' className=''>
      <div
        className={`relative w-full bg-gradient-to-b border py-20 flex flex-col items-center overflow-hidden ${
          theme === 'dark'
            ? 'from-neutral-900 to-neutral-900 text-neutral-50 border-neutral-800'
            : 'from-neutral-50 to-neutral-50 text-[#7cff67] border-neutral-300'
        }`}
      >
        <h2 className='text-3xl font-bold text-center text-[#7cff67] mb-4'>
          Loved by thousands of people
        </h2>
        <p className='text-gray-400 mb-10 text-center w-full max-w-2xl px-4'>
          Here's what some of our users have to say about Scrollout AI.
        </p>

        <div className='hidden md:flex gap-10 w-full max-w-6xl text-white overflow-hidden relative'>
          <div className='absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-black to-transparent z-10'></div>
          <div className='absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black to-transparent z-10'></div>
          {[0, 1, 2].map((colIndex) => {
            const moveUp = reverse ? colIndex !== 1 : colIndex === 1;
            return (
              <div
                key={colIndex}
                className='overflow-hidden relative h-[700px] w-1/3'
              >
                <motion.div
                  className='flex flex-col gap-6 absolute top-0 w-full'
                  animate={{ y: moveUp ? ['0%', '-50%'] : ['-50%', '0%'] }}
                  transition={{
                    repeat: Infinity,
                    duration: 10,
                    ease: 'linear',
                  }}
                  style={{ height: '200%' }}
                >
                  {[
                    ...testimonials.slice(colIndex * 4, (colIndex + 1) * 4),
                    ...testimonials.slice(colIndex * 4, (colIndex + 1) * 4),
                  ].map((testimonial, index) => (
                    <div
                      key={index}
                      className='p-4 bg-black rounded-lg shadow-md mx-auto w-full'
                    >
                      <p className='text-lg'>{testimonial.review}</p>
                      <p className='mt-2 font-semibold'>{testimonial.name}</p>
                      <p className='text-sm text-gray-400'>
                        {testimonial.handle}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>

        <div className='md:hidden relative h-[700px] w-full max-w-md overflow-hidden'>
          <div className='absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-black to-transparent z-10'></div>
          <div className='absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black to-transparent z-10'></div>
          <motion.div
            className='flex flex-col gap-6 absolute top-0 w-full'
            animate={{ y: ['0%', '-100%'] }}
            transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
            style={{ height: '200%' }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className='p-4 bg-black rounded-lg shadow-md mx-auto w-[90%]'
              >
                <p className='text-lg'>{testimonial.review}</p>
                <p className='mt-2 font-semibold'>{testimonial.name}</p>
                <p className='text-sm text-gray-400'>{testimonial.handle}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
