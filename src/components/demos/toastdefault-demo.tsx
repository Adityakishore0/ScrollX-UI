"use client";
import React from "react";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

function ToastDefaultDemo() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() =>
        toast({
          title: "Default Notification",
          description: "This is a default toast message",
        })
      }
    >
      Default Toast
    </Button>
  );
}

export default function ToastDefault() {
  return (
    <ToastProvider>
      <ToastDefaultDemo />
    </ToastProvider>
  );
}
