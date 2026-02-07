import { useEffect } from "react";

type Target = {
  x: number;
  y: number; 
  count: number;
  emojis: string[];
};

export default function EmojiBurst({ targets }: { targets: Target[] }) {
  const SPAWN_FROM_BOTTOM = 5;   
  const FADE_BEFORE_BOTTOM = 5;

  useEffect(() => {
    const nodes: HTMLElement[] = [];
    const hero = document.getElementById("hero-section");
    if (!hero) return;

    const heroHeight = hero.getBoundingClientRect().height;

    targets.forEach((target) => {
      for (let i = 0; i < target.count; i++) {
        const el = document.createElement("span");

        el.textContent =
          target.emojis[
            Math.floor(Math.random() * target.emojis.length)
          ];

        el.style.position = "absolute";
        el.style.pointerEvents = "none";
        el.style.fontSize = "32px";
        el.style.opacity = "1";
        el.style.willChange = "transform, opacity";
        el.style.zIndex = "2";

        const startOffsetX = (Math.random() - 0.5) * 24;

       
        const startY = heroHeight - SPAWN_FROM_BOTTOM;

        el.style.left = `${target.x + startOffsetX}px`;
        el.style.top = `${startY}px`;

        hero.appendChild(el);
        nodes.push(el);

       
        const riseHeight = 180 + Math.random() * 240;

       
        const xDrift = (Math.random() - 0.5) * 140;

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
                  transform: `translate(${xDrift}px, -${FADE_BEFORE_BOTTOM}px)`,
                  opacity: 0,
                },
              ],
              {
                duration: 1000,
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
    }, 2400);

    return () => {
      clearTimeout(cleanup);
      nodes.forEach((n) => n.remove());
    };
  }, [targets]);

  return null;
}
