import StaggerChars from "@/components/ui/stagger-chars";
import React from "react";

const StaggerCharsDemo = () => {
  return (
    <StaggerChars
      text="DOWN"
      direction="down"
      hoverClassName="text-orange-400"
      delay={0.03}
    />
  );
};

export default StaggerCharsDemo;
