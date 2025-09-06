"use client";

import { CheckboxPro } from "@/components/ui/checkbox-pro";
import { Label } from "@/components/ui/label";

export default function CheckboxProDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <CheckboxPro id="terms" />
        <Label htmlFor="terms">
          Star our GitHub repo to support ScrollX UI
        </Label>
      </div>

      <div className="flex items-start gap-3">
        <CheckboxPro id="terms-2" defaultChecked />
        <div className="grid gap-2">
          <Label htmlFor="terms-2">
            Ahdeetai thinks this checkbox is legendary
          </Label>
          <p className="text-muted-foreground text-sm">
            Cooler than a perfectly timed plot twist.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <CheckboxPro id="toggle" disabled />
        <Label htmlFor="toggle" disableAnimation>
          Doubt the process if you dare
        </Label>
      </div>

      <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
        <CheckboxPro
          id="toggle-2"
          defaultChecked
          className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
        />
        <div className="grid gap-1.5 font-normal">
          <p className="text-sm leading-none font-medium">
            Use ScrollX UI for your next project
          </p>
          <p className="text-muted-foreground text-sm">
            Build modern, animated interfaces faster with clean and reusable
            components.
          </p>
        </div>
      </Label>
    </div>
  );
}
