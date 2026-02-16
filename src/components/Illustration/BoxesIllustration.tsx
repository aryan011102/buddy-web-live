import "./BoxesIllustration.css"
import { useState, useRef } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"

// Assets
import blueBox from "../../assets/svg/blue-box-footer.svg"
import greenBox from "../../assets/svg/green-box-footer.svg"
import yellowBox from "../../assets/svg/yellow-box-footer.svg"
import pinkBox from "../../assets/svg/pink-box-footer.svg"
import purpleBox from "../../assets/svg/purple-box-footer.svg"
import trolley from "../../assets/svg/yellow-trolley-footer.svg"
import instaChar from "../../assets/svg/insta-char.svg"
import linkedinChar from "../../assets/svg/linkedin-char.svg"
import whatsappChar from "../../assets/svg/whatsapp-char.svg"
import cookieChar from "../../assets/svg/cookie-char.svg"
import cookie from "../../assets/svg/cookie.svg"

import FortuneModal from "../FortuneModal/FortuneModal"

export default function BoxesIllustration() {
  const [isFortuneOpen, setIsFortuneOpen] = useState(false)
  const [isZooming, setIsZooming] = useState(false)
  
  const cookieRef = useRef<HTMLImageElement>(null)
  const [animationData, setAnimationData] = useState({ x: 0, y: 0 })

  const handleCookieClick = () => {
    if (cookieRef.current) {
      const rect = cookieRef.current.getBoundingClientRect()
      
      // Calculate the distance to move to get to the center of the screen
      const screenCenterX = window.innerWidth / 2
      const screenCenterY = window.innerHeight / 2
      const cookieCenterX = rect.left + rect.width / 2
      const cookieCenterY = rect.top + rect.height / 2

      setAnimationData({
        x: screenCenterX - cookieCenterX,
        y: screenCenterY - cookieCenterY
      })
      
      setIsZooming(true)

      // Sync modal appearance with the end of the fly animation
      setTimeout(() => {
        setIsFortuneOpen(true)
        setIsZooming(false)
      }, 900)
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
        ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier for a smooth "lift"
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
        <motion.img src={instaChar} className="char char-insta" whileHover={{ scale: 1.1 }} />
        <motion.img src={linkedinChar} className="char char-linkedin" whileHover={{ scale: 1.1 }} />
        <motion.img src={whatsappChar} className="char char-whatsapp" whileHover={{ scale: 1.1 }} />
        <motion.img src={cookieChar} className="char char-cookie" whileHover={{ scale: 1.1 }} />

        <AnimatePresence>
          {/* THE GLOW EFFECT */}
          {isZooming && (
            <motion.div
              className="cookie-glow-effect"
              initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              animate={{ 
                x: animationData.x, 
                y: animationData.y, 
                scale: 15, 
                opacity: [0, 0.8, 0] 
              }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              style={{
                position: 'absolute',
                // Center the glow on the cookie's starting position
                bottom: '22%',
                left: '1%',
                zIndex: 9998
              }}
            />
          )}

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

      <FortuneModal 
        isOpen={isFortuneOpen} 
        onClose={() => setIsFortuneOpen(false)} 
      />
    </div>
  )
}