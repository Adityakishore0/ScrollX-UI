import { visit } from 'unist-util-visit';
import type { Root, Parent, InlineCode } from 'mdast';
import type { MdxJsxTextElement } from 'mdast-util-mdx';

const SUPPORTED_EXTENSIONS = ['.tsx', '.ts', '.css', '.json'];

export function remarkInlineFileIcons() {
  return (tree: Root) => {
    visit(tree, 'inlineCode', (node: InlineCode, index, parent) => {
      if (!parent || typeof index !== 'number') return;

      const value = node.value.toLowerCase();
      const supported = SUPPORTED_EXTENSIONS.some((ext) => value.endsWith(ext));
      if (!supported) return;

      (parent as Parent).children[index] = {
        type: 'mdxJsxTextElement',
        name: 'FileIcon',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'name',
            value: node.value,
          },
        ],
        children: [],
      } as MdxJsxTextElement;
    });
  };
}
