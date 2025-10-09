/* eslint-env node */
import fs from "fs";
import path from "path";
import process from "process";
import matter from "gray-matter";

const OUTPUT_FILENAME = "llms.txt";
const OUTPUT_DIR = path.join(process.cwd(), "public");
const OUTPUT_PATH = path.join(OUTPUT_DIR, OUTPUT_FILENAME);
const COMPONENTS_PATH = path.join(process.cwd(), "src/content/docs/components");

interface ComponentMeta {
  name: string;
  title: string;
  description: string;
  slug: string;
}

function pascalToKebab(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]{2,})([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

function extractComponentsFromDocs(): ComponentMeta[] {
  const components: ComponentMeta[] = [];

  if (!fs.existsSync(COMPONENTS_PATH)) {
    return components;
  }

  function traverseDirectory(dir: string) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        traverseDirectory(filePath);
      } else if (file.endsWith(".mdx")) {
        try {
          const fileContent = fs.readFileSync(filePath, "utf8");
          const { data } = matter(fileContent);

          if (data.title && data.description) {
            const relativePath = path.relative(COMPONENTS_PATH, filePath);
            const slug = relativePath
              .replace(/\.mdx$/, "")
              .split(path.sep)
              .join("/");

            components.push({
              name: file.replace(".mdx", ""),
              title: data.title,
              description: data.description,
              slug: pascalToKebab(slug),
            });
          }
        } catch (error) {}
      }
    }
  }

  traverseDirectory(COMPONENTS_PATH);
  return components.sort((a, b) => a.title.localeCompare(b.title));
}

function buildHeader(totalComponents: number): string {
  return [
    "# ScrollX UI",
    "",
    "> ScrollX UI is an open-source React component library featuring animated, customizable components designed for modern web interfaces. It provides beautifully crafted animations, theming support, high performance, modular architecture, and responsive design.",
    "",
    "All components are written in TypeScript and styled with Tailwind CSS. The library includes a wide range of UI elements such as interactive cards, buttons, modals, text animations, backgrounds, and section blocks — all optimized for accessibility and developer experience.",
    "",
    "**Important notes for agents:**",
    "",
    `- ScrollX UI has ${totalComponents}+ components and is actively growing with daily additions.`,
    "- All components are AI-ready and work seamlessly with modern frameworks.",
    "- Components can be installed via CLI (shadcn) or manually copied.",
    "- Each component includes variants, dependencies, and usage examples.",
    "",
  ].join("\n");
}

function buildDocs(): string {
  const links = [
    {
      label: "Homepage",
      url: "https://www.scrollxui.dev",
      note: "Main landing page with component showcase and library overview.",
    },
    {
      label: "Introduction",
      url: "https://www.scrollxui.dev/docs/introduction",
      note: "Overview of ScrollX UI, its features, and design philosophy.",
    },
    {
      label: "Installation",
      url: "https://www.scrollxui.dev/docs/installation",
      note: "Installation guide with both CLI and manual setup options.",
    },
    {
      label: "Manual Installation",
      url: "https://www.scrollxui.dev/docs/installation/manual",
      note: "Step-by-step manual installation instructions.",
    },
    {
      label: "CLI Installation",
      url: "https://www.scrollxui.dev/docs/installation/cli",
      note: "Command-line installation using shadcn CLI with MCP server setup.",
    },
  ];

  const lines = links.map((l) => `- [${l.label}](${l.url}): ${l.note}`);
  return `## Documentation\n\n${lines.join("\n")}\n`;
}

function buildCliInstructions(): string {
  return [
    "## CLI Installation",
    "",
    "### Using shadcn CLI",
    "",
    "**Basic Installation:**",
    "```bash",
    "npx shadcn@latest add https://scrollxui.dev/registry/[component].json",
    "```",
    "",
    "**Example:**",
    "```bash",
    "npx shadcn@latest add https://scrollxui.dev/registry/alert-dialog.json",
    "```",
    "",
    "### Shadcn CLI 3.0 (Namespaced Registry)",
    "",
    "1. Edit your `components.json` file:",
    "```json",
    "{",
    '  "registries": {',
    '    "@scrollxui": "https://www.scrollxui.dev/registry/{name}.json"',
    "  }",
    "}",
    "```",
    "",
    "2. Install components using the namespace:",
    "```bash",
    "npx shadcn@latest add @scrollxui/[component]",
    "```",
    "",
    "**Example:**",
    "```bash",
    "npx shadcn@latest add @scrollxui/profilecard",
    "```",
    "",
    "### CLI Commands",
    "",
    "- **View registry items:** `npx shadcn@latest view @scrollxui`",
    '- **Search components:** `npx shadcn@latest search @scrollxui -q "search-term"`',
    "- **List all components:** `npx shadcn@latest list @scrollxui`",
    "",
    "### MCP Server Setup",
    "",
    "The shadcn MCP Server allows AI assistants to interact with ScrollX UI components:",
    "",
    "1. Initialize the MCP server:",
    "```bash",
    "npx shadcn@latest mcp init",
    "```",
    "",
    "2. Configure for your AI assistant:",
    "   - **Cursor:** `npx shadcn@latest mcp init --client cursor`",
    "   - **Claude:** `npx shadcn@latest mcp init --client claude`",
    "   - **VS Code:** `npx shadcn@latest mcp init --client vscode`",
    "",
  ].join("\n");
}

