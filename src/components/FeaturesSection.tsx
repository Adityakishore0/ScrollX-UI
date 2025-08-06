"use client";

import { motion, useInView } from "framer-motion";
import {
  Sparkles,
  Code,
  Palette,
  Zap,
  Layers,
  LayoutGrid,
  Terminal,
} from "lucide-react";
import { AnimatedTextGenerate } from "@/components/ui/animated-textgenerate";
import { useRef } from "react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Beautiful Animations",
      description:
        "Add stunning animations to your UI with minimal effort. Transform your static components into dynamic, engaging interfaces.",
      className: "md:col-span-2",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Fully Customizable",
      description:
        "Every component is designed to be easily customized to match your brand and project requirements.",
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Themeable",
      description:
        "Built with a complete theming system that allows you to switch between light and dark modes effortlessly.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "High Performance",
      description:
        "Optimized for performance, ensuring smooth animations and transitions even on complex interfaces.",
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Modular Architecture",
      description:
        "Use only what you need. Each component is built as a standalone module that can be imported individually.",
    },
    {
      icon: <LayoutGrid className="h-6 w-6" />,
      title: "Responsive Design",
      description:
        "Every component adapts beautifully to different screen sizes, from desktop to mobile.",
    },
    {
      icon: <Terminal className="h-6 w-6" />,
      title: "CLI & Manual",
      description:
        "Easy installation with CLI tools or manual setup. Get started in minutes with our comprehensive documentation.",
      className: "md:col-span-2",
    },
  ];

  const refs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const inViews = [
    useInView(refs[0], { margin: "0px 0px 0% 0px", once: true, amount: 0.65 }),
    useInView(refs[1], { margin: "0px 0px 0% 0px", once: true, amount: 0.65 }),
    useInView(refs[2], { margin: "0px 0px 0% 0px", once: true, amount: 0.65 }),
    useInView(refs[3], { margin: "0px 0px 0% 0px", once: true, amount: 0.65 }),
    useInView(refs[4], { margin: "0px 0px 0% 0px", once: true, amount: 0.65 }),
    useInView(refs[5], { margin: "0px 0px 0% 0px", once: true, amount: 0.65 }),
    useInView(refs[6], { margin: "0px 0px 0% 0px", once: true, amount: 0.65 }),
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: i * 0.1,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="w-full py-20 bg-gradient-to-b from-white to-gray-50 dark:bg-gradient-to-r dark:from-[#0c0c0c] dark:via-black dark:to-[#0c0c0c]">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Features that set us apart
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg">
            ScrollX UI is built from the ground up to offer a premium developer
            experience with unique, high-quality components.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(200px,1fr)] gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={`rounded-2xl border border-gray-200 dark:border-gray-800 p-6 backdrop-blur-sm bg-white/60 dark:bg-white/5 shadow-md transition-all duration-300 ${
                feature.className || ""
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center mb-4 rounded-full bg-primary/10 p-3 text-primary shadow-lg ring-1 ring-primary/10 w-fit"
              >
                {feature.icon}
              </motion.div>

              <h3 className="text-[1.25rem] md:text-[1.35rem] font-bold text-foreground mb-2">
                {feature.title}
              </h3>

              <div ref={refs[index]}>
                {inViews[index] && (
                  <AnimatedTextGenerate
                    text={feature.description}
                    className="mt-2"
                    textClassName="text-sm text-muted-foreground opacity-80"
                    blurEffect
                    speed={0.7}
                    highlightWords={[
                      "stunning",
                      "performance",
                      "standalone",
                      "customized",
                      "theming",
                      "minutes",
                      "beautifully",
                    ]}
                    highlightClassName="inline-block !text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 font-semibold"
                    linkWords={["components", "documentation", "Get started"]}
                    linkHrefs={[
                      "/docs/components",
                      "/docs",
                      "/docs/installation/cli",
                    ]}
                    linkClassNames={[
                      "underline decoration-blue-500 underline-offset-4 decoration-2 hover:decoration-blue-700 transition",
                      "underline decoration-emerald-500 underline-offset-4 decoration-2 hover:decoration-emerald-700 transition",
                      "underline decoration-purple-500 underline-offset-4 decoration-2 hover:decoration-purple-700 transition",
                    ]}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
