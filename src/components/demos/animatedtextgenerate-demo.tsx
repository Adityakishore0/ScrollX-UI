import { AnimatedTextGenerate } from "@/components/ui/animated-textgenerate";

const words = `Pressure changes everything. Some people, you squeeze them. They focus. Others fold. Can you summon your talent at will? Can you deliver on a deadline? Can you sleep at night?`;

export default function AnimatedTextGenerateDemo() {
  return (
    <AnimatedTextGenerate
      className="text-center mb-8 p-4"
      textClassName="text-2xl md:text-3xl lg:text-4xl text-center"
      text={words}
      blurEffect
      speed={1}
      highlightWords={["Pressure", "focus", "sleep", "deadline"]}
      highlightClassName="text-red-500 dark:text-red-400 font-bold"
      linkWords={["pressure", "night", "talent"]}
      linkHrefs={["/", "/", "/"]}
      linkClassNames={[
        "underline decoration-pink-500 dark:decoration-pink-400 hover:decoration-pink-400 dark:hover:decoration-pink-300 transition",
        "underline decoration-sky-500 dark:decoration-sky-400 hover:decoration-sky-400 dark:hover:decoration-sky-300 transition",
        "underline decoration-blue-500 dark:decoration-blue-400 hover:decoration-blue-400 dark:hover:decoration-blue-300 transition",
      ]}
    />
  );
}
