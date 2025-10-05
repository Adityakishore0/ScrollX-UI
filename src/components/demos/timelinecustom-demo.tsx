import { Timeline, TimelineText } from "@/components/ui/timeline";

export default function TimelineDemo() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="mb-2 md:mb-3 lg:mb-4 text-center font-sans font-bold tracking-tight">
        <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-5xl">
          MAKE WEBSITES
        </span>
        <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-5xl">
          10X MODERN
        </span>
        <span className="block text-1xl md:text-2xl lg:text-2xl text-center text-gray-800 dark:text-gray-200 mt-2">
          with
        </span>
      </h2>

      <Timeline
        rotation={-2.76}
        containerClassName="border-blue-500"
        handleClassName="border-blue-500"
        handleIndicatorClassName="bg-blue-500"
      >
        <TimelineText className="text-xl md:text-5xl lg:text-6xl font-bold block bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white">
          ScrollX UI
        </TimelineText>
      </Timeline>
    </div>
  );
}
