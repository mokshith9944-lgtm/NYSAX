import React from 'react'
import ScrollReveal from '../ui/ScrollReveal'

export default function StatsSection() {
  const stats = [
    { value: '99.4%', label: 'Sprint Velocity Met', sub: 'Predictable milestone execution' },
    { value: '$120M+', label: 'Client Value Unlocked', sub: 'Capital raised & enterprise exits' },
    { value: '48+', label: 'Digital Assets Shipped', sub: 'Across 6 global markets' },
    { value: '< 24h', label: 'Executive Response SLA', sub: 'Direct line to founding partners' },
  ]

  return (
    <section className="bg-black py-20 md:py-28 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="flex flex-col group">
                <div className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white group-hover:text-olive-400 transition-colors tracking-tight mb-2">
                  {stat.value}
                </div>
                <div className="font-mono text-xs text-silver-300 uppercase tracking-widest mb-1">
                  {stat.label}
                </div>
                <div className="font-body text-xs text-silver-500">
                  {stat.sub}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
