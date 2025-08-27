import ProfileCard from "@/components/ui/profilecard";
import { Github, Linkedin, Twitter, X } from "lucide-react";

export default function ProfileCardDemo() {
  return (
    <ProfileCard
      spotlight={true}
      spotlightColor="99,102,241"
      img="https://github.com/Adityakishore0.png"
      name="Ahdeetai"
      bio="Creator of ScrolIX UI, a modern component library built for speed and scalability."
      skills={[
        {
          name: "TypeScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        },
        {
          name: "Next.js",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        },
        {
          name: "Node.js",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        },
        {
          name: "JavaScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        },
        {
          name: "TailwindCSS",
          icon: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
        },
        {
          name: "GitHub",
          icon: (
            <Github
              className="w-4 h-4 text-white dark:text-black"
              strokeWidth={2}
            />
          ),
        },
      ]}
      socialLinks={[
        {
          name: "GitHub",
          url: "https://github.com/Adityakishore0",
          icon: (
            <Github
              className="w-4 h-4 text-white dark:text-black"
              strokeWidth={2}
            />
          ),
        },
        {
          name: "Twitter",
          url: "ttps://x.com/Ahdeetai",
          icon: (
            <Twitter
              className="w-4 h-4 text-white dark:text-black"
              strokeWidth={2}
            />
          ),
        },
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/aditya-kishore-519068341/",
          icon: (
            <Linkedin
              className="w-4 h-4 text-white dark:text-black"
              strokeWidth={2}
            />
          ),
        },
      ]}
      position="Senior Software Engineer"
    />
  );
}
