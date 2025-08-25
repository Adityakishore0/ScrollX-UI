"use client";
import React from "react";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

export default function ToastWithAction() {
  const { toast } = useToast();

  return (
    <Button
      variant="default"
      onClick={() =>
        toast("Toast with Action", {
          description: "This toast has an action button.",
          action: {
            label: "Undo",
            onClick: () => toast.success("Action performed!"),
          },
        })
      }
    >
      With Action
    </Button>
  );
}
