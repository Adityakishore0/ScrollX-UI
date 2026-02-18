import dynamic from 'next/dynamic';
import React from 'react';
import { blocks } from './blocks';

export type RegisteredBlock = React.ComponentType<Record<string, unknown>>;

const blocksRegistry: Record<string, RegisteredBlock> = blocks.reduce(
  (acc, { category, name }) => {
    acc[name] = dynamic(
      () =>
        import(`@/app/registry/blocks/${category}/${name}/page`).then(
          (mod) => mod.default,
        ),
      {
        loading: () => (
          <div className='flex items-center justify-center space-x-2 p-2'>
            <div className='h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent dark:border-white dark:border-t-black' />
            <span className='text-sm overflow-hidden whitespace-nowrap'>
              Loading...
            </span>
          </div>
        ),
      },
    );

    return acc;
  },
  {} as Record<string, RegisteredBlock>,
);

export default blocksRegistry;
