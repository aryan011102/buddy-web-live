import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { REASONS } from "./reasons.data"
import { GROUP_SIZE } from "./reasons.constants"
import ReasonsGrid from "../../components/Reasons/ReasonsGrid"
import "./reasons.css"

const chunk = <T,>(arr: T[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  )

const ReasonsSection = () => {
  const ref = useRef<HTMLDivElement>(null)
  const groups = chunk(REASONS, GROUP_SIZE)
  const totalGroups = groups.length

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]

  })

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(totalGroups - 2) * 100}%`]
  )

  return (
 <section
  ref={ref}
  className="reasons-section"
  style={{ height: `${totalGroups * 100}vh` }}
>

      <div className="reasons-sticky">
        <div className="reasons-heading">
          <h2>Not moving out?</h2>
          <p>
            Here are A to Z reasons why you
    
            should still check us out
          </p>
        </div>

        <div className="reasons-mask">
          <motion.div
            className="reasons-vertical-stack"
            style={{ y }}
          >
            {groups.map((group, i) => (
              <ReasonsGrid key={i} reasons={group} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ReasonsSection
