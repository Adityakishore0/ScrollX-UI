import { useState, useEffect, useRef, RefObject } from "react";

interface UseVisibilityOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useVisibility(
  options: UseVisibilityOptions = {}
): [RefObject<HTMLDivElement>, boolean] {
  const { threshold = 0.1, rootMargin = "50px" } = options;
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}
