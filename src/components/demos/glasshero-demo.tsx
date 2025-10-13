import ScrollXHeading from "@/components/heading";
import { Glass } from "@/components/ui/glass";

export default function GlassHeroDemo() {
  return (
    <div className="relative select-none cursor-none w-full h-[24rem] md:h-screen overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a"
        alt="Background"
        className="w-full h-full object-cover"
      />

      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-6xl">
        <Glass
          width="100%"
          height={60}
          borderRadius={50}
          blur={10}
          tintOpacity={0.08}
        >
          <nav className="flex items-center justify-between h-full px-6 md:px-10">
            <ScrollXHeading className="w-auto h-4 sm:h-5 whitespace-nowrap" />
            <div className="flex gap-6 items-center">
              <a
                href="#"
                className="text-white hover:text-white/70 transition-colors font-medium text-sm md:text-base"
              >
                Home
              </a>
              <a
                href="#"
                className="text-white hover:text-white/70 transition-colors font-medium text-sm md:text-base"
              >
                Docs
              </a>
            </div>
          </nav>
        </Glass>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 md:px-0">
        <Glass
          width="auto"
          height="auto"
          borderRadius={25}
          blur={8}
          tintOpacity={0.1}
          className="mb-4"
        >
          <div className="px-4 py-2 flex items-center gap-2">
            <span className="text-white text-xs md:text-sm">
              ⚡Super Smooth
            </span>
          </div>
        </Glass>

        <h1 className="bg-clip-text text-transparent text-center bg-gradient-to-b  from-neutral-600 to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          Summer is over
          <br />
          Winter has arrived
        </h1>

        <div className="flex gap-4 mt-4 md:mt-6">
          <button className="bg-white text-black px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold hover:bg-white/90 transition-all text-sm md:text-base">
            Get Started
          </button>

          <Glass
            width="auto"
            height="auto"
            borderRadius={25}
            blur={10}
            tintOpacity={0.1}
          >
            <button className="px-6 py-3 md:px-8 md:py-4 text-white font-semibold text-sm md:text-base">
              Learn More
            </button>
          </Glass>
        </div>
      </div>

      <Glass
        width={100}
        height={100}
        borderRadius={50}
        blur={1}
        tintOpacity={0.1}
        followMouse
      />
    </div>
  );
}
