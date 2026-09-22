import React, { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'

interface HeroProps {
  onBookConsultation: () => void
  onOpenAudit: () => void
}

export default function Hero({ onBookConsultation, onOpenAudit }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null)
  const blobRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!blobRef.current) return
      const { clientX, clientY } = e
      blobRef.current.style.transform = `translate(${clientX - 350}px, ${clientY - 350}px)`
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const line1 = 'We build'.split(' ')
  const line2 = 'digital futures'.split(' ')
  const line3 = 'that endure.'.split(' ')

  let wordIndex = 0
  const renderWords = (words: string[], stroke = false) => {
    return words.map((word, i) => {
      const currentDelay = (wordIndex++) * 0.08
      return (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, rotateX: -35 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: currentDelay, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`inline-block mr-[2.2vw] ${stroke ? 'text-stroke opacity-90' : 'text-white'}`}
          style={{ transformOrigin: 'bottom center' }}
        >
          {word}
        </motion.span>
      )
    })
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-black overflow-hidden flex flex-col justify-center pt-28 pb-20 select-none"
    >
      {/* Interactive Tactical Olive Aura */}
      <div
        ref={blobRef}
        className="absolute top-0 left-0 w-[700px] h-[700px] bg-olive-600/15 rounded-full blur-[140px] pointer-events-none transition-transform duration-700 ease-out z-0"
      />

      {/* Ambient Monogram Watermark Background */}
      <div className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 w-[320px] sm:w-[480px] md:w-[660px] pointer-events-none select-none z-0 mix-blend-screen opacity-[0.11]">
        <img
          src="/assets/nysax-monogram.png"
          alt="NYSAX Monogram Watermark"
          className="w-full h-auto object-contain filter contrast-150 brightness-110"
        />
      </div>

      {/* Silver Metallic Architectural Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:70px_70px] pointer-events-none z-0" />
      <div className="grain absolute inset-0 z-[1] pointer-events-none" />

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-start"
      >
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="bg-obsidian-850/90 border border-white/10 text-silver-300 font-mono text-xs px-4 py-2 mb-10 flex items-center gap-3 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-olive-500 animate-pulse-slow" />
          <span className="tracking-widest uppercase text-[11px]">GLOBAL GROWTH & MARKETING DESK</span>
          <span className="text-white/20">|</span>
          <span className="text-silver-400 text-[11px] hidden sm:inline">US • UK • INDIA • AUS • UAE • SG</span>
        </motion.div>

        {/* Monumental 3D Headlines */}
        <h1
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[9.5rem] leading-[0.92] tracking-tighter mb-8 w-full"
          data-cursor="hover"
        >
          <div className="overflow-visible pb-1 sm:pb-2">{renderWords(line1)}</div>
          <div className="overflow-visible pb-1 sm:pb-2">{renderWords(line2, true)}</div>
          <div className="overflow-visible pb-1 sm:pb-2">{renderWords(line3)}</div>
        </h1>

        {/* Editorial Marketing Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="font-body text-silver-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed"
          data-cursor="text"
        >
          Nysa Agency bridges high-ROAS performance marketing, editorial visual identity, and high-converting web architecture to scale customer acquisition and category authority.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="flex flex-wrap items-center gap-5 w-full sm:w-auto"
        >
          <MagneticButton
            onClick={onBookConsultation}
            className="w-full sm:w-auto px-8 py-4 bg-olive-600 text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-olive-500 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(112,130,56,0.3)] hover:shadow-[0_0_45px_rgba(112,130,56,0.5)] cursor-pointer"
            data-cursor="hover"
          >
            <span>Schedule Consultation</span>
            <ArrowUpRight size={16} />
          </MagneticButton>

          <MagneticButton
            onClick={onOpenAudit}
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:border-olive-500 hover:text-olive-400 transition-all flex items-center justify-center gap-3 cursor-pointer"
            data-cursor="hover"
          >
            <span>Diagnostic Audit</span>
          </MagneticButton>
        </motion.div>

        {/* Empirics Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-16 pt-8 border-t border-white/10 w-full flex flex-wrap items-center justify-between gap-6 text-silver-500 font-mono text-xs"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-olive-500" />
            <span className="text-silver-300">Guaranteed Partner SLA</span>
          </div>
          <div>99.4% On-Time Sprint Velocity</div>
          <div>Zero Outsource Policy</div>
        </motion.div>
      </motion.div>
    </section>
  )
}
