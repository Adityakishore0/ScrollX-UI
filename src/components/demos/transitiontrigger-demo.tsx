"use client";

import { useState } from "react";
import { Transition } from "@/components/ui/transition";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

export default function TransitionTriggerDemo() {
  const [rotate, setRotate] = useState(false);
  const [key, setKey] = useState(0);

  return (
    <div className="relative w-full min-h-[350px] flex items-center justify-center">
      <Transition
        key={key}
        introDuration={1.5}
        transitionDuration={1.0}
        type="slide"
        direction="bottom"
        autoExit={false}
        className="bg-black dark:bg-white"
        intro={(triggerExit) => (
          <div className="flex flex-col items-center justify-center h-full w-full text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white dark:text-black">
              ScrollX UI
            </h1>
            <p className="mt-2 text-base md:text-lg text-gray-400 dark:text-gray-600">
              Build modern interfaces with ease
            </p>
            <Button
              onClick={() => {
                setRotate(true);
                triggerExit();
                setTimeout(() => setRotate(false), 600);
              }}
              variant="outline"
              className="flex items-center space-x-2 mt-4"
            >
              <motion.div
                animate={{ rotate: rotate ? 360 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <RefreshCw className="w-5 h-5" />
              </motion.div>
              <span>Trigger Transition</span>
            </Button>
          </div>
        )}
      >
        <div className="flex flex-col items-center justify-center min-h-[350px] w-full space-y-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white">
            Smooth transitions,
            <br />
            zero effort.
          </h2>
          <Button
            onClick={() => setKey((prev) => prev + 1)}
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
