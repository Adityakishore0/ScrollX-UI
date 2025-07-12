"use client";

import { Laptop, Moon, Sun } from "lucide-react";

import { ThemeSwitch } from "@/components/ui/theme-switch";

export function ModeToggle() {
  return (
    <ThemeSwitch
      modes={["light", "dark", "system"]}
      icons={[
        <Sun key="sun-icon" size={16} />,
        <Moon key="moon-icon" size={16} />,
        <Laptop key="laptop-icon" size={16} />,
      ]}
      showInactiveIcons="next"
    />
  );
}
