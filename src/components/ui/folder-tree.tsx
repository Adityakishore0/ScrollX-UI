"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Folder,
  FolderOpen,
  File,
  FileText,
  Image as ImageIcon,
  Music,
  Video as VideoIcon,
  Code as CodeIcon,
  Archive,
  Settings as SettingsIcon,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types for the tree data structure
export interface TreeNodeType {
  id: string;
  name: string;
  type: string | "file" | "folder";
  extension?: string;
  children?: TreeNodeType[];
  badge?: string | number;
}

interface TreeNodeProps {
  node: TreeNodeType;
  level?: number;
  expandedIds: Set<string>;
  selectedId: string | null;
  onToggle: (id: string) => void;
  onSelect: (node: TreeNodeType) => void;
  showIcons?: boolean;
  showLines?: boolean;
  iconSize?: number;
  nodeClassName?: string;
  selectedClassName?: string;
  hoverClassName?: string;
}

interface FolderTreeProps {
  data: TreeNodeType;
  onSelect?: (node: TreeNodeType) => void;
  onToggle?: (nodeId: string) => void;
  initialExpanded?: string[];
  initialSelected?: string | null;
  showIcons?: boolean;
  showLines?: boolean;
  containerClassName?: string;
  nodeClassName?: string;
  selectedClassName?: string;
  hoverClassName?: string;
  iconSize?: number;
  maxHeight?: string | number;
  className?: string;
}

