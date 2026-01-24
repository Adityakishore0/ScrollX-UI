import { StripeButton } from "@/components/ui/stripe-button";

export default function StripeButtonSizeDemo() {
  return (
    <div className="flex flex-col gap-4">
      <StripeButton size="sm">Small Button</StripeButton>
      <StripeButton size="default">Default Button</StripeButton>
      <StripeButton size="lg">Large Button</StripeButton>
    </div>
  );
}
