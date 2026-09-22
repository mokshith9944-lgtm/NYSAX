import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { caseStudies } from '../../data/nexusContent'
import ScrollReveal from '../ui/ScrollReveal'

export default function CaseStudies() {
  return (
    <section className="bg-obsidian-950 py-28 md:py-36 relative border-t border-white/5" id="work">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs text-olive-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-olive-500 rounded-full" />
              MEASURED COMMERCIAL OUTCOMES
            </p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
              Selected Engagements.<br />
              <span className="text-silver-500 font-normal">Empirical impact.</span>
            </h2>
          </div>
          <p className="font-body text-silver-400 text-base max-w-md">
            We measure our success strictly against institutional benchmarks: conversion multipliers, capital raised, and user retention.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-obsidian-850 border border-white/10 p-8 md:p-10 relative flex flex-col justify-between group hover:border-olive-500/50 transition-all duration-400"
              data-cursor="hover"
            >
              {/* Subtle Olive Sheen */}
              <div className="absolute inset-0 bg-gradient-to-br from-olive-600/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="font-mono text-xs text-olive-400 uppercase tracking-widest block mb-1">
                      {cs.industry}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white">
                      {cs.company}
                    </h3>
                  </div>
                  <div className="p-2 border border-white/10 text-silver-400 group-hover:text-olive-400 group-hover:border-olive-500/40 transition-colors">
                    <ArrowUpRight size={20} />
                  </div>
                </div>

                <div className="mb-6">
                  <div className="font-display text-4xl sm:text-5xl font-bold text-white group-hover:text-olive-400 transition-colors tracking-tight mb-3">
                    {cs.result}
                  </div>
                  <p className="text-silver-400 text-base leading-relaxed">
                    {cs.desc}
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex flex-wrap gap-2 pt-6 border-t border-white/5">
                {cs.services.map(s => (
                  <span
                    key={s}
                    className="font-mono text-[10px] text-silver-400 bg-black/60 border border-white/10 px-3 py-1 uppercase tracking-wider"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
