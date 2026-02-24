import "./faqSection.css";
import { FAQS } from "./faq.data";
import FaqAccordion from "../../pages/FAQs/FaqAccordion";
import { useEffect, useRef, useState } from "react";
import { getBuddyApiUrl } from "../../utils/api";

import sparkPink from "../../assets/svg/spark-pink.svg";
import sparkYellow from "../../assets/svg/spark-yellow.svg";
import sparkPurple from "../../assets/svg/spark-purple.svg";
import sparkBlue from "../../assets/svg/spark-blue.svg";
import sparkGreen from "../../assets/svg/spark-green.svg";

type SparkColor = "pink" | "yellow" | "purple" | "blue" | "green";

type FloatingSpark = {
  id: string;
  slot: number;
  color: SparkColor;
  scale: number;
};

type FallingSpark = {
  id: string;
  slot: number;
  color: SparkColor;
  driftX: number;
  scale: number;
};

type GroundSpark = {
  id: string;
  x: number;
  y: number;
  color: SparkColor;
  scale: number;
};


const SPARK_SVGS: Record<SparkColor, string> = {
  pink: sparkPink,
  yellow: sparkYellow,
  purple: sparkPurple,
  blue: sparkBlue,
  green: sparkGreen,
};

const SPARK_SLOTS = [
  { x: 18, y: 32 },
  { x: 12, y: 38 },
  { x: 88, y: 36 },
  { x: 82, y: 42 },
];

const SPARK_COLORS: SparkColor[] = ["pink", "yellow", "purple", "blue", "green"];

function randomColor(): SparkColor {
  return SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)];
}

function randomScale() {
  return 0.9 + Math.random() * 0.2; 
}

function createFloatingSpark(slot: number): FloatingSpark {
  return {
    id: crypto.randomUUID(),
    slot,
    color: randomColor(),
    scale: randomScale(),
  };
}

export default function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [floatingSparks, setFloatingSparks] = useState<FloatingSpark[]>(
    () => SPARK_SLOTS.map((_, i) => createFloatingSpark(i))
  );

  const [fallingSparks, setFallingSparks] = useState<FallingSpark[]>([]);
  const [groundSparks, setGroundSparks] = useState<GroundSpark[]>([]);
  const [loadedGround, setLoadedGround] = useState(false);

  function handleSparkClick(spark: FloatingSpark) {
    const fallingId = crypto.randomUUID();
    const driftX = Math.random() * 120 - 60;

    // start falling
    setFallingSparks(prev => [
      ...prev,
      {
        id: fallingId,
        slot: spark.slot,
        color: spark.color,
        driftX,
        scale: spark.scale,
      },
    ]);

    setFloatingSparks(prev =>
      prev.map(s =>
        s.slot === spark.slot ? createFloatingSpark(s.slot) : s
      )
    );

    setTimeout(() => {
      const baseX = SPARK_SLOTS[spark.slot].x;

      setGroundSparks(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          x: baseX + driftX / 6,
          y: 0,
          color: spark.color,
          scale: spark.scale,
        },
      ]);


      setFallingSparks(prev =>
        prev.filter(s => s.id !== fallingId)
      );
    }, 1200);

    // Fire-and-forget: increment server count
    void incrementStarCount();
  }

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || loadedGround) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void loadGroundSparks();
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loadedGround]);

  async function loadGroundSparks() {
    if (loadedGround) return;
    setLoadedGround(true);

    try {
      const url = getBuddyApiUrl("api/v1/stars/count");
      if (!url) return;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });

      const data = await res.json().catch(() => null);
      const count = extractCount(data);
       
      if (count > 0) {
        setGroundSparks(createGroundSparks(count));
      }
    } catch {
      // Best-effort; leave empty on failure
    }
  }

  async function incrementStarCount() {
    try {
      const url = getBuddyApiUrl("api/v1/stars/fall");
      if (!url) return;
      await fetch(url, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ count: 1 }),
      });
    } catch {
      // Best-effort; ignore errors
    }
  }

  return (
    <section ref={sectionRef} className="faq-section" id="faq">
      
      <div className="faq-sparks-layer">
     
        {floatingSparks.map(s => {
          const pos = SPARK_SLOTS[s.slot];
          return (
            <img
              key={s.id}
              src={SPARK_SVGS[s.color]}
              className="faq-spark floating"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: `scale(${s.scale})`,
              }}
              onClick={() => handleSparkClick(s)}
              alt=""
            />
          );
        })}

       
        {fallingSparks.map(s => {
          const pos = SPARK_SLOTS[s.slot];
          return (
            <img
              key={s.id}
              src={SPARK_SVGS[s.color]}
              className="faq-spark falling"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: `scale(${s.scale})`,
                "--drift-x": `${s.driftX}px`,
              } as React.CSSProperties}
              alt=""
            />
          );
        })}

      
        {groundSparks.map(s => (
          <img
            key={s.id}
            src={SPARK_SVGS[s.color]}
            className="faq-spark ground"
            style={{
              left: `${s.x}%`,
              bottom: `${s.y}%`,
              transform: `scale(${s.scale})`,
            }}
            alt=""
          />
        ))}
      </div>

    
      <h2 className="faq-title">
        Have any <span>doubts ?</span> we got you covered
      </h2>

      <div className="faq-box">
        <FaqAccordion items={FAQS} />
      </div>
    </section>
  );
}

function extractCount(data: unknown) {
  if (typeof data === "number") return Math.max(0, Math.floor(data));
  if (data && typeof data === "object") {
    const maybe = (data as { count?: unknown; data?: unknown }).count ?? (data as { data?: unknown }).data;
    if (typeof maybe === "number") return Math.max(0, Math.floor(maybe));
    if (typeof maybe === "string") {
      const n = Number(maybe);
      return Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0;
    }
  }
  return 0;
}

function createGroundSparks(count: number): GroundSpark[] {
  // max: hard cap for safety; increase to allow more total ground sparks
  const max = Math.min(count, 200);
  // spreadY: height (in %) from bottom that the band occupies; increase for taller scatter
  const spreadY = 12;

  return Array.from({ length: max }).map((_, i) => {
    // x: fully random across width; tweak edges by clamping to [1, 99]
    const x = Math.min(99, Math.max(1, Math.random() * 100));
    // y: random within band with slight bias toward the bottom
    const y = Math.max(0, Math.pow(Math.random(), 0.6) * spreadY);
    // sizeBias: slightly larger near bottom; tweak exponent for stronger gradient
    const sizeBias = 1.15 - (y / spreadY) * 0.35;
    return {
      id: `seed-${i}-${crypto.randomUUID()}`,
      x,
      y,
      color: randomColor(),
      // scale: base random size * row bias; adjust clamp to allow bigger/smaller
      scale: Math.max(0.65, Math.min(1.35, randomScale() * sizeBias)),
    };
  });
}
