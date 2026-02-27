import { notFound } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/mdx-components';
import { cache } from 'react';
import rehypePrettyCode from 'rehype-pretty-code';
import CodeBlock from '@/components/CodeBlock';
import remarkGfm from 'remark-gfm';
import ComponentNavigator from '@/components/Navigator';
import { remarkInlineFileIcons } from '@/lib/remark-icons';
import OpeninAI from '@/components/open-ai';

interface DocFrontmatter {
  title: string;
  description: string;
  category?: string;
  version?: string;
  status?: 'draft' | 'published';
  lastUpdated?: string;
}

function formatSlugPart(part: string) {
  return part
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const getDocBySlug = cache(async (slug: string[]) => {
  const filePath = path.join(
    process.cwd(),
    'src/content/docs',
    `${slug.join('/') || 'introduction'}.mdx`,
  );

  try {
    const fileContent = await fs.promises.readFile(filePath, 'utf8');

    const prettyCodeOptions = {
      theme: {
        dark: 'github-dark',
        light: 'github-light',
      },
      keepBackground: false,
      onVisitLine(node: { children: { type: string; value: string }[] }) {
        if (node.children.length === 0) {
          node.children = [{ type: 'text', value: ' ' }];
        }
      },
    };

    const { content, frontmatter } = await compileMDX<DocFrontmatter>({
      source: fileContent,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkInlineFileIcons],
          rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
          format: 'mdx',
        },
      },
      components: {
        ...mdxComponents,
        pre: ({ children, className }) => {
          const language = className?.replace('language-', '');
          const code = React.Children.toArray(
            children,
          )[0] as React.ReactElement<{ children: string }>;
          return (
            <CodeBlock language={language}>{code.props.children}</CodeBlock>
          );
        },
      },
    });

    return {
      content,
      frontmatter: frontmatter as DocFrontmatter,
      slug,
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    throw error;
  }
});

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function DocsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || ['introduction'];

  const doc = await getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  const docUrl = `https://scrollxui.dev/docs/${slug.join('/')}`;

  return (
    <article className='prose prose-lg sm:pt-3  mx-auto dark:prose-invert [&_h2,&_h3,&_h4]:scroll-mt-24 sm:px-6 md:px-8 max-w-[calc(100vw-2rem)] sm:max-w-3xl overflow-hidden'>
      <div className='mb-6'>
        <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3'>
          <div className='flex-1 min-w-0'>
            {slug.length > 1 && (
              <nav className='flex items-center gap-1.5 text-sm text-muted-foreground mb-3 not-prose'>
                {slug.slice(0, -1).map((part, index) => (
                  <React.Fragment key={index}>
                    <Link
                      href={`/docs/${slug.slice(0, index + 1).join('/')}`}
                      className='font-normal hover:text-foreground transition-colors'
                    >
                      {formatSlugPart(part)}
                    </Link>
                    <span className='text-muted-foreground/50'>›</span>
                  </React.Fragment>
                ))}
                <span className='font-semibold text-foreground'>
                  {formatSlugPart(slug[slug.length - 1])}
                </span>
              </nav>
            )}
            <h1 className='mt-0 mb-2'>{doc.frontmatter.title}</h1>
            {doc.frontmatter.description && (
              <p className='mt-0 mb-0 text-muted-foreground text-base'>
                {doc.frontmatter.description}
              </p>
            )}
          </div>
          <div className='mt-3 sm:mt-1 shrink-0'>
            <OpeninAI docUrl={docUrl} />
          </div>
        </div>
      </div>
      {doc.content}
      <ComponentNavigator />
    </article>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || ['introduction'];
  const doc = await getDocBySlug(slug);
  const url = `https://scrollxui.dev/docs/${slug.join('/')}`;

  if (!doc) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
      openGraph: {
        title: 'Not Found',
        description: 'The page you are looking for does not exist.',
        url,
        images: [
          {
            url: 'https://scrollxui.dev/images/ui.png',
            width: 1200,
            height: 630,
            alt: 'ScrollX UI',
          },
        ],
      },
      alternates: { canonical: url },
    };
  }

  const imageUrl = `https://scrollxui.dev/api/og?title=${encodeURIComponent(
    doc.frontmatter.title,
  )}&description=${encodeURIComponent(
    doc.frontmatter.description || '',
  )}&logo=https://scrollxui.dev/favicon.ico`;

  return {
    title: `ScrollX UI | ${doc.frontmatter.title}`,
    description: doc.frontmatter.description,
    openGraph: {
      title: `ScrollX UI | ${doc.frontmatter.title}`,
      description: doc.frontmatter.description,
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${doc.frontmatter.title} - ScrollX UI`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `ScrollX UI | ${doc.frontmatter.title}`,
      description: doc.frontmatter.description,
      images: [imageUrl],
    },
    alternates: { canonical: url },
  };
}

export async function generateStaticParams() {
  const docsPath = path.join(process.cwd(), 'src/content/docs');

  function getAllMdxFiles(dir: string): string[][] {
    const files = fs.readdirSync(dir);
    let paths: string[][] = [];

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        paths = [...paths, ...getAllMdxFiles(filePath)];
      } else if (file.endsWith('.mdx')) {
        const relativePath = path.relative(docsPath, filePath);
        const slug = relativePath.replace(/\.mdx$/, '').split(path.sep);
        paths.push(slug);
      }
    }

    return paths;
  }

  const paths = getAllMdxFiles(docsPath);
  return paths.map((slug) => ({
    slug: slug,
  }));
}
