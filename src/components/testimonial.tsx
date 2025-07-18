"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Testimonial {
  name: string;
  handle: string;
  review: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Ava Thompson",
    handle: "@ava_thompson",
    review:
      "ScrollX UI is a game-changer! The animations are smooth, and the UI is beyond stunning.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Elijah Carter",
    handle: "@elijah_ui",
    review:
      "Absolutely mesmerizing! The attention to detail in ScrollX UI is incredible.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Sophia Martinez",
    handle: "@sophia_codes",
    review:
      "As a front-end developer, I love how intuitive and powerful ScrollX UI is. It's a must-have tool!",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Michael Brown",
    handle: "@michaelb_dev",
    review:
      "This changed the way I build interfaces. The animations are top-notch!",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Liam Anderson",
    handle: "@liamdesigns",
    review:
      "The best UI toolkit I've ever used! Smooth animations and top-notch performance.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Olivia Hayes",
    handle: "@olivia_h",
    review:
      "This is absolutely mind-blowing. AI-powered UI is the future, and ScrollX UI is leading the way!",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Daniel Lee",
    handle: "@daniel_dev",
    review:
      "Brilliant execution! The user experience feels effortless and elegant.",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Sarah Green",
    handle: "@sarahgreen",
    review:
      "I can't stop recommending this. It makes everything feel premium and polished!",
    avatar:
      "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Mia Patel",
    handle: "@miapatel",
    review: "ScrollX UI took my web app to the next level. Highly recommend!",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "James Walker",
    handle: "@jameswalker",
    review:
      "This is the future of web design! Can't believe something this good is available for free.",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Emma Johnson",
    handle: "@emma_uiux",
    review:
      "Phenomenal work! Every detail is thoughtfully crafted for an amazing experience.",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Ethan Roberts",
    handle: "@ethan_rob",
    review: "This toolkit has completely changed my workflow. Incredible work!",
    avatar:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Isabella Davis",
    handle: "@bella_designs",
    review:
      "The seamless integration and intuitive interface make this tool indispensable for modern web development.",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Noah Wilson",
    handle: "@noah_dev",
    review:
      "Performance is outstanding! My sites load faster and look more professional than ever.",
    avatar:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Charlotte Moore",
    handle: "@charlotte_ui",
    review:
      "The learning curve is minimal, but the impact is massive. This is what modern development tools should be.",
    avatar:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Lucas Taylor",
    handle: "@lucas_codes",
    review:
      "Revolutionary approach to UI development. The AI suggestions are spot-on every time.",
    avatar:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Amelia Clark",
    handle: "@amelia_design",
    review:
      "Client satisfaction has gone through the roof since I started using ScrollX UI.",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Benjamin Lewis",
    handle: "@ben_frontend",
    review:
      "The animation library is extensive and the performance optimizations are incredible.",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
];

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

interface TestimonialProps {
  desktopColumns?: number;
  tabletColumns?: number;
  mobileColumns?: number;
}

