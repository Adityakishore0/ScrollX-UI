import { LogoStepper } from '@/components/ui/logo-stepper';
import React from 'react';

export default function LogoStepperDemo() {
  const logos = [
    {
      icon: (
        <img
          src='/assets/logos/microsoft.jpg'
          alt='Microsoft'
          className='w-full h-full object-contain'
        />
      ),
      label: 'Microsoft',
    },
    {
      icon: (
        <img
          src='/assets/logos/apple.jpg'
          alt='Apple'
          className='w-full h-full object-contain'
        />
      ),
      label: 'Apple',
    },
    {
      icon: (
        <img
          src='/assets/logos/amazon.jpg'
          alt='Amazon'
          className='w-full h-full object-contain'
        />
      ),
      label: 'Amazon',
    },
    {
      icon: (
        <img
          src='/assets/logos/netflix.jpg'
          alt='Netflix'
          className='w-full h-full object-contain'
        />
      ),
      label: 'Netflix',
    },
    {
      icon: (
        <img
          src='/assets/logos/samsung.jpg'
          alt='Samsung'
          className='w-full h-full object-contain'
        />
      ),
      label: 'Samsung',
    },
    {
      icon: (
        <img
          src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
          alt='GitHub'
          className='w-full h-full object-contain'
        />
      ),
      label: 'GitHub',
    },
    {
      icon: (
        <img
          src='/assets/logos/tesla.jpg'
          alt='Tesla'
          className='w-full h-full object-contain'
        />
      ),
      label: 'Tesla',
    },
    {
      icon: (
        <img
          src='/assets/logos/meta.jpg'
          alt='Meta'
          className='w-full h-full object-contain'
        />
      ),
      label: 'Meta',
    },
    {
      icon: (
        <img
          src='/assets/logos/openai.jpg'
          alt='OpenAI'
          className='w-full h-full object-contain'
        />
      ),
      label: 'OpenAI',
    },
    {
      icon: (
        <img
          src='/assets/logos/nvidia.jpg'
          alt='NVIDIA'
          className='w-full h-full object-contain'
        />
      ),
      label: 'NVIDIA',
    },
    {
      icon: (
        <img
          src='/assets/logos/intel.jpg'
          alt='Intel'
          className='w-full h-full object-contain'
        />
      ),
      label: 'Intel',
    },
    {
      icon: (
        <img
          src='/assets/logos/sony.jpg'
          alt='Sony'
          className='w-full h-full object-contain'
        />
      ),
      label: 'Sony',
    },
    {
      icon: (
        <img
          src='/assets/logos/paypal.jpg'
          alt='PayPal'
          className='w-full h-full object-contain'
        />
      ),
      label: 'PayPal',
    },
    {
      icon: (
        <img
          src='/assets/logos/uber.jpg'
          alt='Uber'
          className='w-full h-full object-contain'
        />
      ),
      label: 'Uber',
    },
    {
      icon: (
        <img
          src='/assets/logos/stripe.jpg'
          alt='Stripe'
          className='w-full h-full object-contain'
        />
      ),
      label: 'Stripe',
    },
  ];

  return (
    <LogoStepper
      logos={logos}
      direction='loop'
      animationDelay={1.2}
      animationDuration={0.6}
      visibleCount={5}
    />
  );
}
