"use client";
import React from "react";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

function ToastDeleteDemo() {
  const { toast } = useToast();

  return (
    <Button
      variant="destructive"
      onClick={() =>
        toast({
          title: "Delete Confirmation",
          description: "Are you sure you want to delete?",
          variant: "destructive",
          action: (
            <Button variant="destructive" size="sm">
              Confirm
            </Button>
          ),
        })
      }
    >
      Delete Item
    </Button>
  );
}

export default function ToastDelete() {
  return (
    <ToastProvider>
      <ToastDeleteDemo />
    </ToastProvider>
  );
}
