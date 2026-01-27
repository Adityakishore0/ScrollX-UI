import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GravityDemo from "@/components/demos/gravity-demo";
import ProfileCardDemo from "@/components/demos/profilecard-demo";
import MotionCardsDemo from "@/components/demos/motioncards-demo";
import RadialSocialsDemo from "@/components/demos/radialsocials-demo";
import HoldToConfirmDemo from "@/components/demos/holdtoconfirm-demo";
import { CursorHighlight } from "@/components/ui/cursor-highlight";
import { parentComponents } from "@/app/registry/parents";
import { TransitionDemo } from "@/components/transition";

const totalComponents = parentComponents.length;
const displayCount = Math.floor(totalComponents / 10) * 10 + "+";

export function ComponentShowcase() {
  return (
    <section className="w-full py-12 bg-gradient-to-t from-white to-gray-50 dark:bg-gradient-to-b dark:from-[#0c0c0c] dark:via-black dark:to-[#0c0c0c] md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold sm:text-5xl">
              <CursorHighlight
                className="text-3xl sm:text-5xl font-bold"
                gradient="from-rose-500 via-fuchsia-500 to-rose-500"
              >
                {displayCount}
              </CursorHighlight>{" "}
              Stunning Components
            </h2>

            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Explore our library of interactive and animated components that
              will elevate your UI
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-5xl mt-12">
          <Tabs defaultValue="interactive" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="interactive">Interactive</TabsTrigger>
              <TabsTrigger value="animated">Animated</TabsTrigger>
              <TabsTrigger value="creative">Creative</TabsTrigger>
            </TabsList>

            <TabsContent value="interactive" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ShowcasePanel>
                  <HoldToConfirmDemo />
                </ShowcasePanel>
                <ShowcasePanel>
                  <ProfileCardDemo />
                </ShowcasePanel>
              </div>
            </TabsContent>

            <TabsContent value="animated" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ShowcasePanel>
                  <GravityDemo />
                </ShowcasePanel>
                <ShowcasePanel>
                  <MotionCardsDemo />
                </ShowcasePanel>
              </div>
            </TabsContent>

            <TabsContent value="creative" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ShowcasePanel>
                  <RadialSocialsDemo />
                </ShowcasePanel>

                <ShowcasePanel>
                  <TransitionDemo />
                </ShowcasePanel>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

function ShowcasePanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden h-[380px] flex items-center justify-center bg-muted/20">
      {children}
    </div>
  );
}