function buildManualInstallation(): string {
  return [
    "## Manual Installation",
    "",
    "### Prerequisites",
    "",
    "1. **Install Tailwind CSS** - Follow the [Tailwind CSS installation guide](https://tailwindcss.com/docs/installation/framework-guides/nextjs)",
    "",
    "2. **Add Dependencies:**",
    "```bash",
    "npm install class-variance-authority clsx tailwind-merge lucide-react tw-animate-css",
    "```",
    "",
    "3. **Configure Path Aliases** in `tsconfig.json`:",
    "```json",
    "{",
    '  "compilerOptions": {',
    '    "baseUrl": ".",',
    '    "paths": {',
    '      "@/*": ["./*"]',
    "    }",
    "  }",
    "}",
    "```",
    "",
    "4. **Create Utility Function** at `lib/utils.ts`:",
    "```typescript",
    'import { ClassValue, clsx } from "clsx";',
    'import { twMerge } from "tailwind-merge";',
    "",
    "export function cn(...inputs: ClassValue[]) {",
    "  return twMerge(clsx(inputs));",
    "}",
    "```",
    "",
    "5. **Create components.json** in your project root:",
    "```json",
    "{",
    '  "$schema": "https://ui.shadcn.com/schema.json",',
    '  "style": "new-york",',
    '  "rsc": false,',
    '  "tsx": true,',
    '  "tailwind": {',
    '    "config": "",',
    '    "css": "src/styles/globals.css",',
    '    "baseColor": "neutral",',
    '    "cssVariables": true,',
    '    "prefix": ""',
    "  },",
    '  "aliases": {',
    '    "components": "@/components",',
    '    "utils": "@/lib/utils",',
    '    "ui": "@/components/ui",',
    '    "lib": "@/lib",',
    '    "hooks": "@/hooks"',
    "  },",
    '  "iconLibrary": "lucide"',
    "}",
    "```",
    "",
    "For complete setup including CSS variables and theming, see: https://www.scrollxui.dev/docs/installation/manual",
    "",
  ].join("\n");
}

function buildComponentsSection(components: ComponentMeta[]): string {
  if (components.length === 0) {
    return "## Components\n\nNo components found. Please ensure the components directory exists and contains MDX files.\n";
  }

  const lines = components.map((comp) => {
    const url = `https://www.scrollxui.dev/docs/components/${comp.slug}`;
    const description = comp.description.replace(/\s+/g, " ").trim();
    const descriptionSentence = description.endsWith(".")
      ? description
      : description + ".";
    return `- [${comp.title}](${url}): ${descriptionSentence}`;
  });

  return [
    "## Components",
    "",
    `ScrollX UI includes ${components.length}+ beautifully designed components. All components are:`,
    "",
    "- Written in TypeScript with full type safety",
    "- Styled with Tailwind CSS for easy customization",
    "- Optimized for accessibility (WCAG compliant)",
    "- Responsive and mobile-first",
    "- Production-ready with minimal dependencies",
    "",
    "### Component Library",
    "",
    ...lines,
    "",
  ].join("\n");
}

function buildKeyFeatures(): string {
  return [
    "## Key Features",
    "",
    "- **Beautiful Animations:** Pre-built animation components with smooth transitions",
    "- **Theming Support:** Dark mode and customizable color schemes via CSS variables",
    "- **High Performance:** Optimized for speed with minimal bundle size",
    "- **Modular Architecture:** Import only what you need",
    "- **TypeScript First:** Full type safety and IntelliSense support",
    "- **Accessibility:** WCAG compliant with proper ARIA attributes",
    "- **Framework Agnostic:** Works with Next.js, Remix, Vite, and other React frameworks",
    "- **AI-Ready:** Designed to work seamlessly with AI assistants via MCP",
    "",
  ].join("\n");
}

function buildUsageNotes(): string {
  return [
    "## Usage Notes for Agents",
    "",
    "- **Component URLs:** Use kebab-case for component paths (e.g., `/docs/components/profile-card`)",
    "- **CLI Names:** Use the exact component name from the registry",
    "- **Dependencies:** Check each component page for specific dependencies before installation",
    "- **Variants:** Some components may have multiple variants or customization options",
    "- **Updates:** The library is actively maintained with new components added regularly",
    "- **Support:** For issues or questions, refer to the documentation or repository",
    "",
  ].join("\n");
}

function buildDevelopment(): string {
  const links = [
    {
      label: "CONTRIBUTING.md",
      url: "CONTRIBUTING.md",
      note: "Guidelines for contributing to ScrollX UI.",
    },
    {
      label: "LICENSE",
      url: "LICENSE.md",
      note: "License information.",
    },
  ];

  const lines = links.map((l) => `- [${l.label}](${l.url}): ${l.note}`);
  return `## Development\n\n${lines.join("\n")}\n`;
}

function generateMarkdown(components: ComponentMeta[]): string {
  return [
    buildHeader(components.length),
    buildDocs(),
    buildKeyFeatures(),
    buildCliInstructions(),
    buildManualInstallation(),
    buildComponentsSection(components),
    buildUsageNotes(),
    buildDevelopment(),
  ].join("\n");
}

function main() {
  console.log("Extracting components from documentation...");
  const components = extractComponentsFromDocs();
  console.log(`Found ${components.length} components`);

  console.log("Generating llms.txt...");
  const markdown = generateMarkdown(components);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, markdown, "utf8");

  const rootFile = path.join(process.cwd(), OUTPUT_FILENAME);
  if (rootFile !== OUTPUT_PATH && fs.existsSync(rootFile)) {
    try {
      fs.unlinkSync(rootFile);
    } catch {
      /* ignore */
    }
  }

  console.log(`✅ Generated ${path.relative(process.cwd(), OUTPUT_PATH)}`);
  console.log(`   - ${components.length} components indexed`);
  console.log(`   - File size: ${(markdown.length / 1024).toFixed(2)} KB`);
}

main();
