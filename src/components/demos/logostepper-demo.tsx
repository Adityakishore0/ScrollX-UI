import { LogoStepper } from "@/components/ui/logo-stepper";
import React from "react";

export default function LogoStepperDemo() {
  const logos = [
    {
      icon: (
        <img
          src="https://logo.clearbit.com/microsoft.com"
          alt="Microsoft"
          className="w-full h-full object-contain"
        />
      ),
      label: "Microsoft",
    },
    {
      icon: (
        <img
          src="https://logo.clearbit.com/apple.com"
          alt="Apple"
          className="w-full h-full object-contain"
        />
      ),
      label: "Apple",
    },
    {
      icon: (
        <img
          src="https://logo.clearbit.com/amazon.com"
          alt="Amazon"
          className="w-full h-full object-contain"
        />
      ),
      label: "Amazon",
    },
    {
      icon: (
        <img
          src="https://logo.clearbit.com/netflix.com"
          alt="Netflix"
          className="w-full h-full object-contain"
        />
      ),
      label: "Netflix",
    },
    {
      icon: (
        <img
          src="https://logo.clearbit.com/samsung.com"
          alt="Samsung"
          className="w-full h-full object-contain"
        />
      ),
      label: "Samsung",
    },
    {
      icon: (
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="GitHub"
          className="w-full h-full object-contain"
        />
      ),
      label: "GitHub",
    },
    {
      icon: (
        <img
          src="https://logo.clearbit.com/tesla.com"
          alt="Tesla"
          className="w-full h-full object-contain"
        />
      ),
      label: "Tesla",
    },
    {
      icon: (
        <img
          src="https://logo.clearbit.com/meta.com"
          alt="Meta"
          className="w-full h-full object-contain"
        />
      ),
      label: "Meta",
    },
    {
      icon: (
        <img
          src="https://logo.clearbit.com/openai.com"
          alt="OpenAI"
          className="w-full h-full object-contain"
        />
      ),
      label: "OpenAI",
    },
    {
      icon: (
        <img
          src="https://logo.clearbit.com/nvidia.com"
          alt="NVIDIA"
          className="w-full h-full object-contain"
        />
      ),
      label: "NVIDIA",
    },
    {
      icon: (
        <img
          src="https://logo.clearbit.com/intel.com"
          alt="Intel"
          className="w-full h-full object-contain"
        />
      ),
      label: "Intel",
    },
    {
      icon: (
        <img
          src="https://logo.clearbit.com/sony.com"
          alt="Sony"
          className="w-full h-full object-contain"
        />
      ),
      label: "Sony",
    },
    {
      icon: (
        <img
          src="https://logo.clearbit.com/paypal.com"
          alt="PayPal"
          className="w-full h-full object-contain"
        />
      ),
      label: "PayPal",
    },
    {
      icon: (
        <img
          src="https://logo.clearbit.com/uber.com"
          alt="Uber"
          className="w-full h-full object-contain"
        />
      ),
      label: "Uber",
    },
    {
      icon: (
        <img
          src="https://logo.clearbit.com/airbnb.com"
          alt="Airbnb"
          className="w-full h-full object-contain"
        />
      ),
      label: "Airbnb",
    },
    {
      icon: (
        <img
          src="https://logo.clearbit.com/slack.com"
          alt="Slack"
          className="w-full h-full object-contain"
        />
      ),
      label: "Slack",
    },
    {
      icon: (
        <img
          src="https://logo.clearbit.com/stripe.com"
          alt="Stripe"
          className="w-full h-full object-contain"
        />
      ),
      label: "Stripe",
    },
    {
      icon: (
        <img
          src="https://logo.clearbit.com/shopify.com"
          alt="Shopify"
          className="w-full h-full object-contain"
        />
      ),
      label: "Shopify",
    },
  ];

  return (
    <LogoStepper
      logos={logos}
      direction="loop"
      animationDelay={1.2}
      animationDuration={0.6}
      visibleCount={5}
    />
  );
}
