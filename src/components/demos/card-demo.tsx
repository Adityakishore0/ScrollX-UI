import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatedButton } from "@/components/ui/animated-button";
import { InteractiveInput } from "@/components/ui/interactive-input";

export default function NewsletterCard() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Subscribe</CardTitle>
        <CardDescription>Get the latest updates in your inbox.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <InteractiveInput
                id="email"
                type="email"
                className="bg-green-500 text-white"
                variant="default"
                inputSize="default"
                glow={false}
                rounded="custom"
                hideAnimations={false}
                uppercase={true}
                textEffect="normal"
                shimmerColor="#39FF14"
                shimmerSize="0.15em"
                shimmerDuration="3s"
                borderRadius="100px"
                background="rgba(0, 0, 0, 1)"
                placeholder="you@example.com"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="interest">Topic</Label>
              <Select>
                <SelectTrigger id="interest">
                  <SelectValue placeholder="Choose a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buttons">Buttons</SelectItem>
                  <SelectItem value="inputs">Inputs</SelectItem>
                  <SelectItem value="cards">Cards</SelectItem>
                  <SelectItem value="animations">Animations</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <AnimatedButton
          className="bg-green-500 text-white"
          variant="default"
          size="default"
          glow={false}
          textEffect="normal"
          uppercase={true}
          rounded="custom"
          asChild={false}
          hideAnimations={false}
          shimmerColor="#39FF14"
          shimmerSize="0.15em"
          shimmerDuration="3s"
          borderRadius="100px"
          background="rgba(0, 0, 0, 1)"
        >
          Subscribe
        </AnimatedButton>
      </CardFooter>
    </Card>
  );
}
