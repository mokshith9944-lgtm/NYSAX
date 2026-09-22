import React from 'react'
import { Mail } from 'lucide-react'
import { InstagramIcon } from '../icons/InstagramIcon'
import { team } from '../../data/nexusContent'
import ScrollReveal from '../ui/ScrollReveal'

export default function TeamSection() {
  const PixelAvatar = ({ colors }: { colors: [string, string] }) => {
    // 4x4 matrix pattern for geometric monogram
    const pattern = [
      1, 0, 1, 1,
      0, 1, 0, 1,
      1, 0, 1, 0,
      1, 1, 0, 1
    ]

    return (
      <div className="w-full aspect-square grid grid-cols-4 grid-rows-4 gap-0.5 mb-6 bg-black p-2 border border-white/10">
        {pattern.map((val, i) => (
          <div
            key={i}
            style={{
              backgroundColor: val ? colors[0] : colors[1],
              opacity: val ? 0.9 : 0.4
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <section className="bg-obsidian-900 py-28 md:py-36 border-t border-white/5" id="team">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal className="mb-16 md:mb-20">
          <p className="font-mono text-xs text-olive-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-olive-500 rounded-full" />
            FOUNDING TRIUMVIRATE
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            The partners on your codebase.
          </h2>
          <p className="font-body text-silver-400 text-lg max-w-xl">
            No intermediaries. You collaborate directly with technical founders who design, engineer, and deploy your digital products.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 0.1}>
              <div className="group h-[420px] w-full [perspective:1000px] cursor-pointer">
                <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front Face */}
                  <div className="absolute inset-0 bg-obsidian-850 border border-white/10 p-8 flex flex-col justify-between [backface-visibility:hidden]">
                    <div>
                      <PixelAvatar colors={member.colors} />
                      <h3 className="font-display text-2xl font-bold text-white mb-1">
                        {member.name}
                      </h3>
                      <p className="font-mono text-xs text-olive-400 uppercase tracking-wider mb-4">
                        {member.role}
                      </p>
                      <p className="font-body text-silver-400 text-xs leading-relaxed">
                        {member.bio}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-silver-500 font-mono text-[10px] uppercase">
                      <span>Nysa Agency</span>
                      <span className="text-olive-400">FLIP ↻</span>
                    </div>
                  </div>

                  {/* Back Face */}
                  <div className="absolute inset-0 bg-black border border-olive-600/50 p-8 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <div className="font-mono text-[10px] text-olive-400 uppercase tracking-widest">
                      EXECUTIVE PRINCIPLE // {member.name.toUpperCase()}
                    </div>

                    <blockquote className="font-body text-lg italic text-silver-200 leading-snug my-auto">
                      "{member.quote}"
                    </blockquote>

                    <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                      <a
                        href="mailto:contact@nysaagency.com?subject=Strategic%20Consultation%20with%20Leadership"
                        className="p-2 border border-white/10 text-silver-300 hover:text-white hover:border-olive-400 transition-colors"
                        title="Direct Email"
                      >
                        <Mail size={16} />
                      </a>
                      <a
                        href="https://www.instagram.com/nysax.agency?stkn=MXdycDVzN3lqc2tqZA=="
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 border border-white/10 text-silver-300 hover:text-white hover:border-olive-400 transition-colors"
                        title="Instagram"
                      >
                        <InstagramIcon size={16} className="w-4 h-4" />
                      </a>
                      <span className="font-mono text-[10px] text-silver-500 ml-auto">
                        PARTNER DESK
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
