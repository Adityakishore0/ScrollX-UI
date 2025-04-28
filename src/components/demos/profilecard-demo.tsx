import CenteredImageCard from "@/components/ui/profilecard";

export default function ProfileCard() {
  return (
    <CenteredImageCard
      img="https://github.com/Adityakishore0.png"
      name="Ahdeetai"
      bio="Creator of ScrolIX UI a modern component library built for speed and scalability."
      skills={[
        {
          name: "TypeScript",
          iconUrl:
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        },
        {
          name: "Next.js",
          iconUrl:
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        },
        {
          name: "Node.js",
          iconUrl:
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        },
        {
          name: "JavaScript",
          iconUrl:
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        },
        {
          name: "TailwindCSS",
          iconUrl:
            "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
        },
        {
          name: "GitHub",
          iconUrl:
            "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
        },
      ]}
      githubUrl="https://github.com/Adityakishore0"
      twitterUrl="https://x.com/Ahdeetai"
      position="Senior Software Engineer"
    />
  );
}
