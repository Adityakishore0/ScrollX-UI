"use client";
import React from "react";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

function ToastWarningDemo() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() =>
        toast({
          variant: "warning",
          title: "Warning",
          description: "Proceed with caution",
          position: "top-left",
        })
      }
    >
      Warning Toast
    </Button>
  );
}

export default function ToastWarning() {
  return (
    <ToastProvider>
      <ToastWarningDemo />
    </ToastProvider>
  );
}
