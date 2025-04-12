"use server";

import { getComponentSource } from "../utils/componentSource";

export async function getComponentSourceAction(
  name: string
): Promise<{ source: string }> {
  try {
    const source = await getComponentSource(name);
    return { source };
  } catch (error) {
    console.error("Error in getComponentSourceAction:", error);
    return { source: `// Error loading source code for ${name}` };
  }
}
