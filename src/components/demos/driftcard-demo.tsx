import DriftCard from "@/components/ui/drift-card";

export default function DriftCardDemo() {
  return (
    <DriftCard className="w-full max-w-md h-72 mx-auto relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop"
        alt="Preview"
        className="w-full h-full object-cover rounded-xl"
      />
    </DriftCard>
  );
}
