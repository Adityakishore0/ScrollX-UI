import StatsCount from "@/components/ui/statscount";
const stats = [
  { value: 30, suffix: "+", label: "Handcrafted animated components" },
  { value: 12, suffix: "K+", label: "Developers building with ScrollX-UI" },
  { value: 99, suffix: "%", label: "Performance optimized for web" },
];
export default function StatsCountDemo() {
  return (
    <StatsCount
      stats={stats}
      title="CREATE STUNNING INTERFACES WITH SCROLLX UI COMPONENTS"
      showDividers={true}
      className=""
    />
  );
}
