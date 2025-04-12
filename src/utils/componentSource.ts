import fs from "fs";
import path from "path";

export async function getComponentSource(name: string): Promise<string> {
  try {
    const componentPath = path.join(
      process.cwd(),
      "src",
      "components",
      "demos",
      `${name}.tsx`
    );
    if (!fs.existsSync(componentPath)) {
      return `// Component ${name} not found`;
    }
    return fs.readFileSync(componentPath, "utf8");
  } catch (error) {
    console.error("Error reading component source:", error);
    return `// Error loading source code for ${name}`;
  }
}
