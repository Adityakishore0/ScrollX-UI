import React from "react";
import FolderTree from "@/components/ui/folder-tree";

const customIconsData = {
  id: "root",
  name: "Project",
  type: "folder",
  children: [
    {
      id: "src",
      name: "src",
      type: "folder",
      children: [
        {
          id: "components",
          name: "components",
          type: "folder",
          badge: "12",
          children: [
            {
              id: "button",
              name: "Button.tsx",
              type: "file",
              extension: "tsx",
            },
            { id: "card", name: "Card.tsx", type: "file", extension: "tsx" },
            { id: "input", name: "Input.tsx", type: "file", extension: "tsx" },
          ],
        },
        {
          id: "styles",
          name: "styles",
          type: "folder",
          children: [
            {
              id: "globals",
              name: "globals.css",
              type: "file",
              extension: "css",
            },
            { id: "theme", name: "theme.ts", type: "file", extension: "ts" },
          ],
        },
        { id: "app", name: "app.tsx", type: "file", extension: "tsx" },
        { id: "index", name: "index.ts", type: "file", extension: "ts" },
      ],
    },
    {
      id: "public",
      name: "public",
      type: "folder",
      children: [
        { id: "favicon", name: "favicon.ico", type: "file", extension: "ico" },
        { id: "logo", name: "logo.png", type: "file", extension: "png" },
      ],
    },
    {
      id: "config",
      name: "config",
      type: "folder",
      badge: "3",
      children: [
        {
          id: "next-config",
          name: "next.config.js",
          type: "file",
          extension: "js",
        },
        {
          id: "tailwind",
          name: "tailwind.config.js",
          type: "file",
          extension: "js",
        },
        {
          id: "tsconfig",
          name: "tsconfig.json",
          type: "file",
          extension: "json",
        },
      ],
    },
    { id: "package", name: "package.json", type: "file", extension: "json" },
    { id: "readme", name: "README.md", type: "file", extension: "md" },
  ],
};

const FolderTreeWithBadges = () => {
  return (
    <div className="h-auto w-full">
      <FolderTree
        data={customIconsData}
        initialExpanded={["root", "src", "components"]}
        showIcons={true}
        iconSize={16}
        nodeClassName="py-1.5 px-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded"
        selectedClassName="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
      />
    </div>
  );
};

export default FolderTreeWithBadges;
