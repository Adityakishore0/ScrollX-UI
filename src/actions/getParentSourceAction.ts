"use server";

import { getParentSource } from "../utils/parentSource";

export async function getParentSourceAction(
  name: string
): Promise<{ source: string }> {
  try {
    const source = await getParentSource(name);
    return { source };
  } catch (error) {
    console.error("Error in getParentSourceAction:", error);
    return { source: `// Error loading source code for ${name}` };
  }
}
