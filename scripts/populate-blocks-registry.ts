#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';

const CONFIG = {
  REGISTRY_DIR: 'public/registry',
  CONTENT_DIR: 'src/content/blocks',
  BLOCKS_FILE: 'src/app/registry/blocks.ts',
  BLOCKS_SRC: 'src/app/registry/blocks',
  AUTHOR: 'Ahdeetai <https://aditya.is-cool.dev>',
  SCHEMA: 'https://ui.shadcn.com/schema/registry-item.json',
  ENCODING: 'utf8' as const,
};

const ALIAS_ROOTS: { prefix: string; fsPath: string[] }[] = [
  { prefix: '@/components/ui/', fsPath: ['src', 'components', 'ui'] },
  { prefix: '@/components/ui/', fsPath: ['components', 'ui'] },
];

const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];

const IGNORED_DEPS = new Set([
  'react',
  'react-dom',
  'next',
  '@/lib/utils',
  '@/components',
]);

interface BlockEntry {
  category: string;
  name: string;
  route?: boolean;
}

interface BlockFile {
  relativePath: string;
  source: string;
}

interface RegistryFile {
  type: string;
  path: string;
  content: string;
}

interface ComponentRegistry {
  dependencies?: string[];
}

interface RegistryItem {
  $schema: string;
  name: string;
  type: 'registry:block';
  title: string;
  description: string;
  author: string;
  registryDependencies: string[];
  dependencies: string[];
  files: RegistryFile[];
}

function collectFiles(dir: string, rootDir: string): BlockFile[] {
  const results: BlockFile[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path
      .relative(rootDir, fullPath)
      .split(path.sep)
      .join('/');
    if (entry.isDirectory()) {
      results.push(...collectFiles(fullPath, rootDir));
    } else if (entry.isFile()) {
      results.push({
        relativePath,
        source: fs
          .readFileSync(fullPath, 'utf-8')
          .replace(/\r\n/g, '\n')
          .replace(/\r/g, '\n'),
      });
    }
  }
  return results;
}

function extractImports(source: string): string[] {
  const found: string[] = [];
  let m: RegExpExecArray | null;
  const importRe = /from\s+['"]([^'"]+)['"]/g;
  const requireRe = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
  while ((m = importRe.exec(source)) !== null) found.push(m[1]);
  while ((m = requireRe.exec(source)) !== null) found.push(m[1]);
  return found;
}

function resolveAliasedImport(
  specifier: string,
  cwd: string,
): { fsPath: string; treePath: string } | null {
  for (const alias of ALIAS_ROOTS) {
    if (!specifier.startsWith(alias.prefix)) continue;
    const rest = specifier.slice(alias.prefix.length);
    const baseDir = path.join(cwd, ...alias.fsPath);
    for (const candidate of [rest, ...EXTENSIONS.map((e) => rest + e)]) {
      const fullPath = path.join(baseDir, candidate);
      if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
        return { fsPath: fullPath, treePath: 'ui/' + path.basename(fullPath) };
      }
    }
  }
  return null;
}

function resolveExternalDeps(
  sources: string[],
  cwd: string,
  visited: Set<string>,
): BlockFile[] {
  const results: BlockFile[] = [];
  for (const source of sources) {
    for (const specifier of extractImports(source)) {
      const resolved = resolveAliasedImport(specifier, cwd);
      if (!resolved || visited.has(resolved.fsPath)) continue;
      visited.add(resolved.fsPath);
      const depSource = fs
        .readFileSync(resolved.fsPath, 'utf-8')
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n');
      results.push({ relativePath: resolved.treePath, source: depSource });
      results.push(...resolveExternalDeps([depSource], cwd, visited));
    }
  }
  return results;
}

function extractRegistryDependencies(files: BlockFile[]): string[] {
  return [
    ...new Set(
      files
        .filter((f) => f.relativePath.startsWith('ui/'))
        .map(
          (f) =>
            `@scrollxui/${path.basename(f.relativePath, path.extname(f.relativePath))}`,
        )
        .sort(),
    ),
  ];
}

function getDepsAlreadyCoveredByRegistryDeps(
  registryDependencies: string[],
  cwd: string,
): Set<string> {
  const covered = new Set<string>();
  for (const depName of registryDependencies) {
    const baseName = depName.replace('@scrollxui/', '');
    const jsonPath = path.join(cwd, CONFIG.REGISTRY_DIR, `${baseName}.json`);
    if (!fs.existsSync(jsonPath)) continue;
    try {
      const json: ComponentRegistry = JSON.parse(
        fs.readFileSync(jsonPath, 'utf-8'),
      );
      for (const dep of json.dependencies ?? []) {
        covered.add(dep);
      }
    } catch {
      // ignore parse errors
    }
  }
  return covered;
}

