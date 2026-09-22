import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, ArrowUpRight } from 'lucide-react'
import { faqs } from '../../data/nexusContent'
import ScrollReveal from '../ui/ScrollReveal'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section className="bg-obsidian-950 py-28 md:py-36 border-t border-white/5" id="faq">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <ScrollReveal className="mb-16 md:mb-20">
          <p className="font-mono text-xs text-olive-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-olive-500 rounded-full" />
            FREQUENTLY ADDRESSED INQUIRIES
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Institutional clarity.
          </h2>
          <p className="font-body text-silver-400 text-base max-w-xl">
            Everything you need to understand regarding our sprint timelines, ownership rights, leadership access, and engagement structure.
          </p>
        </ScrollReveal>

        <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i

            return (
              <div key={i} className="py-6 md:py-8 group">
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex justify-between items-center text-left gap-6 cursor-pointer"
                  data-cursor="hover"
                >
                  <span className={`font-display text-lg sm:text-xl md:text-2xl font-medium tracking-tight transition-colors ${
                    isOpen ? 'text-olive-400' : 'text-white group-hover:text-silver-200'
                  }`}>
                    {faq.q}
                  </span>
                  <div className={`p-2 border transition-all ${
                    isOpen ? 'border-olive-500 text-olive-400' : 'border-white/10 text-silver-400 group-hover:border-white/30'
                  }`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 font-body text-silver-400 text-sm sm:text-base leading-relaxed max-w-3xl">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Direct Concierge Prompt */}
        <div className="mt-14 p-6 bg-obsidian-850 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-olive-400 block mb-1">
              HAVE A SPECIFIC CONTRACTUAL OR TECHNICAL QUESTION?
            </span>
            <p className="font-body text-xs text-silver-400">
              Our founders respond to direct email inquiries within 24 business hours.
            </p>
          </div>
          <a
            href="mailto:contact@nysaagency.com?subject=[Direct%20Inquiry]%20Executive%20Question"
            className="font-mono text-xs text-white hover:text-olive-400 uppercase tracking-widest flex items-center gap-2 pb-1 border-b border-white/20 hover:border-olive-400 transition-colors shrink-0"
          >
            <span>Email Leadership</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
