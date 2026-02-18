'use client';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ChevronRight, File, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type BlockFile } from '../actions/getBlockSourceAction';

export type TreeNode = {
  name: string;
  fullPath: string;
  isFolder: boolean;
  children: TreeNode[];
};

export function buildTree(files: BlockFile[]): TreeNode[] {
  const root: TreeNode[] = [];
  for (const file of files) {
    const parts = file.relativePath.split('/');
    let current = root;
    parts.forEach((part, i) => {
      const isLast = i === parts.length - 1;
      const fullPath = parts.slice(0, i + 1).join('/');
      let node = current.find((n) => n.name === part);
      if (!node) {
        node = { name: part, fullPath, isFolder: !isLast, children: [] };
        current.push(node);
      }
      current = node.children;
    });
  }
  return root;
}

function FileTreeNode({
  node,
  depth,
  selectedPath,
  onSelect,
  defaultOpen,
}: {
  node: TreeNode;
  depth: number;
  selectedPath: string;
  onSelect: (path: string) => void;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen ?? depth === 0);

  if (node.isFolder) {
    return (
      <div>
        <Button
          variant='ghost'
          onClick={() => setOpen((v) => !v)}
          className='flex w-full items-center justify-start gap-1 h-auto py-1 text-left text-sm text-muted-foreground hover:text-foreground font-normal'
          style={{ paddingLeft: `${8 + depth * 12}px` }}
        >
          <ChevronRight
            className={twMerge(
              'h-3 w-3 shrink-0 transition-transform duration-150',
              open ? 'rotate-90' : '',
            )}
          />
          <Folder className='h-3.5 w-3.5 shrink-0 text-sky-500' />
          <span>{node.name}</span>
        </Button>
        {open && (
          <div>
            {node.children.map((child) => (
              <FileTreeNode
                key={child.fullPath}
                node={child}
                depth={depth + 1}
                selectedPath={selectedPath}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  const isSelected = node.fullPath === selectedPath;
  return (
    <Button
      variant='ghost'
      onClick={() => onSelect(node.fullPath)}
      className={twMerge(
        'flex w-full items-center justify-start gap-1.5 h-auto py-1 text-left text-sm font-normal',
        isSelected
          ? 'bg-accent text-accent-foreground'
          : 'text-muted-foreground hover:text-foreground',
      )}
      style={{ paddingLeft: `${20 + depth * 12}px`, paddingRight: '8px' }}
    >
      <File className='h-3.5 w-3.5 shrink-0 text-muted-foreground/50' />
      <span className='truncate'>{node.name}</span>
    </Button>
  );
}

export function FileTree({
  tree,
  selectedPath,
  onSelect,
}: {
  tree: TreeNode[];
  selectedPath: string;
  onSelect: (path: string) => void;
}) {
  return (
    <div className='shrink-0 w-52 border-r-[3px] border-zinc-200 dark:border-zinc-700 overflow-y-auto py-2'>
      <p className='px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 select-none'>
        Files
      </p>
      {tree.map((node) => (
        <FileTreeNode
          key={node.fullPath}
          node={node}
          depth={0}
          selectedPath={selectedPath}
          onSelect={onSelect}
          defaultOpen
        />
      ))}
    </div>
  );
}
