import { InteractiveInput } from "@/components/ui/interactive-input";

export default function InteractiveInputDemo() {
  return (
    <div className="flex items-center justify-center">
      <InteractiveInput
        className="bg-green-500 text-white"
        variant="default"
        inputSize="default"
        glow={true}
        rounded="custom"
        hideAnimations={false}
        uppercase={true}
        textEffect="normal"
        shimmerColor="#39FF14"
        shimmerSize="0.15em"
        shimmerDuration="3s"
        borderRadius="100px"
        background="rgba(0, 0, 0, 1)"
        placeholder="Generate with ScrollX UI"
      />
    </div>
  );
}
