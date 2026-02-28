import type { QuestionBubbleData } from "../../pages/Questions/questions.types";
import "../../pages/Questions/questions.css";

type Props = Omit<QuestionBubbleData, 'id'> & {
  tail?: 'left' | 'right';
};

export default function QuestionBubble({ text, color, x, y, tail }: Props) {
  return (
    <div
      className={`question-bubble ${color} tail-${tail ?? "left"}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
    >
      {text}
    </div>
  );
}

