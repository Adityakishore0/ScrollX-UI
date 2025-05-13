"use client";
import React from "react";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

function ToastSuccessDemo() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() =>
        toast({
          variant: "success",
          title: "Success!",
          description: "Your action was completed successfully",
          duration: 7000,
        })
      }
    >
      Success Toast
    </Button>
  );
}

export default function ToastSuccess() {
  return (
    <ToastProvider>
      <ToastSuccessDemo />
    </ToastProvider>
  );
}
