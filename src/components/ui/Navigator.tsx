"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useMemo } from "react";
import navigation from "@/constants/navItems";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

export default function Navigator() {
  const pathname = usePathname();

  const allPages = useMemo(() => {
    const flatPages: { title: string; href: string }[] = [];

    flatPages.push(
      { title: "Introduction", href: "/docs/introduction" },
      { title: "Installation", href: "/docs/installation" }
    );

    const installationGuide =
      navigation.find((item) => item.title === "Installation Guide")
        ?.children || [];
    flatPages.push(...installationGuide);

    const components =
      navigation.find((item) => item.title === "Components")?.children || [];
    flatPages.push(...components);

    return flatPages;
  }, []);

  const normalizedPathname =
    pathname.endsWith("/") && pathname !== "/"
      ? pathname.slice(0, -1)
      : pathname;

  const currentPath =
    normalizedPathname === "/docs" ? "/docs/introduction" : normalizedPathname;

  const currentIndex = allPages.findIndex((item) => item.href === currentPath);

  if (currentIndex === -1) return null;

  const previousItem = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextItem =
    currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  return (
    <div className="flex justify-between items-center mt-8 px-4">
      {previousItem ? (
        <Link href={previousItem.href} prefetch>
          <Button variant="outline">← {previousItem.title}</Button>
        </Link>
      ) : (
        <div />
      )}

      {nextItem ? (
        <Link href={nextItem.href} prefetch>
          <Button variant="default">{nextItem.title} →</Button>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
