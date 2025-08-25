"use client";
import React from "react";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

export default function ToastWarning() {
  const { toast } = useToast();

  return (
    <Button
      variant="secondary"
      onClick={() =>
        toast.warning("Warning!", {
          position: "top-left",
          description: "Please review your input before proceeding.",
        })
      }
    >
      Warning Toast
    </Button>
  );
}
