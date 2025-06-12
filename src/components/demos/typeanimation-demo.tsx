import Typeanimation from "@/components/ui/typeanimation";

export default function TypeAnimationDemo() {
  return (
    <div className="flex items-center justify-center ">
      <div className="max-w-2xl text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-primary mb-2">
          Discover New
        </h1>
        <Typeanimation
          words={[" possibilities", " opportunities", " potential"]}
          typingSpeed="slow"
          deletingSpeed="slow"
          gradientFrom="red-500"
          gradientTo="yellow-500"
          pauseDuration={2000}
          className="text-3xl md:text-5xl font-extrabold text-teal-600"
        />
      </div>
    </div>
  );
}
