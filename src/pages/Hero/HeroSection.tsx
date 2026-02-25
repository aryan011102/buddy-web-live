import Boxes from "../../components/EmojiBurst/Boxes";
import EmojiBurst from "../../components/EmojiBurst/EmojiBurst";
import MagnifyText from "../../components/MagnifyTextPixi/MagnifyText";
import { useEffect, useState } from "react";
import "./hero.css";

import SimpleHeroText from "../../components/MagnifyTextPixi/SimpleHeroText";
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

    const hero = document.getElementById("hero-section")!;
const heroRect = hero.getBoundingClientRect();

const positions = Array.from(elements).map((el, i) => {
  const rect = el.getBoundingClientRect();

  return {
    id: String(i),
    x: rect.left + rect.width / 2,
    y: rect.top - heroRect.top + rect.height / 2,
    count: Number(el.getAttribute("data-emoji-count")) || 10,
    emojis:
      el.getAttribute("data-emoji-list")
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
  <div className="hero-title-wrapper">
    {window.innerWidth < 640 ? (
      <SimpleHeroText text="buddy" />
    ) : (
      <MagnifyText text="buddy" />
    )}
  </div>
    <p className="hero-subtitle">
   No one should do life alone
  </p>


  <button className="hero-cta">
    Join Waitlist
  </button>

  {targets.length > 0 && <EmojiBurst targets={targets} />}

  <div className="hero-boxes">
    <Boxes />
  </div>
</section>

  );
}