function extractNpmDependencies(
  files: BlockFile[],
  registryDependencies: string[],
  cwd: string,
): string[] {
  const pkgJsonPath = path.join(cwd, 'package.json');
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
  const installedDeps = new Set([
    ...Object.keys(pkgJson.dependencies ?? {}),
    ...Object.keys(pkgJson.devDependencies ?? {}),
  ]);

  const alreadyCovered = getDepsAlreadyCoveredByRegistryDeps(
    registryDependencies,
    cwd,
  );

  const found = new Set<string>();

  for (const file of files) {
    if (file.relativePath.startsWith('ui/')) continue;

    for (const specifier of extractImports(file.source)) {
      if (specifier.startsWith('.')) continue;
      if (specifier.startsWith('@/')) continue;
      if (IGNORED_DEPS.has(specifier)) continue;

      const pkgName = specifier.startsWith('@')
        ? specifier.split('/').slice(0, 2).join('/')
        : specifier.split('/')[0];

      const normalized = pkgName === 'motion/react' ? 'motion' : pkgName;

      if (installedDeps.has(normalized) && !alreadyCovered.has(normalized)) {
        found.add(normalized);
      }
    }
  }

  return [...found].sort();
}

const UTILS_CONTENT = `import { clsx, type ClassValue } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}`;

function usesCn(sources: string[]): boolean {
  return sources.some((s) => /from\s+['"]@\/lib\/utils['"]/.test(s));
}

function registryDepUsesCn(
  registryDependencies: string[],
  cwd: string,
): boolean {
  for (const depName of registryDependencies) {
    const baseName = depName.replace('@scrollxui/', '');
    const jsonPath = path.join(cwd, CONFIG.REGISTRY_DIR, `${baseName}.json`);
    if (!fs.existsSync(jsonPath)) continue;
    try {
      const json = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      const files: { path?: string }[] = json.files ?? [];
      if (files.some((f) => f.path === 'lib/utils.ts')) return true;
    } catch {
      /* ignore */
    }
  }
  return false;
}

function parseBlocksFile(filePath: string): BlockEntry[] {
  const content = fs.readFileSync(filePath, CONFIG.ENCODING);
  const match = content.match(
    /export const blocks\s*=\s*(\[[\s\S]*?\])\s*as const/,
  );
  if (!match) throw new Error('Could not parse blocks array from blocks.ts');

  const arrayText = match[1]
    .replace(/\/\/.*/g, '')
    .replace(/,\s*([\]\}])/g, '$1');

  return new Function(`return ${arrayText}`)() as BlockEntry[];
}

function parseMdxFrontmatter(mdxPath: string): {
  title: string;
  description: string;
} {
  if (!fs.existsSync(mdxPath)) {
    throw new Error(`MDX file not found: ${mdxPath}`);
  }

  const content = fs.readFileSync(mdxPath, CONFIG.ENCODING);
  const match = content.match(/^---\s*([\s\S]*?)\s*---/);
  if (!match) throw new Error(`No frontmatter found in: ${mdxPath}`);

  const frontmatter = match[1];
  const titleMatch = frontmatter.match(/^title:\s*(.+)$/m);
  const descMatch = frontmatter.match(/^description:\s*(.+)$/m);

  return {
    title: titleMatch ? titleMatch[1].trim() : '',
    description: descMatch ? descMatch[1].trim() : '',
  };
}

function collectBlockFiles(block: BlockEntry): BlockFile[] {
  const cwd = process.cwd();
  const blockDir = path.join(
    cwd,
    CONFIG.BLOCKS_SRC,
    block.category,
    block.name,
  );

  if (!fs.existsSync(blockDir)) {
    throw new Error(`Block directory not found: ${blockDir}`);
  }

  const blockFiles = collectFiles(blockDir, blockDir);

  const visitedPaths = new Set<string>(
    blockFiles.map((f) => path.join(blockDir, f.relativePath)),
  );

  const externalDeps = resolveExternalDeps(
    blockFiles.map((f) => f.source),
    cwd,
    visitedPaths,
  );

  return [...blockFiles, ...externalDeps];
}

function buildRegistryFiles(
  block: BlockEntry,
  allFiles: BlockFile[],
  includeUtils: boolean,
): RegistryFile[] {
  const files = allFiles
    .filter((f) => !f.relativePath.startsWith('ui/'))
    .map((f) => {
      const isPage = f.relativePath === 'page.tsx';
      const registryPath = isPage
        ? `registry/blocks/${block.category}/${block.name}/page.tsx`
        : `registry/blocks/${block.category}/${block.name}/${f.relativePath}`;
      return {
        type: 'registry:component',
        path: registryPath,
        content: f.source,
      };
    });

  if (includeUtils) {
    files.push({
      type: 'registry:lib',
      path: 'lib/utils.ts',
      content: UTILS_CONTENT,
    });
  }

  return files;
}

