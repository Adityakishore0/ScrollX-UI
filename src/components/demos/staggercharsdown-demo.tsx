import StaggerChars from "@/components/ui/stagger-chars";
import React from "react";

const StaggerCharsDemo = () => {
  return (
    <StaggerChars
      text="DOWN"
      className="font-extrabold text-5xl md:text-6xl lg:text-8xl"
      direction="down"
      hoverClassName="text-orange-400"
      delay={0.03}
    />
  );
};

export default StaggerCharsDemo;
