import { useEffect, useRef, useState } from "react";

export function useRevealOnScroll() {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}
