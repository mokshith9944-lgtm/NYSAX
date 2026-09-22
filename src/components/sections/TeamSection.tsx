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
      <div className="w-24 h-24 grid grid-cols-4 grid-rows-4 gap-1 bg-black p-2 border border-white/10">
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
              <div className="group h-[500px] w-full [perspective:1000px] cursor-pointer">
                <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front Face */}
                  <div className="absolute inset-0 bg-obsidian-850 border border-white/10 p-6 flex flex-col justify-between [backface-visibility:hidden] transition-colors duration-500 group-hover:border-olive-500/30">
                    <div>
                      {/* Portrait Frame */}
                      <div className="relative w-full h-56 mb-5 overflow-hidden border border-white/10 bg-black flex items-center justify-center">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={`${member.name} — ${member.role}`}
                            style={{ objectPosition: member.imagePosition || 'center center' }}
                            className="w-full h-full object-cover filter grayscale contrast-110 brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-b from-obsidian-900 to-black">
                            <PixelAvatar colors={member.colors} />
                            <span className="text-[10px] font-mono uppercase tracking-widest text-silver-500 mt-2">
                              EXECUTIVE ARTIFACT
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-850 via-transparent to-transparent opacity-60 pointer-events-none" />
                        <div className="absolute top-2.5 right-2.5 font-mono text-[9px] uppercase px-2 py-0.5 bg-black/85 text-olive-400 border border-white/10 backdrop-blur-md">
                          PRINCIPAL // 0{i + 1}
                        </div>
                      </div>

                      <h3 className="font-display text-2xl font-bold text-white mb-1">
                        {member.name}
                      </h3>
                      <p className="font-mono text-xs text-olive-400 uppercase tracking-wider mb-3">
                        {member.role}
                      </p>
                      <p className="font-body text-silver-400 text-xs leading-relaxed line-clamp-3">
                        {member.bio}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-silver-500 font-mono text-[10px] uppercase">
                      <span>Nysa Agency</span>
                      <span className="text-olive-400 flex items-center gap-1">
                        <span>FLIP</span>
                        <span>↻</span>
                      </span>
                    </div>
                  </div>

                  {/* Back Face */}
                  <div className="absolute inset-0 bg-black border border-olive-600/50 p-6 sm:p-7 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-[0_0_30px_rgba(112,130,56,0.15)]">
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-[10px] text-olive-400 uppercase tracking-widest flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-olive-500 rounded-full animate-pulse-slow" />
                        EXECUTIVE PRINCIPLE // {member.name.toUpperCase()}
                      </div>
                      <span className="font-mono text-[10px] text-silver-500">
                        0{i + 1}
                      </span>
                    </div>

                    {member.image && (
                      <div className="w-16 h-16 border border-white/15 overflow-hidden mx-auto my-2 opacity-85">
                        <img
                          src={member.image}
                          alt={member.name}
                          style={{ objectPosition: member.imagePosition || 'center center' }}
                          className="w-full h-full object-cover filter grayscale contrast-125"
                        />
                      </div>
                    )}

                    <blockquote className="font-body text-sm sm:text-base italic text-silver-200 leading-relaxed my-auto text-center px-2">
                      "{member.quote}"
                    </blockquote>

                    <div className="pt-3 border-t border-white/10 flex items-center gap-3">
                      <a
                        href="mailto:contact@nysaagency.com?subject=Strategic%20Consultation%20with%20Leadership"
                        className="p-2 border border-white/10 text-silver-300 hover:text-white hover:border-olive-400 transition-colors"
                        title="Direct Email"
                      >
                        <Mail size={15} />
                      </a>
                      <a
                        href="https://www.instagram.com/nysax.agency?stkn=MXdycDVzN3lqc2tqZA=="
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 border border-white/10 text-silver-300 hover:text-white hover:border-olive-400 transition-colors"
                        title="Instagram"
                      >
                        <InstagramIcon size={15} className="w-3.5 h-3.5" />
                      </a>
                      <span className="font-mono text-[10px] text-silver-500 ml-auto uppercase tracking-wider">
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
