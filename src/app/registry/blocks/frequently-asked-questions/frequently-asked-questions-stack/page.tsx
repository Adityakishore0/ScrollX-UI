'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { LayerStack, Card } from '@/components/ui/layer-stack';

interface FAQItem {
  question: string;
  answer: string;
}

interface FrequentlyAskedQuestionsStackProps {
  title?: string;
  description?: string;
  data?: FAQItem[];
  className?: string;
  supportEmail?: string;
}

const defaultFAQs: FAQItem[] = [
  {
    question: 'What is the purpose of this website?',
    answer:
      'We help you find the best products and services by curating top-quality offerings so you can make informed decisions fast.',
  },
  {
    question: 'How do I contact support?',
    answer:
      'Email us at support@example.com or use the live chat in the bottom-right corner. We respond within 24 hours on business days.',
  },
  {
    question: 'How do I find the best products?',
    answer:
      'Use the search bar to browse by category, keyword, or brand. Filter by rating, price, and availability to narrow down your options.',
  },
  {
    question: 'Can I return a product?',
    answer:
      'Yes, we offer a hassle-free 30-day return policy. Go to your order history, select the item, and follow the steps. Refunds take 5–7 business days.',
  },
  {
    question: 'Do you offer international shipping?',
    answer:
      'We ship to over 50 countries. Rates and estimated delivery times are calculated at checkout based on your location.',
  },
  {
    question: 'How can I track my order?',
    answer:
      "Once dispatched, you'll receive a confirmation email with a tracking number to follow your package in real time.",
  },
];

export default function FrequentlyAskedQuestionsStack({
  title = 'Frequently asked questions',
  description = "We are here to help you with any questions you may have. If you don't find what you need, please contact us.",
  data = defaultFAQs,
  className,
  supportEmail = 'support@example.com',
}: FrequentlyAskedQuestionsStackProps) {
  const words = title.split(' ');

  return (
    <section className={cn('relative w-full overflow-hidden py-24', className)}>
      <div className='mx-auto max-w-5xl px-6'>
        <h1 className='relative z-10 mx-auto max-w-4xl text-center text-3xl font-bold tracking-tight text-zinc-800 md:text-5xl lg:text-6xl dark:text-zinc-100'>
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              initial={{ opacity: 0, filter: 'blur(6px)', y: 12 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: 'easeInOut',
              }}
              className='mr-2 inline-block'
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='relative z-10 mx-auto mt-6 max-w-2xl text-center text-base text-zinc-500 dark:text-zinc-400 md:text-lg'
        >
          {description}{' '}
          <a
            href={`mailto:${supportEmail}`}
            className='text-primary underline underline-offset-4 hover:opacity-80 transition-opacity'
          >
            {supportEmail}
          </a>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='mt-16'
        >
          <LayerStack
            cardWidth={360}
            cardGap={16}
            stageHeight={320}
            lastCardFullWidth={true}
            mobileSensitivity={1.8}
          >
            {data.map((item, index) => {
              const isLast = index === data.length - 1;

              if (isLast) {
                return (
                  <Card
                    key={index}
                    className='bg-card text-foreground border border-border overflow-hidden'
                  >
                    <div className='flex h-full flex-col justify-between p-6 md:p-8 gap-4'>
                      <div className='flex items-center justify-between'>
                        <span className='text-[11px] font-medium tracking-[0.16em] uppercase text-muted-foreground'>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className='size-1.5 rounded-full bg-foreground/20 dark:bg-foreground/40' />
                      </div>
                      <div className='space-y-3 flex-1'>
                        <div className='h-px w-8 bg-border' />
                        <h3 className='text-xl md:text-2xl font-semibold tracking-tight leading-tight'>
                          {item.question}
                        </h3>
                        <p className='text-sm leading-relaxed text-muted-foreground'>
                          {item.answer}
                        </p>
                      </div>
                      <div className='pt-3 border-t border-border'>
                        <p className='text-[10px] tracking-[0.14em] uppercase text-muted-foreground'>
                          Question {index + 1} of {data.length}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              }

              return (
                <Card
                  key={index}
                  className='bg-card text-foreground border border-border overflow-hidden'
                >
                  <div className='flex h-full flex-col justify-between p-6 md:p-8 gap-4'>
                    <div className='flex items-center justify-between'>
                      <span className='text-[11px] font-medium tracking-[0.16em] uppercase text-muted-foreground'>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className='size-1.5 rounded-full bg-foreground/20 dark:bg-foreground/40' />
                    </div>

                    <div className='space-y-3 flex-1'>
                      <div className='h-px w-8 bg-border' />
                      <h3 className='text-xl md:text-2xl font-semibold tracking-tight leading-tight'>
                        {item.question}
                      </h3>
                      <p className='text-sm leading-relaxed text-muted-foreground'>
                        {item.answer}
                      </p>
                    </div>

                    <div className='pt-3 border-t border-border'>
                      <p className='text-[10px] tracking-[0.14em] uppercase text-muted-foreground'>
                        Question {index + 1} of {data.length}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </LayerStack>
        </motion.div>
      </div>
    </section>
  );
}
