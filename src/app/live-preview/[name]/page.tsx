'use client';

import blocksRegistry from '@/app/registry/blocks-registry';
import { use } from 'react';

export default function LivePreviewPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = use(params);
  const Component = blocksRegistry[name];

  if (!Component) return <div>Block not found</div>;

  return <Component />;
}
