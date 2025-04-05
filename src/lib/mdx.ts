// src/lib/mdx.ts
import fs from "fs";
import path from "path";

// Utility to list all available MDX files
export function getAllDocs() {
  const docsDirectory = path.join(process.cwd(), "content/docs");

  try {
    // Check if directory exists
    if (!fs.existsSync(docsDirectory)) {
      console.error(`MDX directory does not exist: ${docsDirectory}`);
      return [];
    }

    // Get all files recursively
    const getAllFiles = (dir: string): string[] => {
      const files = fs.readdirSync(dir);

      return files.reduce((allFiles: string[], file) => {
        const filePath = path.join(dir, file);
        const relativePath = path.relative(docsDirectory, filePath);

        if (fs.statSync(filePath).isDirectory()) {
          return [...allFiles, ...getAllFiles(filePath)];
        } else if (file.endsWith(".mdx")) {
          return [...allFiles, relativePath.replace(/\.mdx$/, "")];
        }

        return allFiles;
      }, []);
    };

    return getAllFiles(docsDirectory);
  } catch (error) {
    console.error("Error reading MDX files:", error);
    return [];
  }
}

// Use this in your page.tsx to check for available files
// import { getAllDocs } from '@/lib/mdx';
// console.log('Available docs:', getAllDocs());
