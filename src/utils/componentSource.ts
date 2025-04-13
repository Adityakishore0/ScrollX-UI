const sources: Record<string, () => Promise<string>> = {
  "accordion-demo": async () =>
    (await import("@/components/demos/accordion-demo.tsx?raw")).default,

  // ...
};

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
