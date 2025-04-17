export const demoComponents = [
  "accordion-demo",
  "alertdialog-demo",
  // Add more demo components here
] as const;

export type DemoComponentKeys = (typeof demoComponents)[number];
