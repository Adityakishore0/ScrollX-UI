import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarDemo() {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
      <Avatar variant="close-friends">
        <AvatarImage
          src="https://github.com/Adityakishore0.png"
          alt="@Ahdeetai"
        />
        <AvatarFallback>AK</AvatarFallback>
      </Avatar>
      <Avatar variant="normal">
        <AvatarImage
          src="https://github.com/Adityakishore0.png"
          alt="@Ahdeetai"
        />
        <AvatarFallback>AK</AvatarFallback>
      </Avatar>
      <Avatar variant="none">
        <AvatarImage
          src="https://github.com/Adityakishore0.png"
          alt="@Ahdeetai"
        />
        <AvatarFallback>AK</AvatarFallback>
      </Avatar>
    </div>
  );
}
