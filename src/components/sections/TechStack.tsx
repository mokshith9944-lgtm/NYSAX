import React from 'react'
import { motion } from 'framer-motion'
import { techStack } from '../../data/nexusContent'
import ScrollReveal from '../ui/ScrollReveal'

export default function TechStack() {
  return (
    <section className="bg-obsidian-950 py-24 md:py-32 border-t border-white/5" id="stack">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal className="mb-14 md:mb-18">
          <p className="font-mono text-xs text-olive-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-olive-500 rounded-full" />
            INFRASTRUCTURE & FRAMEWORKS
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Architected for endurance.
          </h2>
          <p className="font-body text-silver-400 text-base max-w-lg">
            We build exclusively with production-proven, type-safe technologies engineered to scale to millions of requests without architectural debt.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-obsidian-850 border border-white/10 p-6 flex flex-col justify-between group hover:border-olive-500/40 transition-all duration-300"
              data-cursor="hover"
            >
              <div className="mb-6">
                <span className="font-mono text-[10px] text-olive-400 uppercase tracking-widest block mb-2">
                  {tech.category}
                </span>
                <h3 className="font-display text-xl font-bold text-white group-hover:text-olive-300 transition-colors">
                  {tech.name}
                </h3>
              </div>
              <p className="text-silver-500 text-xs leading-relaxed font-body">
                {tech.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
