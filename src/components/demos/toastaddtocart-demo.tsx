"use client";
import React from "react";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

function ToastAddToCartDemo() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() =>
        toast({
          title: "Add to Cart",
          description: "Product added successfully",
          variant: "success",
        })
      }
    >
      Add to Cart
    </Button>
  );
}

export default function ToastAddToCart() {
  return (
    <ToastProvider>
      <ToastAddToCartDemo />
    </ToastProvider>
  );
}
