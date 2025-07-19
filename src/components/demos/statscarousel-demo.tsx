import StatsCarouselcount from "@/components/ui/statscarousel";

export default function StatsCarouselDemo() {
  return (
    <StatsCarouselcount
      title="CREATE STUNNING INTERFACES WITH SCROLLX UI COMPONENTS"
      stats={[
        { value: 40, suffix: "+", label: "Handcrafted animated components" },
        {
          value: 12,
          suffix: "K+",
          label: "Developers building with ScrollX UI",
        },
        { value: 99, suffix: "%", label: "Performance optimized for web" },
      ]}
      className=""
      cardClassName=""
    />
  );
}
