import { CardTilt, CardTiltContent } from "@/components/ui/card-tilt";

export default function CardTiltDemo() {
  return (
    <CardTilt className="w-80">
      <CardTiltContent className="relative">
        <div className="m-2 rounded-2xl bg-white dark:bg-neutral-950 p-6 shadow-xl">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 dark:bg-neutral-800">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </div>
              <span className="font-medium">WEB - 28</span>
            </div>

            <span className="rounded-full bg-red-100 dark:bg-red-900/40 px-3 py-1 text-xs font-semibold text-red-600 dark:text-red-400">
              Urgent
            </span>
          </div>

          <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-slate-100">
            Modify Content for Homepage
          </h3>

          <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
            New Homepage
          </p>

          <div className="mb-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>
              Due to: <span className="font-medium">Nov 23, 25</span>
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 dark:border-neutral-800 pt-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-pink-400 to-purple-500">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                  alt="User"
                  className="h-full w-full"
                />
              </div>

              <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="font-medium">16</span>
              </div>
            </div>

            <div className="text-sm text-slate-500 dark:text-slate-400">
              Nov 18, 2025
            </div>
          </div>

          <button className="mt-4 w-full rounded-lg border-2 border-dashed border-slate-300 dark:border-neutral-700 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors hover:border-slate-400 dark:hover:border-neutral-600 hover:bg-slate-50 dark:hover:bg-neutral-800">
            + New Page
          </button>
        </div>
      </CardTiltContent>
    </CardTilt>
  );
}
