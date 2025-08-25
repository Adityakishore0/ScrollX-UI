"use client";
import React from "react";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

export default function ToastPromise() {
  const { toast } = useToast();

  return (
    <Button
      variant="secondary"
      onClick={() =>
        toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
          loading: "Loading...",
          success: "Promise resolved!",
          error: "Promise rejected!",
        })
      }
    >
      Promise Toast
    </Button>
  );
}
