import { Glass } from "@/components/ui/glass";

export default function GlassDemo() {
  return (
    <div className="relative h-[600px] w-full cursor-none select-none overflow-hidden">
      <img
        src="https://cdn.pixabay.com/photo/2023/06/26/04/38/ai-generated-8088680_1280.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover object-[50%_83%]"
      />
      <Glass borderRadius={60} blur={1} followMouse ripple />
    </div>
  );
}
