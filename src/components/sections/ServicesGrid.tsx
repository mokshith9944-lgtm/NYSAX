import React from 'react'
import { motion } from 'framer-motion'
import {
  Compass,
  Paintbrush,
  Code2,
  Smartphone,
  Layers,
  TrendingUp,
  Cpu,
  ShieldCheck,
  ArrowRight
} from 'lucide-react'
import { services } from '../../data/nexusContent'
import ScrollReveal from '../ui/ScrollReveal'

const iconMap: Record<string, React.ElementType> = {
  Compass,
  Paintbrush,
  Code2,
  Smartphone,
  Layers,
  TrendingUp,
  Cpu,
  ShieldCheck
}

interface ServicesGridProps {
  onSelectService?: (serviceName: string) => void
}

export default function ServicesGrid({ onSelectService }: ServicesGridProps) {
  return (
    <section className="bg-obsidian-950 py-28 md:py-36 relative border-t border-white/5" id="services">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal className="mb-16 md:mb-20">
          <p className="font-mono text-xs text-olive-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-olive-500 rounded-full" />
            CORE CAPABILITIES // END-TO-END
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Everything your venture requires.<br />
            <span className="text-silver-500 font-normal">Nothing ornamental.</span>
          </h2>
          <p className="font-body text-silver-400 text-lg max-w-xl">
            A synchronized suite of strategic, design, and engineering disciplines tailored to compound enterprise valuation.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(260px,auto)]">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Code2
            const isLarge = service.span.includes('col-span-2') || service.span.includes('col-span-3')

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.05 }}
                onClick={() => onSelectService && onSelectService(service.title)}
                className={`${service.span} bg-obsidian-850 border border-white/10 p-7 md:p-8 relative overflow-hidden group hover:border-olive-500/50 transition-all duration-400 flex flex-col justify-between cursor-pointer`}
                data-cursor="hover"
              >
                {/* Subtle Olive Hover Aura */}
                <div className="absolute inset-0 bg-gradient-to-br from-olive-600/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                <div className="relative z-10 mb-6">
                  <div className="flex justify-between items-start w-full mb-6">
                    <span className="font-mono text-xs text-silver-500">{service.number} // SPEC</span>
                    <div className="text-silver-400 group-hover:text-olive-400 group-hover:scale-110 transition-all duration-300">
                      <Icon size={26} strokeWidth={1.5} />
                    </div>
                  </div>

                  <h3 className={`font-display font-medium text-white ${isLarge ? 'text-2xl sm:text-3xl' : 'text-xl'} mb-3`}>
                    {service.title}
                  </h3>
                  <p className="text-silver-400 text-sm leading-relaxed max-w-md">
                    {service.desc}
                  </p>
                </div>

                <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
                  {service.tags.map(tag => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] text-silver-400 bg-black/70 border border-white/10 px-2.5 py-1 tracking-wider uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Subtle Hover Action Indicator */}
                <div className="absolute right-6 bottom-6 flex items-center gap-2 text-olive-400 font-mono text-xs opacity-0 translate-x-3 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="hidden sm:inline">Scope</span>
                  <ArrowRight size={14} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
