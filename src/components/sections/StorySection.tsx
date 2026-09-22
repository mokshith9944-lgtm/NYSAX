import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function StorySection() {
  const chapters = [
    {
      num: '01',
      tag: 'THE DIAGNOSTIC',
      title: 'The commercial web drowns in generic, uninspired templates.',
      p1: 'Most digital products look interchangeable, operate sluggishly, and fail to generate emotional conviction. The industry baseline has settled on bloated frameworks and superficial aesthetics.',
      p2: 'Enterprises surrender market authority not because their proposition is weak, but because execution lacks craft. In an era of infinite noise, mediocrity is the highest risk posture an enterprise can take.',
      align: 'left'
    },
    {
      num: '02',
      tag: 'THE DOCTRINE',
      title: 'We believe exceptional software is a commercial moat.',
      p1: 'Your digital interface is your most persistent commercial asset. It never sleeps; it represents your institutional caliber across every timezone. It should feel effortless, look commanding, and perform instantly.',
      p2: 'We discard the false trade-off between aesthetic restraint and engineering horsepower. True digital luxury is defined by speed, precision, and structural endurance.',
      align: 'right'
    },
    {
      num: '03',
      tag: 'THE ARCHITECTURE',
      title: 'Built by founders, for founders who demand precision.',
      p1: 'Zero agency bureaucracy. No junior handoffs. Every engagement is steered directly by our founding triumvirate: strategy, technical architecture, and art direction working in tight synchronized cadence.',
      p2: 'From foundational product strategy to production deployment, our sprints are calibrated to transition ambitious ventures from where they are to where they belong.',
      align: 'center'
    }
  ]

  const Art01 = () => (
    <div className="relative w-full aspect-square md:aspect-[4/3] flex items-center justify-center pointer-events-none select-none">
      <div className="absolute w-60 h-60 bg-olive-600/25 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute w-44 h-44 border border-silver-400/30 bg-obsidian-800/60 rotate-45 transform backdrop-blur-sm" />
      <div className="absolute w-32 h-32 border border-olive-500/50 bg-olive-950/40 rotate-12 transform" />
      <div className="absolute inset-0 border border-white/5 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
    </div>
  )

  const Art02 = () => (
    <div className="relative w-full aspect-square md:aspect-[4/3] flex items-center justify-center pointer-events-none select-none group">
      <div className="w-1 h-3/4 bg-white/10 mx-3" />
      <div className="w-12 h-1/2 bg-olive-600/80 border border-olive-400/40 mx-3 transition-transform duration-500 group-hover:scale-y-110" />
      <div className="w-1 h-2/3 bg-silver-400/20 mx-3" />
      <div className="w-1 h-1/3 bg-white/10 mx-3" />
      <div className="w-10 h-10 border border-olive-400 bg-olive-950/80 absolute right-1/4 top-1/4 flex items-center justify-center">
        <span className="w-2 h-2 bg-olive-400 rounded-full animate-ping" />
      </div>
    </div>
  )

  return (
    <section className="bg-black py-28 md:py-40 relative overflow-hidden text-silver-300" id="about">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col">
        {chapters.map((chapter, i) => (
          <div key={i} className="mb-24 md:mb-36 relative last:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center ${
                chapter.align === 'right' ? 'md:flex-row-reverse' : ''
              } ${
                chapter.align === 'center'
                  ? 'md:grid-cols-1 md:w-4/5 mx-auto text-center'
                  : ''
              }`}
            >
              {/* Text Side */}
              <div className={`relative z-10 ${chapter.align === 'right' ? 'md:col-start-2 md:row-start-1' : ''}`}>
                <div className="absolute -top-14 md:-top-24 -left-6 md:-left-12 font-display text-[11rem] md:text-[16rem] text-white/[0.02] leading-none select-none pointer-events-none font-bold">
                  {chapter.num}
                </div>

                <div className="font-mono text-xs text-olive-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span>CHAPTER {chapter.num}</span>
                  <span className="text-white/20">•</span>
                  <span>{chapter.tag}</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-tight mb-8">
                  {chapter.title}
                </h2>

                <div className={`flex flex-col gap-5 text-silver-400 text-base md:text-lg leading-relaxed ${chapter.align === 'center' ? 'items-center' : ''}`}>
                  <p>{chapter.p1}</p>
                  <p>{chapter.p2}</p>
                </div>

                {chapter.align === 'center' && (
                  <div className="mt-10">
                    <a
                      href="#team"
                      className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-olive-400 hover:text-white transition-colors pb-1 border-b border-olive-500/40 hover:border-white"
                      data-cursor="hover"
                    >
                      <span>Meet the Founding Team</span>
                      <ArrowRight size={14} />
                    </a>
                  </div>
                )}
              </div>

              {/* Visual Side */}
              {chapter.align !== 'center' && (
                <div className={`relative z-0 ${chapter.align === 'right' ? 'md:col-start-1 md:row-start-1' : ''}`}>
                  {i === 0 ? <Art01 /> : <Art02 />}
                </div>
              )}
            </motion.div>

            {/* Chapter Dividers */}
            {i < chapters.length - 1 && (
              <div className="my-20 md:my-32 relative flex justify-center items-center">
                <hr className="w-full border-white/5 absolute" />
                <span className="bg-black px-4 font-mono text-[10px] uppercase tracking-widest text-silver-600 relative">
                  CHAPTER {chapters[i + 1].num} // NEXT
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
