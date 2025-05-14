"use client";

import Followcursor from "@/components/ui/followcursor";

export default function FollowcursorDemo() {
  return (
    <div className="w-screen h-[400px]  relative overflow-hidden">
      <Followcursor
        className="my-custom-class"
        style={{ height: "400px" }}
        colors={["#FF6B6B", "#4ECDC4", "#3A86FF"]}
        thickness={{ min: 20, max: 80 }}
        count={{ min: 10, max: 20 }}
        bgColor="rgba(10, 10, 20, 0.9)"
      />
      <div className="absolute inset-0 flex items-center justify-center z-10 p-4">
        <div className="w-full max-w-[1200px] text-center px-4">
          <h1 className="text-white/10 hover:text-white font-bold transition-colors duration-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl whitespace-nowrap select-none">
            Hover Me.
          </h1>
        </div>
      </div>
    </div>
  );
}
