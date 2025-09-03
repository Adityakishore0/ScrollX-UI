import StaggerChars, { EASING_PRESETS } from "@/components/ui/stagger-chars";
import React from "react";

const StaggerCharsDifferentHoverText = () => {
  return (
    <StaggerChars
      text="HELLO"
      hoverText="WORLD"
      className="text-white"
      fromClassName="text-white"
      toClassName="text-green-400"
      easing={EASING_PRESETS.bouncy}
    />
  );
};

export default StaggerCharsDifferentHoverText;
