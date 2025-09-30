import { Iphone } from "@/components/ui/iphone";

export default function IphoneImageDemo() {
  return (
    <div className="w-full max-w-sm mx-auto p-4">
      <Iphone
        showHeader
        imgUrl="https://cdn.pixabay.com/photo/2024/11/02/17/29/city-9169729_1280.jpg?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
      />
    </div>
  );
}
