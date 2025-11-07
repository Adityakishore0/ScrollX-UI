"use client";
import { useEffect, useRef, useState } from "react";

export default function AutoPlayVideo({ slug }: { slug: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [loadSrc, setLoadSrc] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !ref.current) return;
    const el = ref.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setLoadSrc(true);
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-[#09090B] animate-pulse rounded-t-3xl" />
    );
  }

  return (
    <video
      ref={ref}
      loop
      muted
      playsInline
      preload="none"
      className="object-cover not-prose rounded-t-3xl bg-[#09090B] transition-transform duration-300 group-hover:scale-[1.02]"
    >
      {loadSrc && (
        <>
          <source src={`/assets/components/${slug}.webm`} type="video/webm" />
          <source src={`/assets/components/${slug}.mp4`} type="video/mp4" />
        </>
      )}
    </video>
  );
}
