import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end end']
  })

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  const steps = [
    {
      num: '01',
      title: 'Strategic Discovery',
      tagline: 'Ruthless alignment on commercial outcomes',
      desc: 'We map commercial objectives, dissect market constraints, and audit technical feasibility before proposing architectural solutions.',
      duration: 'WEEK 01'
    },
    {
      num: '02',
      title: 'Architectural Blueprint',
      tagline: 'Figma tokens, database schemas, and stack selection',
      desc: 'We deliver comprehensive wireframes, an atomic design system, and edge-first technical specifications with zero ambiguity.',
      duration: 'WEEK 02'
    },
    {
      num: '03',
      title: 'Full-Stack Sprint Execution',
      tagline: 'Weekly milestone releases to production staging',
      desc: 'Our founding engineering and design pod builds in transparent synchronized sprints. You test interactive builds continuously.',
      duration: 'WEEKS 03–05'
    },
    {
      num: '04',
      title: 'Launch & Institutional Handover',
      tagline: 'Global CDN deployment and dedicated SLA support',
      desc: 'Sub-second optimization, DNS verification, analytics telemetry, full IP transfer, and ongoing performance monitoring.',
      duration: 'WEEK 06+'
    }
  ]

  return (
    <section ref={containerRef} className="bg-black py-28 md:py-36 relative border-t border-white/5" id="process">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal className="mb-20">
          <p className="font-mono text-xs text-olive-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-olive-500 rounded-full" />
            THE DELIVERY FRAMEWORK
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Predictable sprints.<br />
            <span className="text-silver-500 font-normal">Uncompromising velocity.</span>
          </h2>
          <p className="font-body text-silver-400 text-lg max-w-xl">
            How we translate complex strategic briefs into production digital assets on schedule and within budget.
          </p>
        </ScrollReveal>

        <div className="relative pl-6 sm:pl-10 md:pl-16">
          {/* Vertical Timeline Guide Line */}
          <div className="absolute left-0 sm:left-3 md:left-6 top-0 bottom-0 w-[1px] bg-white/10" />
          <motion.div
            style={{ scaleY }}
            className="absolute left-0 sm:left-3 md:left-6 top-0 bottom-0 w-[1px] bg-olive-500 origin-top"
          />

          <div className="flex flex-col gap-16 md:gap-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="relative flex flex-col items-start group"
              >
                {/* Timeline Pip */}
                <div className="absolute -left-[31px] sm:-left-[34px] md:-left-[46px] top-1.5 w-4 h-4 bg-black border-2 border-silver-400 group-hover:border-olive-500 group-hover:bg-olive-600 transition-colors duration-300" />

                <div className="flex items-center gap-4 mb-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-silver-400 bg-obsidian-850 border border-white/10 px-3 py-1">
                    {step.duration}
                  </span>
                  <span className="font-mono text-xs text-olive-400 uppercase tracking-widest">
                    STAGE // {step.num}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">
                  {step.title}
                </h3>

                <p className="font-mono text-xs sm:text-sm text-olive-400 uppercase tracking-wider mb-4">
                  "{step.tagline}"
                </p>

                <p className="text-silver-400 text-base max-w-2xl leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
