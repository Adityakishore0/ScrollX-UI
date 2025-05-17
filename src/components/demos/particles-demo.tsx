import { Particles } from "@/components/ui/particles";

export default function ParticlesDemo() {
  return (
    <div className="relative w-full h-[400px]">
      <Particles
        color="#fffff"
        particleCount={25000}
        particleSize={5}
        animate={false}
        className="z-0 bg-black"
      />
    </div>
  );
}
