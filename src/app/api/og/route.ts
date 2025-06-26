import { ImageResponse } from "@vercel/og";
import React from "react";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "ScrollX UI";
  const description =
    searchParams.get("description") || "Beautiful UI components";
  const logo =
    searchParams.get("logo") || "https://scrollx-ui.vercel.app/favicon.ico";

  return new ImageResponse(
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#18181b",
          color: "#fff",
          padding: 60,
          justifyContent: "center",
          alignItems: "center",
        },
      },
      React.createElement("img", {
        src: logo,
        width: 120,
        height: 120,
        style: { borderRadius: 24, marginBottom: 32 },
      }),
      React.createElement(
        "h1",
        { style: { fontSize: 56, fontWeight: 700, margin: 0 } },
        title
      ),
      React.createElement(
        "p",
        { style: { fontSize: 32, marginTop: 24 } },
        description
      )
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
