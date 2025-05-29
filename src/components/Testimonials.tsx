"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content:
      "ScrollX-UI has completely transformed how I build interfaces. The animations are smooth and the components are incredibly flexible.",
    author: "Sarah Johnson",
    role: "Senior Frontend Developer",
  },
  {
    id: 2,
    content:
      "As a UI/UX designer, I've found ScrollX-UI to be the perfect bridge between design and implementation. My developers love it too!",
    author: "Michael Chen",
    role: "Product Designer at TechCorp",
  },
  {
    id: 3,
    content:
      "The best UI library I've used in years. The animations are butter-smooth and the API is so intuitive. Highly recommended!",
    author: "Alex Rivera",
    role: "Indie Developer",
  },
  {
    id: 4,
    content:
      "ScrollX-UI helped us reduce development time by 40%. The pre-built components allowed us to focus on business logic instead.",
    author: "Priya Sharma",
    role: "CTO at StartupX",
  },
  {
    id: 5,
    content:
      "Our landing page conversion rates increased by 30% after we implemented ScrollX-UI components. Users love the smooth interactions.",
    author: "David Wilson",
    role: "Marketing Lead",
  },
  {
    id: 6,
    content:
      "I was blown away by how easy it was to customize everything. The documentation is excellent too!",
    author: "Emma Thompson",
    role: "Frontend Engineer",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleTestimonials = testimonials.slice(activeIndex, activeIndex + 3);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 3 >= testimonials.length ? 0 : prev + 3));
  };

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev - 3 < 0 ? Math.max(0, testimonials.length - 3) : prev - 3
    );
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              What developers are saying
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Hear from the developer community about their experience with
              ScrollX-UI
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-5xl mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col p-6 bg-background rounded-lg shadow-sm border"
              >
                <div className="mb-4 text-primary">
                  <Quote size={24} />
                </div>
                <p className="text-foreground mb-4 flex-grow">
                  "{testimonial.content}"
                </p>
                <div>
                  <h4 className="font-medium">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span className="sr-only">Previous</span>
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
              <span className="sr-only">Next</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
