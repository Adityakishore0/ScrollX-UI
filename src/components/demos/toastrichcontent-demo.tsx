"use client";
import React from "react";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

export default function ToastRichContent() {
  const { toast } = useToast();

  return (
    <div className="flex gap-3 flex-wrap">
      <Button
        variant="default"
        onClick={() =>
          toast("Custom Styling", {
            description: "This toast demonstrates custom content.",
            action: {
              label: "View Details",
              onClick: () => toast.info("Details viewed!"),
            },
            cancel: {
              label: "Cancel",
              onClick: () => toast("Cancelled!"),
            },
          })
        }
      >
        Rich Content
      </Button>

      <Button
        variant="secondary"
        onClick={() => {
          const toastId = toast.loading("Processing...", {
            duration: Infinity,
          });

          setTimeout(() => {
            toast.success("Processing complete!", {
              id: toastId,
            });
          }, 3000);
        }}
      >
        Update Toast
      </Button>
    </div>
  );
}
