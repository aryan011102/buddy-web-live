import { useEffect, useMemo, useRef, useState } from "react";
import blueCircleShape from "../../assets/img/blue-c.svg";
import greenCircleShape from "../../assets/img/green-c.svg";
import pinkCircleShape from "../../assets/img/pink-c.svg";
import purpleCircleShape from "../../assets/img/purple-c.svg";
import yellowCircleShape from "../../assets/img/yellow-c.svg";
import blueSquareShape from "../../assets/img/blue-s.svg";
import greenSquareShape from "../../assets/img/green-s.svg";
import pinkSquareShape from "../../assets/img/pink-s.svg";
import purpleSquareShape from "../../assets/img/purple-s.svg";
import yellowSquareShape from "../../assets/img/yellow-s.svg";
import ankur from "../../assets/img/ankur.png";
import aryan from "../../assets/img/aryan.png";
import devansh from "../../assets/img/devansh.png";
import pritika from "../../assets/img/pritika.png";
import roshan from "../../assets/img/roshan.jpeg";
import sakshi from "../../assets/img/sakshi.jpeg";
import yash from "../../assets/img/yash.jpeg";
import "./friendsChain.css";

type BuddyConfig = {
  id: string;
  shape: string;
  face: string | null;
  headShape: "square" | "circle";
};

type ShapeConfig = {
  shape: string;
  headShape: "square" | "circle";
};

const CIRCLE_SHAPES: ShapeConfig[] = [
    { shape: yellowCircleShape, headShape: "circle" },
 
    { shape: purpleCircleShape, headShape: "circle" },
  { shape: greenCircleShape, headShape: "circle" },
  { shape: pinkCircleShape, headShape: "circle" },
 { shape: blueCircleShape, headShape: "circle" },

];

const SQUARE_SHAPES: ShapeConfig[] = [

 
  { shape: pinkSquareShape, headShape: "square" },
   { shape: greenSquareShape, headShape: "square" },
    { shape: blueSquareShape, headShape: "square" },
  { shape: purpleSquareShape, headShape: "square" },
  { shape: yellowSquareShape, headShape: "square" },
];

const SHAPES = [...SQUARE_SHAPES, ...CIRCLE_SHAPES];

const PEOPLE = [ankur, aryan, devansh,sakshi, pritika, roshan, yash];

type FaceState = {
  revealed: boolean;
  flips: number;
};

function shuffle<T>(items: T[]) {
  const clone = [...items];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function createFaces(total: number) {
  const minFilled = Math.min(total, PEOPLE.length);
  const maxEmpty = Math.max(0, total - minFilled);
  const randomEmpty = Math.floor(Math.random() * (Math.floor(total * 0.35) + 1));
  const emptyCount = Math.min(maxEmpty, randomEmpty);
  const filledCount = total - emptyCount;

  const required = shuffle(PEOPLE).slice(0, Math.min(filledCount, PEOPLE.length));
  const pool: Array<string | null> = [...required];

  while (pool.length < filledCount) {
    const randomFace = PEOPLE[Math.floor(Math.random() * PEOPLE.length)];
    pool.push(randomFace);
  }

  while (pool.length < total) {
    pool.push(null);
  }

  const arranged = shuffle(pool);

  for (let i = 1; i < arranged.length; i += 1) {
    const current = arranged[i];
    const previous = arranged[i - 1];

    if (!current || current !== previous) {
      continue;
    }

    const nullSwapIndex = arranged.findIndex((face, index) => index > i && face === null);
    if (nullSwapIndex !== -1) {
      [arranged[i], arranged[nullSwapIndex]] = [arranged[nullSwapIndex], arranged[i]];
      continue;
    }

    const differentSwapIndex = arranged.findIndex(
      (face, index) => index > i && face !== null && face !== previous
    );
    if (differentSwapIndex !== -1) {
      [arranged[i], arranged[differentSwapIndex]] = [arranged[differentSwapIndex], arranged[i]];
      continue;
    }

    arranged[i] = null;
  }

  return arranged;
}

export default function FriendsChainSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [itemCount, setItemCount] = useState(() => Math.max(SHAPES.length, PEOPLE.length));
  const [faces, setFaces] = useState<FaceState[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const isMobile = width <= 760;
      const avatarWidth = isMobile ? 136 : 192;
      const overlap = isMobile ? 10 : 18;
      const step = avatarWidth - overlap;
      const needed = Math.ceil((width - avatarWidth) / step) + 1;
      const minCount = Math.max(SHAPES.length, PEOPLE.length);
      setItemCount(Math.max(minCount, needed));
    });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const buddies = useMemo(() => {
    const facePool = createFaces(itemCount);
    return Array.from({ length: itemCount }, (_, i): BuddyConfig => {
      const shapePool = i % 2 === 0 ? SQUARE_SHAPES : CIRCLE_SHAPES;
      const shape = shapePool[Math.floor(i / 2) % shapePool.length];
      return {
        id: `buddy-${i + 1}`,
        shape: shape.shape,
        headShape: shape.headShape,
        face: facePool[i],
      };
    });
  }, [itemCount]);

  useEffect(() => {
    setFaces(prev =>
      Array.from({ length: buddies.length }, (_, i) => {
        const current = prev[i];
        if (current) {
          return current;
        }

        return { revealed: false, flips: 0 };
      })
    );
  }, [buddies.length]);

  const items = useMemo(
    () =>
      buddies.map((buddy, i) => ({
        ...buddy,
        revealed: faces[i]?.revealed ?? false,
        flips: faces[i]?.flips ?? 0,
      })),
    [buddies, faces]
  );

  function handleFaceClick(position: number) {
    setFaces(prev => {
      const next = [...prev];
      const current = next[position];
      if (!current) {
        return prev;
      }
      next[position] = {
        revealed: !current.revealed,
        flips: current.flips + 1,
      };
      return next;
    });
  }

  return (
    <section ref={sectionRef} className="friends-chain-section" aria-label="Buddy chain">
      <h2>
        Hope to see you on the app soon :)
        <br />
        Made with love in India ♡
      </h2>

      <div className="friends-chain-scroll">
        <div className="friends-chain-track">
          {items.map((item, i) => (
            <article key={item.id} className="friend-avatar">
              <img className="friend-shape" src={item.shape} alt="Buddy character" />

              <button
                type="button"
                className="friend-face-button"
                onClick={() => handleFaceClick(i)}
                aria-label="Toggle buddy face"
              >
                <span
                  className={`friend-face-mask shape-${item.headShape} ${
                    item.revealed ? "is-revealed" : ""
                  }`}
                >
                  {item.face ? (
                    <img
                      key={`${item.id}-${item.flips}`}
                      className={`friend-face ${item.revealed ? "is-visible" : "is-hidden"}`}
                      src={item.face}
                      alt="Buddy face"
                    />
                  ) : null}
                </span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
