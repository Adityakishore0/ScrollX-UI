import React from 'react';
import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/mdx-components';
import rehypePrettyCode from 'rehype-pretty-code';
import CodeBlock from '@/components/CodeBlock';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

interface ChangelogEntry {
  title: string;
  description: string;
  date: string;
}

async function getChangelogContent() {
  const changelogDir = path.join(process.cwd(), 'src/content/docs/changelog');

  const indexPath = path.join(changelogDir, 'index.mdx');
  const indexContent = fs.readFileSync(indexPath, 'utf8');

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

  const { content: indexRendered, frontmatter: indexFrontmatter } =
    await compileMDX<ChangelogEntry>({
      source: indexContent,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
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

  const files = fs.readdirSync(changelogDir);
  const entries = [];

  for (const file of files) {
    if (file.endsWith('.mdx') && file !== 'index.mdx') {
      const filePath = path.join(changelogDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');

      const { content, frontmatter } = await compileMDX<ChangelogEntry>({
        source: fileContent,
        options: {
          parseFrontmatter: true,
          mdxOptions: {
            remarkPlugins: [remarkGfm],
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

      const slug = file.replace('.mdx', '');
      entries.push({ content, frontmatter, filename: file, slug });
    }
  }

  const sorted = entries.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  );

  return {
    indexContent: indexRendered,
    indexFrontmatter,
    entries: sorted,
  };
}

export async function generateMetadata() {
  return {
    title: 'Changelog | ScrollX UI',
    description:
      'Latest updates, improvements, and new components added to the ScrollX UI library.',
    openGraph: {
      title: 'Changelog | ScrollX UI',
      description:
        'Latest updates, improvements, and new components added to the ScrollX UI library.',
      images: [
        {
          url: `https://scrollxui.dev/api/og?title=${encodeURIComponent(
            'Changelog',
          )}&description=${encodeURIComponent(
            'Latest updates and announcements.',
          )}`,
        },
      ],
    },
  };
}

export default async function ChangelogPage() {
  const { indexContent, indexFrontmatter, entries } =
    await getChangelogContent();
  const [latest, ...older] = entries;

  return (
    <article className='prose prose-lg mx-auto dark:prose-invert [&_h2,&_h3,&_h4]:scroll-mt-24 sm:px-6 md:px-8 max-w-[calc(100vw-2rem)] sm:max-w-3xl overflow-hidden'>
      <h1 className='mt-0 mb-2'>{indexFrontmatter.title}</h1>
      <p className='mt-0 mb-10 text-muted-foreground text-base'>
        {indexFrontmatter.description}
      </p>

      {indexContent}

      {latest && (
        <>
          <h2 className='mt-0 mb-2'>{latest.frontmatter.title}</h2>
          {latest.frontmatter.description && (
            <p className='mt-0 mb-10 text-muted-foreground text-base'>
              {latest.frontmatter.description}
            </p>
          )}
          {latest.content}
        </>
      )}

      <h2 className='mt-12 mb-6'>Previous Updates</h2>
      <div className='not-prose grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 [&>*:last-child:nth-child(odd)]:md:col-span-2'>
        {older.map((entry) => (
          <Link
            key={entry.slug}
            href={`/docs/changelog/${entry.slug}`}
            className='block p-6 rounded-lg border border-border bg-card hover:bg-accent transition-colors'
          >
            <h3 className='font-semibold text-base mb-2'>
              {entry.frontmatter.title}
            </h3>
            <p className='text-sm text-muted-foreground mb-3'>
              {new Date(entry.frontmatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            {entry.frontmatter.description && (
              <p className='text-sm text-muted-foreground'>
                {entry.frontmatter.description}
              </p>
            )}
          </Link>
        ))}
      </div>

      <h4 className='mt-12'>Thank you</h4>
      <p>
        I&apos;d like to thank everyone who has been using & supported this
        project, shared feedback, and contributed to its growth. Your
        encouragement and involvement mean a lot. I truly appreciate your
        support. Thank you 🙏
      </p>

      <div className='not-prose flex justify-between items-center mt-8 px-4 gap-4'>
        <Link
          href='/docs/components'
          className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 cursor-pointer no-underline'
        >
          <svg
            className='h-4 w-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M15 19l-7-7 7-7'
            />
          </svg>
          <span className='hidden md:inline'>Components</span>
        </Link>

        <a
          href='/llms.txt'
          className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 h-9 px-4 py-2 cursor-pointer no-underline'
          style={{ textDecoration: 'none' }}
        >
          <span className='hidden md:inline'>llms.txt</span>
          <svg
            className='h-4 w-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9 5l7 7-7 7'
            />
          </svg>
        </a>
      </div>
    </article>
  );
}
