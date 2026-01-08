import { FlipFlow } from "@/components/ui/flipflow";

export default function FlipFlowDemo() {
  const slushData = [
    { name: "SCROLLX UI" },
    { name: "SCROLLX UI" },
    { name: "SCROLLX UI" },
    { name: "SCROLLX UI" },
    { name: "SCROLLX UI" },
    { name: "SCROLLX UI" },
  ];

  return <FlipFlow data={slushData} cardClassName="h-20 w-48" />;
}
