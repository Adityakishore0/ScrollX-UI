'use client';

import { usePathname } from 'next/navigation';

function formatTitleFromPath(pathname: string): string {
  if (pathname === '/docs') return 'Docs';

  const cleanPath = pathname.replace(/^\/docs\/?/, '');
  const parts = cleanPath.split('/').filter(Boolean);

  return parts
    .map((part) =>
      part.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    )
    .join(' / ');
}

function getGitHubEditLink(pathname: string): string {
  const baseUrl =
    'https://github.com/Adityakishore0/ScrollX-UI/tree/main/src/content/docs';

  const cleanPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  if (cleanPath === '/docs') {
    return `${baseUrl}/introduction.mdx`;
  }

  if (cleanPath === '/docs/components') {
    return `https://github.com/Adityakishore0/ScrollX-UI/blob/main/src/app/docs/components/page.tsx`;
  }

  if (cleanPath.startsWith('/docs/components/')) {
    const componentName = cleanPath.replace('/docs/components/', '');
    return `${baseUrl}/components/${componentName}.mdx`;
  }

  if (cleanPath.startsWith('/docs/installation/')) {
    const pageName = cleanPath.replace('/docs/installation/', '');
    return `${baseUrl}/installation/${pageName}.mdx`;
  }

  if (cleanPath.startsWith('/docs/')) {
    const pageName = cleanPath.replace('/docs/', '');
    return `${baseUrl}/${pageName}.mdx`;
  }

  return baseUrl;
}

export default function Feedback() {
  const pathname = usePathname();

  const pageTitle = formatTitleFromPath(pathname);
  const feedbackTitle = encodeURIComponent(`Feedback for ${pageTitle}`);

  const feedbackUrl = `https://github.com/Adityakishore0/ScrollX-UI/issues/new?template=feature_request.md&title=${feedbackTitle}`;
  const editUrl = getGitHubEditLink(pathname);

  return (
    <div className='mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2'>
      <a
        href={feedbackUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors'
      >
        <span className='group inline-flex items-center cursor-pointer'>
          <span className='relative inline-flex items-center transition-all duration-200 group-hover:translate-x-2 group-hover:pl-4'>
            <span className='absolute left-0 opacity-0 -rotate-45 transition-all duration-200 group-hover:opacity-100 group-hover:rotate-0'>
              →
            </span>
            <span>Question? Give us feedback</span>
            <span className='ml-1 transition-all duration-200 -rotate-45 group-hover:opacity-0 group-hover:translate-x-1'>
              →
            </span>
          </span>
        </span>
      </a>

      <a
        href={editUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='group flex items-center text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200 hover:text-black dark:hover:text-white'
      >
        <span className='inline-block transition-transform duration-200 group-hover:translate-x-1'>
          Edit this page
        </span>
      </a>
    </div>
  );
}
