import { cn } from "@/lib/utils";

interface Logo {
  name: string;
  image: string;
}

interface FlowingLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
  repeat?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  applyMask?: boolean;
}

const FlowingLogo = ({
  children,
  vertical = false,
  repeat = 4,
  pauseOnHover = false,
  reverse = false,
  className,
  applyMask = true,
  ...props
}: FlowingLogoProps) => (
  <div
    {...props}
    className={cn(
      "group relative flex h-full w-full overflow-hidden p-1 [--duration:10s] [--gap:12px] [gap:var(--gap)]",
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
          "pointer-events-none absolute inset-0 z-10 h-full w-full",
          vertical ? "bg-gradient-to-b" : "bg-gradient-to-r"
        )}
      />
    )}
  </div>
);

const LogoCard = ({ logo, className }: { logo: Logo; className?: string }) => (
  <div
    className={cn(
      "flex h-16 w-16 shrink-0 cursor-pointer overflow-hidden  hover:scale-110 rounded-xl border border-transparent  transition-all hover:border-blue-400 hover:shadow-[0_0_10px_#60a5fa] dark:hover:border-blue-400",
      className
    )}
  >
    <img
      src={logo.image}
      alt={logo.name}
      className="h-full w-full object-cover rounded-xl"
    />
  </div>
);

export const FlowingLogos = ({
  data,
  className,
  cardClassName,
}: {
  data: Logo[];
  className?: string;
  cardClassName?: string;
}) => (
  <div className={cn("w-full overflow-hidden", className)}>
    {[false, true, false].map((reverse, index) => (
      <FlowingLogo
        key={`Canopy-${index}`}
        reverse={reverse}
        className="[--duration:30s]"
        pauseOnHover
        applyMask
        repeat={9}
      >
        {data.map((logo) => (
          <LogoCard key={logo.name} logo={logo} className={cardClassName} />
        ))}
      </FlowingLogo>
    ))}
  </div>
);
