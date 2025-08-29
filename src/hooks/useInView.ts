import { useState, useEffect, useRef } from 'react';

interface IntersectionOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

export function useInView<T extends HTMLElement>(
  options: IntersectionOptions = {}
): [React.RefObject<T>, boolean] {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [options.threshold, options.root, options.rootMargin]);

  return [ref, isInView];
}