'use server';
import fs from 'fs';
import path from 'path';
import { blocks } from '@/app/registry/blocks';

export type BlockFile = {
  relativePath: string;
  source: string;
};

export type BlockSourceResult = {
  files: BlockFile[];
};

const ALIAS_ROOTS: { prefix: string; fsPath: string[] }[] = [
  { prefix: '@/components/ui/', fsPath: ['src', 'components', 'ui'] },
  { prefix: '@/components/ui/', fsPath: ['components', 'ui'] },
];

const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];

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
        source: fs.readFileSync(fullPath, 'utf-8'),
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
      const depSource = fs.readFileSync(resolved.fsPath, 'utf-8');
      results.push({ relativePath: resolved.treePath, source: depSource });
      results.push(...resolveExternalDeps([depSource], cwd, visited));
    }
  }
  return results;
}

export async function getBlockSourceAction(
  blockName: string,
): Promise<BlockSourceResult> {
  const cwd = process.cwd();

  const entry = blocks.find((b) => b.name === blockName);
  if (!entry) {
    throw new Error(`Block "${blockName}" not found in blocks list`);
  }

  const blockDir = path.join(
    cwd,
    'src',
    'app',
    'registry',
    'blocks',
    entry.category,
    entry.name,
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

  const allFiles = [...blockFiles, ...externalDeps];

  allFiles.sort((a, b) => {
    if (a.relativePath === 'page.tsx') return -1;
    if (b.relativePath === 'page.tsx') return 1;
    const aIsUi = a.relativePath.startsWith('ui/');
    const bIsUi = b.relativePath.startsWith('ui/');
    if (aIsUi && !bIsUi) return 1;
    if (!aIsUi && bIsUi) return -1;
    return a.relativePath.localeCompare(b.relativePath);
  });

  const isRoute = 'route' in entry && entry.route === true;

  return {
    files: allFiles.map((f) => ({
      ...f,
      relativePath:
        f.relativePath === 'page.tsx' && !isRoute
          ? `${entry.name}.tsx`
          : f.relativePath,
    })),
  };
}
