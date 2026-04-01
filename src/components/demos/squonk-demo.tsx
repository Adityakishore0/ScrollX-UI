'use client';

import { Squonk, SquonkContent } from '@/components/ui/squonk';

export default function SquonkDemo() {
  return (
    <Squonk
      size={96}
      elasticity={1.2}
      cycleDuration={4000}
      easing='linear'
      squashAmount={40}
      stretchAmount={25}
      bounceHeight={12}
      radius={22}
    >
      <SquonkContent index={0} className='bg-indigo-500'>
        <img
          src='https://cdn.pixabay.com/photo/2023/02/07/10/50/ai-generated-7773822_1280.jpg'
          alt=''
          className='w-full h-full object-cover'
        />
      </SquonkContent>
      <SquonkContent index={1} className='bg-violet-400'>
        <img
          src='https://cdn.pixabay.com/photo/2023/06/27/03/15/ai-generated-8091289_1280.jpg'
          alt=''
          className='w-full h-full object-cover'
        />
      </SquonkContent>
      <SquonkContent index={2} className='bg-red-400'>
        <img
          src='https://cdn.pixabay.com/photo/2023/06/26/04/38/ai-generated-8088680_1280.jpg'
          alt=''
          className='w-full h-full object-cover'
        />
      </SquonkContent>
    </Squonk>
  );
}
