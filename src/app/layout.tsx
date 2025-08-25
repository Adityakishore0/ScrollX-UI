import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import type { Metadata } from "next";
import Script from "next/script";
import { siteConfig } from "@/config/site";
import { ToastContainer } from "@/components/ui/toast";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  icons: siteConfig.icons,
  manifest: siteConfig.manifest,
  keywords: siteConfig.keywords,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Preview`,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: `@${siteConfig.creator}`,
  },
  authors: siteConfig.authors,
  creator: siteConfig.creator,
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
      <head>
        <meta
          name="google-site-verification"
          content="GlvuJNImpIf6gGikeYMVgWIke1V-hohlZaKI_blBh_s"
        />
        <meta name="msvalidate.01" content="3ED2A565E4F3172BA1CC3F2ECAF63CFE" />
        <link rel="canonical" href={siteConfig.url} />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteConfig.name,
              description: siteConfig.description,
              url: siteConfig.url,
              potentialAction: {
                "@type": "SearchAction",
                target: `${siteConfig.url}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
              publisher: {
                "@type": "Person",
                name: siteConfig.creator,
                url: siteConfig.url,
              },
              creator: {
                "@type": "Person",
                name: siteConfig.creator,
              },
              keywords: siteConfig.keywords.join(", "),
              image: `${siteConfig.url}${siteConfig.ogImage}`,
              mainEntityOfPage: {
                "@type": "CreativeWork",
                name: `${siteConfig.name} Component Library`,
                description:
                  "An open-source collection of customizable React components designed for modern web applications.",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientBody>
          {children}
          <ToastContainer />
        </ClientBody>
      </body>
    </html>
  );
}
