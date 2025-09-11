"use client";

import { useState } from "react";
import { Transition } from "@/components/ui/transition";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

export default function TransitionSlideRightDemo() {
  const [key, setKey] = useState(0);
  const [rotate, setRotate] = useState(false);

  const handleReload = () => {
    setRotate(true);
    setKey((prev) => prev + 1);
    setTimeout(() => setRotate(false), 600);
  };

  return (
    <div className="relative w-full min-h-[350px] flex items-center justify-center">
      <Transition
        key={key}
        introDuration={1.5}
        transitionDuration={1.0}
        type="slide"
        direction="right"
        autoExit
        className="bg-black dark:bg-white"
        intro={
          <div className="flex flex-col items-center justify-center h-full w-full">
            <h1 className="text-4xl md:text-6xl font-bold text-white dark:text-black">
              ScrollX UI
            </h1>
            <p className="mt-2 text-base md:text-lg text-gray-400 dark:text-gray-600">
              Build modern interfaces with ease
            </p>
          </div>
        }
      >
        <div className="flex flex-col items-center justify-center min-h-[350px] w-full space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white text-center">
            Smooth transitions,
            <br />
            zero effort.
          </h2>

          <Button
            onClick={handleReload}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <motion.div
              animate={{ rotate: rotate ? 360 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <RefreshCw className="w-5 h-5" />
            </motion.div>
            <span>Replay Transition</span>
          </Button>
        </div>
      </Transition>
    </div>
  );
}
