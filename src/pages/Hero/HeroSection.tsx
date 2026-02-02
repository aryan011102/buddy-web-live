import Boxes from "../../components/EmojiBurst/Boxes";
import EmojiBurst from "../../components/EmojiBurst/EmojiBurst";
import MagnifyText from "../../components/MagnifyTextPixi/MagnifyText";
import { useEffect, useState } from "react";
import "./hero.css";
type EmojiTarget = {
  id: string;
  x: number;
  y: number;
  count: number;
  emojis: string[];
};

export default function HeroSection() {
  const [targets, setTargets] = useState<EmojiTarget[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const elements = document.querySelectorAll("[data-emoji-source]");

      const positions = Array.from(elements).map((el, i) => {
        const rect = el.getBoundingClientRect();

        return {
          id: String(i),
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          count: Number(el.getAttribute("data-emoji-count")) || 10,
          emojis:
            el
              .getAttribute("data-emoji-list")
              ?.split(",")
              .map(e => e.trim()) || ["🎉"],
        };
      });

      setTargets(positions);
    }, 600);

    return () => clearTimeout(timeout);
  }, []);

  return (
  <section className="hero-section" id="hero-section">
      <MagnifyText text="buddy" />

     <div className="hero-cta-wrapper">
      <button className="hero-cta">
          Download Now
        </button>
      </div>

      {targets.length > 0 && <EmojiBurst targets={targets} />}

      <div className="hero-boxes">
        <Boxes />
      </div>
    </section>
  );
}
