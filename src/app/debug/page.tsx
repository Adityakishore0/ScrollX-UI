import fs from "fs";
import path from "path";

export default function DebugPage() {
  const contentDir = path.join(process.cwd(), "content");
  const docsDir = path.join(contentDir, "docs");

  const contentDirExists = fs.existsSync(contentDir);
  const docsDirExists = fs.existsSync(docsDir);

  let mdxFiles: string[] = [];

  if (docsDirExists) {
    try {
      mdxFiles = fs
        .readdirSync(docsDir)
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => file.replace(/\.mdx$/, ""));
    } catch (error) {
      console.error("Error reading docs directory:", error);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Information</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Directory Check</h2>
        <p>
          Content directory exists:{" "}
          <span
            className={contentDirExists ? "text-green-600" : "text-red-600"}
          >
            {contentDirExists ? "Yes" : "No"}
          </span>
        </p>
        <p>
          Docs directory exists:{" "}
          <span className={docsDirExists ? "text-green-600" : "text-red-600"}>
            {docsDirExists ? "Yes" : "No"}
          </span>
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">MDX Files</h2>
        {mdxFiles.length > 0 ? (
          <ul className="list-disc pl-5">
            {mdxFiles.map((file) => (
              <li key={file}>{file}.mdx</li>
            ))}
          </ul>
        ) : (
          <p className="text-red-600">
            No MDX files found in the docs directory.
          </p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Next Steps</h2>
        <ul className="list-disc pl-5">
          <li>
            Make sure you have created the <code>content/docs</code> directory
          </li>
          <li>
            Add at least <code>introduction.mdx</code> to the docs directory
          </li>
          <li>
            Check your <code>next.config.mjs</code> for proper MDX configuration
          </li>
        </ul>
      </div>
    </div>
  );
}
