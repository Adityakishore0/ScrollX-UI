import { notFound } from 'next/navigation';
import React from 'react';
import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/mdx-components';
import { cache } from 'react';
import rehypePrettyCode from 'rehype-pretty-code';
import CodeBlock from '@/components/CodeBlock';
import remarkGfm from 'remark-gfm';
import BlocksPreview from '@/components/blockspreview';
import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { getMetadata } from '@/lib/getMetadata';
import { remarkInstallBlocks } from '@/utils/remark-install-blocks';

interface BlockFrontmatter {
  title: string;
  description: string;
}

interface BlockEntry {
  href: string;
  title: string;
  description: string;
}

interface BlockCategory {
  slug: string;
  title: string;
  blocks: BlockEntry[];
}

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function getAllBlocksByCategory(): Promise<BlockCategory[]> {
  const blocksDir = path.join(process.cwd(), 'src/content/blocks');
  const entries = fs.readdirSync(blocksDir, { withFileTypes: true });
  const categories: BlockCategory[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const categorySlug = entry.name;
    const categoryDir = path.join(blocksDir, categorySlug);
    const mdxFiles = fs
      .readdirSync(categoryDir)
      .filter((f) => f.endsWith('.mdx') && f !== 'index.mdx');
    const indexPath = path.join(categoryDir, 'index.mdx');

    let categoryTitle = slugToTitle(categorySlug);

    if (fs.existsSync(indexPath)) {
      const source = await fs.promises.readFile(indexPath, 'utf8');
      const { frontmatter } = await compileMDX<BlockFrontmatter>({
        source,
        options: { parseFrontmatter: true },
      });
      categoryTitle = frontmatter.title ?? categoryTitle;
    }

    const blocks: BlockEntry[] = await Promise.all(
      mdxFiles.map(async (file) => {
        const filePath = path.join(categoryDir, file);
        const source = await fs.promises.readFile(filePath, 'utf8');
        const { frontmatter } = await compileMDX<BlockFrontmatter>({
          source,
          options: { parseFrontmatter: true },
        });
        const blockSlug = file.replace(/\.mdx$/, '');
        return {
          href: `/blocks/${categorySlug}/${blockSlug}`,
          title: frontmatter.title ?? slugToTitle(blockSlug),
          description: frontmatter.description ?? '',
        };
      }),
    );

    categories.push({
      slug: categorySlug,
      title: categoryTitle,
      blocks,
    });
  }

  return categories;
}

async function getBlocksInCategory(
  categorySlug: string,
): Promise<BlockEntry[]> {
  const categoryDir = path.join(
    process.cwd(),
    'src/content/blocks',
    categorySlug,
  );
  const mdxFiles = fs
    .readdirSync(categoryDir)
    .filter((f) => f.endsWith('.mdx') && f !== 'index.mdx');
  const blocks: BlockEntry[] = [];

  for (const file of mdxFiles) {
    const filePath = path.join(categoryDir, file);
    const source = await fs.promises.readFile(filePath, 'utf8');
    const { frontmatter } = await compileMDX<BlockFrontmatter>({
      source,
      options: { parseFrontmatter: true },
    });
    const blockSlug = file.replace(/\.mdx$/, '');
    blocks.push({
      href: `/blocks/${categorySlug}/${blockSlug}`,
      title: frontmatter.title ?? slugToTitle(blockSlug),
      description: frontmatter.description ?? '',
    });
  }

  return blocks;
}

