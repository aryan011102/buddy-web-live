import { useEffect } from "react";
import { DEFAULT_QUESTIONS } from "./questions.constants";
import { useQuestionSpawner } from "./useQuestionSpawner";
import { useInViewport } from "../../hooks/useInViewport";

import "./questions.css";
import QuestionBubble from "../../components/QuestionsBubble/QuestionBubble";

export default function QuestionsSection() {
  const { ref, inView } = useInViewport();
  const { bubbles, reset } = useQuestionSpawner(inView);

  useEffect(() => {
    if (!inView) {
      reset();
    }
  }, [inView]);

  return (
    <section id="questions" ref={ref} className="questions-section">
      <div className="questions-div">
        <h2 className="questions-title">Questions that have haunted us all!</h2>
      </div>

      {DEFAULT_QUESTIONS.map((text, i) => (
        <QuestionBubble
          key={`default-${i}`}
          text={text}
          color="pink"
          x={25 + i * 8}
          y={35 + (i % 2) * 30}
        tail={i % 2 === 0 ? "left" : "right"}

        />
      ))}

      {bubbles.map((b) => (
        <QuestionBubble
          key={b.id}
          text={b.text}
          color={b.color}
          x={b.x}
          y={b.y}
          tail={b.tail}
        />
      ))}
    </section>
  );
}
