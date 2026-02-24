import { useEffect } from "react";
import { DEFAULT_QUESTIONS } from "./questions.constants";
import { useQuestionSpawner } from "./useQuestionSpawner";
import { useInViewport } from "../../hooks/useInViewport";

import "./questions.css";
import QuestionBubble from "../../components/QuestionsBubble/QuestionBubble";

import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";
export default function QuestionsSection() {

const { ref: viewportRef, inView } = useInViewport();
const { ref: revealRef, visible } = useRevealOnScroll();
  const { bubbles, reset } = useQuestionSpawner(inView);

  function setRefs(el: HTMLElement | null) {
  viewportRef.current = el;
  revealRef.current = el;
}
  useEffect(() => {
    if (!inView) {
      reset();
    }
  }, [inView]);

  return (
    <section id="questions" ref={setRefs} className={`questions-section ${visible ? "visible" : ""}`}>
      <div className="questions-div">
      
        <h2 className="questions-title">Moving out comes with questions...  <br/>
        a lot of them</h2>
      </div>
<div className="questions-cloud">
 {DEFAULT_QUESTIONS.map((text, i) => (
        <QuestionBubble
          key={`default-${i}`}
          text={text}
          color="pink"
          x={25 + i * 8}
          y={30 + (i % 2) * 33}
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
</div>
     
    </section>
  );
}
