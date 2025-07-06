"use client";

import { motion } from "framer-motion";
import { Sparkles, Code, Palette, Zap, Layers, LayoutGrid } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Beautiful Animations",
      description:
        "Add stunning animations to your UI with minimal effort. Transform your static components into dynamic, engaging interfaces.",
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
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:bg-gradient-to-r dark:from-[#0c0c0c] dark:via-black dark:to-[#0c0c0c]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Features that set us apart
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              ScrollX-UI combines the best elements from top UI libraries to
              provide you with an exceptional development experience.
            </p>
          </motion.div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-start space-y-3 rounded-lg border p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
