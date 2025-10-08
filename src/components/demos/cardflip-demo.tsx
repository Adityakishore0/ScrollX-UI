"use client";
import {
  CardFlip,
  CardFlipFront,
  CardFlipBack,
  CardFlipHeader,
  CardFlipFooter,
  CardFlipTitle,
  CardFlipDescription,
  CardFlipContent,
} from "@/components/ui/card-flip";
import { Button } from "@/components/ui/button";
import { Box, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

export default function CardFlipDemo() {
  const [selectedSize, setSelectedSize] = useState("36");
  const sizes = ["34", "35", "36", "37"];
  return (
    <CardFlip className="w-full max-w-sm select-none">
      <CardFlipFront className="flex flex-col justify-between h-auto">
        <div className="mx-4  h-48 w-[calc(100%-2rem)] rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1634581448750-22a591d78099?w=400&h=300&fit=crop"
            alt="Auraluxe NovaX Pro"
            className="w-full h-full object-cover"
          />
        </div>
        <div className=" flex items-center justify-between px-4">
          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            Best Seller
          </span>
          <div className="flex items-center space-x-1 text-sm font-medium text-primary/70">
            <Star className="w-5 h-5 fill-primary text-primary" />
            <span>4.5 (126)</span>
          </div>
        </div>
        <CardFlipHeader>
          <CardFlipTitle>Stridera Quantum Aero</CardFlipTitle>
          <p className="text-2xl p-1 font-bold">$9,499</p>
          <p className="text-sm font-medium text-foreground">
            What is your size?
          </p>
        </CardFlipHeader>
        <CardFlipContent className="flex-1 overflow-auto">
          <div className="flex items-center space-x-2 px-4">
            {sizes.map((size) => (
              <Button
                key={size}
                size="sm"
                variant={selectedSize === size ? "default" : "outline"}
                className="w-8 h-8 p-0 flex items-center justify-center relative"
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </Button>
            ))}
          </div>
        </CardFlipContent>
        <CardFlipFooter className="flex gap-4 items-stretch">
          <button className="flex-1 bg-primary py-1 text-primary-foreground px-4 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center">
            Buy Now
          </button>
          <button className="w-12 bg-primary py-1 text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </CardFlipFooter>
      </CardFlipFront>

      <CardFlipBack className="h-full flex flex-col">
        <CardFlipHeader>
          <CardFlipTitle>Stridera Quantum Aero</CardFlipTitle>
          <CardFlipDescription>Futuristic leather sneakers</CardFlipDescription>
        </CardFlipHeader>
        <CardFlipContent className="flex-1 overflow-auto space-y-4">
          <div className="flex items-start gap-3">
            <Box className="text-primary w-6 h-6 mt-1" />
            <div>
              <h4 className="font-semibold">Upper</h4>
              <p className="text-sm text-muted-foreground">
                Premium leather, breathable
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Box className="text-primary w-6 h-6 mt-1" />
            <div>
              <h4 className="font-semibold">Sole</h4>
              <p className="text-sm text-muted-foreground">
                Carbon-infused, adaptive grip
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Box className="text-primary w-6 h-6 mt-1" />
            <div>
              <h4 className="font-semibold">Comfort</h4>
              <p className="text-sm text-muted-foreground">Memory foam heel</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Box className="text-primary w-6 h-6 mt-1" />
            <div>
              <h4 className="font-semibold">Package</h4>
              <p className="text-sm text-muted-foreground">
                Sneakers, dust bag, extra laces
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Box className="text-primary w-6 h-6 mt-1" />
            <div>
              <h4 className="font-semibold">Extras</h4>
              <p className="text-sm text-muted-foreground">
                Reflective trims for night visibility
              </p>
            </div>
          </div>
        </CardFlipContent>
        <CardFlipFooter className="border-t">
          <p className="text-xs mt-4 ">Free express shipping over $2,999</p>
        </CardFlipFooter>
      </CardFlipBack>
    </CardFlip>
  );
}
