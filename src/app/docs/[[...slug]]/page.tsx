import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";

async function getDocBySlug(slug: string[]) {
  const filePath = path.join(
    process.cwd(),
    "src/content/docs",
    `${slug.join("/") || "introduction"}.mdx`
  );

  try {
    const fileContent = fs.readFileSync(filePath, "utf8");

    // Compile the MDX content properly
    const { content } = await compileMDX({
      source: fileContent,
      options: { parseFrontmatter: true },
      components: mdxComponents,
    });

    return content;
  } catch (error) {
    console.error(`Failed to load MDX file: ${filePath}`, error);
    return null;
  }
}

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function DocsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || ["introduction"];

  const content = await getDocBySlug(slug);

  if (!content) {
    notFound();
  }

  return (
    <article className="prose prose-lg mx-auto dark:prose-invert [&_h2,&_h3,&_h4]:scroll-mt-24">
      {content}
    </article>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || ["introduction"];

  const title =
    slug[slug.length - 1]?.charAt(0).toUpperCase() +
      slug[slug.length - 1]?.slice(1) || "Introduction";

  return {
    title: `ScrollX UI | ${title} `,
  };
}
