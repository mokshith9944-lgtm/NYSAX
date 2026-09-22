import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Mail } from 'lucide-react'
import { InstagramIcon } from '../icons/InstagramIcon'
import MagneticButton from '../ui/MagneticButton'

interface CTASectionProps {
  onBookConsultation: () => void
}

export default function CTASection({ onBookConsultation }: CTASectionProps) {
  return (
    <section className="relative min-h-[90vh] bg-black flex flex-col justify-center items-center overflow-hidden py-32 border-t border-white/5" id="cta">
      {/* Dramatic Olive Spotlight Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[75vw] max-w-[750px] max-h-[750px] bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(112,130,56,0.15),transparent)] z-0 rounded-full blur-[70px] pointer-events-none" />
      <div className="grain absolute inset-0 z-0 pointer-events-none" />

      {/* Slow Floating Ambient Orbs */}
      <motion.div
        animate={{ y: [0, -70, 0], x: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-10 left-[15%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] bg-olive-700/10 rounded-full blur-3xl z-0 pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 80, 0], x: [0, -40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -bottom-20 right-[15%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-silver-500/5 rounded-full blur-3xl z-0 pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs text-olive-400 uppercase tracking-widest mb-6 flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 bg-olive-500 rounded-full" />
          READY TO ELEVATE YOUR COMMERCIAL STRENGTH?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-6xl sm:text-7xl md:text-[8rem] lg:text-[9.5rem] tracking-tighter leading-[0.88] mb-10 flex flex-col select-none"
          data-cursor="hover"
        >
          <span className="text-white">Let's make</span>
          <span className="text-stroke">it endure.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-silver-400 font-body text-lg sm:text-xl md:text-2xl mb-14 max-w-xl leading-relaxed"
        >
          We are accepting a limited roster of new commercial partnerships for upcoming sprint cycles. Reserve your discovery session with leadership.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center gap-6 w-full"
        >
          <MagneticButton
            onClick={onBookConsultation}
            className="px-10 py-5 sm:px-12 sm:py-6 text-base sm:text-xl font-mono uppercase tracking-widest font-bold bg-olive-600 text-black hover:bg-olive-500 shadow-[0_0_40px_rgba(112,130,56,0.35)] hover:shadow-[0_0_60px_rgba(112,130,56,0.55)] transition-all group overflow-hidden relative cursor-pointer"
            data-cursor="hover"
          >
            <span className="relative z-10 flex items-center gap-3">
              <span>Schedule Strategic Consultation</span>
              <ArrowUpRight size={20} />
            </span>
          </MagneticButton>

          <div className="flex flex-wrap items-center justify-center gap-6 text-silver-400 font-mono text-xs pt-4">
            <a
              href="mailto:contact@nysaagency.com?subject=[Project%20Inquiry]%20Nysa%20Agency"
              className="hover:text-white pb-1 border-b border-white/20 hover:border-olive-400 transition-colors flex items-center gap-2"
              data-cursor="text"
            >
              <Mail size={13} className="text-olive-400" />
              <span>contact@nysaagency.com</span>
            </a>
            <span className="text-white/20 hidden sm:inline">•</span>
            <a
              href="https://www.instagram.com/nysax.agency?stkn=MXdycDVzN3lqc2tqZA=="
              target="_blank"
              rel="noreferrer"
              className="hover:text-white pb-1 border-b border-white/20 hover:border-olive-400 transition-colors flex items-center gap-2"
              data-cursor="text"
            >
              <InstagramIcon size={13} className="w-3.5 h-3.5 text-olive-400" />
              <span>@nysax.agency</span>
            </a>
          </div>
        </motion.div>

        {/* Bottom Social Proof Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 pt-8 border-t border-white/10 flex flex-col items-center gap-3 text-silver-500 font-mono text-xs"
        >
          <div>FOUNDED BY NIKHIL, MOKSHITH & AMARESH</div>
          <div>BANGALORE • SERVING VENTURES GLOBALLY</div>
        </motion.div>
      </div>
    </section>
  )
}
