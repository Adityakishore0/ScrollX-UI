import { MorphoTextFlip } from "@/components/ui/morphotextflip";

export default function MorphoTextFadeScale() {
  return (
    <section className="flex flex-col items-center justify-center h-[400px] px-4">
      <h1 className="text-4xl md:text-7xl font-bold text-center mb-4">
        Move different
      </h1>
      <MorphoTextFlip
        words={["Stay rare", "Keep rising", "No noise", "Make waves"]}
        textClassName="text-4xl md:text-7xl text-rose-600 dark:text-rose-400 font-bold mt-1"
        animationType="fadeScale"
      />
    </section>
  );
}
