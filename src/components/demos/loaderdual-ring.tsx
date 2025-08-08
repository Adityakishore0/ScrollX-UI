import { Loader } from "@/components/ui/loader";

export default function LoaderDualring() {
  return (
    <Loader variant="dual-ring">
      <span className="text-black dark:text-white">please wait</span>
    </Loader>
  );
}
