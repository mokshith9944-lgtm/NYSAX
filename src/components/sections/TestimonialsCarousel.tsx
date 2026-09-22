import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Star, MessageSquare, X, Send } from 'lucide-react'
import { db } from '../../lib/storage'
import { ClientReview } from '../../types'
import ScrollReveal from '../ui/ScrollReveal'

export default function TestimonialsCarousel() {
  const [reviews, setReviews] = useState<ClientReview[]>([])
  const [showDrawer, setShowDrawer] = useState(false)

  // Submission state
  const [author, setAuthor] = useState('')
  const [role, setRole] = useState('')
  const [company, setCompany] = useState('')
  const [service, setService] = useState('Full-Stack Web Engineering')
  const [rating, setRating] = useState(5)
  const [feedback, setFeedback] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [statusMsg, setStatusMsg] = useState<string | null>(null)

  useEffect(() => {
    const load = () => {
      const dbReviews = db.getApprovedReviews()
      if (dbReviews.length > 0) {
        setReviews(dbReviews)
      } else {
        // High-conviction defaults
        setReviews([
          {
            id: 't1',
            author: 'Julian Vance',
            role: 'Managing Partner',
            company: 'Vance Quantitative',
            service: 'Strategy & Web Application',
            rating: 5,
            feedback: 'Nysa Agency operated like an elite internal technical unit. Nikhil, Mokshith, and Amaresh delivered our institutional investor portal ahead of deadline with zero regression.',
            status: 'approved',
            is_verified: true,
            createdAt: new Date().toISOString()
          },
          {
            id: 't2',
            author: 'Dr. Elena Rostova',
            role: 'CEO & Founder',
            company: 'Bloom Diagnostics',
            service: 'Editorial Design & Full-Stack Platform',
            rating: 5,
            feedback: 'The level of typographic restraint and engineering speed was unprecedented. Investors during our Series A roadshow specifically singled out our digital platform.',
            status: 'approved',
            is_verified: true,
            createdAt: new Date().toISOString()
          },
          {
            id: 't3',
            author: 'Arjun Mehta',
            role: 'VP Engineering',
            company: 'Orbit Cloud Telemetry',
            service: 'AI Telemetry Suite',
            rating: 5,
            feedback: 'They took our dense multi-tenant backend and engineered a minimalist tactical interface that reduced customer onboarding churn by 65%. Uncompromising standards.',
            status: 'approved',
            is_verified: true,
            createdAt: new Date().toISOString()
          }
        ])
      }
    }
    load()
    window.addEventListener('nysax_storage_update', load)
    return () => window.removeEventListener('nysax_storage_update', load)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!author.trim() || !feedback.trim()) return

    setSubmitting(true)
    setStatusMsg('TRANSMITTING TO DESK...')

    try {
      const newRev = db.saveReview({
        author: author.trim(),
        role: role.trim() || 'Executive Client',
        company: company.trim() || 'Partner Enterprise',
        rating,
        feedback: feedback.trim(),
        service,
        status: 'pending',
        is_verified: false,
      })

      try {
        await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRev),
        })
      } catch (err) {
        console.warn('API feedback fallback:', err)
      }

      setStatusMsg('CONFIRMED: Your submission has reached leadership moderation desk.')
      setTimeout(() => {
        setShowDrawer(false)
        setStatusMsg(null)
        setAuthor('')
        setRole('')
        setCompany('')
        setFeedback('')
      }, 2500)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="bg-black py-28 md:py-36 border-t border-white/5 relative" id="testimonials">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs text-olive-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-olive-500 rounded-full" />
              VERIFIED PARTNER ATTESTATIONS
            </p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
              Client Feedback.<br />
              <span className="text-silver-500 font-normal">Direct from executive leadership.</span>
            </h2>
          </div>

          <button
            onClick={() => setShowDrawer(true)}
            className="self-start md:self-auto px-5 py-2.5 bg-obsidian-850 border border-white/10 text-silver-300 font-mono text-xs uppercase tracking-wider hover:border-olive-500 hover:text-white transition-all flex items-center gap-2"
            data-cursor="hover"
          >
            <MessageSquare size={14} className="text-olive-400" />
            <span>Submit Attestation</span>
          </button>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, i) => (
            <motion.div
              key={rev.id || i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-obsidian-850 border border-white/10 p-8 flex flex-col justify-between group hover:border-olive-500/40 transition-all duration-400"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-olive-400">
                    {[...Array(rev.rating || 5)].map((_, idx) => (
                      <Star key={idx} size={13} fill="currentColor" />
                    ))}
                  </div>
                  {rev.is_verified && (
                    <span className="flex items-center gap-1 font-mono text-[10px] text-olive-400 uppercase tracking-widest">
                      <CheckCircle size={12} />
                      Verified
                    </span>
                  )}
                </div>

                <p className="font-body text-silver-300 text-sm md:text-base leading-relaxed mb-8 italic">
                  "{rev.feedback}"
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex flex-col">
                <span className="font-display font-semibold text-white text-base">
                  {rev.author}
                </span>
                <span className="font-mono text-xs text-silver-500 uppercase tracking-wider">
                  {rev.role} — {rev.company}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Slide-out Review Drawer */}
      <AnimatePresence>
        {showDrawer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-obsidian-850 border border-white/10 p-8 max-w-lg w-full relative"
            >
              <button
                onClick={() => setShowDrawer(false)}
                className="absolute top-6 right-6 text-silver-400 hover:text-white"
              >
                <X size={20} />
              </button>

              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Submit Partner Attestation
              </h3>
              <p className="font-body text-xs text-silver-400 mb-6">
                All submissions are authenticated through leadership moderation before display on the live public ticker.
              </p>

              {statusMsg ? (
                <div className="p-4 bg-black border border-olive-500/50 text-olive-400 font-mono text-xs mb-4">
                  {statusMsg}
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-silver-400 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    className="w-full bg-black border border-white/10 px-3 py-2 text-white font-mono text-xs focus:border-olive-500 focus:outline-none"
                    placeholder="Executive Full Name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-silver-400 mb-1">
                      Role / Title
                    </label>
                    <input
                      type="text"
                      value={role}
                      onChange={e => setRole(e.target.value)}
                      className="w-full bg-black border border-white/10 px-3 py-2 text-white font-mono text-xs focus:border-olive-500 focus:outline-none"
                      placeholder="e.g. Founder / CTO"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-silver-400 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      className="w-full bg-black border border-white/10 px-3 py-2 text-white font-mono text-xs focus:border-olive-500 focus:outline-none"
                      placeholder="e.g. Enterprise Ltd"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase text-silver-400 mb-1">
                    Delivered Service
                  </label>
                  <select
                    value={service}
                    onChange={e => setService(e.target.value)}
                    className="w-full bg-black border border-white/10 px-3 py-2 text-white font-mono text-xs focus:border-olive-500 focus:outline-none"
                  >
                    <option>Full-Stack Web Engineering</option>
                    <option>Editorial UI/UX Design</option>
                    <option>Strategy & Digital Advisory</option>
                    <option>Autonomous AI Integration</option>
                    <option>Mobile Application Suite</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase text-silver-400 mb-1">
                    Attestation Note *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={feedback}
                    onChange={e => setFeedback(e.target.value)}
                    className="w-full bg-black border border-white/10 px-3 py-2 text-white font-body text-xs focus:border-olive-500 focus:outline-none resize-none"
                    placeholder="Describe collaboration rigor, engineering quality, and measurable outcomes..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-olive-600 text-black font-mono text-xs uppercase font-bold tracking-widest hover:bg-olive-500 transition-colors flex items-center justify-center gap-2 mt-2"
                >
                  <Send size={14} />
                  <span>{submitting ? 'Transmitting...' : 'Submit For Verification'}</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
