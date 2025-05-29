import { CodeBlock } from "@/components/ui/codeblock";

export default function CodeBlockMultiTabDemo() {
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

  const tabsExample = [
    {
      name: "index.tsx",
      code: sampleCode,
      language: "tsx",
      highlightLines: [5, 11, 12],
    },
    {
      name: "styles.css",
      code: `.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 4rem 0;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}`,
      language: "css",
    },
    {
      name: "package.json",
      code: `{
  "name": "scrollx-ui",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^13.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}`,
      language: "json",
    },
  ];

  return (
    <CodeBlock
      language="tsx"
      filename=""
      tabs={tabsExample}
      breadcrumb={["scrollx-ui"]}
      showStats={true}
      theme="dark"
    />
  );
}
