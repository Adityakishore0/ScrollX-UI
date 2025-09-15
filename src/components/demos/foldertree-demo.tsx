import FolderTree from "@/components/ui/folder-tree";
import React from "react";

const folderTreeData = {
  id: "root",
  name: "ScrollX-UI",
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
          extension: "ts",
          children: [
            {
              id: "folder-tree",
              name: "folder-tree.tsx",
              type: "file",
              extension: "tsx",
            },
          ],
        },
        {
          id: "lib",
          name: "lib",
          type: "folder",
          extension: "ts",
          children: [
            {
              id: "util",
              name: "util.ts",
              type: "file",
              extension: "ts",
            },
          ],
        },
      ],
    },
    {
      id: "public",
      name: "public",
      type: "folder",
      children: [
        {
          id: "favicon.ico",
          name: "favicon.ico",
          type: "file",
          extension: "ico",
        },
      ],
    },
    {
      id: "README",
      name: "README",
      type: "file",
      extension: "md",
    },
  ],
};

const FolderTreeDemo = () => {
  return (
    <div className="p-4 h-auto w-full">
      <FolderTree data={folderTreeData} initialExpanded={["root"]} />
    </div>
  );
};

export default FolderTreeDemo;
