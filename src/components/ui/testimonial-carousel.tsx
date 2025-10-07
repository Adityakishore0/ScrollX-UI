"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TestimonialCardApi = UseEmblaCarouselType[1];
type UseTestimonialCardParameters = Parameters<typeof useEmblaCarousel>;
type TestimonialCardOptions = UseTestimonialCardParameters[0];
type TestimonialCardPlugin = UseTestimonialCardParameters[1];

type TestimonialCardProps = {
  opts?: TestimonialCardOptions;
  plugins?: TestimonialCardPlugin;

  setApi?: (api: TestimonialCardApi) => void;
};

type TestimonialCardContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & TestimonialCardProps;

const TestimonialCardContext =
  React.createContext<TestimonialCardContextProps | null>(null);

function useTestimonialCard() {
  const context = React.useContext(TestimonialCardContext);
  if (!context)
    throw new Error(
      "useTestimonialCard must be used within a <TestimonialCard />"
    );
  return context;
}

function TestimonialCard({
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & TestimonialCardProps) {
  const [carouselRef, api] = useEmblaCarousel({ ...opts, loop: true }, plugins);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: TestimonialCardApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    if (api) api.scrollPrev();
  }, [api]);
  const scrollNext = React.useCallback(() => {
    if (api) api.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  React.useEffect(() => {
    if (api && setApi) setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      if (api) {
        api.off("reInit", onSelect);
        api.off("select", onSelect);
      }
    };
  }, [api, onSelect]);

  return (
    <TestimonialCardContext.Provider
      value={{
        carouselRef,
        api,
        opts,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="testimonial-card"
        {...props}
      >
        {children}
      </div>
    </TestimonialCardContext.Provider>
  );
}

function TestimonialCardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { carouselRef } = useTestimonialCard();
  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="testimonial-card-content"
    >
      <div className={cn("flex", className)} {...props} />
    </div>
  );
}

function TestimonialCardItem({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="testimonial-card-item"
      className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
      {...props}
    />
  );
}

function TestimonialCardPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { scrollPrev, canScrollPrev } = useTestimonialCard();
  return (
    <Button
      data-slot="testimonial-card-previous"
      variant={variant}
      size={size}
      className={cn("absolute size-8 rounded-full", className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function TestimonialCardNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { scrollNext, canScrollNext } = useTestimonialCard();
  return (
    <Button
      data-slot="testimonial-card-next"
      variant={variant}
      size={size}
      className={cn("absolute size-8 rounded-full", className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

function AnimatedAvatarBorder({
  children,
  isActive,
  progress,
  borderType = "solid",
}: {
  children: React.ReactNode;
  isActive: boolean;
  progress: number;
  borderType?: "solid" | "gradient";
}) {
  const offset = isActive ? 301.59 - (301.59 * progress) / 100 : 301.59;
  const gradientId = React.useId();

  const getStrokeColor = () => {
    if (borderType === "gradient") {
      return `url(#${gradientId})`;
    }
    return "currentColor";
  };

  return (
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 text-foreground">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke={getStrokeColor()}
          strokeWidth="4"
          strokeDasharray="301.59"
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
        {borderType === "gradient" && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        )}
      </svg>
      <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-[4.5rem] sm:h-[4.5rem] rounded-full overflow-hidden p-2">
        {children}
      </div>
    </div>
  );
}

type Testimonial = {
  description: string;
  image: string;
  name: string;
  handle: string;
};

type TestimonialCarouselProps = {
  data: Testimonial[];
  borderType?: "solid" | "gradient";
};

export default function TestimonialCarousel({
  data,
  borderType = "solid",
}: TestimonialCarouselProps) {
  const [api, setApi] = React.useState<TestimonialCardApi>();
  const [current, setCurrent] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      if (api) setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  React.useEffect(() => {
    if (!api) return;

    const duration = 5000;
    const interval = 50;
    const increment = (interval / duration) * 100;
    let localProgress = 0;

    const timer = setInterval(() => {
      localProgress += increment;
      setProgress(localProgress);
      if (localProgress >= 100) {
        if (api) api.scrollNext();
        localProgress = 0;
      }
    }, interval);

    return () => clearInterval(timer);
  }, [api, current]);

  return (
    <div className="relative flex items-center justify-center w-full select-none px-2 sm:px-4 md:px-6 py-8">
      <TestimonialCard className="relative max-w-4xl w-full" setApi={setApi}>
        <div className="relative w-full">
          <TestimonialCardContent>
            {data.map((testimonial, index) => (
              <TestimonialCardItem key={index} className="basis-full">
                <Card className="bg-background border h-full">
                  <CardContent className="p-4 sm:p-6 md:p-8 h-full flex items-center">
                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 w-full">
                      <AnimatedAvatarBorder
                        isActive={index === current}
                        progress={progress}
                        borderType={borderType}
                      >
                        <Avatar className="w-full h-full">
                          <AvatarImage
                            src={testimonial.image}
                            alt={testimonial.name}
                          />
                          <AvatarFallback>
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </AnimatedAvatarBorder>
                      <div className="flex-1 min-h-[120px] sm:min-h-[140px] flex flex-col justify-center">
                        <h3 className="text-lg sm:text-xl font-semibold mb-1 text-foreground">
                          {testimonial.name}
                        </h3>
                        <p className="text-xs sm:text-sm mb-3 sm:mb-4 text-muted-foreground">
                          {testimonial.handle}
                        </p>
                        <p className="text-sm sm:text-base leading-relaxed text-foreground">
                          {testimonial.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TestimonialCardItem>
            ))}
          </TestimonialCardContent>
        </div>

        <div className="flex items-center justify-center gap-4 mt-6">
          <TestimonialCardPrevious className="shadow-lg dark:shadow-gray-800 !static" />
          <TestimonialCardNext className="shadow-lg dark:shadow-gray-800 !static" />
        </div>
      </TestimonialCard>
    </div>
  );
}
