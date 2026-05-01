import { getMetadata } from '@/lib/getMetadata';
import TemplatesClient from './templates-client';

export const metadata = getMetadata({
  title: 'Templates',
  description: 'Pre-built templates using ScrollX UI components.',
  path: '/templates',
});

export default function TemplatesPage() {
  return <TemplatesClient />;
}
