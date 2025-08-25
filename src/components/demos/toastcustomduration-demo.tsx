"use client";
import React from "react";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

export default function ToastCustomDuration() {
  const { toast } = useToast();

  return (
    <div className="flex gap-3 flex-wrap">
      <Button
        variant="outline"
        onClick={() =>
          toast("Quick Toast (1s)", {
            duration: 1000,
          })
        }
      >
        1 Second
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          toast.success("Long Toast (10s)", {
            duration: 10000,
          })
        }
      >
        10 Seconds
      </Button>
    </div>
  );
}
