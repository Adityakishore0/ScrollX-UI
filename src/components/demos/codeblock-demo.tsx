import { CodeBlock } from "@/components/ui/codeblock";

export default function CodeBlockDemo() {
  const sampleCode = `import React, { useState } from 'react';
import { NextPage } from 'next';
import Header from '../components/Header';

const Home: NextPage = () => {
  const [theme, setTheme] = useState('dark');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <section className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
            ScrollX UI 
          </h1>
        </section>
      </main>
    </div>
  );
};

export default Home;`;

  return (
    <CodeBlock
      language="tsx"
      filename="src/home.tsx"
      code={sampleCode}
      highlightLines={[5, 11, 12]}
      breadcrumb={["scrollx-ui", "src", "home.tsx"]}
      showStats={true}
      theme="dark"
    />
  );
}
