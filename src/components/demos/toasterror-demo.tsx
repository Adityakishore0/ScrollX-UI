"use client";
import React from "react";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

function ToastErrorDemo() {
  const { toast } = useToast();

  return (
    <Button
      variant="destructive"
      onClick={() =>
        toast({
          variant: "destructive",
          title: "Error Occurred",
          description: "Something went wrong. Please try again.",
          action: (
            <Button variant="destructive" size="sm">
              Retry
            </Button>
          ),
        })
      }
    >
      Error Toast
    </Button>
  );
}

export default function ToastError() {
  return (
    <ToastProvider>
      <ToastErrorDemo />
    </ToastProvider>
  );
}
