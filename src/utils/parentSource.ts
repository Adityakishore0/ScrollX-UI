import { parentComponents } from "@/app/registry/parents";

const sources: Record<string, () => Promise<string>> = parentComponents.reduce(
  (acc, name) => {
    acc[name] = async () =>
      (await import(`@/components/ui/${name}.tsx?raw`)).default;
    return acc;
  },
  {} as Record<string, () => Promise<string>>
);

export async function getParentSource(name: string): Promise<string> {
  try {
    if (sources[name]) {
      const mod = await sources[name]();
      return mod;
    } else {
      return `// Source for ${name} not found`;
    }
  } catch (error) {
    return `// Error loading source for ${name}`;
  }
}