interface TestimonialWithId extends Testimonial {
  uniqueId: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = React.memo(
  ({ testimonial, index }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const gradients = [
      "from-pink-500 via-purple-500 to-orange-400",
      "from-blue-500 via-teal-500 to-green-400",
      "from-purple-500 via-pink-500 to-red-400",
      "from-indigo-500 via-blue-500 to-cyan-400",
      "from-orange-500 via-red-500 to-pink-400",
      "from-emerald-500 via-blue-500 to-purple-400",
      "from-rose-500 via-fuchsia-500 to-indigo-400",
      "from-amber-500 via-orange-500 to-red-400",
    ];

    const gradientClass = gradients[index % gradients.length];

    return (
      <div
        className="w-full mb-4 flex-shrink-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card
          className={`transition-all duration-300 pointer-events-none relative overflow-hidden ${
            isHovered ? "text-white shadow-2xl border-transparent" : ""
          }`}
        >
          {isHovered && (
            <div
              className={`absolute inset-0 bg-gradient-to-b ${gradientClass} z-0`}
              style={{
                maskImage:
                  "linear-gradient(to bottom, transparent 40%, black 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 40%, black 100%)",
              }}
            />
          )}

          <CardContent className="p-4 md:p-6 relative z-10">
            <p className="text-sm md:text-base mb-4 leading-relaxed transition-colors duration-300 text-neutral-800 dark:text-neutral-200">
              "{testimonial.review}"
            </p>

            <div className="flex items-center space-x-3">
              <Avatar className="w-8 md:w-10 h-8 md:h-10">
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                <AvatarFallback>
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p
                  className={`font-semibold text-xs md:text-sm ${
                    isHovered ? "text-white" : ""
                  }`}
                >
                  {testimonial.name}
                </p>
                <p
                  className={`text-xs ${
                    isHovered ? "text-white/80" : "text-muted-foreground"
                  }`}
                >
                  {testimonial.handle}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
);

TestimonialCard.displayName = "TestimonialCard";

const Testimonial: React.FC<TestimonialProps> = ({
  desktopColumns = 6,
  tabletColumns = 3,
  mobileColumns = 2,
}) => {
  const [actualMobileColumns, setActualMobileColumns] = useState(mobileColumns);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 400) {
        setActualMobileColumns(1);
      } else {
        setActualMobileColumns(mobileColumns);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, [mobileColumns]);

  const createColumns = useCallback((numColumns: number) => {
    const columns: TestimonialWithId[][] = [];
    const testimonialsPerColumn = 10;

    for (let i = 0; i < numColumns; i++) {
      const columnTestimonials: TestimonialWithId[] = [];

      for (let j = 0; j < testimonialsPerColumn; j++) {
        const testimonialIndex = (i * 11 + j * 3) % testimonials.length;
        columnTestimonials.push({
          ...testimonials[testimonialIndex],
          uniqueId: `${i}-${j}-${testimonialIndex}`,
        });
      }

      columns.push([...columnTestimonials, ...columnTestimonials]);
    }

    return columns;
  }, []);

  const desktopColumnsData = useMemo(() => createColumns(6), [createColumns]);
  const fiveColumnsData = useMemo(() => createColumns(5), [createColumns]);
  const fourColumnsData = useMemo(() => createColumns(4), [createColumns]);
  const tabletColumnsData = useMemo(
    () => createColumns(tabletColumns),
    [createColumns, tabletColumns]
  );
  const mobileColumnsData = useMemo(
    () => createColumns(actualMobileColumns),
    [createColumns, actualMobileColumns]
  );

  const renderColumn = useCallback(
    (
      columnTestimonials: TestimonialWithId[],
      colIndex: number,
      prefix: string,
      containerHeight: number
    ) => {
      const moveUp = colIndex % 2 === 0;
      const animationDuration = 40 + colIndex * 3;

      return (
        <div
          key={`${prefix}-${colIndex}`}
          className="flex-1 overflow-hidden relative testimonial-column"
          style={{ height: `${containerHeight}px` }}
        >
          <div
            className="flex flex-col"
            style={{
              animation: `${
                moveUp ? "scroll-up-smooth" : "scroll-down-smooth"
              } ${animationDuration}s linear infinite`,
            }}
          >
            {columnTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${prefix}-${colIndex}-${testimonial.uniqueId}-${index}`}
                testimonial={testimonial}
                index={colIndex * 3 + index}
              />
            ))}
          </div>
        </div>
      );
    },
    []
  );

  return (
    <section className="py-12 md:py-12 bg-gray-50 dark:bg-black transition-colors duration-300">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes scroll-up-smooth {
            0% { transform: translateY(0%); }
            100% { transform: translateY(-50%); }
          }
          
          @keyframes scroll-down-smooth {
            0% { transform: translateY(-50%); }
            100% { transform: translateY(0%); }
          }
          
          .testimonial-column {
            will-change: transform;
            contain: layout style paint;
          }
        `,
        }}
      />

      <div className="relative w-full text-gray-900 dark:text-white py-8 md:py-20 flex flex-col items-center overflow-hidden px-4 md:px-6">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
          What developers are saying
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 md:mb-12 text-center w-full max-w-2xl px-4 text-sm">
          Hear from the developer community about their experience with
          ScrollX-UI
        </p>

        <div className="hidden xl:flex gap-4 w-full max-w-7xl overflow-hidden relative mx-4">
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-50 dark:from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 dark:from-black to-transparent z-10 pointer-events-none"></div>

          {desktopColumnsData.map((columnTestimonials, colIndex) =>
            renderColumn(columnTestimonials, colIndex, "desktop", 800)
          )}
        </div>

        <div className="hidden lg:flex xl:hidden gap-4 w-full max-w-6xl overflow-hidden relative mx-4">
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-50 dark:from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 dark:from-black to-transparent z-10 pointer-events-none"></div>

          {fiveColumnsData.map((columnTestimonials, colIndex) =>
            renderColumn(columnTestimonials, colIndex, "five", 800)
          )}
        </div>

        <div className="hidden md:flex lg:hidden gap-4 w-full max-w-5xl overflow-hidden relative mx-4">
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-50 dark:from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 dark:from-black to-transparent z-10 pointer-events-none"></div>

          {fourColumnsData.map((columnTestimonials, colIndex) =>
            renderColumn(columnTestimonials, colIndex, "four", 800)
          )}
        </div>

        <div className="hidden sm:flex md:hidden gap-4 w-full max-w-4xl overflow-hidden relative mx-4">
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-50 dark:from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 dark:from-black to-transparent z-10 pointer-events-none"></div>

          {tabletColumnsData.map((columnTestimonials, colIndex) =>
            renderColumn(columnTestimonials, colIndex, "tablet", 800)
          )}
        </div>

        <div className="sm:hidden flex gap-3 w-full overflow-hidden relative px-4">
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-50 dark:from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 dark:from-black to-transparent z-10 pointer-events-none"></div>

          {mobileColumnsData.map((columnTestimonials, colIndex) =>
            renderColumn(columnTestimonials, colIndex, "mobile", 600)
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
