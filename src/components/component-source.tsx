import { Suspense } from 'react';
import { cn } from '@/lib/utils';
import { CodeBlockWrapper } from '@/components/code-block-wrapper';
import { getParentSourceAction } from '@/actions/getParentSourceAction';
import { ThemedSyntaxHighlighter } from '@/components/themedsyntax-highlighter';

interface ComponentSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
}

async function ComponentSourceAsync({ name, className }: ComponentSourceProps) {
  const result = await getParentSourceAction(name);
  const source = result.source ?? '';

  return (
    <CodeBlockWrapper
      expandButtonTitle='Expand'
      className={cn('my-6 overflow-hidden rounded-md', className)}
      content={source}
    >
      <ThemedSyntaxHighlighter source={source} fileName={name} />
    </CodeBlockWrapper>
  );
}

export function ComponentSource(props: ComponentSourceProps) {
  return (
    <Suspense
      fallback={<div className='h-32 animate-pulse rounded-md bg-muted' />}
    >
      <ComponentSourceAsync {...props} />
    </Suspense>
  );
}
