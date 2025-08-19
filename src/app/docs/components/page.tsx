import navigation from "@/constants/navItems";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import Image from "next/image";
import { compileMDX } from "next-mdx-remote/rsc";
import fs from "fs";
import path from "path";
import { getMetadata } from "@/lib/getMetadata";

export const metadata = getMetadata({
  title: "Components",
  description:
    "A collection of beautifully crafted UI components in ScrollX UI.",
  path: "/components",
});

interface DocFrontmatter {
  title: string;
  description: string;
}

async function getAllComponentMeta() {
  const dir = path.join(process.cwd(), "src/content/docs/components");
  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));

  const metadata = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dir, file);
      const source = await fs.promises.readFile(filePath, "utf8");

      const { frontmatter } = await compileMDX<DocFrontmatter>({
        source,
        options: { parseFrontmatter: true },
      });

      const slug = file.replace(/\.mdx$/, "");

      return {
        href: `/docs/components/${slug}`,
        title: frontmatter.title,
        description: frontmatter.description || "",
      };
    })
  );

  return metadata;
}

export default async function ComponentsPage() {
  const componentsSection = navigation.find(
    (item) => item.title === "Components"
  );
  const baseComponents = componentsSection?.children || [];
  const metadata = await getAllComponentMeta();

  const enrichedComponents = baseComponents.map((component) => {
    const meta = metadata.find((m) =>
      m.href.endsWith(component.href.split("/").pop() || "")
    );
    return {
      ...component,
      description: meta?.description || "",
    };
  });

  return (
    <section className="flex-1 px-4 py-16 md:py-10 lg:py-10 max-w-7xl mx-auto">
      <div className="mb-12 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
          Components
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          Here you can explore the available components in our library. Ongoing
          development will bring more soon.
        </p>
      </div>

      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {enrichedComponents.map((component) => {
          const imageUrl = `https://scrollxui.dev/api/og?title=${encodeURIComponent(
            component.title
          )}&description=${encodeURIComponent(
            component.description
          )}&logo=https://scrollxui.dev/favicon.ico`;

          return (
            <Link
              key={component.href}
              href={component.href}
              className="group block rounded-3xl overflow-hidden shadow-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-xl hover:scale-[1.015]"
            >
              <AspectRatio ratio={1200 / 628}>
                <Image
                  src={imageUrl}
                  alt={component.title}
                  fill
                  className="object-cover not-prose rounded-t-3xl transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </AspectRatio>
              <h3 className="text-lg font-semibold leading-none px-4 text-zinc-900 dark:text-white">
                {component.title}
              </h3>
            </Link>
          );
        })}
        <div className="rounded-3xl overflow-hidden shadow-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all">
          <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-b from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 text-center relative">
            <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-b from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 text-center relative">
              <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-white/5 to-transparent dark:via-white/10" />
              <div className="z-10 px-4">
                <h2 className="text-2xl font-bold text-white">Coming Soon</h2>
                <p className="mt-2 text-sm text-zinc-400 dark:text-zinc-400 max-w-xs mx-auto">
                  We are working hard to bring you more components. <br />
                  Bookmark this page to stay tuned!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
