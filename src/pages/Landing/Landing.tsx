import Boxes from "../../components/EmojiBurst/Boxes";
import EmojiBurst from "../../components/EmojiBurst/EmojiBurst";
import FisheyeTextPixi from "../../components/FisheyeTextPixi/FisheyeTextPixi";

import MagnifyText from "../../components/FisheyeTextPixi/MagnifyText";
import { useEffect, useState } from "react";


export default function Landing() {
type EmojiTarget = {
  id: string;
  x: number;
  y: number;
  count: number;
  emojis: string[];
};

const [targets, setTargets] = useState<EmojiTarget[]>([]);



useEffect(() => {
  const timeout = setTimeout(() => {
    const elements = document.querySelectorAll(
      "[data-emoji-source]"
    );

    const positions = Array.from(elements).map((el, i) => {
      const rect = el.getBoundingClientRect();

      const count =
        Number(el.getAttribute("data-emoji-count")) || 10;

      const emojis =
        el
          .getAttribute("data-emoji-list")
          ?.split(",")
          .map((e) => e.trim()) || ["🎉"];

      return {
        id: String(i),
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        count,
        emojis,
      };
    });

    setTargets(positions);
  }, 600); 

  return () => clearTimeout(timeout);
}, []);

  return (
    <main
  style={{
    position: "relative",
    height: "100vh",
    overflow: "hidden",
  }}
>
{/* <FisheyeTextPixi text="buddy" /> */}
  <MagnifyText text="buddy" />


  <div
  style={{
    position: "absolute",
    top: "55%",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10,
    pointerEvents: "auto",  
  }}
>
  <button
    style={{
      padding: "14px 28px",
      borderRadius: "999px",
      border: "1px solid #ddd",
      background: "#fff",
      fontSize: "16px",
    }}
  >
    Download Now
  </button>
</div>
 {targets.length > 0 && <EmojiBurst targets={targets} />}

  <div
    style={{
      position: "absolute",
      bottom: "-10px",
      left: 0,
      width: "100%",
      pointerEvents: "none",
    }}
  >
    <Boxes />
  </div>
</main>
  );
}
