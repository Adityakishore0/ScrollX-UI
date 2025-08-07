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
        loading: () => (
          <div className="flex items-center justify-center space-x-2 p-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent dark:border-white dark:border-t-black"></div>
            <span className="text-sm  overflow-hidden whitespace-nowrap ">
              Loading...
            </span>
          </div>
        ),
      }
    );
    return acc;
  }, {} as Record<string, RegisteredComponent>);

export default componentsRegistry;
