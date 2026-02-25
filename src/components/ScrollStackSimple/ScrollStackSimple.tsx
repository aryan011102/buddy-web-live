import { useEffect, useRef, type ReactNode } from "react";
import "./scrollStackSimple.css";

export default function ScrollStackSimple({
  children,
  count,
}: {
  children: ReactNode;
  count?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = ref.current?.querySelectorAll<HTMLElement>(".stack-card");

    if (!cards) return;

    const section = document.querySelector(".steps-section") as HTMLElement;

    const onScroll = () => {
      const vh = window.innerHeight;

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();

        const p = 1 - rect.top / vh;
        const clamped = Math.max(0, Math.min(1, p));
        const baseScale =
          window.innerWidth <= 1100 && window.innerWidth >= 769 ? 0.8 : 1;
        const scale = (1 - i * 0.01 * clamped) * baseScale;
        const direction = i % 2 === 0 ? 1 : -1;
        const maxRotate = window.innerWidth <= 765 ? 0 : 2;

        const rotate = window.innerWidth <= 765 ? 0 : direction * maxRotate * clamped;

        card.style.transform = `
  scale(${scale})
  rotate(${rotate}deg)
`;

        if (rect.top < vh * 0.45 && rect.bottom > vh * 0.45) {
          const pageBg = card.dataset.pageBg!;
          const imageBg = card.dataset.imageBg!;

          section.style.backgroundColor = pageBg;
          document.documentElement.style.setProperty(
            "--step-image-bg",
            imageBg,
          );
        }
      });

      const lastCard = cards[cards.length - 1];
      if (lastCard) {
        const lastRect = lastCard.getBoundingClientRect();
        const hideAt = window.innerWidth <= 765 ? 0.06 : 0.15;
        if (lastRect.top <= vh * hideAt) {
          section.classList.add("hide-steps-title");
        } else {
          section.classList.remove("hide-steps-title");
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="stack-container"
      style={
        count
          ? ({ "--stack-count": count } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
