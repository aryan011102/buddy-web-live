import { useEffect } from "react";

const EMOJIS = ["🍎", "🥕", "🍞", "🥛", "🍇", "🛒"];

type Target = {
  x: number;
  y: number;
  count: number;
  emojis: string[];
};


export default function EmojiBurst({ targets }: { targets: Target[] }) {
  useEffect(() => {
    const nodes: HTMLElement[] = [];

  targets.forEach((target) => {
  for (let i = 0; i < target.count; i++) {

        const el = document.createElement("span");
       el.textContent =
  target.emojis[
    Math.floor(Math.random() * target.emojis.length)
  ];


        el.style.position = "fixed";
       const startOffsetX = (Math.random() - 0.5) * 24;
const startOffsetY = (Math.random() - 0.5) * 12;

el.style.left = `${target.x + startOffsetX}px`;
el.style.top = `${target.y + startOffsetY}px`;
        el.style.fontSize = "22px";
        el.style.pointerEvents = "none";
        el.style.zIndex = "9999";
        el.style.opacity = "1";
        el.style.willChange = "transform, opacity";

        document.body.appendChild(el);
        nodes.push(el);

       const xDrift = (Math.random() - 0.5) * 140;
// slight sideways
        const riseHeight = 380 + Math.random() * 120;

setTimeout(() => {
  const rise = el.animate(
    [
      { transform: "translate(0, 0)", opacity: 1 },
      {
        transform: `translate(${xDrift}px, -${riseHeight}px)`,
        opacity: 1,
      },
    ],
    {
      duration: 900,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fill: "forwards",
    }
  );

  rise.onfinish = () => {
    el.animate(
      [
        {
          transform: `translate(${xDrift}px, -${riseHeight}px)`,
          opacity: 1,
        },
        {
          transform: `translate(${xDrift}px, ${
            riseHeight + 160
          }px)`,
          opacity: 0,
        },
      ],
      {
        duration: 1200,
        easing: "cubic-bezier(0.55, 0, 1, 0.45)",
        fill: "forwards",
      }
    );
  };
}, i * 40);

      }
    });

    const cleanup = setTimeout(() => {
      nodes.forEach((n) => n.remove());
    }, 2200);

    return () => clearTimeout(cleanup);
  }, [targets]);

  return null;
}
