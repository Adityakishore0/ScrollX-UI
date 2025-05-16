import { Topic, RadialFlow } from "@/components/ui/radialflow";

const demoTopics: Topic[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    position: { x: 10, y: 20 },
    color: "#F0DB4F",
    highlighted: true,
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    position: { x: 10, y: 35 },
    color: "#F0DB4F",
    highlighted: true,
  },
  {
    id: "gemini",
    name: "Gemini",
    position: { x: 10, y: 50 },
    color: "#F0DB4F",
    highlighted: true,
  },
  {
    id: "claude",
    name: "Claude",
    position: { x: 10, y: 65 },
    color: "#F0DB4F",
    highlighted: true,
  },
  {
    id: "mistral",
    name: "Mistral",
    position: { x: 10, y: 80 },
    color: "#F0DB4F",
    highlighted: true,
  },
  {
    id: "grok",
    name: "Grok",
    position: { x: 90, y: 20 },
    color: "#F0DB4F",
    highlighted: true,
  },
  {
    id: "llama",
    name: "LLaMA",
    position: { x: 90, y: 35 },
    color: "#F0DB4F",
    highlighted: true,
  },
  {
    id: "copilot",
    name: "Copilot",
    position: { x: 90, y: 50 },
    color: "#F0DB4F",
    highlighted: true,
  },
  {
    id: "perplexity",
    name: "Perplexity",
    position: { x: 90, y: 65 },
    color: "#F0DB4F",
    highlighted: true,
  },
  {
    id: "anthropic",
    name: "Anthropic",
    position: { x: 90, y: 80 },
    color: "#F0DB4F",
    highlighted: true,
  },
];

export default function RadialFlowDemo() {
  return (
    <RadialFlow
      topics={demoTopics}
      badgeName="Productivity"
      centralDotColor="#FFFFFF"
    />
  );
}
