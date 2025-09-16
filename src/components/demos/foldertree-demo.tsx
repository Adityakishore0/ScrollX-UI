import FolderTree from "@/components/ui/folder-tree";
import React from "react";

const FolderTreeDemo = () => {
  return (
    <div className="p-4 h-auto w-full">
      <FolderTree.Root
        defaultExpanded={["root", "folder1"]}
        defaultSelected="file1"
        className="w-full"
      >
        <FolderTree.Item id="root" label="ScrollX-UI">
          <FolderTree.Content>
            <FolderTree.Item id="folder1" label="Documents">
              <FolderTree.Content>
                <FolderTree.Item id="file1" label="File 1.txt" />
                <FolderTree.Item id="file2" label="File 2.txt" />
                <FolderTree.Item id="file3" label="Image.png" />
              </FolderTree.Content>
            </FolderTree.Item>

            <FolderTree.Item id="folder2" label="Pictures">
              <FolderTree.Content>
                <FolderTree.Item id="image1" label="vacation.jpg" />
                <FolderTree.Item id="image2" label="family.png" />
              </FolderTree.Content>
            </FolderTree.Item>

            <FolderTree.Item id="file4" label="readme.md" />
          </FolderTree.Content>
        </FolderTree.Item>
      </FolderTree.Root>
    </div>
  );
};

export default FolderTreeDemo;
