import "./BoxesIllustration.css"
import { motion } from "framer-motion"

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
import { useState } from "react"
import FortuneModal from "../FortuneModal/FortuneModal"

export default function BoxesIllustration() {

    const [isFortuneOpen, setIsFortuneOpen] = useState(false)

  return (
    <div className="boxes-wrapper">

      <div className="boxes-layer">
        <img src={blueBox} className="box box-blue" />
        <img src={greenBox} className="box box-green" />
        <img src={purpleBox} className="box box-purple" />
        <img src={pinkBox} className="box box-pink" />
        <img src={yellowBox} className="box box-yellow" />
        <img src={trolley} className="box box-trolley" />
      </div>

      <div className="chars-layer">
        <motion.img
          src={instaChar}
          className="char char-insta"
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        />

        <motion.img
          src={linkedinChar}
          className="char char-linkedin"
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        />

        <motion.img
          src={whatsappChar}
          className="char char-whatsapp"
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        />

        <motion.img
          src={cookieChar}
          className="char char-cookie"
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        />
<motion.img
  src={cookie}
  className="char char-fortune"
  onClick={() => setIsFortuneOpen(true)}
  whileTap={{ scale: 1.1 }}
  animate={{ x: [0, 10, 0, -10, 0] }}
  transition={{
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }}
/>
      </div>
      <FortuneModal
  isOpen={isFortuneOpen}
  onClose={() => setIsFortuneOpen(false)}
/>

    </div>
  )
}
