import { FlowingLogos } from "@/components/ui/flowing-logos";

export default function FlowingLogosDemo() {
  return (
    <FlowingLogos
      data={[
        { image: "https://logo.clearbit.com/microsoft.com", name: "Microsoft" },
        { image: "https://logo.clearbit.com/apple.com", name: "Apple" },
        { image: "https://logo.clearbit.com/amazon.com", name: "Amazon" },
        { image: "https://logo.clearbit.com/netflix.com", name: "Netflix" },
        { image: "https://logo.clearbit.com/samsung.com", name: "Samsung" },
        {
          image:
            "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
          name: "GitHub",
        },
        { image: "https://logo.clearbit.com/tesla.com", name: "Tesla" },
        { image: "https://logo.clearbit.com/meta.com", name: "Meta" },
        { image: "https://logo.clearbit.com/openai.com", name: "OpenAI" },
        { image: "https://logo.clearbit.com/nvidia.com", name: "NVIDIA" },
        { image: "https://logo.clearbit.com/intel.com", name: "Intel" },
        { image: "https://logo.clearbit.com/sony.com", name: "Sony" },
        { image: "https://logo.clearbit.com/paypal.com", name: "PayPal" },
        { image: "https://logo.clearbit.com/uber.com", name: "Uber" },
        { image: "https://logo.clearbit.com/airbnb.com", name: "Airbnb" },
        { image: "https://logo.clearbit.com/slack.com", name: "Slack" },
        { image: "https://logo.clearbit.com/stripe.com", name: "Stripe" },
        { image: "https://logo.clearbit.com/shopify.com", name: "Shopify" },
      ]}
    />
  );
}
