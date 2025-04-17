"use client";

import React, { ComponentType } from "react";

interface StepProps {
  children: React.ReactNode;
}

export function Steps({ children }: { children: React.ReactNode }) {
  const validSteps = React.Children.map(children, (child) => {
    if (
      React.isValidElement(child) &&
      (child.type as ComponentType<StepProps>).displayName === "Step"
    ) {
      return child;
    }
    return child;
  });

  return <div className="space-y-6">{validSteps}</div>;
}
