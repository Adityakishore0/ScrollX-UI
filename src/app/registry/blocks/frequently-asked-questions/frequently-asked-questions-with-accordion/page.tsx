'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FrequentlyAskedQuestionsProps {
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
      'This website is a place to help you find the best products and services in the world. We curate top-quality offerings so you can make informed decisions without spending hours on research.',
  },
  {
    question: 'How do I contact support?',
    answer:
      'You can reach our support team by emailing support@example.com or by using the live chat widget in the bottom-right corner of the page. We typically respond within 24 hours on business days.',
  },
  {
    question: 'How do I find the best products?',
    answer:
      'Use the search bar at the top of the page to browse by category, keyword, or brand. You can also filter results by rating, price range, and availability to quickly narrow down the best options for your needs.',
  },
  {
    question: 'Can I return a product?',
    answer:
      'Yes, we offer a hassle-free 30-day return policy on most items. Simply visit your order history, select the item you wish to return, and follow the instructions. Refunds are processed within 5–7 business days.',
  },
  {
    question: 'Do you offer international shipping?',
    answer:
      'We ship to over 50 countries worldwide. International shipping rates and estimated delivery times are calculated at checkout based on your location and the items in your cart.',
  },
  {
    question: 'How can I track my order?',
    answer:
      "Once your order has been dispatched, you will receive a confirmation email with a tracking number. You can use this number on our order tracking page or directly on the carrier's website to follow your package in real time.",
  },
];

export default function FrequentlyAskedQuestions({
  title = 'Frequently asked questions',
  description = "We are here to help you with any questions you may have. If you don't find what you need, please contact us.",
  data = defaultFAQs,
  className,
  supportEmail = 'support@example.com',
}: FrequentlyAskedQuestionsProps) {
  const words = title.split(' ');

  return (
    <section className={cn('relative w-full overflow-hidden py-24', className)}>
      <div className='mx-auto max-w-3xl px-6'>
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
          className='mt-14'
        >
          <Accordion type='single' collapsible className='w-full'>
            {data.map((item, index) => (
              <motion.div
                key={`faq-${index}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.35,
                  delay: 0.5 + index * 0.07,
                  ease: 'easeOut',
                }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
