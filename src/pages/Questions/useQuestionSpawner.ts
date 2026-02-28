import { useEffect, useRef, useState } from "react";
import type { QuestionBubbleData } from "./questions.types";
import { pickRandom, randomBetween } from "../../utils/random";
import { QUESTION_COLORS, QUESTION_TEXTS } from "./questions.constants";

export function useQuestionSpawner(active: boolean) {
  const [bubbles, setBubbles] = useState<QuestionBubbleData[]>([]);
  const usedTexts = useRef<Set<string>>(new Set());
  const intervalRef = useRef<number | null>(null);

  function generateSafeY(): number {
    const y = randomBetween(10, 85);

    if (y > 30 && y < 55) {
      return generateSafeY();
    }

    return y;
  }

  function spawnBubble() {
    const availableTexts =
      QUESTION_TEXTS.filter(t => !usedTexts.current.has(t));

    if (availableTexts.length === 0) {
      usedTexts.current.clear();
    }

    const text = pickRandom(
      availableTexts.length ? availableTexts : QUESTION_TEXTS
    );

    usedTexts.current.add(text);

    const bubble: QuestionBubbleData = {
      id: crypto.randomUUID(),
      text,
      color: pickRandom(QUESTION_COLORS),
      x: randomBetween(5, 85),
      y: generateSafeY(),
      tail: Math.random() > 0.5 ? "left" : "right"
    };

    setBubbles(prev => [...prev, bubble]);
  }

  useEffect(() => {
    if (!active) return;

    intervalRef.current = window.setInterval(spawnBubble, 300);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [active]);

  function reset() {
    setBubbles([]);
    usedTexts.current.clear();
  }

  return { bubbles, reset };
}

