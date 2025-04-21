"use client";

import * as React from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import type { AspectRatioProps } from "@radix-ui/react-aspect-ratio";

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 16 / 9, className, ...props }, ref) => (
    <AspectRatioPrimitive.Root
      ref={ref}
      ratio={ratio}
      className={className}
      {...props}
    />
  )
);

AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
