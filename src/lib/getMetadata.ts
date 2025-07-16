export function getMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const siteUrl = "https://scrollx-ui.vercel.app";
  const image = `${siteUrl}/api/og?title=${encodeURIComponent(
    title
  )}&description=${encodeURIComponent(description)}`;

  return {
    title: `ScrollX UI | ${title}`,
    description,
    openGraph: {
      title: `ScrollX UI | ${title}`,
      description,
      url: `${siteUrl}${path}`,
      images: [
        {
          url: image,
          width: 1200,
          height: 628,
          alt: `ScrollX UI | ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `ScrollX UI | ${title}`,
      description,
      images: [image],
    },
  };
}
