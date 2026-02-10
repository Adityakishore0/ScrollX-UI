import fs from 'fs';
import path from 'path';
import { parentComponents } from '@/app/registry/parents';

export async function getParentSource(name: string): Promise<string> {
  try {
    if (!(parentComponents as readonly string[]).includes(name)) {
      return `// Source for ${name} not found`;
    }

    const filePath = path.join(
      process.cwd(),
      'src/components/ui',
      `${name}.tsx`,
    );

    const source = fs.readFileSync(filePath, 'utf-8');
    return source;
  } catch (error) {
    console.error(`Error loading source for ${name}:`, error);
    return `// Error loading source for ${name}`;
  }
}
