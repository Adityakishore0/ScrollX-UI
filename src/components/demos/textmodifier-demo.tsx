import TextModifier from "@/components/ui/text-modifier";

export default function TextModifierDemo() {
  return (
    <TextModifier
      animate
      highlightColorClass="bg-yellow-200"
      markerColorClass="bg-black dark:bg-neutral-100"
      className="text-black  dark:text-black"
    >
      You can ask an AI assistant to "Build a landing page using components from
      the ScrollX UI registry" or "Find me a login form from the ScrollX UI
      registry".
    </TextModifier>
  );
}
