"use client";
import Link from "next/link";
import { Splitter, SplitterPanel } from "@/components/ui/splitter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import ScrollXHeading from "@/components/heading";
import { Loader } from "@/components/ui/loader";

export default function SplitterDemo() {
  return (
    <div className="h-[31rem]  w-full">
      <Splitter>
        <SplitterPanel className="bg-muted/40 border-r">
          <div className="p-6 flex flex-col justify-between h-full">
            <div className="flex flex-col gap-3">
              <Link href="/" className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 w-6 h-6 sm:w-6 sm:h-6 md:w-7 md:h-7"
                  viewBox="0 0 24 24"
                >
                  <defs>
                    <linearGradient
                      id="myGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="50%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#myGradient)"
                    d="M5.999 17a3 3 0 0 1-1.873-.658a2.98 2.98 0 0 1-1.107-2.011a2.98 2.98 0 0 1 .639-2.206l4-5c.978-1.225 2.883-1.471 4.143-.523l1.674 1.254l2.184-2.729a3 3 0 1 1 4.682 3.747l-4 5c-.977 1.226-2.882 1.471-4.143.526l-1.674-1.256l-2.184 2.729A2.98 2.98 0 0 1 5.999 17M10 8a1 1 0 0 0-.781.374l-4 5.001a1 1 0 0 0-.213.734c.03.266.161.504.369.67a.996.996 0 0 0 1.406-.155l3.395-4.244L13.4 12.8c.42.316 1.056.231 1.381-.176l4-5.001a1 1 0 0 0 .213-.734a1 1 0 0 0-.369-.67a.996.996 0 0 0-1.406.156l-3.395 4.242L10.6 8.2A1 1 0 0 0 10 8m9 13H5a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2"
                  />
                </svg>
                <ScrollXHeading className="w-auto h-4 sm:h-5 whitespace-nowrap" />
              </Link>
              <div className="h-px bg-border" />
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Build with ScrollX AI</h2>
              <p className="text-sm text-muted-foreground">
                Describe your website idea and let AI generate a layout.
              </p>
              <Input placeholder="e.g. Portfolio site with modern glassmorphism" />
              <div className="flex gap-2">
                <Button>Generate</Button>
                <Button variant="outline">Clear</Button>
              </div>
            </div>
          </div>
        </SplitterPanel>

        <SplitterPanel className="bg-background flex items-center justify-center">
          <Card className="w-[90%] h-[90%] rounded-2xl shadow-xl overflow-hidden">
            <CardContent className="h-full p-8 flex flex-col items-center justify-center text-center gap-6">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Your Website Preview
              </h1>
              <p className="text-muted-foreground max-w-md">
                Once you generate, the website preview will appear here.
              </p>
              <Button size="lg" className="rounded-xl">
                Live Preview →
              </Button>
              <Loader variant="cube">
                <span className="text-black dark:text-white">loading..</span>
              </Loader>
            </CardContent>
          </Card>
        </SplitterPanel>
      </Splitter>
    </div>
  );
}
