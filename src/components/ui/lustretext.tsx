import React from "react";

interface LustreTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const LustreText: React.FC<LustreTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
}) => {
  const animationStyle = {
    animationDuration: `${speed}s`,
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationFillMode: "forwards",
  };

  return (
    <span
      className={`
    lustre-text
    ${!disabled ? "animate-shine" : ""}
    dark:lustre-dark lustre-light
    ${className}
  `}
      style={!disabled ? animationStyle : undefined}
    >
      {text}
    </span>
  );
};

export default LustreText;