type Mode = 'overwrite' | 'refresh';

function generateBlock(block: BlockEntry, mode: Mode): void {
  const cwd = process.cwd();
  const outputDir = path.join(cwd, CONFIG.REGISTRY_DIR, block.category);
  const outputFile = path.join(outputDir, `${block.name}.json`);

  fs.mkdirSync(outputDir, { recursive: true });

  const allFiles = collectBlockFiles(block);
  const registryDependencies = extractRegistryDependencies(allFiles);
  const dependencies = extractNpmDependencies(
    allFiles,
    registryDependencies,
    cwd,
  );

  const blockSources = allFiles
    .filter((f) => !f.relativePath.startsWith('ui/'))
    .map((f) => f.source);
  const includeUtils =
    usesCn(blockSources) && !registryDepUsesCn(registryDependencies, cwd);

  if (includeUtils) {
    if (!dependencies.includes('clsx')) dependencies.push('clsx');
    if (!dependencies.includes('tailwind-merge'))
      dependencies.push('tailwind-merge');
    dependencies.sort();
  }

  const registryFiles = buildRegistryFiles(block, allFiles, includeUtils);

  if (mode === 'refresh' && fs.existsSync(outputFile)) {
    console.log(`\n🔄 Refreshing: ${block.category}/${block.name}.json`);
    const existing: RegistryItem = JSON.parse(
      fs.readFileSync(outputFile, CONFIG.ENCODING),
    );
    existing.registryDependencies = registryDependencies;
    existing.dependencies = dependencies;
    existing.files = registryFiles;
    fs.writeFileSync(
      outputFile,
      JSON.stringify(existing, null, 2) + '\n',
      CONFIG.ENCODING,
    );
  } else {
    console.log(`\n✨ Writing: ${block.category}/${block.name}.json`);
    const mdxPath = path.join(
      cwd,
      CONFIG.CONTENT_DIR,
      block.category,
      `${block.name}.mdx`,
    );
    const { title, description } = parseMdxFrontmatter(mdxPath);
    const item: RegistryItem = {
      $schema: CONFIG.SCHEMA,
      name: block.name,
      type: 'registry:block',
      title,
      description,
      author: CONFIG.AUTHOR,
      registryDependencies,
      dependencies,
      files: registryFiles,
    };
    fs.writeFileSync(
      outputFile,
      JSON.stringify(item, null, 2) + '\n',
      CONFIG.ENCODING,
    );
    console.log(`  💾 Saved — title: "${title}"`);
  }

  console.log(
    `  📦 registryDependencies: [${registryDependencies.join(', ') || 'none'}]`,
  );
  console.log(`  📦 dependencies: [${dependencies.join(', ') || 'none'}]`);
  console.log(`  💾 Saved`);
}

function main(): void {
  console.log('🚀 Populating block registry files...\n');

  const blocksFilePath = path.join(process.cwd(), CONFIG.BLOCKS_FILE);
  if (!fs.existsSync(blocksFilePath)) {
    console.error(`❌ blocks.ts not found: ${blocksFilePath}`);
    process.exit(1);
  }

  const blocks = parseBlocksFile(blocksFilePath);
  console.log(`Found ${blocks.length} block(s)`);

  const args = process.argv.slice(2);

  const mode: Mode = args.includes('--refresh') ? 'refresh' : 'overwrite';

  const blockIdx = args.indexOf('--block');
  const excludeIdx = args.indexOf('--exclude');

  let filtered: BlockEntry[];

  if (blockIdx !== -1) {
    const names = (args[blockIdx + 1] ?? '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (names.length === 0) {
      console.error('❌ --block requires at least one name');
      process.exit(1);
    }
    filtered = blocks.filter((b) => names.includes(b.name));
    const missing = names.filter((n) => !blocks.find((b) => b.name === n));
    if (missing.length > 0) {
      console.error(`❌ Blocks not found in blocks.ts: ${missing.join(', ')}`);
      process.exit(1);
    }
  } else if (excludeIdx !== -1) {
    const excludeNames = (args[excludeIdx + 1] ?? '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (excludeNames.length === 0) {
      console.error('❌ --exclude requires at least one name');
      process.exit(1);
    }
    filtered = blocks.filter((b) => !excludeNames.includes(b.name));
    console.log(`  ⏭️  Excluding: [${excludeNames.join(', ')}]`);
  } else {
    filtered = blocks;
  }

  for (const block of filtered) {
    try {
      generateBlock(block, mode);
    } catch (error) {
      console.error(`\n❌ Failed: ${block.category}/${block.name}`);
      console.error(`   ${(error as Error).message}`);
      console.error('\n⛔ Aborting.');
      process.exit(1);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('✨ Done!');
  console.log('='.repeat(50));
}

main();
