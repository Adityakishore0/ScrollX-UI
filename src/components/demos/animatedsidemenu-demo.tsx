import AnimatedSideMenu from "@/components/ui/animated-side-menu";

export default function AnimatedSideMenuDemo() {
  return (
    <div className="relative w-full max-w-[900px] h-[500px] border rounded-lg bg-background overflow-hidden">
      <div className="[&_.fixed]:absolute [&_.top-4]:top-4 [&_.right-4]:right-4">
        <AnimatedSideMenu />
      </div>

      <div className="p-6">
        <h2 className="text-xl font-semibold">Demo Preview</h2>
        <p className="mt-2 text-muted-foreground">
          Click on the Menu button to open the animated side menu.
        </p>
      </div>
    </div>
  );
}
