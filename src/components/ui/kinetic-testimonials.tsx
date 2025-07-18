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

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  cardClassName?: string;
  avatarClassName?: string;
}

interface KineticTestimonialProps {
  testimonials?: Testimonial[];
  className?: string;
  cardClassName?: string;
  avatarClassName?: string;
  desktopColumns?: number;
  tabletColumns?: number;
  mobileColumns?: number;
  speed?: number;
  title?: string;
  subtitle?: string;
}

interface TestimonialWithId extends Testimonial {
  uniqueId: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = React.memo(
  ({ testimonial, index, cardClassName = "", avatarClassName = "" }) => {
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
          } ${cardClassName}`}
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
              <Avatar className={`w-8 md:w-10 h-8 md:h-10 ${avatarClassName}`}>
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

const KineticTestimonial: React.FC<KineticTestimonialProps> = ({
  testimonials = [],
  className = "",
  cardClassName = "",
  avatarClassName = "",
  desktopColumns = 6,
  tabletColumns = 3,
  mobileColumns = 2,
  speed = 1,
  title = "What developers are saying",
  subtitle = "Hear from the developer community about their experience with ScrollX-UI",
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

  const createColumns = useCallback(
    (numColumns: number) => {
      if (!testimonials || testimonials.length === 0) {
        return [];
      }

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
    },
    [testimonials]
  );

  const desktopColumnsData = useMemo(
    () => createColumns(desktopColumns),
    [createColumns, desktopColumns]
  );
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
      const animationDuration = (40 + colIndex * 3) / speed;

      return (
        <div
          key={`${prefix}-${colIndex}`}
          className="flex-1 overflow-hidden relative testimonial-column"
          style={{ height: `${containerHeight}px` }}
        >
          <div
            className={`flex flex-col ${
              moveUp ? "animate-scroll-up" : "animate-scroll-down"
            }`}
            style={{
              animationDuration: `${animationDuration}s`,
            }}
          >
            {columnTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${prefix}-${colIndex}-${testimonial.uniqueId}-${index}`}
                testimonial={testimonial}
                index={colIndex * 3 + index}
                cardClassName={cardClassName}
                avatarClassName={avatarClassName}
              />
            ))}
          </div>
        </div>
      );
    },
    [speed, cardClassName, avatarClassName]
  );

  return (
    <section
      className={`py-12 md:py-12 bg-gray-50 dark:bg-black transition-colors duration-300 ${className}`}
    >
      <div className="relative w-full text-gray-900 dark:text-white py-8 md:py-20 flex flex-col items-center overflow-hidden px-4 md:px-6">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 md:mb-12 text-center w-full max-w-2xl px-4 text-sm">
          {subtitle}
        </p>

        {testimonials && testimonials.length > 0 && (
          <>
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

              {createColumns(Math.max(desktopColumns - 1, 3)).map(
                (columnTestimonials, colIndex) =>
                  renderColumn(columnTestimonials, colIndex, "five", 800)
              )}
            </div>

            <div className="hidden md:flex lg:hidden gap-4 w-full max-w-5xl overflow-hidden relative mx-4">
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-50 dark:from-black to-transparent z-10 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 dark:from-black to-transparent z-10 pointer-events-none"></div>

              {createColumns(Math.max(desktopColumns - 2, 2)).map(
                (columnTestimonials, colIndex) =>
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
          </>
        )}
      </div>
    </section>
  );
};

export default KineticTestimonial;
