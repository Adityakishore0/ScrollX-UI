import StaggerChars from "@/components/ui/stagger-chars";
import React from "react";

const StaggerCharsDemo = () => {
  return (
    <StaggerChars
      text="UP"
      className="font-extrabold text-5xl md:text-6xl lg:text-8xl"
      direction="up"
      hoverClassName="text-purple-400"
      delay={0.03}
    />
  );
};

export default StaggerCharsDemo;
