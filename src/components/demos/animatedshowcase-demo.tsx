import AnimatedShowcase from "@/components/ui/animated-showcase";
import EyeglassesFrame from "@/components/ui/eyeglasses";

export default function AnimatedShowcaseDemo() {
  return (
    <AnimatedShowcase
      components={[
        {
          name: "eyeglasses",
          component: (
            <div className="flex flex-col items-center justify-center min-h-screen p-8">
              <EyeglassesFrame
                colorOptions={{
                  black: "bg-black border-black",
                  brown: "bg-amber-800 border-amber-800",
                  silver: "bg-gray-400 border-gray-400",
                  green: "bg-green-700 border-green-700",
                  pink: "bg-pink-500 border-pink-500",
                }}
                initialColor="brown"
                className="rounded-lg"
                showColorPicker={false}
                size="md"
              />
            </div>
          ),
        },
      ]}
      title="ScrollX-UI"
      subtitle="An open source collection of animated, interactive components"
      description="Create stunning, premium, handcrafted components."
    />
  );
}
