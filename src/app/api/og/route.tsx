import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") || "ScrollX UI";
  const description =
    searchParams.get("description") ||
    "An open source collection of animated, interactive components";

  const host = request.headers.get("host");
  const origin = host ? `https://${host}` : "http://localhost:3000";
  const logo = `${origin}/favicon/favicon-32x32.png`;

  return new ImageResponse(
    (
      <div
        className="flex h-full w-full bg-neutral-950 text-white"
        style={{ fontFamily: "sans-serif" }}
      >
        <div className="absolute inset-y-0 left-16 w-[1px] border border-dashed border-stone-700" />
        <div className="absolute inset-y-0 right-16 w-[1px] border border-dashed border-stone-700" />
        <div className="absolute inset-x-0 top-16 h-[1px] border border-stone-700" />
        <div className="absolute inset-x-0 bottom-16 h-[1px] border border-stone-700" />

        <div className="absolute bottom-24 right-24 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            width={48}
            height={48}
          >
            <line
              x1="208"
              y1="128"
              x2="128"
              y2="208"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
            />
            <line
              x1="192"
              y1="40"
              x2="40"
              y2="192"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
            />
          </svg>
        </div>

        <div className="flex flex-col absolute inset-32 justify-center w-[896px]">
          <img
            src={logo}
            width={72}
            height={72}
            alt="Logo"
            className="mb-10 rounded-xl"
          />
          <div
            className="leading-[1.1]"
            style={{
              fontSize: title.length > 20 ? 64 : 80,
              fontWeight: 700,
              letterSpacing: "-0.04em",
            }}
          >
            {title}
          </div>
          <div
            className="text-stone-400 mt-6"
            style={{
              fontSize: 40,
              fontWeight: 500,
              lineHeight: 1.5,
            }}
          >
            {description}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 628,
    }
  );
}
