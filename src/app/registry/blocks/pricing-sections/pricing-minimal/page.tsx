'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PricingTier {
  name: string;
  price: number;
  period: string;
  features: string[];
  buttonText: string;
  popular?: boolean;
  isCustom?: boolean;
}

interface PricingMinimalProps {
  title?: string;
  subtitle?: string;
  description?: string;
  tiers?: PricingTier[];
  className?: string;
}

const defaultTiers: PricingTier[] = [
  {
    name: 'Free',
    price: 0,
    period: 'month',
    features: ['1 store', 'Basic tracking', 'Limited predictions'],
    buttonText: 'Start Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: 29,
    period: 'month',
    features: [
      'Unlimited stores',
      'Full AI predictions',
      'Customer insights',
      'Priority support',
    ],
    buttonText: 'Start Pro',
    popular: true,
  },
  {
    name: 'Custom',
    price: 0,
    period: '',
    features: ['Everything in Pro', 'Team access', 'Custom integrations'],
    buttonText: 'Contact Sales',
    popular: false,
    isCustom: true,
  },
];

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

export default function PricingMinimal({
  title = 'Choose your Pricing Plan',
  subtitle = 'Pricing',
  description = 'Pick a plan that suits your needs and get started instantly.',
  tiers = defaultTiers,
  className,
}: PricingMinimalProps) {
  return (
    <section
      className={cn(
        'relative bg-zinc-50 dark:bg-zinc-950 w-full overflow-hidden py-20',
        className,
      )}
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6'>
        <div className='flex flex-col items-center text-center gap-4 mb-16'>
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className='inline-flex items-center px-4 py-1.5 rounded-full bg-[#00ff9f]/10 dark:bg-[#00ff9f]/10 border border-[#00ff9f]/30'
          >
            <span className='text-sm text-[#00ff9f] font-medium'>
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
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-6xl mx-auto'>
          {tiers.map((tier, index) => (
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
              className='min-w-0'
            >
              <Card
                className={cn(
                  'relative h-full rounded-3xl overflow-hidden min-w-0',
                  tier.popular
                    ? 'border-2 border-[#00ff9f]'
                    : 'border-zinc-200 dark:border-zinc-800',
                )}
              >
                {tier.popular && (
                  <div className='absolute top-6 right-4 sm:right-6'>
                    <span className='inline-flex items-center px-3 py-1 rounded-full bg-[#00ff9f] text-xs font-semibold text-black'>
                      Popular
                    </span>
                  </div>
                )}

                <CardHeader className='px-4 sm:px-6 pt-6'>
                  <CardTitle className='text-2xl font-bold text-zinc-900 dark:text-white mb-2'>
                    {tier.name}
                  </CardTitle>

                  {tier.isCustom ? (
                    <div className='text-3xl font-bold text-zinc-900 dark:text-white'>
                      Contact Us
                    </div>
                  ) : (
                    <div className='flex items-baseline gap-1 flex-wrap'>
                      <span className='text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white'>
                        ${tier.price}
                      </span>
                      <span className='text-zinc-500 dark:text-zinc-500'>
                        /{tier.period}
                      </span>
                    </div>
                  )}
                </CardHeader>

                <CardContent className='px-4 sm:px-6 flex flex-col gap-6'>
                  <Button
                    className={cn(
                      'w-full rounded-xl font-semibold h-12',
                      tier.popular
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-black'
                        : 'bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white',
                    )}
                  >
                    {tier.buttonText}
                  </Button>

                  <div className='flex flex-col gap-4'>
                    {tier.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className='flex items-start gap-3'
                      >
                        <Check className='w-5 h-5 text-zinc-400 dark:text-zinc-600 shrink-0 mt-0.5' />
                        <span className='text-zinc-600 dark:text-zinc-400 text-sm sm:text-base'>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
