import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import OnThisPage from "@/components/OnThisPage";
import { Navbar } from "@/components/Navbar";
import { SeparatorPro } from "@/components/ui/seperatorpro";
import { DocsFooter } from "@/components/docsfooter";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <div className="lg:grid lg:grid-cols-[minmax(16rem,16rem)_1fr] xl:grid-cols-[minmax(16rem,16rem)_1fr_minmax(16rem,16rem)]">
          <aside className="hidden lg:block w-full sticky z-[30] top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r border-gray-200 dark:border-gray-800">
            <Sidebar />
          </aside>
          <main className="min-w-0 py-8 px-4 lg:px-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {children}
              <SeparatorPro variant="wave" className="my-4" />
              <DocsFooter />
            </div>
          </main>
          <aside className="hidden xl:block w-full sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-l border-gray-200 dark:border-gray-800">
            <div className="px-6 py-8">
              <OnThisPage />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
