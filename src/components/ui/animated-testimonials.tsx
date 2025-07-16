import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  image: string;
  description: string;
  handle: string;
}

interface AnimatedCanopyProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
  repeat?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  applyMask?: boolean;
}

const AnimatedCanopy = ({
  children,
  vertical = false,
  repeat = 4,
  pauseOnHover = false,
  reverse = false,
  className,
  applyMask = true,
  ...props
}: AnimatedCanopyProps) => (
  <div
    {...props}
    className={cn(
      "group relative flex h-full w-full overflow-hidden p-2 [--duration:10s] [--gap:12px] [gap:var(--gap)]",
      vertical ? "flex-col" : "flex-row",
      className
    )}
  >
    {Array.from({ length: repeat }).map((_, index) => (
      <div
        key={`item-${index}`}
        className={cn("flex shrink-0 [gap:var(--gap)]", {
          "group-hover:[animation-play-state:paused]": pauseOnHover,
          "[animation-direction:reverse]": reverse,
          "animate-canopy-horizontal flex-row": !vertical,
          "animate-canopy-vertical flex-col": vertical,
        })}
      >
        {children}
      </div>
    ))}
    {applyMask && (
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10 h-full w-full from-white/50 from-5% via-transparent via-50% to-white/50 to-95% dark:from-gray-800/50 dark:via-transparent dark:to-gray-800/50",
          vertical ? "bg-gradient-to-b" : "bg-gradient-to-r"
        )}
      />
    )}
  </div>
);

const TestimonialCard = ({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) => (
  <div
    className={cn(
      "group mx-2 flex h-32 w-80 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-transparent p-3 transition-all hover:border-blue-400 hover:shadow-[0_0_10px_#60a5fa] dark:hover:border-blue-400",
      className
    )}
  >
    <div className="flex items-start gap-3">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-600">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="h-full w-full not-prose object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold text-foreground">
            {testimonial.name}
          </span>
          <span className="text-xs text-muted-foreground">
            {testimonial.handle}
          </span>
        </div>
        <p className="mt-1 line-clamp-3 text-sm text-foreground">
          {testimonial.description}
        </p>
      </div>
    </div>
  </div>
);

export const AnimatedTestimonials = ({
  data,
  className,
  cardClassName,
}: {
  data: Testimonial[];
  className?: string;
  cardClassName?: string;
}) => (
  <div className={cn("w-full overflow-x-hidden py-4", className)}>
    {[false, true, false].map((reverse, index) => (
      <AnimatedCanopy
        key={`Canopy-${index}`}
        reverse={reverse}
        className="[--duration:25s]"
        pauseOnHover
        applyMask={false}
        repeat={3}
      >
        {data.map((testimonial) => (
          <TestimonialCard
            key={testimonial.name}
            testimonial={testimonial}
            className={cardClassName}
          />
        ))}
      </AnimatedCanopy>
    ))}
  </div>
);
