import React from "react";
import FolderTree from "@/components/ui/folder-tree";

const FolderTreeWithBadges = () => {
  return (
    <div className="h-auto w-full">
      <FolderTree.Root
        defaultExpanded={["root"]}
        defaultSelected="src"
        className="w-full"
      >
        <FolderTree.Item id="root" label="ScrollX-UI">
          <FolderTree.Content>
            <FolderTree.Item id="src" label="src" badge={"12"}>
              <FolderTree.Content>
                <FolderTree.Item id="components" label="components" badge={"2"}>
                  <FolderTree.Content>
                    <FolderTree.Item
                      id="button"
                      label="button.tsx"
                    ></FolderTree.Item>
                  </FolderTree.Content>
                </FolderTree.Item>
              </FolderTree.Content>
            </FolderTree.Item>
            <FolderTree.Item id="lib" label="lib" modified badge={"5"}>
              <FolderTree.Content>
                <FolderTree.Item
                  id="utils"
                  label="utils.ts"
                  untracked
                ></FolderTree.Item>
              </FolderTree.Content>
            </FolderTree.Item>
            <FolderTree.Item id="file4" label="readme.md" />
          </FolderTree.Content>
        </FolderTree.Item>
      </FolderTree.Root>
    </div>
  );
};

export default FolderTreeWithBadges;
