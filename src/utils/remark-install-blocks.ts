import { visit } from 'unist-util-visit';
import type { Root, Code } from 'mdast';

interface MdxJsxAttribute {
  type: 'mdxJsxAttribute';
  name: string;
  value: string;
}

interface MdxJsxFlowElement {
  type: 'mdxJsxFlowElement';
  name: string;
  attributes: MdxJsxAttribute[];
  children: [];
}

function parseMeta(meta: string | null | undefined): Record<string, string> {
  if (!meta) return {};
  const result: Record<string, string> = {};
  const re = /(\w+)="([^"]*)"/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(meta)) !== null) {
    result[match[1]] = match[2];
  }
  return result;
}

function extractPkgName(code: string): string | null {
  const match = code.trim().match(/add\s+([\S]+)\s*$/m);
  if (!match) return null;
  const full = match[1];
  const scopedMatch = full.match(/@[\w-]+\/(.*)/);
  return scopedMatch ? scopedMatch[1] : full;
}

function extractDepsName(code: string): string | null {
  const line = code.trim().split('\n')[0];
  const match = line.match(
    /(?:npm\s+install|npm\s+i|pnpm\s+add|yarn\s+add|bun\s+add)\s+(.+)$/,
  );
  return match ? match[1].trim() : null;
}

function jsxNode(
  name: string,
  props: Record<string, string>,
): MdxJsxFlowElement {
  return {
    type: 'mdxJsxFlowElement',
    name,
    attributes: Object.entries(props).map(([key, value]) => ({
      type: 'mdxJsxAttribute',
      name: key,
      value,
    })),
    children: [],
  };
}

export function remarkInstallBlocks() {
  return (tree: Root) => {
    visit(tree, 'code', (node: Code, index, parent) => {
      if (!parent || index === undefined) return;
      if (node.lang !== 'bash') return;

      const meta = parseMeta(node.meta);
      const value = meta.value;

      if (value === 'pkg') {
        const name = extractPkgName(node.value);
        if (!name) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (parent.children as any[]).splice(
          index,
          1,
          jsxNode('PkgOptions', { name }),
        );
      } else if (value === 'deps') {
        const packages = extractDepsName(node.value);
        if (!packages) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (parent.children as any[]).splice(
          index,
          1,
          jsxNode('DepsOptions', { name: packages }),
        );
      }
    });
  };
}
