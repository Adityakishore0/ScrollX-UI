import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="interest">Topic</Label>
              <Select>
                <SelectTrigger id="interest">
                  <SelectValue placeholder="Choose a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="culture">Culture</SelectItem>
                  <SelectItem value="festivals">Festivals</SelectItem>
                  <SelectItem value="offers">Special Offers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Subscribe</Button>
      </CardFooter>
    </Card>
  );
}
