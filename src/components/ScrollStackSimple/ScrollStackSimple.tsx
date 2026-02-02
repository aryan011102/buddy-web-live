import { useEffect, useRef, type ReactNode } from "react";
import "./scrollStackSimple.css";

export default function ScrollStackSimple({
  children,
}: {
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

useEffect(() => {
  const cards =
    ref.current?.querySelectorAll<HTMLElement>(".stack-card");

  if (!cards) return;

  const section =
    document.querySelector(".steps-section") as HTMLElement;

  const onScroll = () => {
    const vh = window.innerHeight;

    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();


      const p = 1 - rect.top / vh;
      const clamped = Math.max(0, Math.min(1, p));
      const scale = 1 - i * 0.04 * clamped;
      const direction = i % 2 === 0 ? 1 : -1;   
const maxRotate = 2;                   
const rotate = direction * maxRotate * clamped;

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
          imageBg
        );
      }
    });
  };

  window.addEventListener("scroll", onScroll);
  onScroll();

  return () => window.removeEventListener("scroll", onScroll);
}, []);


  return (
    <div ref={ref} className="stack-container">
      {children}
    </div>
  );
}
