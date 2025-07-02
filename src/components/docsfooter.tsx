import Link from "next/link";

export function DocsFooter() {
  return (
    <p className="mx-auto w-fit text-center text-muted-foreground text-xs leading-loose sm:text-sm">
      Built with
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="inline align-middle mx-1"
      >
        <defs>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2196f3" />
            <stop offset="40%" stopColor="#9c27b0" />
            <stop offset="100%" stopColor="#e91e63" />
          </linearGradient>
        </defs>
        <path
          fill="url(#heartGradient)"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
             2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
             C13.09 3.81 14.76 3 16.5 3
             19.58 3 22 5.42 22 8.5
             c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
      by{" "}
      <Link
        href="https://x.com/Ahdeetai"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary text-xs leading-loose underline underline-offset-4 hover:text-primary/80 transition"
      >
        Ahdeetai
      </Link>
      .
    </p>
  );
}
