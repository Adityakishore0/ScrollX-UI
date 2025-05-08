"use client";

import StylishDock from "@/components/ui/magicdock";
import {
  Home as HomeIcon,
  FileText as DocsIcon,
  Download as InstallIcon,
  Code as UsageIcon,
  BookOpen as ApiIcon,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function MagicDockDemo() {
  const router = useRouter();
  const pathname = usePathname();

  const dockItems = [
    {
      id: 1,
      icon: <HomeIcon className="text-white" size={24} />,
      label: "Home",
      description: "Go to homepage",
      onClick: () => router.push("/"),
    },
    {
      id: 2,
      icon: <DocsIcon className="text-white" size={24} />,
      label: "Docs",
      description: "Read documentation",
      onClick: () =>
        document
          .querySelector("#magic-dock")
          ?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: 3,
      icon: <InstallIcon className="text-white" size={24} />,
      label: "Installation",
      description: "Install guide",
      onClick: () =>
        document
          .querySelector("#installation")
          ?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: 4,
      icon: <UsageIcon className="text-white" size={24} />,
      label: "Usage",
      description: "How to use",
      onClick: () =>
        document
          .querySelector("#usage")
          ?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: 5,
      icon: <ApiIcon className="text-white" size={24} />,
      label: "API Reference",
      description: "Browse API",
      onClick: () =>
        document
          .querySelector("#api-reference")
          ?.scrollIntoView({ behavior: "smooth" }),
    },
  ];

  const isHomePage = pathname === "/";

  return (
    <div className=" flex flex-col justify-between">
      <div className="p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">
          The Dock will show on bottom of the page
        </h1>
      </div>

      {!isHomePage && (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center items-end pb-4">
          <StylishDock
            items={dockItems}
            variant="tooltip"
            magnification={70}
            baseItemSize={48}
            distance={150}
          />
        </div>
      )}
    </div>
  );
}
