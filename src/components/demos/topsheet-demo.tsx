"use client";
import RadialFlowDemo from "@/components/demos/radialflow-demo";
import { Button } from "@/components/ui/button";
import {
  TopSheet,
  TopSheetClose,
  TopSheetContent,
  TopSheetDescription,
  TopSheetFooter,
  TopSheetHeader,
  TopSheetTitle,
  TopSheetTrigger,
} from "@/components/ui/top-sheet";

export default function TopSheetDemo() {
  return (
    <TopSheet>
      <TopSheetTrigger asChild>
        <Button>Open Sheet</Button>
      </TopSheetTrigger>
      <TopSheetContent>
        <TopSheetHeader>
          <TopSheetTitle>Radial Flow</TopSheetTitle>
          <TopSheetDescription>
            Dynamic radial graph for visualizing network
          </TopSheetDescription>
        </TopSheetHeader>
        <RadialFlowDemo />
        <TopSheetFooter>
          <TopSheetClose asChild>
            <Button>Close</Button>
          </TopSheetClose>
        </TopSheetFooter>
      </TopSheetContent>
    </TopSheet>
  );
}
