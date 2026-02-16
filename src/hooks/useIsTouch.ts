import { useEffect, useState } from "react"

export const useIsTouch = () => {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)")
    setIsTouch(mq.matches)
  }, [])

  return isTouch
}
