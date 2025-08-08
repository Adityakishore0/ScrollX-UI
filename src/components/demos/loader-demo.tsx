import { Loader } from "@/components/ui/loader";

export default function LoaderDemo() {
  return (
    <Loader>
      <span className="text-black dark:text-white">Getting things ready…</span>
    </Loader>
  );
}
