import "./BoxesIllustration.css"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import blueBox from "../../assets/svg/blue-box-footer.svg"
import greenBox from "../../assets/svg/green-box-footer.svg"
import yellowBox from "../../assets/svg/yellow-box-footer.svg"
import pinkBox from "../../assets/svg/pink-box-footer.svg"
import purpleBox from "../../assets/svg/purple-box-footer.svg"
import trolley from "../../assets/svg/yellow-trolley-footer.svg"
import instaChar from "../../assets/svg/insta-char.svg"
import linkedinChar from "../../assets/svg/linkedin-char.svg"
import twitterChar from "../../assets/svg/twitter-char.svg"
import cookieChar from "../../assets/svg/cookie-char.svg"
import cookie from "../../assets/svg/cookie.svg"
import cookieSound from "../../assets/sound/cookie-sound.mp3"

import FortuneModal from "../FortuneModal/FortuneModal"
const BLAST_PARTICLES = Array.from({ length: 12 });

export default function BoxesIllustration() {
  const [isFortuneOpen, setIsFortuneOpen] = useState(false)
  const [isZooming, setIsZooming] = useState(false)
  const [showBlast, setShowBlast] = useState(false)

  const cookieRef = useRef<HTMLImageElement>(null)
  const [animationData, setAnimationData] = useState({ x: 0, y: 0 })
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio(cookieSound)
    audioRef.current.volume = 0.7
  }, [])

  const handleCookieClick = () => {
    if (cookieRef.current) {
      const rect = cookieRef.current.getBoundingClientRect()
      const screenCenterX = window.innerWidth / 2
      const screenCenterY = window.innerHeight / 2
      const cookieCenterX = rect.left + rect.width / 2
      const cookieCenterY = rect.top + rect.height / 2

      setAnimationData({
        x: screenCenterX - cookieCenterX,
        y: screenCenterY - cookieCenterY
      })

      setIsZooming(true)

      setTimeout(() => setShowBlast(true), 750);

      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0
          void audioRef.current.play()
        }
        setIsFortuneOpen(true)
        setIsZooming(false)
        setShowBlast(false)
      }, 950)
    }
  }

  const cookieVariants: Variants = {
    idle: {
      x: [0, 10, 0, -10, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    },
    zoom: {
      x: animationData.x,
      y: animationData.y,
      scale: 4,
      rotate: 720,
      opacity: [1, 1, 0],
      transition: {
        duration: 0.9,
        ease: [0.4, 0, 0.2, 1],
        opacity: { times: [0, 0.8, 1], duration: 0.9 }
      }
    }
  }

  return (
    <div className="boxes-wrapper">
      <div className="boxes-layer">
        <img src={blueBox} className="box box-blue" alt="" />
        <img src={greenBox} className="box box-green" alt="" />
        <img src={purpleBox} className="box box-purple" alt="" />
        <img src={pinkBox} className="box box-pink" alt="" />
        <img src={yellowBox} className="box box-yellow" alt="" />
        <img src={trolley} className="box box-trolley" alt="" />
      </div>

      <div className="chars-layer">
        <a
          href="https://www.instagram.com/buddyapp.co.in?igsh=eXY4c2prd2J4ZHA0"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Buddy on Instagram"
        >
          <motion.img src={instaChar} className="char char-insta" whileHover={{ scale: 1.1 }} />
        </a>
        <a
          href="https://www.linkedin.com/company/buddytechindia/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Buddy on LinkedIn"
        >
          <motion.img src={linkedinChar} className="char char-linkedin" whileHover={{ scale: 1.1 }} />
        </a>
        <a
          href="https://x.com/buildinbuddy?s=21"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Buddy on X"
        >
          <motion.img src={twitterChar} className="char char-twitter" whileHover={{ scale: 1.1 }} />
        </a>
        <motion.img src={cookieChar} className="char char-cookie" whileHover={{ scale: 1.1 }} />

        <AnimatePresence>

          {isZooming && (
            <motion.div
              className="cookie-glow-effect"
              initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              animate={{
                x: animationData.x,
                y: animationData.y,
                scale: [2, 14],
                opacity: [0, 0.9, 0]
              }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              style={{
                position: 'absolute',
                bottom: '22%',
                left: '1%',
                zIndex: 10001
              }}
            />
          )}

          {showBlast && BLAST_PARTICLES.map((_, i) => (
            <motion.div
              key={i}
              className="blast-particle"
              initial={{ x: animationData.x, y: animationData.y, scale: 1 }}
              animate={{
               x: animationData.x + (Math.cos(i * (360 / 12) * (Math.PI / 180)) * 250),
                y: animationData.y + (Math.sin(i * (360 / 12) * (Math.PI / 180)) * 250),
                scale: 0,
                opacity: 0
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                position: 'absolute',
                bottom: '22%',
                left: '1%',
                zIndex: 10002
              }}
            />
          ))}

          {!isFortuneOpen && (
            <motion.img
              ref={cookieRef}
              src={cookie}
              className="char char-fortune"
              style={{ zIndex: isZooming ? 9999 : 5 }}
              variants={cookieVariants}
              animate={isZooming ? "zoom" : "idle"}
              onClick={handleCookieClick}
            />
          )}
        </AnimatePresence>
      </div>

      <FortuneModal isOpen={isFortuneOpen} onClose={() => setIsFortuneOpen(false)} />
    </div>
  )
}

