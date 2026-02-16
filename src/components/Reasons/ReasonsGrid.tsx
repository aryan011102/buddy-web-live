import type { Reason } from "../../pages/Reasons/reasons.types"
import ReasonBubble from "./ReasonBubble"
import { useEffect, useState } from "react"

interface Props {
  reasons: Reason[]
}

const desktopPositions = [
  { top: "10%", left: "15%" },
  { top: "40%", left: "8%" },
  { top: "20%", left: "40%" },
  { top: "65%", left: "18%" },
  { top: "75%", left: "50%" },
  { top: "35%", left: "75%" },
  { top: "15%", left: "85%" },
  { top: "70%", left: "85%" },
  { top: "85%", left: "30%" }
]


const mobilePositions = [
  { top: "12%", left: "18%" },
  { top: "28%", left: "8%" },
  { top: "22%", left: "60%" },
  { top: "45%", left: "15%" },
  { top: "50%", left: "55%" },
  { top: "38%", left: "72%" },
  { top: "65%", left: "20%" },
  { top: "70%", left: "60%" },
  { top: "80%", left: "35%" }
]

const ReasonsGrid = ({ reasons }: Props) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const positions = isMobile ? mobilePositions : desktopPositions

  return (
    <div className="reasons-floating-layer">
      {reasons.map((reason, index) => (
        <div
          key={reason.letter}
          className="reason-absolute-wrapper"
          style={positions[index % positions.length]}
        >
          <ReasonBubble reason={reason} />
        </div>
      ))}
    </div>
  )
}

export default ReasonsGrid
