"use client";
import React from "react";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

export default function ToastBulkActions() {
  const { toast } = useToast();

  return (
    <div className="flex gap-3 flex-wrap">
      <Button
        variant="outline"
        onClick={() => {
          toast.success("First toast");
          toast.warning("Second toast");
          toast.info("Third toast");
        }}
      >
        Multiple Toasts
      </Button>

      <Button variant="destructive" onClick={() => toast.dismiss()}>
        Dismiss All
      </Button>
    </div>
  );
}
