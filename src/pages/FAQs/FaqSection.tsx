import "./faqSection.css";
import { FAQS } from "./faq.data";
import FaqAccordion from "../../pages/FAQs/FaqAccordion";
import { useState } from "react";

import sparkPink from "../../assets/svg/spark-pink.svg";
import sparkYellow from "../../assets/svg/spark-yellow.svg";
import sparkPurple from "../../assets/svg/spark-purple.svg";

/* ---------------- TYPES ---------------- */

type SparkColor = "pink" | "yellow" | "purple";

type FloatingSpark = {
  id: string;
  slot: number;
  color: SparkColor;
};

type FallingSpark = {
  id: string;
  slot: number;
  color: SparkColor;
  driftX: number;
};

type GroundSpark = {
  id: string;
  x: number;
  color: SparkColor;
};

/* ---------------- CONSTANTS ---------------- */

const SPARK_SVGS: Record<SparkColor, string> = {
  pink: sparkPink,
  yellow: sparkYellow,
  purple: sparkPurple
};

// EXACT fixed positions beside FAQ
const SPARK_SLOTS = [
  { x: 18, y: 32 },
  { x: 82, y: 36 },
  { x: 18, y: 58 },
  { x: 82, y: 60 }
];

const SPARK_COLORS: SparkColor[] = ["pink", "yellow", "purple"];

function randomColor(): SparkColor {
  return SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)];
}

function createFloatingSpark(slot: number): FloatingSpark {
  return {
    id: crypto.randomUUID(),
    slot,
    color: randomColor()
  };
}

/* ---------------- COMPONENT ---------------- */

export default function FaqSection() {
  const [floatingSparks, setFloatingSparks] = useState<FloatingSpark[]>(
    () => SPARK_SLOTS.map((_, i) => createFloatingSpark(i))
  );

  const [fallingSparks, setFallingSparks] = useState<FallingSpark[]>([]);
  const [groundSparks, setGroundSparks] = useState<GroundSpark[]>([]);

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
      driftX
    }
  ]);

  // replace floating spark immediately (same slot)
  setFloatingSparks(prev =>
    prev.map(s =>
      s.slot === spark.slot ? createFloatingSpark(s.slot) : s
    )
  );

  // 👇 render ground spark *before* animation ends
  setTimeout(() => {
    const baseX = SPARK_SLOTS[spark.slot].x;

    setGroundSparks(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        x: baseX + driftX / 6,
        color: spark.color
      }
    ]);

    // cleanup falling spark
    setFallingSparks(prev =>
      prev.filter(s => s.id !== fallingId)
    );
  }, 100); // synced to animation
}

  return (
    <section className="faq-section">
      {/* SPARK LAYER */}
      <div className="faq-sparks-layer">
        {/* Floating */}
        {floatingSparks.map(s => {
          const pos = SPARK_SLOTS[s.slot];
          return (
            <img
              key={s.id}
              src={SPARK_SVGS[s.color]}
              className="faq-spark floating"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`
              }}
              onClick={() => handleSparkClick(s)}
              alt=""
            />
          );
        })}

        {/* Falling */}
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
                "--drift-x": `${s.driftX}px`
              } as React.CSSProperties}
            
              alt=""
            />
          );
        })}

        {/* Ground */}
        {groundSparks.map(s => (
          <img
            key={s.id}
            src={SPARK_SVGS[s.color]}
            className="faq-spark ground"
            style={{ left: `${s.x}%` }}
            alt=""
          />
        ))}
      </div>

      {/* CONTENT */}
      <h2 className="faq-title">
        Have any <span>doubts ?</span> we got you covered
      </h2>

      <div className="faq-box">
        <FaqAccordion items={FAQS} />
      </div>
    </section>
  );
}
