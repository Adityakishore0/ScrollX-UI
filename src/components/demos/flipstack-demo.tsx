"use client";
import FlipStack from "@/components/ui/flipstack";

export default function FlipStackDemo() {
  const cards = [
    {
      id: 1,
      content: (
        <img
          src="https://images.unsplash.com/photo-1611558709798-e009c8fd7706?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Isabelle Carlos"
          className="w-full h-full object-cover"
        />
      ),
    },
    {
      id: 2,
      content: (
        <img
          src="https://plus.unsplash.com/premium_photo-1692340973636-6f2ff926af39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Lana Akash"
          className="w-full h-full object-cover"
        />
      ),
    },
    {
      id: 3,
      content: (
        <img
          src="https://github.com/Adityakishore0.png?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Ahdeetai"
          className="w-full h-full object-cover"
        />
      ),
    },
    {
      id: 4,
      content: (
        <img
          src="https://images.unsplash.com/photo-1557053910-d9eadeed1c58?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Isabella Mendes"
          className="w-full h-full object-cover scale-x-[-1]"
        />
      ),
    },
    {
      id: 5,
      content: (
        <img
          src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Meera Patel"
          className="w-full h-full object-cover"
        />
      ),
    },
  ];

  return (
    <>
      <div className="w-full lg:hidden">
        <FlipStack cards={cards} />
      </div>
      <div className="hidden lg:flex absolute inset-0 overflow-visible items-center justify-center pt-[14rem]">
        <FlipStack cards={cards} />
      </div>
    </>
  );
}
