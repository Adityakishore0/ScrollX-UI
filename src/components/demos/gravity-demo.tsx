import { Gravity } from "@/components/ui/gravity";
import { Star } from "lucide-react";

export default function GravityDemo() {
  return (
    <div className="flex items-center justify-center px-4 py-12">
      <div className="relative w-full max-w-sm">
        <div
          className="relative flex h-[340px] w-[90%] flex-col items-start justify-end 
      overflow-hidden rounded-2xl border border-gray-300 dark:border-gray-800 
      bg-gray-50 dark:bg-[#0a0a0a] 
      px-5 py-8 shadow-xl mx-auto transition-colors"
        >
          <div className="mb-4 flex h-6 w-6 items-center justify-center rounded-full border border-gray-400 dark:border-gray-600">
            <Star className="h-3 w-3 text-gray-700 dark:text-gray-300" />
          </div>
          <h2 className="relative z-50 mb-3 text-xl font-bold text-gray-900 dark:text-white">
            Gravity
          </h2>
          <p className="relative z-50 mb-5 text-base font-normal text-gray-600 dark:text-gray-400 leading-relaxed">
            Gravity pulls everything down, not to defeat it, but to give every
            fall the chance to launch again with greater force.
          </p>
          <button
            className="rounded-lg border border-gray-400 dark:border-gray-600 px-5 py-2 
        text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-900 transition"
          >
            Rise Higher
          </button>
          <Gravity number={20} />
        </div>
      </div>
    </div>
  );
}
