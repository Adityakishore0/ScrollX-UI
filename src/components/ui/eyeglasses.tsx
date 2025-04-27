"use client";
import React, { useState } from "react";

interface EyeglassesFrameProps {
  colorOptions?: Record<string, string>;
  initialColor?: string;
  className?: string;
  showColorPicker?: boolean;
  size?: "sm" | "md" | "lg";
}

type ColorMapping = Record<string, string>;

export default function EyeglassesFrame({
  colorOptions = {
    black: "bg-black border-black",
    brown: "bg-amber-800 border-amber-800",
    blue: "bg-blue-700 border-blue-700",
    red: "bg-red-700 border-red-700",
    purple: "bg-purple-700 border-purple-700",
  },
  initialColor = "black",
  className = "",
  showColorPicker = true,
  size = "md",
}: EyeglassesFrameProps): JSX.Element {
  const [frameColor, setFrameColor] = useState<string>(initialColor);

  const sizeClasses = {
    sm: {
      container: "w-60 h-24",
      lens: "w-24 h-18 border-3",
      temple: "w-8 h-1.5",
      bridge: "w-4 h-1.5",
      nosePad: "w-1.5 h-3 gap-9",
    },
    md: {
      container: "w-80 h-32",
      lens: "w-32 h-24 border-4",
      temple: "w-12 h-2",
      bridge: "w-5 h-2",
      nosePad: "w-2 h-4 gap-12",
    },
    lg: {
      container: "w-96 h-40",
      lens: "w-40 h-32 border-4",
      temple: "w-16 h-3",
      bridge: "w-6 h-3",
      nosePad: "w-2.5 h-5 gap-14",
    },
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-6  ${className}`}
    >
      {showColorPicker && (
        <div className="mb-6">
          <div className="flex gap-2">
            {Object.keys(colorOptions).map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full ${colorOptions[color]} ${
                  frameColor === color
                    ? "ring-2 ring-offset-2 ring-blue-500"
                    : ""
                }`}
                onClick={() => setFrameColor(color)}
                aria-label={`Select ${color} frame`}
              />
            ))}
          </div>
        </div>
      )}

      <div className={`relative ${sizeClasses[size].container}`}>
        <div
          className={`absolute left-0 top-12 ${sizeClasses[size].temple} ${colorOptions[frameColor]} rounded-l-lg transform -rotate-6 origin-right`}
        ></div>
        <div
          className={`absolute right-0 top-12 ${sizeClasses[size].temple} ${colorOptions[frameColor]} rounded-r-lg transform rotate-6 origin-left`}
        ></div>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <div
            className={`relative ${sizeClasses[size].lens} ${colorOptions[frameColor]} rounded-full overflow-hidden mr-2 bg-opacity-20 bg-gray-200`}
          >
            <div className="absolute inset-0 bg-blue-50 bg-opacity-20"></div>
          </div>

          <div
            className={`${sizeClasses[size].bridge} ${colorOptions[frameColor]} self-center`}
          ></div>
          <div
            className={`relative ${sizeClasses[size].lens} ${colorOptions[frameColor]} rounded-full overflow-hidden ml-2 bg-opacity-20 bg-gray-200`}
          >
            <div className="absolute inset-0 bg-blue-50 bg-opacity-20"></div>
          </div>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 top-20">
          <div
            className={`flex ${sizeClasses[size].nosePad
              .split(" ")
              .pop()} mt-2`}
          >
            <div
              className={`${sizeClasses[size].nosePad.split(" ")[0]} ${
                sizeClasses[size].nosePad.split(" ")[1]
              } bg-gray-300 rounded-b-full transform rotate-12`}
            ></div>
            <div
              className={`${sizeClasses[size].nosePad.split(" ")[0]} ${
                sizeClasses[size].nosePad.split(" ")[1]
              } bg-gray-300 rounded-b-full transform -rotate-12`}
            ></div>
          </div>
        </div>
      </div>

      {showColorPicker && (
        <div className="mt-8 text-sm text-gray-600 dark:text-white">
          <p>Click on a color button to change the frame color</p>
        </div>
      )}
    </div>
  );
}
