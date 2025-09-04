import StaggerChars from "@/components/ui/stagger-chars";
import React from "react";

const StaggerCharsDifferentHoverText = () => {
  return (
    <StaggerChars
      text="HELLO"
      className="font-extrabold text-5xl md:text-6xl lg:text-8xl"
      hoverText="WORLD"
      hoverClassName="text-orange-400"
    />
  );
};

export default StaggerCharsDifferentHoverText;
