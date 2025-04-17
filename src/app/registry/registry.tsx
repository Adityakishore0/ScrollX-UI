import dynamic from "next/dynamic";
import React from "react";
import { demoComponents } from "./demos";
// This file is responsible for dynamically importing demo components.
export type RegisteredComponent = React.ComponentType<Record<string, unknown>>;

const componentsRegistry: Record<string, RegisteredComponent> =
  demoComponents.reduce((acc, componentName) => {
    acc[componentName] = dynamic(
      () => import(`@/components/demos/${componentName}`),
      {
        loading: () => <div>Loading component...</div>,
      }
    );
    return acc;
  }, {} as Record<string, RegisteredComponent>);

export default componentsRegistry;
