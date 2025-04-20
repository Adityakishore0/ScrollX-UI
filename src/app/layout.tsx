import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://scrollx-ui.vercel.app"),
  title: "ScrollX-UI – Modern React Components for Fast, Interactive UIs",
  description: "An open source collection of animated, interactive components",
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
  keywords: [
    "ScrollX",
    "UI components",
    "React components",
    "tailwindcss components",
    "open source UI library",
    "animated UI",
    "modern UI design",
    "interactive UI",
    "ScrollX UI",
    "responsive UI",
    "tailwind UI",
  ],
  openGraph: {
    title: "ScrollX-UI – Modern React Components for Fast, Interactive UIs",
    description:
      "An open source collection of animated, interactive components",
    url: "https://scrollx-ui.vercel.app",
    siteName: "ScrollX UI",
    images: [
      {
        url: "/images/ui.png",
        width: 1200,
        height: 630,
        alt: "ScrollX UI Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScrollX-UI – Modern React Components for Fast, Interactive UIs",
    description:
      "An open source collection of animated, interactive components",
    images: ["/images/ui.png"],
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
