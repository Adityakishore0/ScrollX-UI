"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GravityDemo from "@/components/demos/gravity-demo";
import ProfileCardDemo from "@/components/demos/profilecard-demo";
import MotionCardsDemo from "@/components/demos/motioncards-demo";
import { useState } from "react";
import RadialSocialsDemo from "@/components/demos/radialsocials-demo";
import HoldToConfirmDemo from "@/components/demos/holdtoconfirm-demo";
import { Transition } from "@/components/ui/transition";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CursorHighlight } from "@/components/ui/cursor-highlight";

export function ComponentShowcase() {
  const [rotate, setRotate] = useState(false);
  const [key, setKey] = useState(0);
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              <CursorHighlight
                className="text-3xl sm:text-5xl font-bold"
                gradient="from-rose-500 via-fuchsia-500 to-rose-500"
              >
                70+
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
                  <div className="w-full h-full flex items-center justify-center">
                    <Transition
                      key={key}
                      introDuration={1.5}
                      transitionDuration={1.0}
                      type="slide"
                      direction="bottom"
                      autoExit={false}
                      className="bg-black dark:bg-white h-full"
                      intro={(triggerExit) => (
                        <div className="flex flex-col items-center justify-center h-full w-full text-center space-y-4">
                          <h1 className="text-4xl md:text-6xl font-bold text-white dark:text-black">
                            ScrollX UI
                          </h1>
                          <p className="mt-2 text-base md:text-lg text-gray-400 dark:text-gray-600">
                            Build modern interfaces with ease
                          </p>
                          <Button
                            onClick={() => {
                              setRotate(true);
                              triggerExit();
                              setTimeout(() => setRotate(false), 600);
                            }}
                            variant="outline"
                            className="flex items-center space-x-2 mt-4"
                          >
                            <motion.div
                              animate={{ rotate: rotate ? 360 : 0 }}
                              transition={{ duration: 0.6, ease: "easeInOut" }}
                            >
                              <RefreshCw className="w-5 h-5" />
                            </motion.div>
                            <span>Trigger Transition</span>
                          </Button>
                        </div>
                      )}
                    >
                      <div className="flex flex-col items-center justify-center h-full w-full space-y-4 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white">
                          Smooth transitions,
                          <br />
                          zero effort.
                        </h2>
                        <Button
                          onClick={() => setKey((prev) => prev + 1)}
                          variant="outline"
                          className="flex items-center space-x-2"
                        >
                          <motion.div
                            animate={{ rotate: rotate ? 360 : 0 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                          >
                            <RefreshCw className="w-5 h-5" />
                          </motion.div>
                          <span>Replay Transition</span>
                        </Button>
                      </div>
                    </Transition>
                  </div>
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
