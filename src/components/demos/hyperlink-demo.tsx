import { Hyperlink } from "@/components/ui/hyperlink";

export default function HyperlinkDemo() {
  return (
    <Hyperlink href="https://x.com/ahdeetai">
      <h1 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl relative z-20 font-bold tracking-tight">
        Hover Me
      </h1>
    </Hyperlink>
  );
}