const getFileIcon = (
  extension: string | undefined,
  isFolder = false
): LucideIcon | null => {
  if (isFolder) return null;

  const iconMap = {
    // Images
    png: ImageIcon,
    jpg: ImageIcon,
    jpeg: ImageIcon,
    gif: ImageIcon,
    svg: ImageIcon,
    webp: ImageIcon,
    // Audio
    mp3: Music,
    wav: Music,
    flac: Music,
    aac: Music,
    ogg: Music,
    // Video
    mp4: VideoIcon,
    avi: VideoIcon,
    mov: VideoIcon,
    mkv: VideoIcon,
    webm: VideoIcon,
    // Code
    js: CodeIcon,
    jsx: CodeIcon,
    ts: CodeIcon,
    tsx: CodeIcon,
    html: CodeIcon,
    css: CodeIcon,
    scss: CodeIcon,
    sass: CodeIcon,
    json: CodeIcon,
    xml: CodeIcon,
    py: CodeIcon,
    java: CodeIcon,
    cpp: CodeIcon,
    c: CodeIcon,
    vue: CodeIcon,
    php: CodeIcon,
    rb: CodeIcon,
    go: CodeIcon,
    // Documents
    txt: FileText,
    md: FileText,
    pdf: FileText,
    doc: FileText,
    docx: FileText,
    // Archives
    zip: Archive,
    rar: Archive,
    tar: Archive,
    gz: Archive,
    // Config
    env: SettingsIcon,
    config: SettingsIcon,
    conf: SettingsIcon,
    ini: SettingsIcon,
  };

  const ext = extension?.toLowerCase() || "";
  return iconMap[ext as keyof typeof iconMap] || File;
};

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  level = 0,
  expandedIds,
  selectedId,
  onToggle,
  onSelect,
  showIcons = true,
  showLines = true,
  iconSize = 16,
  nodeClassName = "",
  selectedClassName = "",
  hoverClassName = "",
}) => {
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;
  const hasChildren = node.children && node.children.length > 0;
  const isFolder = node.type === "folder";
  const IconComponent = isFolder
    ? isExpanded
      ? FolderOpen
      : Folder
    : getFileIcon(node.extension) || File;

  const handleClick = useCallback(() => {
    if (isFolder && hasChildren) {
      onToggle(node.id);
    }
    onSelect(node);
  }, [isFolder, hasChildren, node, onToggle, onSelect]);

  const defaultSelectedClass =
    "bg-blue-50 dark:bg-blue-900/30 border-r-2 border-blue-500 dark:border-blue-500 text-blue-900 dark:text-blue-200";
  const defaultHoverClass = "hover:bg-gray-50 dark:hover:bg-gray-800";

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, delay: level * 0.05 }}
        className={cn(
          `
          flex items-center py-2 px-3 cursor-pointer transition-all duration-200 select-none`,
          isSelected ? selectedClassName || defaultSelectedClass : "",
          !isSelected ? hoverClassName || defaultHoverClass : "",
          nodeClassName
        )}
        style={{ paddingLeft: `${level * 20 + 12}px` }}
        onClick={handleClick}
      >
        {/* Expand/Collapse Icon */}
        {isFolder && (
          <motion.span
            className="mr-2 flex-shrink-0"
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {hasChildren ? (
              <ChevronRight
                size={14}
                className="text-gray-500 dark:text-gray-400"
              />
            ) : (
              <span className="w-3.5" />
            )}
          </motion.span>
        )}

        {/* File indent space */}
        {!isFolder && <span className="w-3.5 mr-2" />}

        {/* File/Folder Icon */}
        {showIcons && IconComponent && (
          <IconComponent
            size={iconSize}
            className={cn(
              `mr-3 flex-shrink-0`,
              isFolder
                ? isSelected
                  ? "text-blue-600"
                  : "text-blue-500"
                : isSelected
                ? "text-blue-600"
                : "text-gray-500"
            )}
          />
        )}

        {/* Name */}
        <span
          className={cn(
            `text-sm truncate`,
            isFolder
              ? "font-medium text-gray-800 dark:text-gray-200"
              : "text-gray-700 dark:text-gray-200"
          )}
        >
          {node.name}
        </span>

        {/* Optional badge or count */}
        {node.badge && (
          <span className="ml-auto text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
            {node.badge}
          </span>
        )}
      </motion.div>

      {/* Children */}
      <AnimatePresence>
        {isFolder && hasChildren && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            {node.children?.map((child: TreeNodeType) => (
              <TreeNode
                key={child.id}
                node={child}
                level={level + 1}
                expandedIds={expandedIds}
                selectedId={selectedId}
                onToggle={onToggle}
                onSelect={onSelect}
                showIcons={showIcons}
                showLines={showLines}
                iconSize={iconSize}
                nodeClassName={nodeClassName}
                selectedClassName={selectedClassName}
                hoverClassName={hoverClassName}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FolderTree: React.FC<FolderTreeProps> = ({
  data,
  onSelect = () => {},
  onToggle = () => {},
  initialExpanded = [],
  initialSelected = null,
  showIcons = true,
  showLines = true,
  containerClassName = "",
  nodeClassName = "",
  selectedClassName = "",
  hoverClassName = "",
  iconSize = 16,
  maxHeight = "24rem",
  className = "",
}) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(initialExpanded)
  );
  const [selectedId, setSelectedId] = useState<string | null>(
    initialSelected || null
  );
  const handleToggle = useCallback(
    (nodeId: string) => {
      setExpandedIds((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(nodeId)) {
          newSet.delete(nodeId);
        } else {
          newSet.add(nodeId);
        }
        return newSet;
      });
      onToggle(nodeId);
    },
    [onToggle]
  );

  const handleSelect = useCallback(
    (node: TreeNodeType) => {
      setSelectedId(node.id);
      onSelect(node);
    },
    [onSelect]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden",
        className
      )}
    >
      {/* Tree Content */}
      <div
        className={cn("overflow-y-auto", containerClassName)}
        style={{ maxHeight }}
      >
        {data ? (
          <TreeNode
            node={data}
            expandedIds={expandedIds}
            selectedId={selectedId}
            onToggle={handleToggle}
            onSelect={handleSelect}
            showIcons={showIcons}
            showLines={showLines}
            iconSize={iconSize}
            nodeClassName={nodeClassName}
            selectedClassName={selectedClassName}
            hoverClassName={hoverClassName}
          />
        ) : (
          <div className="p-8 text-center text-gray-500">
            <File size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No files found</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FolderTree;
