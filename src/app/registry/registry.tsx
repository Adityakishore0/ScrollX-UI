import React from "react";
import fs from "fs";
import path from "path";

// Import your demo components here
import AccordionDemo from "@/components/demos/accordion-demo";
// Import other demos as needed

// Type definitions
type ComponentProps = Record<string, unknown>;

type ComponentEntry = {
  component: React.ComponentType<ComponentProps>;
  sourceCode?: string;
};

type Registry = {
  [key: string]: ComponentEntry;
};

// Path mapping for source code files
const componentPaths: { [K in keyof Registry]: string } = {
  "accordion-demo": "@/components/demos/accordion-demo.tsx",
  // Add more components as needed
};

// Initialize the registry
const registry: Registry = {
  "accordion-demo": { component: AccordionDemo },
  // Add more components as needed
};

// Function to load source code (for server-side usage)
export function loadSourceCode() {
  if (typeof window !== "undefined") {
    console.warn("Source code loading is only available on the server.");
    return;
  }

  Object.keys(componentPaths).forEach((name) => {
    try {
      const fullPath = path.join(process.cwd(), componentPaths[name]);
      const source = fs.readFileSync(fullPath, "utf8");
      if (registry[name]) {
        registry[name].sourceCode = source;
      }
    } catch (error) {
      console.error(`Error loading source code for ${name}:`, error);
      if (registry[name]) {
        registry[
          name
        ].sourceCode = `// Error loading source code for "${name}"`;
      }
    }
  });
}

// Function to get a component
export async function getComponent(
  name: string
): Promise<React.ComponentType<ComponentProps> | null> {
  if (registry[name]?.component) {
    return registry[name].component;
  }

  try {
    // Fix: Don't assign to module variable
    const importedModule = await import(componentPaths[name]);
    const component = importedModule.default;
    registry[name] = { component }; // Cache the component in the registry
    return component;
  } catch (error) {
    console.error(`Error loading component "${name}":`, error);
    return null;
  }
}

// Function to get source code
export function getSourceCode(name: string): string {
  if (!registry[name]) {
    return `// Component "${name}" is not registered.`;
  }
  return registry[name].sourceCode || `// Source code for "${name}" not found.`;
}

// Function to check if a component exists
export function hasComponent(name: string): boolean {
  return !!registry[name];
}

// Get all component names
export function getAllComponentNames(): string[] {
  return Object.keys(registry);
}

// Function to register a component dynamically
export function registerComponent(
  name: string,
  component: React.ComponentType<ComponentProps>,
  sourceCode?: string
) {
  registry[name] = { component, sourceCode };
}
