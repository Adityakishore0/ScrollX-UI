import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ShowcasePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Showcase
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                See how developers are using ScrollX-UI to build beautiful
                interfaces.
              </p>
            </div>
          </div>
          <div className="mt-16 grid gap-12 text-center">
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Coming Soon</h2>
              <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400">
                We're collecting examples of amazing projects built with
                ScrollX-UI. If you've built something with our components,
                please submit it for inclusion!
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
