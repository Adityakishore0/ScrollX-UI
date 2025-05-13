"use client";
import React from "react";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

function ToastInfoDemo() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() =>
        toast({
          variant: "info",
          title: "Information",
          description: "Here's some important information",
          position: "bottom-right",
        })
      }
    >
      Info Toast
    </Button>
  );
}

export default function ToastInfo() {
  return (
    <ToastProvider>
      <ToastInfoDemo />
    </ToastProvider>
  );
}
