import TextHighlighter from "@/components/ui/text-highlighter";

export default function TextHighlighterZigzag() {
  return (
    <div className="mx-auto max-w-xl py-20 text-3xl font-extrabold tracking-tight text-center leading-snug">
      Life is a journey full of
      <br />
      <TextHighlighter type="zigzag" highlightColor="#00ffb7ff" repeat>
        <span className="px-2">twists</span>
      </TextHighlighter>
    </div>
  );
}
