import { useEffect, useRef, useState, type ReactNode } from "react";
import "./categoryStage.css";
import { CATEGORIES } from "../../pages/Categories/categories.constants";
import CategoryBall from "../CategoryBall/CategoryBall";
import type { CategoryItem } from "../../pages/Categories/categories.types";

type Ball = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  category?: CategoryItem;
  variant: "icon" | "text" | "filler";
};

const GRAVITY = window.innerWidth < 768 ? 2.2 : 2.2;
const FRICTION = window.innerWidth < 768 ? 0.88 : 0.92;

export default function CategoryStage({ children }: { children?: ReactNode }) {
  const isMobile = window.innerWidth < 768;
  const isCompact = window.innerWidth <= 1100 && window.innerHeight <= 700;
  const stageRef = useRef<HTMLDivElement>(null);

  const [balls, setBalls] = useState<Ball[]>([]);
  const ballsRef = useRef<Ball[]>([]);

  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    const stage = stageRef.current;
    if (!stage) return;

    const w = stage.clientWidth;

    const categoryBalls: Ball[] = CATEGORIES.map((cat) => {
      const size = isMobile
        ? rand(90, 160)
        : isCompact
          ? rand(120, 220)
          : rand(146, 295);

      return {
        id: cat.id,
        x: rand(size, w - size),
        y: rand(-1800, -700),
        vx: rand(-0.5, 0.5),
        vy: 0,
        radius: size / 2,
        category: cat,
        variant: Math.random() > 0.5 ? "icon" : "text",
      };
    });

    const fillerBalls: Ball[] = Array.from({ length: isMobile ? 3 : 5 }).map(
      (_, i) => {
        const size = isMobile
          ? rand(40, 70)
          : isCompact
            ? rand(48, 90)
            : rand(61, 117);

        return {
          id: `filler-${i}`,
          x: rand(size, w - size),
          y: rand(-1800, -700),
          vx: rand(-0.3, 0.3),
          vy: 0,
          radius: size / 2,
          variant: "filler",
        };
      },
    );

    const all = [...categoryBalls, ...fillerBalls];

    ballsRef.current = all;
    setBalls(all);
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let raf: number;

    const loop = () => {
      const stage = stageRef.current;
      if (!stage) return;

      const h = stage.clientHeight;
      const w = stage.clientWidth;
      const arr = ballsRef.current;

      arr.forEach((b) => {
        b.vy += GRAVITY;

        b.vx *= FRICTION;
        b.vy *= FRICTION;

        b.x += b.vx;
        b.y += b.vy;

        if (b.y + b.radius > h) {
          b.y = h - b.radius;

          if (Math.abs(b.vy) < 0.6) {
            b.vy = 0;
          }
        }

        if (b.x - b.radius < 0) {
          b.x = b.radius;
          b.vx *= -0.4;
        }

        if (b.x + b.radius > w) {
          b.x = w - b.radius;
          b.vx *= -0.4;
        }
      });

      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          const a = arr[i];
          const b = arr[j];

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const min = a.radius + b.radius;

          if (dist < min) {
            const angle = Math.atan2(dy, dx);
            const push = (min - dist) / 2;

            const px = Math.cos(angle) * push;
            const py = Math.sin(angle) * push;

            if (py > 0) {
              a.y -= py;
            } else {
              b.y += py;
            }

            a.x -= px;
            b.x += px;
          }
        }
      }

      setBalls([...arr]);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [started]);

  return (
    <div ref={stageRef} className="categories-stage">
      {children ? <div className="categories-title-slot">{children}</div> : null}
      {balls.map((ball) => (
        <div
          key={ball.id}
          className="ball-wrapper"
          style={{
            transform: `translate(${ball.x - ball.radius}px, ${
              ball.y - ball.radius
            }px)`,
            width: ball.radius * 2,
            height: ball.radius * 2,
          }}
        >
          <CategoryBall
            category={ball.category}
            variant={ball.variant === "filler" ? undefined : ball.variant}
            size={ball.radius * 2}
          />
        </div>
      ))}
    </div>
  );
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

