import React from 'react'
import { motion, useScroll } from 'framer-motion'

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-silver-400 via-olive-500 to-olive-400 origin-left z-[9999]"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
