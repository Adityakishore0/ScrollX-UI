import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import OnThisPage from "@/components/OnThisPage";
import { Navbar } from "@/components/Navbar";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1 overflow-x-hidden">
        <div className="hidden md:block w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 fixed inset-y-0 overflow-y-auto">
          <Sidebar />
        </div>

        <div className="flex-1 md:ml-64">
          <div className="max-w-[90rem] w-full mx-auto flex">
            <div className="flex-1 px-4 py-8 pr-64">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {children}
              </div>
            </div>

            <div className="w-64 hidden lg:block fixed right-0 top-16 border-l border-gray-200 dark:border-gray-800 pl-8 pr-8 py-8 h-[calc(100vh-4rem)] overflow-y-auto">
              <OnThisPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
