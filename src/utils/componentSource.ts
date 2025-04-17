import { demoComponents } from "@/app/registry/demos";

const sources: Record<string, () => Promise<string>> = demoComponents.reduce(
  (acc, name) => {
    acc[name] = async () =>
      (await import(`@/components/demos/${name}.tsx?raw`)).default;
    return acc;
  },
  {} as Record<string, () => Promise<string>>
);

export async function getComponentSource(name: string): Promise<string> {
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
