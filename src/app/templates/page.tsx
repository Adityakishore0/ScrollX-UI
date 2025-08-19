import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getMetadata } from "@/lib/getMetadata";

export const metadata = getMetadata({
  title: "Templates",
  description: "Pre-built templates using ScrollX UI components.",
  path: "/templates",
});

export default function TemplatesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Templates
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Ready-to-use templates built with ScrollX UI components.
              </p>
            </div>
          </div>
          <div className="mt-16 grid gap-12 text-center">
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Coming Soon</h2>
              <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400">
                We're working on some amazing templates to help you get started
                quickly. Check back soon for updates!
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
