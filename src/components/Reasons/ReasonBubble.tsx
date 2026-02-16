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
  className="reason-bubble"
  whileHover={!isTouch ? { scale: 1.08 } : undefined}
  animate={{
    width: expanded
      ? (isTouch ? 180 : 220)
      : (isTouch ? 72 : 92),
    height: expanded
      ? (isTouch ? 110 : 120)
      : (isTouch ? 72 : 92),
  }}
  transition={{ duration: 0.3 }}
  onHoverStart={!isTouch ? () => setExpanded(true) : undefined}
  onHoverEnd={!isTouch ? () => setExpanded(false) : undefined}
  onClick={isTouch ? () => setExpanded(!expanded) : undefined}
  style={{ zIndex: expanded ? 20 : 5 }}
>
      <motion.div
        className="reason-content"
        animate={{ opacity: expanded ? 0 : 1 }}
      >
        {reason.letter}
      </motion.div>

      <motion.div
        className="reason-text"
        animate={{ opacity: expanded ? 1 : 0 }}
      >
        {reason.text}
      </motion.div>
    </motion.div>
  );
};

export default ReasonBubble;
