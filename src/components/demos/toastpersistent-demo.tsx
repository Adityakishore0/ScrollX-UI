"use client";
import React from "react";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

export default function ToastPersistent() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Persistent Toast", {
          description: "This toast won't auto-dismiss.",
          duration: Infinity,
          action: {
            label: "Dismiss",
            onClick: () => {},
          },
        })
      }
    >
      Persistent
    </Button>
  );
}
