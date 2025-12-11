import { AvatarGroup } from "@/components/ui/avatar-group";

export default function AvatarGroupDemo() {
  const avatars = [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop",
      name: "Sarah Chen",
    },
    {
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=1287&auto=format&fit=crop",
      name: "Marcus brown",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2670&auto=format&fit=crop",
      name: "Elena kate",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop",
      name: "Jessica Lee",
    },
  ];
  return <AvatarGroup className="select-none" avatarUrls={avatars} />;
}
