import fs from "fs";
import path from "path";

const sourceCache = new Map<string, string>();

export function getComponentSource(name: string): string {
  if (sourceCache.has(name)) {
    return sourceCache.get(name)!;
  }

  try {
    const paths = [
      path.join(
        process.cwd(),
        ".next",
        "server",
        "app",
        "components",
        "demos",
        `${name}.tsx`
      ),
      path.join(process.cwd(), "src", "components", "demos", `${name}.tsx`),
    ];

    const existingPath = paths.find((p) => fs.existsSync(p));
    if (!existingPath) {
      return `// Component ${name} not found`;
    }

    const source = fs.readFileSync(existingPath, "utf8");
    sourceCache.set(name, source);
    return source;
  } catch (error) {
    return `// Error loading source code for ${name}`;
  }
}
