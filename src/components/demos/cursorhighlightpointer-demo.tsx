import { CursorHighlight } from "@/components/ui/cursor-highlight";

export default function CursorHighlightPointerDemo() {
  return (
    <CursorHighlight
      className="text-2xl sm:text-3xl md:text-4xl font-bold"
      gradient="from-rose-500 via-fuchsia-500 to-rose-500"
      showPointer={true}
      pointerClassName="text-pink-500"
    >
      <h1>ScrollX UI</h1>
    </CursorHighlight>
  );
}
