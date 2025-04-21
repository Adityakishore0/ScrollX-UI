export const parentComponents = [
  "accordion",
  "alert-dialog",
  "aspect-ratio",
  "spotlightcard",
  // Add more parent component names here
] as const;

export type ParentComponentKeys = (typeof parentComponents)[number];
