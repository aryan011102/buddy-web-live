import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom" // NEW IMPORT
import "./FortuneModal.css"

const fortunes = [
  "You are closer than you think.",
  "Something unexpected will delight you.",
  "A bold move will pay off.",
  "Today favors curiosity.",
  "Trust your instincts.",
  "A message is waiting for you.",
  "Growth begins outside comfort.",
  "You are building something meaningful.",
  "Small steps matter.",
  "Stay playful."
]

export default function FortuneModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [fortune, setFortune] = useState("")

  useEffect(() => {
    if (isOpen) {
      setFortune(fortunes[Math.floor(Math.random() * fortunes.length)])
    }
  }, [isOpen])

  // Wrap everything in a Portal so it renders at the root level of the site
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fortune-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fortune-container"
            initial={{ scale: 0.4, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className="fortune-paper">
              {fortune}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body // This pushes the modal to the very end of the HTML
  )
}