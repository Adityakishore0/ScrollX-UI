import TestimonialCarousel from "@/components/ui/testimonial-carousel";

export default function TestimonialCarouselDemo() {
  return (
    <TestimonialCarousel
      borderType="gradient"
      data={[
        {
          description:
            "ScrollX UI has completely transformed how I build interfaces. The animations are silky smooth, and the components are modular and responsive.",
          image:
            "https://cdn.pixabay.com/photo/2024/08/01/18/20/anime-8937917_1280.png",
          name: "Yishabeier",
          handle: "@Yishabeier",
        },
        {
          description:
            "I love how ScrollX UI makes my projects look professional with minimal effort. The documentation is clear and the community is super helpful.",
          image:
            "https://cdn.pixabay.com/photo/2023/01/30/21/20/portrait-7756638_1280.jpg",
          name: "Aoliweiya",
          handle: "@Aoliweiya",
        },
        {
          description:
            "The smooth scrolling animations and intuitive components in ScrollX UI save me hours of development time!",
          image:
            "https://cdn.pixabay.com/photo/2023/06/26/04/38/ai-generated-8088680_1280.jpg",
          name: "Chen Xi",
          handle: "@ChenXi",
        },
        {
          description:
            "Using ScrollX UI feels like magic — it’s so easy to create beautiful, interactive UIs without writing complex code.",
          image:
            "https://cdn.pixabay.com/photo/2023/02/07/10/50/ai-generated-7773822_1280.jpg",
          name: "Sufiya",
          handle: "@Sufiya",
        },
        {
          description:
            "ScrollX UI’s open-source nature means I can customize components exactly how I want them — plus, the performance is outstanding.",
          image:
            "https://cdn.pixabay.com/photo/2023/06/27/03/15/ai-generated-8091289_1280.jpg",
          name: "Anuosa",
          handle: "@Anuosa",
        },
      ]}
    />
  );
}
