"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type AnimatedShowcaseProps = {
  components: {
    name: string;
    component: React.ReactNode;
  }[];
  title?: string;
  subtitle?: string;
  description?: string;
};

export default function AnimatedShowcase({
  components,
  title = "ScrollX-UI",
  subtitle = "An open source collection of animated, interactive components",
  description = "Create stunning and memorable user interfaces with premium, handcrafted components. ScrollX-UI blends the best of modern UI frameworks to deliver elegance, efficiency, and seamless design.",
}: AnimatedShowcaseProps) {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );
  const [isBlurred, setIsBlurred] = useState(true);

  const handleViewComponent = (componentName: string) => {
    setSelectedComponent(componentName);
    setIsBlurred(true);
  };

  const handleCloseComponent = () => {
    setSelectedComponent(null);
  };

  const handleAnimationComplete = () => {
    if (!selectedComponent) {
      setTimeout(() => {
        setIsBlurred(false);
      }, 300);
    }
  };

  return (
    <div className="w-full h-screen p-6 relative overflow-hidden flex items-center justify-center">
      <div className="text-center">
        <motion.h1
          className={`text-center mb-8 transition-all duration-500 ${
            isBlurred ? "blur" : ""
          }`}
          animate={{ blur: isBlurred ? 5 : 0 }}
        >
          <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 truncate">
            {title}
          </div>

          <div className="text-base sm:text-lg md:text-xl font-medium mb-2">
            {subtitle}
          </div>

          <div className="text-sm sm:text-base max-w-md sm:max-w-xl mx-auto font-normal  leading-relaxed">
            {description}
          </div>
        </motion.h1>

        <div className="flex justify-center">
          {components.map((component) => (
            <motion.button
              key={component.name}
              onClick={() => handleViewComponent(component.name)}
              className={cn(
                buttonVariants(),
                "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white mx-2"
              )}
              style={{ perspective: 1000 }}
              whileHover={{
                rotateX: 25,
                rotateY: 10,
                translateZ: 100,
                scale: 1.1,
                boxShadow: "0px 20px 50px rgba(0, 102, 255, 0.4)",
              }}
              transition={{ type: "spring", stiffness: 150, damping: 10 }}
            >
              View
            </motion.button>
          ))}
        </div>

        <AnimatePresence onExitComplete={handleAnimationComplete}>
          {selectedComponent && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
                onClick={handleCloseComponent}
              />

              <motion.div
                className="rounded-lg p-8 flex flex-col items-center relative z-20"
                initial={{ y: 300, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
                onAnimationComplete={() => {
                  if (selectedComponent) {
                    setTimeout(() => {
                      handleCloseComponent();
                    }, 100);
                  }
                }}
              >
                <div className="component-container">
                  {
                    components.find((c) => c.name === selectedComponent)
                      ?.component
                  }
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
