export const parentComponents = [
  "accordion",
  "alert-dialog",
  // Add more parent component names here
] as const;

export type ParentComponentKeys = (typeof parentComponents)[number];
