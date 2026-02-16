import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
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

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function FortuneModal({ isOpen, onClose }: Props) {
  const [fortune, setFortune] = useState("")

  useEffect(() => {
    if (isOpen) {
      const random = fortunes[Math.floor(Math.random() * fortunes.length)]
      setFortune(random)
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fortune-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Content */}
          <motion.div
            className="fortune-container"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <motion.div
              className="fortune-paper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {fortune}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