const getBlockBySlug = cache(async (slug: string[]) => {
  const filePath = path.join(
    process.cwd(),
    'src/content/blocks',
    `${slug.join('/')}.mdx`,
  );

  try {
    const fileContent = await fs.promises.readFile(filePath, 'utf8');

    const prettyCodeOptions = {
      theme: { dark: 'github-dark', light: 'github-light' },
      keepBackground: false,
      onVisitLine(node: { children: { type: string; value: string }[] }) {
        if (node.children.length === 0) {
          node.children = [{ type: 'text', value: ' ' }];
        }
      },
    };

    const { content, frontmatter } = await compileMDX<BlockFrontmatter>({
      source: fileContent,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkInstallBlocks],
          rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
          format: 'mdx',
        },
      },
      components: {
        ...mdxComponents,
        BlocksPreview: (props: React.ComponentProps<typeof BlocksPreview>) => (
          <BlocksPreview {...props} />
        ),
        pre: ({
          children,
          className,
        }: {
          children?: React.ReactNode;
          className?: string;
        }) => {
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

    return { content, frontmatter, slug };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw error;
  }
});

async function BlocksHomePage() {
  const categories = await getAllBlocksByCategory();
  const totalBlocks = categories.reduce((sum, c) => sum + c.blocks.length, 0);

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <div className='relative flex flex-col items-center justify-center px-4 pt-24 pb-20 text-center overflow-hidden'>
        <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
          <div className='h-100 w-175 rounded-full bg-foreground/5 blur-[120px]' />
        </div>
        <div className='relative mb-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground'>
          <span>{totalBlocks} blocks available</span>
          <ArrowRight className='h-3.5 w-3.5' />
        </div>
        <h1 className='relative max-w-3xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl'>
          Building Blocks
          <br />
          <span className='text-muted-foreground'>for the Web</span>
        </h1>
        <p className='relative mt-6 max-w-md text-base text-muted-foreground leading-relaxed'>
          Beautifully designed building blocks for modern interfaces.
          <br />
          Open source. Free forever.
        </p>
      </div>

      <div className='border-t border-border' />

      <div id='blocks' className='mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-8'>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={
                category.blocks.length > 1
                  ? `/blocks/${category.slug}`
                  : category.blocks[0].href
              }
              scroll={true}
              className='group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-foreground/20'
            >
              <div className='aspect-video w-full overflow-hidden bg-muted'>
                <img
                  src={`/assets/blocks/${category.slug}.png`}
                  alt={category.title}
                  className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                  style={{ display: 'block' }}
                />
              </div>
              <div className='p-6'>
                <div className='mb-2 flex items-center gap-2'>
                  <h3 className='text-lg font-semibold text-foreground'>
                    {category.title}
                  </h3>
                  <span className='rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground'>
                    {category.blocks.length}
                  </span>
                </div>
                {category.blocks[0].description && (
                  <p className='text-sm text-muted-foreground line-clamp-2'>
                    {category.blocks[0].description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
        {categories.length === 0 && (
          <p className='text-muted-foreground text-center'>No blocks found.</p>
        )}
      </div>
    </div>
  );
}

async function CategoryListingPage({ categorySlug }: { categorySlug: string }) {
  const blocks = await getBlocksInCategory(categorySlug);
  const categoryTitle = slugToTitle(categorySlug);

  return (
    <div className='w-full sm:pt-10 pt-5'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pt-8 pb-6'>
        <nav className='mb-4 flex items-center gap-1.5 text-sm text-muted-foreground'>
          <Link
            href='/blocks'
            className='hover:text-foreground transition-colors'
          >
            Blocks
          </Link>
          <ChevronRight className='h-3.5 w-3.5 shrink-0' />
          <span className='font-medium text-foreground'>{categoryTitle}</span>
        </nav>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>
          {categoryTitle}
        </h1>
      </div>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pb-16'>
        <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          {blocks.map((block) => (
            <Link
              key={block.href}
              href={block.href}
              scroll={true}
              className='group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-foreground/20 hover:bg-accent'
            >
              <div className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                <div className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/20 to-transparent' />
              </div>
              <div className='flex items-start justify-between gap-2'>
                <div className='min-w-0'>
                  <p className='truncate font-medium text-card-foreground group-hover:text-foreground transition-colors'>
                    {block.title}
                  </p>
                  {block.description && (
                    <p className='mt-1 line-clamp-2 text-sm text-muted-foreground'>
                      {block.description}
                    </p>
                  )}
                </div>
                <ArrowRight className='mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-muted-foreground' />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function BlockPage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    return <BlocksHomePage />;
  }

  if (slug.length === 1) {
    const categorySlug = slug[0];
    const blocks = await getBlocksInCategory(categorySlug);

    if (blocks.length > 1) {
      return <CategoryListingPage categorySlug={categorySlug} />;
    }

    if (blocks.length === 1) {
      const fullSlug = blocks[0].href.replace('/blocks/', '').split('/');
      const block = await getBlockBySlug(fullSlug);

      if (!block) notFound();

      const categoryTitle = slugToTitle(categorySlug);

      return (
        <div className='w-full sm:pt-10 pt-5'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pt-8 pb-6'>
            <nav className='mb-4 flex items-center gap-1.5 text-sm text-muted-foreground'>
              <Link
                href='/blocks'
                className='hover:text-foreground transition-colors'
              >
                Blocks
              </Link>
              <ChevronRight className='h-3.5 w-3.5 shrink-0' />
              <span className='font-medium text-foreground'>
                {categoryTitle}
              </span>
            </nav>
            <h1 className='text-3xl font-bold tracking-tight text-foreground'>
              {block!.frontmatter.title}
            </h1>
            {block!.frontmatter.description && (
              <p className='mt-2 text-muted-foreground text-base'>
                {block!.frontmatter.description}
              </p>
            )}
          </div>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pb-16'>
            <div className='prose prose-lg dark:prose-invert max-w-none [&_.preview]:not-prose'>
              {block!.content}
            </div>
          </div>
        </div>
      );
    }

    notFound();
  }

  const block = await getBlockBySlug(slug);

  if (!block) {
    notFound();
  }

  const categorySlug = slug[0];
  const categoryTitle = slugToTitle(categorySlug);

  return (
    <div className='w-full sm:pt-10 pt-5'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pt-8 pb-6'>
        <nav className='mb-4 flex items-center gap-1.5 text-sm text-muted-foreground'>
          <Link
            href='/blocks'
            className='hover:text-foreground transition-colors'
          >
            Blocks
          </Link>
          <ChevronRight className='h-3.5 w-3.5 shrink-0' />
          <Link
            href={`/blocks/${categorySlug}`}
            className='hover:text-foreground transition-colors'
          >
            {categoryTitle}
          </Link>
          <ChevronRight className='h-3.5 w-3.5 shrink-0' />
          <span className='font-medium text-foreground'>
            {block.frontmatter.title}
          </span>
        </nav>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>
          {block.frontmatter.title}
        </h1>
        {block.frontmatter.description && (
          <p className='mt-2 text-muted-foreground text-base'>
            {block.frontmatter.description}
          </p>
        )}
      </div>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pb-16'>
        <div className='prose prose-lg dark:prose-invert max-w-none [&_.preview]:not-prose'>
          {block.content}
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    return getMetadata({
      title: 'Blocks',
      description:
        'A collection of beautifully crafted UI blocks in ScrollX UI.',
      path: '/blocks',
    });
  }

  if (slug.length === 1) {
    const categoryTitle = slugToTitle(slug[0]);
    return {
      title: `ScrollX UI | ${categoryTitle}`,
      description: `Explore ${categoryTitle} blocks in ScrollX UI.`,
    };
  }

  const block = await getBlockBySlug(slug);
  const url = `https://scrollxui.dev/blocks/${slug.join('/')}`;

  if (!block) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  const imageUrl = `https://scrollxui.dev/api/og?title=${encodeURIComponent(block.frontmatter.title)}&description=${encodeURIComponent(block.frontmatter.description || '')}&logo=https://scrollxui.dev/favicon.ico`;

  return {
    title: `ScrollX UI | ${block.frontmatter.title}`,
    description: block.frontmatter.description,
    openGraph: {
      title: `ScrollX UI | ${block.frontmatter.title}`,
      description: block.frontmatter.description,
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${block.frontmatter.title} - ScrollX UI`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `ScrollX UI | ${block.frontmatter.title}`,
      description: block.frontmatter.description,
      images: [imageUrl],
    },
    alternates: { canonical: url },
  };
}

export async function generateStaticParams() {
  const blocksDir = path.join(process.cwd(), 'src/content/blocks');

  function getAllMdxFiles(dir: string): string[][] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let paths: string[][] = [];

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        paths = [...paths, ...getAllMdxFiles(fullPath)];
      } else if (entry.name.endsWith('.mdx')) {
        const relativePath = path.relative(blocksDir, fullPath);
        const slug = relativePath.replace(/\.mdx$/, '').split(path.sep);
        paths.push(slug);
      }
    }

    return paths;
  }

  return getAllMdxFiles(blocksDir).map((slug) => ({ slug }));
}
