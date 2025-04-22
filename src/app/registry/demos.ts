export const demoComponents = [
  "accordion-demo",
  "alertdialog-demo",
  "aspectratio-demo",
  "avatar-demo",
  "button-demo",
  "spotlightcard-demo",
  // Add more demo components here
] as const;

export type DemoComponentKeys = (typeof demoComponents)[number];
