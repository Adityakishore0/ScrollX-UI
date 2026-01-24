import { StripeButton } from "@/components/ui/stripe-button";

export default function StripeButtonDemo() {
  return (
    <StripeButton stripesSpeed={150} className="italic">
      Change the Speed!
    </StripeButton>
  );
}
