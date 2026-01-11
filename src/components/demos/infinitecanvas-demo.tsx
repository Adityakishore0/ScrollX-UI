import { Card, InfiniteCanvas } from "@/components/ui/infinite-canvas";

export default function InfiniteCanvasDemo() {
  return (
    <InfiniteCanvas
      className="relative h-[450px] w-full"
      showControls={true}
      showZoom={true}
      showStatus={true}
      showInstructions={true}
    >
      <Card className="bg-card p-6 rounded-lg shadow-lg border h-full">
        <div className="flex items-center gap-4 mb-4">
          <img
            src="https://i.pravatar.cc/150?img=1"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h4 className="font-semibold">Sarah Johnson</h4>
            <p className="text-sm text-muted-foreground">CEO at TechCorp</p>
          </div>
        </div>
        <p className="text-foreground">
          "Components are clean, reusable, and easy to scale."
        </p>
      </Card>

      <Card className="bg-card p-6 rounded-lg shadow-lg border h-full">
        <div className="flex items-center gap-4 mb-4">
          <img
            src="https://i.pravatar.cc/150?img=2"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h4 className="font-semibold">Michael Chen</h4>
            <p className="text-sm text-muted-foreground">
              Designer at CreativeStudio
            </p>
          </div>
        </div>
        <p className="text-foreground">
          "Polished visuals with thoughtful interaction design."
        </p>
      </Card>

      <Card className="bg-card p-6 rounded-lg shadow-lg border h-full">
        <div className="flex items-center gap-4 mb-4">
          <img
            src="https://i.pravatar.cc/150?img=3"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h4 className="font-semibold">Emily Rodriguez</h4>
            <p className="text-sm text-muted-foreground">Marketing Director</p>
          </div>
        </div>
        <p className="text-foreground">
          "Layouts and motion feel modern and refined."
        </p>
      </Card>

      <Card className="bg-card p-6 rounded-lg shadow-lg border h-full">
        <div className="flex items-center gap-4 mb-4">
          <img
            src="https://i.pravatar.cc/150?img=4"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h4 className="font-semibold">David Kim</h4>
            <p className="text-sm text-muted-foreground">
              Founder at StartupHub
            </p>
          </div>
        </div>
        <p className="text-foreground">
          "APIs are simple, flexible, and production-ready."
        </p>
      </Card>

      <Card className="bg-card p-6 rounded-lg shadow-lg border h-full">
        <div className="flex items-center gap-4 mb-4">
          <img
            src="https://i.pravatar.cc/150?img=5"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h4 className="font-semibold">Jessica Taylor</h4>
            <p className="text-sm text-muted-foreground">Product Manager</p>
          </div>
        </div>
        <p className="text-foreground">
          "Consistency makes collaboration fast and smooth."
        </p>
      </Card>
    </InfiniteCanvas>
  );
}
