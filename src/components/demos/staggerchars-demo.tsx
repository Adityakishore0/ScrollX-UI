import StaggerChars from "@/components/ui/stagger-chars";
import React from "react";

const StaggerCharsDemo = () => {
  return (
    <StaggerChars
      text="HOVER ME"
      className="text-white"
      fromClassName="text-white"
      toClassName="text-blue-400"
    />
  );
};

export default StaggerCharsDemo;
