#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';

const CONFIG = {
  REGISTRY_DIR: 'public/registry',
  SRC_DIR: 'src',
  ENCODING: 'utf8' as const,
};

interface RegistryFile {
  type: string;
  path: string;
  content: string;
}

interface Registry {
  $schema?: string;
  name: string;
  type: string;
  title?: string;
  description?: string;
  author?: string;
  registryDependencies?: string[];
  dependencies?: string[];
  cssVars?: Record<string, unknown>;
  css?: Record<string, unknown>;
  files: RegistryFile[];
}

interface ProcessResult {
  success: boolean;
  updated: number;
  errors: number;
  skipped: number;
}

function readFileContent(filePath: string): string | null {
  try {
    const content = fs.readFileSync(filePath, CONFIG.ENCODING);
    return content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, (error as Error).message);
    return null;
  }
}

function extractComponentName(filePath: string): string | null {
  const match = filePath.match(/components\/ui\/(.+)\.tsx$/);
  return match ? match[1] : null;
}

function resolveFilePath(jsonPath: string): string {
  return path.join(process.cwd(), CONFIG.SRC_DIR, jsonPath);
}

function processRegistryFile(registryFilePath: string): ProcessResult {
  console.log(`\nProcessing: ${path.basename(registryFilePath)}`);

  try {
    const jsonContent = fs.readFileSync(registryFilePath, CONFIG.ENCODING);
    const registry: Registry = JSON.parse(jsonContent);

    if (!registry.files || !Array.isArray(registry.files)) {
      console.log(`  ⚠️  No files array found, skipping...`);
      return { success: false, updated: 0, errors: 0, skipped: 0 };
    }

    let updatedCount = 0;
    let errorCount = 0;
    let skippedCount = 0;

    const mainComponentName = registry.name;
    const componentNames: string[] = [];

    registry.files.forEach((file, index) => {
      if (!file.path) {
        console.log(`  ⚠️  File at index ${index} has no path, skipping...`);
        errorCount++;
        return;
      }

      if (file.path === 'lib/utils.ts') {
        console.log(`  ⏭️  Skipping (always skip): ${file.path}`);
        delete (file as unknown as Record<string, unknown>).target;
        skippedCount++;
        return;
      }

      const componentName = extractComponentName(file.path);
      if (componentName && componentName !== mainComponentName) {
        componentNames.push(componentName);
      }

      file.type =
        file.type === 'registry:component' ? 'registry:ui' : file.type;
      delete (file as unknown as Record<string, unknown>).target;

      const actualFilePath = resolveFilePath(file.path);

      if (!fs.existsSync(actualFilePath)) {
        console.log(`  ❌ File not found: ${file.path}`);
        errorCount++;
        return;
      }

      const fileContent = readFileContent(actualFilePath);

      if (fileContent !== null) {
        file.content = fileContent;
        updatedCount++;
        console.log(`  ✅ Updated: ${file.path}`);
      } else {
        errorCount++;
      }
    });

    const uniqueDependencies = [...new Set(componentNames)].sort();

    const normalizedDependencies = registry.dependencies?.map((dep) =>
      dep === 'motion/react' ? 'motion' : dep,
    );

    const orderedRegistry: Registry = {
      $schema: registry.$schema,
      name: registry.name,
      type:
        registry.type === 'registry:component' ? 'registry:ui' : registry.type,
      title: registry.title,
      description: registry.description,
      author: registry.author,
      registryDependencies: uniqueDependencies,
      dependencies: normalizedDependencies,
      ...(registry.cssVars !== undefined && { cssVars: registry.cssVars }),
      ...(registry.css !== undefined && { css: registry.css }),
      files: registry.files,
    };

    if (uniqueDependencies.length > 0) {
      console.log(`  📦 Dependencies: [${uniqueDependencies.join(', ')}]`);
    }

    if (updatedCount > 0) {
      const formattedJson = JSON.stringify(orderedRegistry, null, 2);
      fs.writeFileSync(registryFilePath, formattedJson, CONFIG.ENCODING);
      console.log(`  📝 Saved ${updatedCount} file(s) to registry`);
    } else if (skippedCount > 0) {
      console.log(`  ℹ️  ${skippedCount} file(s) already populated`);
    } else {
      console.log(`  ℹ️  No files were updated`);
    }

    return {
      success: updatedCount > 0,
      updated: updatedCount,
      errors: errorCount,
      skipped: skippedCount,
    };
  } catch (error) {
    console.error(`  ❌ Error processing file:`, (error as Error).message);
    return { success: false, updated: 0, errors: 1, skipped: 0 };
  }
}

function main(): void {
  const args = process.argv.slice(2);

  console.log('🚀 Starting registry population...\n');

  if (args.length > 0 && args[0] === '--component') {
    if (!args[1]) {
      console.error('❌ Please specify a component name');
      console.log(
        'Usage: npm run populate-registry -- --component <component-name>',
      );
      process.exit(1);
    }

    const componentName = args[1];
    const registryFile = path.join(
      process.cwd(),
      CONFIG.REGISTRY_DIR,
      `${componentName}.json`,
    );

    if (!fs.existsSync(registryFile)) {
      console.error(`❌ Registry file not found: ${componentName}.json`);
      process.exit(1);
    }

    processRegistryFile(registryFile);
    console.log('\n✨ Registry population complete!');
    return;
  }

  const registryPath = path.join(process.cwd(), CONFIG.REGISTRY_DIR);

  if (!fs.existsSync(registryPath)) {
    console.error(`❌ Registry directory not found: ${registryPath}`);
    process.exit(1);
  }

  const jsonFiles = fs
    .readdirSync(registryPath)
    .filter((file) => file.endsWith('.json'))
    .map((file) => path.join(registryPath, file));

  if (jsonFiles.length === 0) {
    console.log('⚠️  No JSON files found in registry directory');
    process.exit(0);
  }

  console.log(`Found ${jsonFiles.length} registry file(s)\n`);

  let totalUpdated = 0;
  let totalErrors = 0;
  let totalSkipped = 0;
  let successCount = 0;

  jsonFiles.forEach((file) => {
    const result = processRegistryFile(file);
    if (result.success) successCount++;
    totalUpdated += result.updated;
    totalErrors += result.errors;
    totalSkipped += result.skipped;
  });

  console.log('\n' + '='.repeat(50));
  console.log(`✨ Registry population complete!`);
  console.log(`📊 Summary:`);
  console.log(`   - Total registries processed: ${jsonFiles.length}`);
  console.log(`   - Successfully updated: ${successCount}`);
  console.log(`   - Total files updated: ${totalUpdated}`);
  console.log(`   - Files skipped (already populated): ${totalSkipped}`);
  if (totalErrors > 0) {
    console.log(`   - Errors encountered: ${totalErrors}`);
  }
  console.log('='.repeat(50));
}

main();
