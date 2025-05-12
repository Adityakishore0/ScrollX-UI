"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast, ToastProvider } from "@/components/ui/toaster";

function ToastDemo() {
  const { toast } = useToast();

  const showToasts = () => {
    toast({
      title: "Default Notification",
      description: "This is a default toast message",
    });

    toast({
      variant: "success",
      title: "Success!",
      description: "Your action was completed successfully",
      duration: 7000,
    });

    toast({
      variant: "destructive",
      title: "Error Occurred",
      description: "Something went wrong. Please try again.",
      action: (
        <Button variant="destructive" size="sm">
          Retry
        </Button>
      ),
    });

    toast({
      variant: "warning",
      title: "Warning",
      description: "Proceed with caution",
      position: "top-left",
    });

    toast({
      variant: "info",
      title: "Information",
      description: "Here's some important information",
      position: "bottom-right",
    });
  };

  return (
    <div className="p-6 space-y-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Toast Demonstration</h1>
      <div className="flex flex-wrap gap-4">
        <Button onClick={showToasts}>Show All Toasts</Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              title: "Add to Cart",
              description: "Product added successfully",
              variant: "success",
            })
          }
        >
          Add to Cart
        </Button>
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
      </div>
    </div>
  );
}

export default function ToastDemoWrapper() {
  return (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  );
}
