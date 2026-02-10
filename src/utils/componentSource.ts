import fs from 'fs';
import path from 'path';
import { demoComponents } from '@/app/registry/demos';

export async function getComponentSource(name: string): Promise<string> {
  try {
    if (!(demoComponents as readonly string[]).includes(name)) {
      return `// Source for ${name} not found`;
    }

    const filePath = path.join(
      process.cwd(),
      'src/components/demos',
      `${name}.tsx`,
    );

    const source = fs.readFileSync(filePath, 'utf-8');
    return source;
  } catch (error) {
    console.error(`Error loading source for ${name}:`, error);
    return `// Error loading source for ${name}`;
  }
}
