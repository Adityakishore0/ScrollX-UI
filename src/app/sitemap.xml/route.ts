import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const escapeXml = (unsafe: string) =>
  unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
    }
    return c;
  });

interface SitemapUrl {
  url: string;
  lastModified: string;
  priority: number;
  changeFrequency: string;
  images?: string[];
}

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://scrollxui.dev";
    const docsPath = path.join(process.cwd(), "src/content/docs");

    const getAllMdxFiles = async (
      dir: string
    ): Promise<{ slug: string; lastmod: string }[]> => {
      const files = await fs.readdir(dir);
      let paths: { slug: string; lastmod: string }[] = [];

      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = await fs.stat(filePath);

        if (stat.isDirectory()) {
          const nested = await getAllMdxFiles(filePath);
          paths = [...paths, ...nested];
        } else if (file.endsWith(".mdx")) {
          const relativePath = path.relative(docsPath, filePath);
          const slug = relativePath
            .replace(/\.mdx$/, "")
            .split(path.sep)
            .join("/");
          paths.push({ slug, lastmod: stat.mtime.toISOString() });
        }
      }
      return paths;
    };

    const componentSlugs = await getAllMdxFiles(docsPath);

    const urls: SitemapUrl[] = [
      {
        url: `${baseUrl}/`,
        lastModified: new Date().toISOString(),
        priority: 1.0,
        changeFrequency: "daily",
      },
      {
        url: `${baseUrl}/components`,
        lastModified: new Date().toISOString(),
        priority: 0.8,
        changeFrequency: "daily",
      },
      ...componentSlugs.map(({ slug, lastmod }) => ({
        url: `${baseUrl}/docs/${slug}`,
        lastModified: lastmod,
        priority: 0.7,
        changeFrequency: "weekly",
        images: [`${baseUrl}/images/components/${slug}.png`],
      })),
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${urls
    .map((url) => {
      const imageTags = url.images
        ? url.images
            .map(
              (img: string) =>
                `<image:image><image:loc>${escapeXml(
                  img
                )}</image:loc></image:image>`
            )
            .join("")
        : "";

      return `
    <url>
      <loc>${escapeXml(url.url)}</loc>
      <lastmod>${url.lastModified}</lastmod>
      <changefreq>${url.changeFrequency}</changefreq>
      <priority>${url.priority}</priority>
      ${imageTags}
    </url>
    `;
    })
    .join("")}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    return new NextResponse("Failed to generate sitemap", { status: 500 });
  }
}
