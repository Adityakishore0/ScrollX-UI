"use client";

import { Folder, FolderContent } from "@/components/ui/folder";

export default function FolderDemo() {
  return (
    <Folder size="xxs">
      <FolderContent>
        <div className="text-center">
          <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-xl md:text-2xl relative z-20 font-bold tracking-tight">
            ScrollX UI
          </h2>
        </div>
      </FolderContent>
    </Folder>
  );
}
