import { CodeBlock } from "@/components/ui/codeblock";

export default function CodeBlockLightDemo() {
  return (
    <CodeBlock
      language="bash"
      filename="deploy.sh"
      code={`#!/bin/bash
echo "Starting deployment..."
npm run build
npm run test

if [ $? -eq 0 ]; then
  echo "Tests passed, deploying..."
  npm run deploy
  echo "Deployment complete!"
else
  echo "Tests failed, aborting deployment"
  exit 1
fi`}
      highlightLines={[7, 8]}
      breadcrumb={["scripts", "deploy.sh"]}
      showStats={true}
      theme="light"
    />
  );
}
