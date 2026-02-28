import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom" // NEW IMPORT
import "./FortuneModal.css"
import { FORTUNES } from "./fortune"

export default function FortuneModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [fortune, setFortune] = useState("")

  useEffect(() => {
    if (isOpen) {
      setFortune(FORTUNES[Math.floor(Math.random() * FORTUNES.length)])
    }
  }, [isOpen])

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
  initial={{ scale: 0.5, opacity: 0, filter: "brightness(5) blur(10px)" }}
  animate={{ scale: 1, opacity: 1, filter: "brightness(1) blur(0px)" }}
  exit={{ scale: 0.5, opacity: 0 }}
  transition={{ 
    type: "spring", 
    stiffness: 300, 
    damping: 25,
    filter: { duration: 0.4 } 
  }}
>
            <div className="fortune-paper">
              {fortune}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
