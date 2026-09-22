import React from 'react'
import MarqueeText from '../ui/MarqueeText'

export default function LogoCloud() {
  const platforms1 = [
    'Vercel', 'Next.js', 'Stripe', 'Linear', 'TypeScript',
    'Tailwind CSS', 'Figma', 'Supabase', 'Shopify', 'PostgreSQL'
  ]
  const platforms2 = [
    'React 18', 'Node.js', 'Python', 'Three.js', 'Docker',
    'AWS', 'Redis', 'GitHub', 'Framer Motion', 'GraphQL'
  ]

  const LogoText = ({ name }: { name: string }) => (
    <span
      className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white/25 hover:text-white hover:scale-105 transition-all duration-300 cursor-default"
      data-cursor="hover"
    >
      {name}
    </span>
  )

  const items1 = platforms1.map(p => <LogoText key={p} name={p} />)
  const items2 = platforms2.map(p => <LogoText key={p} name={p} />)

  return (
    <section className="bg-obsidian-900 py-20 border-y border-white/5 relative overflow-hidden group">
      <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10 text-center">
        <p className="font-mono text-xs text-silver-500 uppercase tracking-widest">
          Engineered With Modern Enterprise Stacks
        </p>
      </div>

      <div className="flex flex-col gap-8 sm:group-hover:[&>div>div]:[animation-play-state:paused] transition-all">
        <MarqueeText items={items1} direction="forward" />
        <MarqueeText items={items2} direction="reverse" />
      </div>

      {/* Fade edges */}
      <div className="absolute top-0 bottom-0 left-0 w-28 bg-gradient-to-r from-obsidian-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-28 bg-gradient-to-l from-obsidian-900 to-transparent z-10 pointer-events-none" />
    </section>
  )
}
