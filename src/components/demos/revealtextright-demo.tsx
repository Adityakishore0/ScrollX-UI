"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RevealText } from "@/components/ui/reveal-text";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { twMerge } from "tailwind-merge";

export default function RevealTextDemo() {
  const [key, setKey] = useState(0);
  const [rotate, setRotate] = useState(false);

  const handleReload = () => {
    setRotate(true);
    setKey((prev) => prev + 1);
    setTimeout(() => setRotate(false), 600);
  };

  return (
    <>
      <Button
        onClick={handleReload}
        className="absolute right-4 top-4 p-2 z-20"
        aria-label="Reload animation"
        variant="outline"
      >
        <motion.div
          animate={{ rotate: rotate ? 360 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <RefreshCw className="w-6 h-6" />
        </motion.div>
      </Button>

      <div
        key={key}
        className={twMerge(
          "flex min-h-[350px] w-full justify-center items-center rounded p-10"
        )}
      >
        <RevealText
          key={key}
          mode="manual"
          direction="right"
          delay={0.2}
          stagger={0.15}
          className="text-5xl font-bold"
        >
          Smooth visuals in motion
        </RevealText>
      </div>
    </>
  );
}
