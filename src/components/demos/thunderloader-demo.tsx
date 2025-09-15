import { ThunderLoader } from "@/components/ui/thunder-loader";

export default function ThunderLoaderDemo() {
  return (
    <ThunderLoader
      className="w-44 h-44"
      animate="thunder"
      showGlow={true}
      showFill={true}
    />
  );
}
