import { MorphyButton } from "@/components/ui/morphy-button";

export default function MorphyButtonCustomDemo() {
  return (
    <MorphyButton
      className={`
        rounded-none border-2 text-lg font-semibold tracking-wide
        transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]/[transition]
        border-red-500 text-neutral-950 hover:border-red-700 hover:text-red-800
        dark:border-yellow-400 dark:text-red-200
        dark:hover:border-yellow-200 dark:hover:text-yellow-300
        bg-transparent
      `}
      dotClassName={`
        bg-yellow-400 dark:bg-red-700
        transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]/[transition]
        rounded-none
      `}
      size="lg"
    >
      Don't Touch Me
    </MorphyButton>
  );
}
