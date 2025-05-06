export const parentComponents = [
  "accordion",
  "alert-dialog",
  "animated-button",
  "animated-showcase",
  "aspect-ratio",
  "avatar",
  "button",
  "card",
  "glowingbordercard",
  "interactive-input",
  "lamphome",
  "light-trail",
  "profilecard",
  "spotlightcard",
  // Add more parent component names here
] as const;

export type ParentComponentKeys = (typeof parentComponents)[number];
