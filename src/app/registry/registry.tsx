// registry/registry.tsx
import dynamic from "next/dynamic";
import React from "react";

// Define the registry type
export type RegisteredComponent = React.ComponentType<Record<string, unknown>>;

// Use dynamic imports for better code splitting
const componentsRegistry: Record<string, RegisteredComponent> = {
  "accordion-demo": dynamic(() => import("@/components/demos/accordion-demo"), {
    loading: () => <div>Loading component...</div>,
  }),
  // Add other demos with their corresponding keys as needed
  // Examples:
  // 'button-demo': dynamic(() => import('../src/components/demos/button-demo'), {
  //   loading: () => <div>Loading component...</div>,
  // }),
  // 'card-demo': dynamic(() => import('../src/components/demos/card-demo'), {
  //   loading: () => <div>Loading component...</div>,
  // }),
};

export default componentsRegistry;
