export const parentComponents = [
  "accordion",
  "alert-dialog",
  "spotlightcard",
  // Add more parent component names here
] as const;

export type ParentComponentKeys = (typeof parentComponents)[number];
