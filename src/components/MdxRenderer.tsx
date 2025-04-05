"use client"; // ✅ This makes it a Client Component

import dynamic from "next/dynamic";

const MDXContent = dynamic(() => import(`@/content/docs/installation.mdx`), {
  ssr: false,
});

export default function MdxRenderer() {
  return <MDXContent />;
}
