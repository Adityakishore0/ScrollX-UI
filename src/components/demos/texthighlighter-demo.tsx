import TextHighlighter from "@/components/ui/text-highlighter";

export default function TextHighlighterDemo() {
  return (
    <div className="mx-auto max-w-lg py-20 text-3xl font-bold tracking-tight  text-center">
      The best way to win is to
      <br />
      <TextHighlighter type="wavy" highlightColor="#f59e0b">
        <span>share</span>
      </TextHighlighter>
    </div>
  );
}
