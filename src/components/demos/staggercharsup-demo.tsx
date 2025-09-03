import StaggerChars from "@/components/ui/stagger-chars";
import React from "react";

const StaggerCharsDemo = () => {
  return (
    <StaggerChars
      text="UP"
      direction="up"
      className="text-white"
      fromClassName="text-white"
      toClassName="text-purple-400"
      delay={0.03}
    />
  );
};

export default StaggerCharsDemo;
