'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PricingTier {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  buttonText: string;
  popular?: boolean;
}

interface PricingSwitchProps {
  title?: string;
  subtitle?: string;
  description?: string;
  tiers?: PricingTier[];
  className?: string;
}

const defaultTiers: PricingTier[] = [
  {
    name: 'Starter',
    description: 'Perfect for individuals just getting started',
    monthlyPrice: 9,
    yearlyPrice: 7,
    features: [
      '10,000 Words / Month',
      '5 Projects',
      'Basic Analytics',
      'Email Support',
    ],
    buttonText: 'Get Started',
    popular: false,
  },
  {
    name: 'Advanced',
    description: 'Access all of your translation features',
    monthlyPrice: 29,
    yearlyPrice: 23,
    features: [
      '40,000 Words / Month',
      'Unlimited Requests',
      'Priority Support',
      'Advanced Analytics',
    ],
    buttonText: 'Subscribe',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For teams that need full control and scale',
    monthlyPrice: 79,
    yearlyPrice: 63,
    features: [
      'Unlimited Words',
      'Custom Integrations',
      'Dedicated Manager',
      'SLA Guarantee',
    ],
    buttonText: 'Contact Sales',
    popular: false,
  },
];

const smoothEase = [0.25, 0.1, 0.25, 1] as const;
const GRADIENT = 'linear-gradient(135deg, #f43f5e, #fb923c)';

