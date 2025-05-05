import { AnimatedButton } from "@/components/ui/animated-button";

export default function AnimatedButtonDemo() {
  return (
    <div className="flex items-center justify-center ">
      <AnimatedButton
        className="bg-green-500 text-white"
        variant="default"
        size="default"
        glow={true}
        textEffect="normal"
        uppercase={true}
        rounded="custom"
        asChild={false}
        hideAnimations={false}
        shimmerColor="#39FF14"
        shimmerSize="0.15em"
        shimmerDuration="3s"
        borderRadius="100px"
        background="rgba(0, 0, 0, 1)"
      >
        ScrollX UI
      </AnimatedButton>
    </div>
  );
}
