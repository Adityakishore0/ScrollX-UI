import { ElectricText } from "@/components/ui/electric-text";

export default function ElectricTextDemo() {
  return (
    <ElectricText
      color="#BB8A2C"
      showFill={false}
      speed={1}
      glowIntensity="high"
      chaos={1}
      strokeWidth={3}
      className="text-5xl font-bold"
    >
      Feel the Sparks
    </ElectricText>
  );
}
