import { Button } from "@/components/ui/button";
import { Lamphome } from "@/components/ui/lamphome";
import Link from "next/link";

export default function LamphomeDemo() {
  return (
    <Lamphome
      title="SCROLLX UI"
      description="An open-source collection of animated, interactive & fully customizable components for building stunning, memorable user interfaces."
      logoSrc="/favicon.ico"
      logoAlt="My Logo"
      navItems={[
        { href: "/", label: "Home" },
        { href: "/docs", label: "Docs" },
        { href: "/templates", label: "Templates" },
        { href: "/showcase", label: "Showcase" },
      ]}
      className="my-custom-class"
    >
      <div className="mt-12">
        <div className="mt-6 flex flex-col items-center gap-4">
          <Button
            asChild
            size="sm"
            className="w-full md:w-auto bg-black dark:bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 border-0"
          >
            <Link href="https://scrollxui.dev/docs/components">
              View Components
            </Link>
          </Button>
        </div>
      </div>
    </Lamphome>
  );
}
