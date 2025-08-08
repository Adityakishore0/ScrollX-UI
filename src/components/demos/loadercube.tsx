import { Loader } from "@/components/ui/loader";

export default function LoaderCube() {
  return (
    <Loader variant="cube">
      <span className="text-black dark:text-white">Almost there…</span>
    </Loader>
  );
}
