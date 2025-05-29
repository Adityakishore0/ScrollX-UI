import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function TestimonialsSection() {
  return (
    <section className="w-full py-12 md:py-20 lg:py-24 bg-muted/40">
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

      <div className="mt-12">
        <AnimatedTestimonials
          data={[
            {
              description:
                "ScrollX-UI has completely transformed how I build interfaces. The animations are silky smooth, and the components are modular and responsive.",
              image:
                "https://images.unsplash.com/photo-1611558709798-e009c8fd7706?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
              name: "Isabelle Carlos",
              handle: "@isabellecarlos",
            },
            {
              description:
                "I love how ScrollX-UI makes my projects look professional with minimal effort. The documentation is clear and the community is super helpful.",
              image:
                "https://plus.unsplash.com/premium_photo-1692340973636-6f2ff926af39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
              name: "Lana Akash",
              handle: "@lanaakash",
            },
            {
              description:
                "The smooth scrolling animations and intuitive components in ScrollX-UI save me hours of development time!",
              image:
                "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
              name: "Liam O’Connor",
              handle: "@liamoc",
            },
            {
              description:
                "Using ScrollX-UI feels like magic — it’s so easy to create beautiful, interactive UIs without writing complex code.",
              image:
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
              name: "Isabella Mendes",
              handle: "@isamendes",
            },
            {
              description:
                "ScrollX-UI’s open-source nature means I can customize components exactly how I want them — plus, the performance is outstanding.",
              image:
                "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
              name: "Meera Patel",
              handle: "@meerapatel",
            },
            {
              description:
                "I recommend ScrollX-UI to everyone looking for a powerful, flexible UI library with stunning animation support.",
              image:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
              name: "Emily Chen",
              handle: "@emchen",
            },
          ]}
        />
      </div>
    </section>
  );
}
