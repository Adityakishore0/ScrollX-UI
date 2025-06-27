import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "ScrollX UI";
  const description =
    searchParams.get("description") ||
    "An open source collection of animated, interactive components";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#0a0a0a",
          color: "white",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "64px",
            left: 0,
            right: 0,
            height: "1px",
            backgroundColor: "#27272a",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "64px",
            left: 0,
            right: 0,
            height: "1px",
            backgroundColor: "#27272a",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "64px",
            width: "1px",
            borderLeft: "1px dashed #27272a",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: "64px",
            width: "1px",
            borderLeft: "1px dashed #27272a",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "96px",
            right: "96px",
            display: "flex",
          }}
        >
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 32 32"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#2196f3", stopOpacity: 1 }}
                />
                <stop
                  offset="50%"
                  style={{ stopColor: "#9c27b0", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#e91e63", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <g
              transform="translate(0,32) scale(0.1,-0.1)"
              fill="url(#grad1)"
              stroke="none"
            >
              <path d="M196 231 c-15 -16 -22 -18 -42 -9 -23 11 -29 8 -66 -29 -27 -27 -39 -47 -35 -57 9 -22 50 -20 72 4 13 14 22 17 29 10 19 -19 52 -10 84 23 35 36 41 61 16 71 -26 10 -40 7 -58 -13z m48 -9 c3 -5 -8 -22 -24 -37 -27 -26 -32 -27 -56 -16 -23 10 -30 9 -50 -10 -12 -11 -28 -19 -34 -17 -6 2 5 18 24 37 32 32 36 32 57 18 21 -15 23 -14 41 9 20 25 33 30 42 16z" />
              <path d="M65 90 c-3 -5 -4 -10 -1 -10 54 -5 187 0 189 7 3 12 -180 16 -188 3z" />
            </g>
          </svg>
        </div>

        <div
          style={{
            position: "absolute",
            left: "128px",
            right: "128px",
            top: "128px",
            bottom: "128px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: "896px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              fontSize: title.length > 20 ? 64 : 80,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              marginBottom: "24px",
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: 40,
              fontWeight: 500,
              lineHeight: 1.5,
              color: "#a1a1aa",
              maxWidth: "100%",
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
