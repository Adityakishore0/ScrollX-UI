const sources: Record<string, () => Promise<string>> = {
  accordion: async () =>
    (await import("@/components/ui/accordion.tsx?raw")).default,

  // ...
};

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
