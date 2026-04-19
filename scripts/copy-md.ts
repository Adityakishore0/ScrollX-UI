import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.join(__dirname, '..', 'src/content/docs');
const OUTPUT_DIR = path.join(__dirname, '..', 'public/docs');

function copyMdFiles(srcDir: string, outDir: string): void {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);

    if (entry.isDirectory()) {
      copyMdFiles(srcPath, path.join(outDir, entry.name));
    } else if (entry.name.endsWith('.mdx')) {
      const mdPath = path.join(outDir, entry.name.replace(/\.mdx$/, '.md'));
      fs.copyFileSync(srcPath, mdPath);
      console.log(`✓ ${mdPath.replace(process.cwd(), '')}`);
    }
  }
}

copyMdFiles(SOURCE_DIR, OUTPUT_DIR);
console.log('Done.');
