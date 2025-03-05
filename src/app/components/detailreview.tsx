import { motion } from 'framer-motion';
import React from 'react';

const DetailReview: React.FC = () => {
  return (
    <div className='mt-24 max-w-6xl mx-auto animate__animated animate__fadeIn animate__delay-2s'>
      <h3 className='text-2xl font-bold text-neutral-50 mb-10 text-center'>
        Featured Case Studies
      </h3>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {caseStudies.map((caseStudy, index) => (
          <motion.div
            key={index}
            className='bg-neutral-800 rounded-xl overflow-hidden border border-neutral-700 shadow-lg transition-all duration-300 w-full sm:w-auto'
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div
              className={`h-48 bg-gradient-to-r ${caseStudy.bgColor} p-6 flex items-center justify-center`}
            >
              <div className='text-2xl font-bold text-neutral-50 text-center'>
                {caseStudy.title}
              </div>
            </div>
            <div className='p-6'>
              <div className='mb-4'>
                <h4 className='font-semibold text-neutral-50 text-lg'>
                  {caseStudy.name}
                </h4>
                <p className='text-sm text-gray-400'>{caseStudy.description}</p>
              </div>
              <p className='text-gray-300 text-sm mb-6'>{caseStudy.details}</p>
              <div className='flex flex-wrap gap-2 mb-4'>
                {caseStudy.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className='bg-neutral-700 text-xs px-3 py-1 text-neutral-50 rounded-full'
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href='#'
                className='text-blue-500 hover:text-blue-400 text-sm font-medium flex items-center'
              >
                Read case study
                <svg
                  className='w-4 h-4 ml-1'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M14 5l7 7m0 0l-7 7m7-7H3'
                  ></path>
                </svg>
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <div className='mt-24 mb-10 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate__animated animate__fadeIn animate__delay-3s'>
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className='text-center'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className='text-blue-500 text-4xl md:text-5xl font-bold mb-2'>
              {stat.value}
            </div>
            <p className='text-gray-300 font-semibold'>{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const caseStudies = [
  {
    title: 'E-commerce Platform',
    name: 'ShopWave',
    description: 'Full-featured store with payments',
    details:
      'An e-commerce platform with product management, cart functionality, and payment processing, generated in under 15 minutes with Scrollout AI.',
    tags: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    bgColor: 'from-blue-700 to-indigo-800',
  },
  {
    title: 'Marketing Website',
    name: 'TechLaunch',
    description: 'SaaS landing page & blog',
    details:
      'A high-converting marketing site for a SaaS product with optimized CTAs, animations, and a fully functional blog system.',
    tags: ['Next.js', 'Tailwind CSS', 'MDX'],
    bgColor: 'from-purple-700 to-pink-700',
  },
  {
    title: 'Admin Dashboard',
    name: 'DataPulse',
    description: 'Analytics & management',
    details:
      'A sophisticated admin dashboard with data visualization, user management, and role-based access control.',
    tags: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    bgColor: 'from-emerald-700 to-green-700',
  },
];

const stats = [
  { value: '3,500+', label: 'Websites Generated' },
  { value: '98%', label: 'Customer Satisfaction' },
  { value: '80%', label: 'Time Saved' },
];

export default DetailReview;
