import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function getDocsContent(slug: string) {
  const filePath = path.join(process.cwd(), "content/docs", `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(fileContent);

  return { content, title: data.title || "Untitled Document" };
}
