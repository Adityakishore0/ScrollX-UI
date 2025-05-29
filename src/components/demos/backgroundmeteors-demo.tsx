import BackgroundMeteors from "@/components/ui/backgroundmeteors";
import React from "react";

export default function BackgroundMeteorsDemo() {
  return (
    <BackgroundMeteors>
      <h2 className="relative z-20 text-center font-bold text-black dark:text-white font-sans tracking-tight text-[clamp(1.5rem,5vw,6rem)]">
        It&apos;s only delusional
        <br />
        <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
          <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-blue-500 via-purple-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
            <span>until it works.</span>
          </div>
          <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-4">
            <span>until it works.</span>
          </div>
        </div>
      </h2>
    </BackgroundMeteors>
  );
}
