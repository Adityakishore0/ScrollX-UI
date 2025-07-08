"use client";

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, children, ...props }, _ref) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [shakeKey, setShakeKey] = React.useState(0);

  React.useEffect(() => {
    function handleOutsideClick(event: MouseEvent | TouchEvent) {
      const node = contentRef.current;
      const target = event.target as Node | null;

      if (node && target && !node.contains(target)) {
        setShakeKey((k) => k + 1);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content asChild>
        <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 sm:rounded-lg">
          <motion.div
            key={shakeKey}
            ref={contentRef}
            animate={{ x: [0, -10, 10, -8, 8, -4, 4, 0] }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={cn(
              "grid gap-4 border bg-background p-6 shadow-lg",
              className
            )}
            {...props}
          >
            {children}
          </motion.div>
        </div>
      </AlertDialogPrimitive.Content>
    </AlertDialogPortal>
  );
});
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, children, ...props }, ref) => (
  <AlertDialogPrimitive.Action asChild ref={ref} {...props}>
    <motion.button
      className={cn(
        buttonVariants(),
        "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white",
        className
      )}
      style={{ perspective: 1000 }}
      whileHover={{
        rotateX: 25,
        rotateY: 10,
        translateZ: 100,
        scale: 1.1,
        boxShadow: "0px 20px 50px rgba(0, 102, 255, 0.4)",
      }}
      transition={{ type: "spring", stiffness: 150, damping: 10 }}
    >
      {children}
    </motion.button>
  </AlertDialogPrimitive.Action>
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