export default function PricingSwitch({
  title = 'Simple, Transparent Pricing',
  subtitle = 'Pricing',
  description = 'Choose the plan that works best for you. Upgrade or downgrade at any time.',
  tiers = defaultTiers,
  className,
}: PricingSwitchProps) {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section
      className={cn(
        'relative bg-zinc-50 dark:bg-zinc-950 w-full overflow-hidden py-20',
        className,
      )}
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6'>
        <div className='flex flex-col items-center text-center gap-4 mb-12'>
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className='inline-flex items-center px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/30'
          >
            <span className='text-sm text-rose-500 font-medium'>
              {subtitle}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: smoothEase }}
            className='text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white'
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: smoothEase }}
            className='text-lg text-zinc-500 dark:text-zinc-400 max-w-md'
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4, ease: smoothEase }}
            className='relative flex items-center bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full p-1 mt-2'
          >
            <motion.div
              className='absolute top-1 bottom-1 rounded-full'
              style={{ background: GRADIENT }}
              animate={{ x: isYearly ? '100%' : '0%' }}
              initial={false}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
            {[
              { label: 'Monthly', yearly: false },
              { label: 'Yearly', yearly: true },
            ].map(({ label, yearly }) => {
              const isActive = isYearly === yearly;
              return (
                <button
                  key={label}
                  onClick={() => setIsYearly(yearly)}
                  className={cn(
                    'relative z-10 w-28 py-2 rounded-full text-sm font-semibold transition-colors duration-200 flex items-center justify-center gap-2',
                  )}
                  style={{ color: isActive ? '#fff' : undefined }}
                >
                  <span
                    className={cn(
                      !isActive && 'text-zinc-500 dark:text-zinc-400',
                    )}
                  >
                    {label}
                  </span>
                  {yearly && (
                    <span
                      className={cn(
                        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold',
                        isActive
                          ? 'bg-white/25 text-white'
                          : 'bg-rose-100 text-rose-500 dark:bg-rose-500/20 dark:text-rose-400',
                      )}
                    >
                      -20%
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto items-center'>
          {tiers.map((tier, index) => {
            const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice;
            const isPopular = tier.popular;

            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.0,
                  delay: 0.2 + index * 0.2,
                  ease: smoothEase,
                }}
                className={cn('min-w-0', isPopular ? 'sm:-mt-6 sm:mb-6' : '')}
              >
                {isPopular ? (
                  <div
                    className='relative p-0.5 rounded-3xl'
                    style={{ background: GRADIENT }}
                  >
                    <Card className='relative rounded-[22px] overflow-visible border-0 bg-white dark:bg-zinc-900'>
                      <div
                        className='absolute -top-px left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-b-2xl text-white text-xs font-semibold tracking-wide whitespace-nowrap z-10'
                        style={{ background: GRADIENT }}
                      >
                        Popular
                      </div>

                      <CardHeader className='px-6 pt-10 pb-0'>
                        <CardTitle className='text-2xl font-bold text-zinc-900 dark:text-white mb-1'>
                          {tier.name}
                        </CardTitle>
                        <CardDescription className='text-sm text-zinc-500 dark:text-zinc-400'>
                          {tier.description}
                        </CardDescription>

                        <div className='border border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl px-4 py-3 mt-6 text-center'>
                          <AnimatePresence mode='wait'>
                            <motion.div
                              key={`${tier.name}-${isYearly}`}
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 8 }}
                              transition={{ duration: 0.35, ease: smoothEase }}
                              className='flex items-baseline justify-center gap-1'
                            >
                              <span className='text-4xl font-bold text-zinc-900 dark:text-white'>
                                ${price}
                              </span>
                              <span className='text-zinc-400 text-sm'>
                                /month
                              </span>
                            </motion.div>
                          </AnimatePresence>
                          {isYearly && (
                            <p className='text-xs text-zinc-400 mt-1'>
                              billed annually
                            </p>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent className='px-6 pt-6 pb-8 flex flex-col gap-6'>
                        <div className='flex flex-col gap-3'>
                          {tier.features.map((feature, fi) => (
                            <div key={fi} className='flex items-center gap-3'>
                              <div
                                className='w-5 h-5 rounded flex items-center justify-center shrink-0'
                                style={{ background: GRADIENT }}
                              >
                                <Check
                                  className='w-3 h-3 text-white'
                                  strokeWidth={3}
                                />
                              </div>
                              <span className='text-sm text-zinc-600 dark:text-zinc-400'>
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        <Button
                          className='w-full rounded-2xl h-11 font-semibold text-white text-sm hover:opacity-90 transition-opacity border-0'
                          style={{ background: GRADIENT }}
                        >
                          {tier.buttonText}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card className='rounded-3xl overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 h-full'>
                    <CardHeader className='px-6 pt-8 pb-0'>
                      <CardTitle className='text-2xl font-bold text-zinc-900 dark:text-white mb-1'>
                        {tier.name}
                      </CardTitle>
                      <CardDescription className='text-sm text-zinc-500 dark:text-zinc-400'>
                        {tier.description}
                      </CardDescription>

                      <div className='border border-dashed border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-3 mt-6 text-center'>
                        <AnimatePresence mode='wait'>
                          <motion.div
                            key={`${tier.name}-${isYearly}`}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.35, ease: smoothEase }}
                            className='flex items-baseline justify-center gap-1'
                          >
                            <span className='text-4xl font-bold text-zinc-900 dark:text-white'>
                              ${price}
                            </span>
                            <span className='text-zinc-400 text-sm'>
                              /month
                            </span>
                          </motion.div>
                        </AnimatePresence>
                        {isYearly && (
                          <p className='text-xs text-zinc-400 mt-1'>
                            billed annually
                          </p>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className='px-6 pt-6 pb-8 flex flex-col gap-6'>
                      <div className='flex flex-col gap-3'>
                        {tier.features.map((feature, fi) => (
                          <div key={fi} className='flex items-center gap-3'>
                            <div className='w-5 h-5 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0'>
                              <Check
                                className='w-3 h-3 text-zinc-500 dark:text-zinc-400'
                                strokeWidth={3}
                              />
                            </div>
                            <span className='text-sm text-zinc-600 dark:text-zinc-400'>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <Button
                        className='w-full rounded-2xl h-11 font-semibold text-sm bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white transition-colors'
                        variant='default'
                      >
                        {tier.buttonText}
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
