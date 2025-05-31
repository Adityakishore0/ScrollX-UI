"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  ReactElement,
} from "react";
import { twMerge } from "tailwind-merge";

interface TabsContextProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within <Tabs>");
  }
  return context;
}

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
}

const Tabs = ({ defaultValue, children }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
};

const TabsList = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex border-b border-gray-200 dark:border-gray-800">
      {children}
    </div>
  );
};

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
}

const TabsTrigger = ({ value, children }: TabsTriggerProps) => {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className="relative px-4 py-2 text-sm font-medium rounded-t-md overflow-hidden transition-colors duration-500"
    >
      <span
        className={twMerge(
          "relative z-10 capitalize transition-colors duration-300",
          isActive
            ? "text-white dark:text-black"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
        )}
      >
        {children}
      </span>
      <span
        className={twMerge(
          "absolute bottom-0 left-0 h-full w-full origin-bottom scale-y-0 transition-transform duration-500 ease-out z-0 rounded-t-md",
          isActive ? "scale-y-100 bg-black dark:bg-white" : "bg-transparent"
        )}
      />
    </button>
  );
};

interface TabsContentProps {
  value: string;
  children: ReactNode;
}

const TabsContent = ({
  value,
  children,
}: TabsContentProps): ReactElement | null => {
  const { activeTab } = useTabsContext();
  return activeTab === value ? <div className="p-4">{children}</div> : null;
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
