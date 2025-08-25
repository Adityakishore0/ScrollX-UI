"use client";
import React from "react";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

export default function ToastAddToCart() {
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
