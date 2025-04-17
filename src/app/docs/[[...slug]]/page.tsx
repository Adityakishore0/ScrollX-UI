import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { cache } from "react";

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
    const fileContent = fs.readFileSync(filePath, "utf8");

    const { content, frontmatter } = await compileMDX<DocFrontmatter>({
      source: fileContent,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
          format: "mdx",
        },
      },
      components: mdxComponents,
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
    <article className="prose prose-lg mx-auto dark:prose-invert [&_h2,&_h3,&_h4]:scroll-mt-24 px-4 sm:px-6 md:px-8 max-w-[calc(100vw-2rem)] sm:max-w-3xl overflow-hidden">
      <h1>{doc.frontmatter.title}</h1>
      {doc.frontmatter.description && (
        <p className="prose prose-lg mx-auto dark:prose-invert mt-4">
          {doc.frontmatter.description}
        </p>
      )}
      {doc.content}
    </article>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || ["introduction"];
  const doc = await getDocBySlug(slug);

  if (!doc) return { title: "Not Found" };

  return {
    title: `ScrollX UI | ${doc.frontmatter.title}`,
    description: doc.frontmatter.description,
  };
}
