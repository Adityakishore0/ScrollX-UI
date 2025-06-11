import { MorphoTextFlip } from "@/components/ui/morphotextflip";

export default function MorphoTextSlideUp() {
  return (
    <section className="flex flex-col items-center justify-center h-[400px] px-4">
      <h1 className="text-4xl md:text-7xl font-bold text-center mb-4">
        Build like it matters
      </h1>
      <MorphoTextFlip
        words={["with heart", "through chaos", "for impact", "beyond limits"]}
        textClassName="text-4xl md:text-7xl text-rose-600 dark:text-rose-400 font-bold mt-1"
        animationType="slideUp"
      />
    </section>
  );
}
