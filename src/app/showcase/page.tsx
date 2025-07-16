import { getMetadata } from "@/lib/getMetadata";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { projectList } from "@/constants/project-list";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export const metadata = getMetadata({
  title: "Showcase",
  description:
    "Creative projects and professional interfaces built with ScrollX UI components.",
  path: "/showcase",
});

export default function ShowcasePage() {
  return (
    <>
      <Navbar />
      <div className="relative bg-white dark:bg-black overflow-hidden">
        <div className="flex items-center justify-center min-h-screen w-full flex-col relative z-10">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-16 md:py-24 space-y-16">
            <section className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                  ScrollX UI in Action
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
                  A collection of creative projects and professional interfaces
                  built with ScrollX UI.
                </p>
              </div>
              <div className="grid gap-6 sm:gap-8 md:gap-12 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                {projectList.map((project, index) => (
                  <Link
                    href={project.href}
                    key={`${project.title}-${index}`}
                    className="group flex flex-col items-start space-y-3 sm:space-y-4 transition-transform hover:scale-[1.02] duration-300 ease-in-out"
                  >
                    <div className="relative rounded-lg border dark:bg-gray-950 bg-gray-100 overflow-hidden w-full shadow-sm group">
                      <AspectRatio ratio={4 / 3}>
                        {project.image && project.image.trim() !== "" && (
                          <>
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            {project.component && (
                              <div className="absolute bottom-0 left-0 w-full h-[20%] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="h-full w-full relative">
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                                  <div className="absolute bottom-1 left-4 text-white font-mono text-[10px] sm:text-xs z-10">
                                    {`using <${project.component} />`}
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </AspectRatio>
                    </div>
                    {project.title && project.title.trim() !== "" && (
                      <h3 className="font-semibold text-left text-base sm:text-lg w-full px-1">
                        {project.title}
                      </h3>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="relative z-10 bg-white dark:bg-black overflow-hidden">
        <section className="w-full py-8 sm:py-12 md:py-20 lg:py-24">
          <div className="flex flex-col items-center justify-center space-y-4 text-center px-4 sm:px-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
                What developers are saying
              </h2>
              <p className="max-w-[900px] text-gray-500 text-sm sm:text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 px-4">
                Hear from the developer community about their experience with
                ScrollX UI
              </p>
            </div>
          </div>
          <div className="mt-8 sm:mt-12 px-4 sm:px-6">
            <AnimatedTestimonials
              className="dark:bg-white bg-black"
              cardClassName="dark:bg-gray-950 bg-gray-50"
              data={[
                {
                  description:
                    "ScrollX UI has completely transformed how I build interfaces. The animations are silky smooth, and the components are modular and responsive.",
                  image:
                    "https://images.unsplash.com/photo-1611558709798-e009c8fd7706?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
                  name: "Isabelle Carlos",
                  handle: "@isabellecarlos",
                },
                {
                  description:
                    "I love how ScrollX UI makes my projects look professional with minimal effort. The documentation is clear and the community is super helpful.",
                  image:
                    "https://plus.unsplash.com/premium_photo-1692340973636-6f2ff926af39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
                  name: "Lana Akash",
                  handle: "@lanaakash",
                },
                {
                  description:
                    "The smooth scrolling animations and intuitive components in ScrollX UI save me hours of development time!",
                  image:
                    "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
                  name: "Liam O'Connor",
                  handle: "@liamoc",
                },
                {
                  description:
                    "Using ScrollX UI feels like magic — it's so easy to create beautiful, interactive UIs without writing complex code.",
                  image:
                    "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
                  name: "Isabella Mendes",
                  handle: "@isamendes",
                },
                {
                  description:
                    "ScrollX UI's open-source nature means I can customize components exactly how I want them — plus, the performance is outstanding.",
                  image:
                    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
                  name: "Meera Patel",
                  handle: "@meerapatel",
                },
                {
                  description:
                    "I recommend ScrollX UI to everyone looking for a powerful, flexible UI library with stunning animation support.",
                  image:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
                  name: "Emily Chen",
                  handle: "@emchen",
                },
              ]}
            />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
