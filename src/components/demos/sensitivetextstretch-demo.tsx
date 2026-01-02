import SensitiveText from "@/components/ui/sensitive-text";

export default function SensitiveTextDemo() {
  return (
    <SensitiveText
      variant="stretch"
      maxStretch={0.8}
      sensitivity={0.6}
      easing={12}
      className="md:text-6xl text-4xl font-black text-black dark:text-white"
    >
      HOVER ME
    </SensitiveText>
  );
}
