import { motion } from "framer-motion";
import type { Reason } from "../../pages/Reasons/reasons.types";
import { useState, useEffect } from "react";

interface Props {
  reason: Reason;
}

const ReasonBubble = ({ reason }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    setIsTouch(mq.matches);
  }, []);

  return (
    <motion.div
      className={`reason-bubble ${expanded ? "expanded" : ""}`}
      whileHover={!isTouch ? { scale: 1.06 } : undefined}
      transition={{ duration: 0.25 }}
      layout
      onHoverStart={!isTouch ? () => setExpanded(true) : undefined}
      onHoverEnd={!isTouch ? () => setExpanded(false) : undefined}
      onClick={isTouch ? () => setExpanded(!expanded) : undefined}
      style={{ zIndex: expanded ? 20 : 5 }}
    >
      <motion.div
        className="reason-content"
        animate={{
          opacity: expanded ? 0 : 1,
          transitionEnd: {
            visibility: expanded ? "hidden" : "visible",
          },
        }}
        style={{ visibility: expanded ? "hidden" : "visible" }}
      >
        {reason.letter}
      </motion.div>

      <motion.div
        className="reason-text"
        animate={{
          opacity: expanded ? 1 : 0,
          transitionEnd: {
            visibility: expanded ? "visible" : "hidden",
          },
        }}
        style={{ visibility: expanded ? "visible" : "hidden" }}
      >
        {reason.text}
      </motion.div>
    </motion.div>
  );
};

export default ReasonBubble;

