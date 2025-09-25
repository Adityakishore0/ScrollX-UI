"use client";

import { Kbd, KbdKey, KbdSeparator } from "@/components/ui/kbd";

export default function KbdDemo() {
  return (
    <Kbd>
      <KbdKey aria-label="Meta">⌘</KbdKey>
      <KbdSeparator className="font-mono text-foreground">+</KbdSeparator>
      <KbdKey>K</KbdKey>
    </Kbd>
  );
}
