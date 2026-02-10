import withMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: [
      'source.unsplash.com',
      'images.unsplash.com',
      'ext.same-assets.com',
      'ugc.same-assets.com',
    ],
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'source.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https' as const,
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https' as const,
        hostname: 'ext.same-assets.com',
        pathname: '/**',
      },
      {
        protocol: 'https' as const,
        hostname: 'ugc.same-assets.com',
        pathname: '/**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    config.module?.rules?.push(
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(ts|tsx)$/,
        resourceQuery: /raw/,
        use: 'raw-loader',
      },
    );
    return config;
  },
  experimental: {
    mdxRs: false,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  transpilePackages: ['next-mdx-remote'],

  async rewrites() {
    return [
      {
        source: '/registry',
        destination: '/registry/registry.json',
      },
    ];
  },
} as NextConfig;

const withMDXConfig = withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
  },
});

export default withMDXConfig(nextConfig);
