"use client";
import React from "react";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

export default function ToastSuccess() {
  const { toast } = useToast();

  return (
    <Button
      variant="success"
      onClick={() =>
        toast.success("Success!", {
          description: "Your action was completed successfully.",
        })
      }
    >
      Success Toast
    </Button>
  );
}
