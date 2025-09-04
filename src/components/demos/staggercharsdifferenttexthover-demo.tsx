import StaggerChars from "@/components/ui/stagger-chars";
import React from "react";

const StaggerCharsDifferentHoverText = () => {
  return (
    <StaggerChars
      text="HELLO"
      hoverText="WORLD"
      hoverClassName="text-orange-400"
    />
  );
};

export default StaggerCharsDifferentHoverText;
