#!/usr/bin/env node

import fs from "fs";
import path from "path";

interface PropRow {
  prop: string;
  type: string;
  default: string;
  description: string;
}

function extractRows(propsTableStr: string): PropRow[] | null {
  const match = propsTableStr.match(/rows=\{(\[[\s\S]*?\])\}/);
  if (!match) return null;

  try {
    return new Function(`return ${match[1]}`)();
  } catch (error) {
    console.error("Error parsing rows:", error);
    return null;
  }
}

function toMarkdown(rows: PropRow[]): string {
  if (!rows || rows.length === 0) return "";

  const escape = (text: unknown): string => {
    if (text === null || text === undefined) return "—";
    const str = String(text);
    return str
      .replace(/\|/g, "\\|")
      .replace(/\n/g, " ")
      .replace(/<(\/?[A-Z][a-zA-Z0-9]*)/g, "`<$1")
      .replace(/(\/?[A-Z][a-zA-Z0-9]*)>/g, "$1>`");
  };

  let table = "\n| Prop | Type | Default | Description |\n";
  table += "| ---- | ---- | ------- | ----------- |\n";

  rows.forEach((row) => {
    const prop = `\`${escape(row.prop)}\``;
    const type = `\`${escape(row.type)}\``;
    const defaultVal =
      row.default === "—" || !row.default ? "—" : `\`${escape(row.default)}\``;
    const desc = escape(row.description);

    table += `| ${prop} | ${type} | ${defaultVal} | ${desc} |\n`;
  });

  return table + "\n";
}

function processFile(filePath: string): boolean {
  const content = fs.readFileSync(filePath, "utf-8");
  const regex = /<PropsTable[\s\S]*?\/>/g;

  let converted = content;
  let hasChanges = false;

  const matches = [...content.matchAll(regex)];

  matches.forEach((match) => {
    const component = match[0];
    const rows = extractRows(component);

    if (rows) {
      converted = converted.replace(component, toMarkdown(rows));
      hasChanges = true;
    }
  });

  if (hasChanges) {
    fs.writeFileSync(filePath, converted, "utf-8");
    console.log(`✓ ${path.relative(process.cwd(), filePath)}`);
    return true;
  }

  return false;
}

function findFiles(dir: string, files: string[] = []): string[] {
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const filePath = path.join(dir, item);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!item.startsWith(".") && item !== "node_modules") {
        findFiles(filePath, files);
      }
    } else if (item.endsWith(".mdx") || item.endsWith(".md")) {
      files.push(filePath);
    }
  });

  return files;
}

function main() {
  const args = process.argv.slice(2);
  const sourceDir = args[0] || "./src/content/docs";

  console.log("\n🎨 Converting PropsTable to Markdown...\n");
  console.log(`Directory: ${sourceDir}\n`);

  if (!fs.existsSync(sourceDir)) {
    console.error(`❌ Directory "${sourceDir}" not found`);
    process.exit(1);
  }

  const files = findFiles(sourceDir);

  if (files.length === 0) {
    console.log("⚠️  No files found");
    return;
  }

  console.log(`Found ${files.length} file(s)\n`);

  let count = 0;
  files.forEach((file) => {
    if (processFile(file)) count++;
  });

  console.log(`\n✅ Converted ${count} file(s)\n`);
}

main();
