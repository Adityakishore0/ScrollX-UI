export const parentComponents = [
  "accordion",
  "alert-dialog",
  "animated-showcase",
  "aspect-ratio",
  "avatar",
  "button",
  "card",
  "glowingbordercard",
  "lamphome",
  "light-trail",
  "profilecard",
  "spotlightcard",
  // Add more parent component names here
] as const;

export type ParentComponentKeys = (typeof parentComponents)[number];
