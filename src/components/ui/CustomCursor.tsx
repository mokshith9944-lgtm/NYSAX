import React, { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'text' | 'view'>('default')
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring physics for smooth trailing
  const springX = useSpring(mouseX, { stiffness: 450, damping: 35 })
  const springY = useSpring(mouseY, { stiffness: 450, damping: 35 })

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const el = target?.closest('[data-cursor]')
      if (el) {
        const state = el.getAttribute('data-cursor') as 'default' | 'hover' | 'text' | 'view'
        setCursorState(state || 'hover')
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null
      if (related?.closest && related.closest('[data-cursor]')) {
        return
      }
      setCursorState('default')
    }

    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [mouseX, mouseY, isVisible])

  if (!isVisible) return null

  const variants = {
    default: {
      width: 10,
      height: 10,
      backgroundColor: '#ffffff',
      border: '0px solid transparent',
      opacity: 0.9,
    },
    hover: {
      width: 44,
      height: 44,
      backgroundColor: '#708238',
      border: '1px solid #9bb355',
      opacity: 0.85,
    },
    text: {
      width: 4,
      height: 24,
      backgroundColor: '#c5c8d0',
      border: '0px solid transparent',
      opacity: 0.9,
    },
    view: {
      width: 60,
      height: 60,
      backgroundColor: 'transparent',
      border: '1px solid #708238',
      opacity: 1,
    }
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999] flex items-center justify-center font-mono text-[9px] font-bold uppercase tracking-widest text-black select-none"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        mixBlendMode: cursorState === 'hover' ? 'normal' : 'difference',
      }}
      variants={variants}
      animate={cursorState}
      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
    >
      {cursorState === 'hover' && <span className="text-black font-semibold text-[9px]">VIEW</span>}
      {cursorState === 'view' && <span className="text-white font-mono text-[9px]">EXP</span>}
    </motion.div>
  )
}
