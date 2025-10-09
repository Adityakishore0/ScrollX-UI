import { notFound } from "next/navigation";
import React from "react";
import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { cache } from "react";
import rehypePrettyCode from "rehype-pretty-code";
import CodeBlock from "@/components/CodeBlock";
import ComponentNavigator from "@/components/Navigator";

interface DocFrontmatter {
  title: string;
  description: string;
  category?: string;
  version?: string;
  status?: "draft" | "published";
  lastUpdated?: string;
}

const getDocBySlug = cache(async (slug: string[]) => {
  const filePath = path.join(
    process.cwd(),
    "src/content/docs",
    `${slug.join("/") || "introduction"}.mdx`
  );

  try {
    const fileContent = await fs.promises.readFile(filePath, "utf8");

    const prettyCodeOptions = {
      theme: "github-dark",
      keepBackground: false,
      onVisitLine(node: { children: { type: string; value: string }[] }) {
        if (node.children.length === 0) {
          node.children = [{ type: "text", value: " " }];
        }
      },
    };

    const { content, frontmatter } = await compileMDX<DocFrontmatter>({
      source: fileContent,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
          format: "mdx",
        },
      },
      components: {
        ...mdxComponents,
        pre: ({ children, className }) => {
          const language = className?.replace("language-", "");
          const code = React.Children.toArray(
            children
          )[0] as React.ReactElement;
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
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
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
  const slug = resolvedParams.slug || ["introduction"];

  const doc = await getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  return (
    <article className="prose prose-lg mx-auto dark:prose-invert [&_h2,&_h3,&_h4]:scroll-mt-24  sm:px-6 md:px-8 max-w-[calc(100vw-2rem)] sm:max-w-3xl overflow-hidden">
      <h1 className="mt-0 mb-2">{doc.frontmatter.title}</h1>
      {doc.frontmatter.description && (
        <p className="mt-0 mb-10 text-muted-foreground text-base">
          {doc.frontmatter.description}
        </p>
      )}
      {doc.content}
      <ComponentNavigator />
    </article>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || ["introduction"];
  const doc = await getDocBySlug(slug);
  const url = `https://scrollxui.dev/docs/${slug.join("/")}`;

  if (!doc) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
      openGraph: {
        title: "Not Found",
        description: "The page you are looking for does not exist.",
        url,
        images: [
          {
            url: "https://scrollxui.dev/images/ui.png",
            width: 1200,
            height: 630,
            alt: "ScrollX UI",
          },
        ],
      },
      alternates: { canonical: url },
    };
  }

  const imageUrl = `https://scrollxui.dev/api/og?title=${encodeURIComponent(
    doc.frontmatter.title
  )}&description=${encodeURIComponent(
    doc.frontmatter.description || ""
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
      card: "summary_large_image",
      title: `ScrollX UI | ${doc.frontmatter.title}`,
      description: doc.frontmatter.description,
      images: [imageUrl],
    },
    alternates: { canonical: url },
  };
}

export async function generateStaticParams() {
  const docsPath = path.join(process.cwd(), "src/content/docs");

  function getAllMdxFiles(dir: string): string[][] {
    const files = fs.readdirSync(dir);
    let paths: string[][] = [];

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        paths = [...paths, ...getAllMdxFiles(filePath)];
      } else if (file.endsWith(".mdx")) {
        const relativePath = path.relative(docsPath, filePath);
        const slug = relativePath.replace(/\.mdx$/, "").split(path.sep);
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
