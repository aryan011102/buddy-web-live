import { useEffect, useRef } from "react";

export default function MagnifyText({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<Array<HTMLSpanElement | null>>([]);

  const RADIUS = 80;
  const MAX_SCALE = 1.8;

  useEffect(() => {
    const container = containerRef.current;
    const cursor = cursorRef.current;

    // 🔒 Hard guard — TS + runtime safe
    if (!container || !cursor) return;

    const move = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      // cursor is now guaranteed non-null
      cursor.style.left = `${mx}px`;
      cursor.style.top = `${my}px`;
      cursor.style.opacity = "1";

      lettersRef.current.forEach((letter) => {
        if (!letter) return;

        const r = letter.getBoundingClientRect();
        const cx = r.left - rect.left + r.width / 2;
        const cy = r.top - rect.top + r.height / 2;

        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.hypot(dx, dy);

        if (dist < RADIUS) {
          const t = 1 - dist / RADIUS;
          letter.style.transform = `scale(${1 + t * (MAX_SCALE - 1)})`;
        } else {
          letter.style.transform = "scale(1)";
        }
      });
    };

    const leave = () => {
      cursor.style.opacity = "0";
      lettersRef.current.forEach((letter) => {
        if (!letter) return;
        letter.style.transform = "scale(1)";
      });
    };

    container.addEventListener("pointermove", move);
    container.addEventListener("pointerleave", leave);

    return () => {
      container.removeEventListener("pointermove", move);
      container.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "130%",
        cursor: "none",
      }}
    >
      {/* Cursor ring */}
      <div
        ref={cursorRef}
        style={{
          position: "absolute",
          width: 160,
          height: 160,
          border: "2px solid rgba(246,221,225,0.6)",
          borderRadius: "50%",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          opacity: 0,
        }}
      />

      {/* Text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          userSelect: "none",
        }}
      >
        {text.split("").map((char, i) => (
         <span
  key={i}
  ref={(el) => {
    lettersRef.current[i] = el;
  }}
  style={{
    fontFamily: "Rethink Sans",
    fontSize: "clamp(96px, 18vw, 180px)",
    fontWeight: 400,
    color: "#F6DDE1",
    display: "inline-block",
    transformOrigin: "center",
    transition: "transform 0.1s linear",
    marginLeft: i === 0 ? 0 : "-12px",
    willChange: "transform",
  }}
>
  {char}
</span>

        ))}
      </div>
    </div>
  );
}
