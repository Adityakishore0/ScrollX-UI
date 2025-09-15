"use client";

import React, { useState, useCallback, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Folder,
  FolderOpen,
  File,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FolderTreeContextType {
  expandedIds: Set<string>;
  selectedId: string | null;
  toggleExpanded: (id: string) => void;
  setSelected: (id: string) => void;
  onSelect?: (id: string, label: string) => void;
  level: number;
}

const FolderTreeContext = createContext<FolderTreeContextType | null>(null);

const useFolderTree = () => {
  const context = useContext(FolderTreeContext);
  if (!context) {
    throw new Error(
      "FolderTree components must be used within FolderTree.Root"
    );
  }
  return context;
};

interface RootProps {
  defaultExpanded?: string[];
  defaultSelected?: string;
  onSelect?: (id: string, label: string) => void;
  maxHeight?: string | number;
  className?: string;
  children: React.ReactNode;
}

interface ItemProps {
  id: string;
  label: string;
  icon?: LucideIcon;
  badge?: string | number;
  modified?: boolean;
  untracked?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface TriggerProps {
  className?: string;
}

interface ContentProps {
  children: React.ReactNode;
  className?: string;
}

const Root: React.FC<RootProps> = ({
  defaultExpanded = [],
  defaultSelected,
  onSelect,
  maxHeight = "24rem",
  className = "",
  children,
}) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(defaultExpanded)
  );
  const [selectedId, setSelectedId] = useState<string | null>(
    defaultSelected || null
  );

  const toggleExpanded = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const setSelected = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const contextValue: FolderTreeContextType = {
    expandedIds,
    selectedId,
    toggleExpanded,
    setSelected,
    onSelect,
    level: 0,
  };

  return (
    <FolderTreeContext.Provider value={contextValue}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={cn(
          "bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden",
          className
        )}
        role="tree"
      >
        <div
          className="w-full overflow-y-auto rounded-md bg-background p-2 text-sm"
          style={{ maxHeight }}
        >
          {children}
        </div>
      </motion.div>
    </FolderTreeContext.Provider>
  );
};

const ItemContext = createContext<{
  itemId: string;
  hasChildren: boolean;
  isExpanded: boolean;
  toggleExpanded: () => void;
} | null>(null);

const Item: React.FC<ItemProps> = ({
  id,
  label,
  icon,
  badge,
  modified,
  untracked,
  className = "",
  children,
}) => {
  const context = useFolderTree();
  const hasChildren = React.Children.count(children) > 0;
  const isExpanded = context.expandedIds.has(id);
  const isSelected = context.selectedId === id;

  const childContextValue: FolderTreeContextType = {
    ...context,
    level: context.level + 1,
  };

  const handleItemClick = useCallback(() => {
    context.setSelected(id);
    if (context.onSelect) {
      context.onSelect(id, label);
    }
  }, [id, label, context]);

  const toggleExpanded = useCallback(() => {
    if (hasChildren) {
      context.toggleExpanded(id);
    }
  }, [id, hasChildren, context]);

  const IconComponent =
    icon || (hasChildren ? (isExpanded ? FolderOpen : Folder) : File);

  const itemContextValue = {
    itemId: id,
    hasChildren,
    isExpanded,
    toggleExpanded,
  };

  return (
    <ItemContext.Provider value={itemContextValue}>
      <FolderTreeContext.Provider value={childContextValue}>
        <div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: context.level * 0.05 }}
            className={cn(
              "flex items-center gap-2 rounded px-2 py-1.5 text-sm transition-colors cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-slate-700/50",
              isSelected &&
                "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
              className
            )}
            style={{ paddingLeft: `${context.level * 20 + 12}px` }}
            onClick={(e: React.MouseEvent) => {
              handleItemClick();
              e.stopPropagation();
              toggleExpanded();
            }}
            role="treeitem"
            tabIndex={context.selectedId === id ? 0 : -1}
            aria-expanded={hasChildren ? isExpanded : undefined}
            aria-selected={isSelected ? true : undefined}
          >
            {hasChildren && (
              <motion.span
                className="flex-shrink-0 cursor-pointer"
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight
                  size={14}
                  className="text-gray-500 dark:text-gray-400"
                />
              </motion.span>
            )}

            {!hasChildren && <span className="w-3.5 mr-2" />}

            {IconComponent && (
              <IconComponent
                size={16}
                className={cn(
                  "mr-1 flex-shrink-0",
                  hasChildren
                    ? isSelected
                      ? "text-blue-600"
                      : "text-blue-500"
                    : isSelected
                    ? "text-blue-600"
                    : "text-gray-500"
                )}
              />
            )}

            <span className="flex-1">{label}</span>

            {badge && (
              <span className="ml-auto text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
                {badge}
              </span>
            )}
            {modified && (
              <span className="ml-auto text-xs bg-yellow-200 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-200 px-2 py-0.5 rounded-full">
                M
              </span>
            )}
            {untracked && (
              <span className="ml-auto text-xs bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200 px-2 py-0.5 rounded-full">
                U
              </span>
            )}
          </motion.div>
          {children}
        </div>
      </FolderTreeContext.Provider>
    </ItemContext.Provider>
  );
};

const Trigger: React.FC<TriggerProps> = ({ className = "" }) => {
  const itemContext = useContext(ItemContext);

  if (!itemContext || !itemContext.hasChildren) {
    return null;
  }

  return (
    <motion.span
      className={cn("mr-2 flex-shrink-0 cursor-pointer", className)}
      animate={{ rotate: itemContext.isExpanded ? 90 : 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        itemContext.toggleExpanded();
      }}
    >
      <ChevronRight size={14} className="text-gray-500 dark:text-gray-400" />
    </motion.span>
  );
};

const Content: React.FC<ContentProps> = ({ children, className = "" }) => {
  const itemContext = useContext(ItemContext);

  if (!itemContext) {
    return <>{children}</>;
  }

  const hasContent = React.Children.count(children) > 0;

  return (
    <AnimatePresence>
      {hasContent && itemContext.isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
          className={className}
          role="group"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FolderTree = {
  Root,
  Item,
  Trigger,
  Content,
};

export default FolderTree;
