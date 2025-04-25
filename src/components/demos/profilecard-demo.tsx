import CenteredImageCard from "@/components/ui/profilecard";

export default function ProfileCard() {
  return (
    <CenteredImageCard
      img="https://github.com/Adityakishore0.png"
      name="Ahdeetai"
      bio="Creator of ScrolIX UI a modern component library built for speed and scalability."
      skills={["N", "Ts", "Js", "Ex"]}
      githubUrl="https://github.com/Adityakishore0"
      twitterUrl="https://x.com/Ahdeetai"
      position="Senior Software Engineer"
    />
  );
}
