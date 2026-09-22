import React, { useState } from 'react'
import { X, CheckCircle2 } from 'lucide-react'
import { db } from '../../lib/storage'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState('Tomorrow')
  const [selectedTime, setSelectedTime] = useState('02:00 PM EST')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [websiteOrHandle, setWebsiteOrHandle] = useState('')
  const [service, setService] = useState('Full-Stack Web Engineering')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  if (!isOpen) return null

  const dates = ['Today', 'Tomorrow', 'In 2 Days', 'Next Monday']
  const times = ['10:00 AM EST', '01:30 PM EST', '03:00 PM EST', '05:30 PM EST']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return

    setSubmitting(true)

    try {
      // 1. Save locally to CRM
      db.saveLead({
        name: name.trim(),
        email: email.trim(),
        service,
        websiteOrHandle: websiteOrHandle.trim(),
        message: `Strategic Consultation Scheduled for ${selectedDate} at ${selectedTime}`,
        source: 'strategy_booking',
        status: 'new'
      })

      // 2. Dispatch to /api/appointment (Resend Dual Dispatch to mokshith9944@gmail.com)
      try {
        await fetch('/api/appointment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            selectedDate,
            selectedTime,
            service,
            websiteOrHandle: websiteOrHandle.trim(),
          }),
        })
      } catch (err) {
        console.warn('Appointment serverless API fallback:', err)
      }

      setSubmitted(true)
    } catch (err) {
      console.error('Booking submission error:', err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-obsidian-900 border border-white/15 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-silver-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-8 space-y-4 text-left font-mono">
            <div className="w-9 h-9 bg-olive-950 border border-olive-500/50 text-olive-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold uppercase text-white tracking-tight">
              Consultation Confirmed
            </h3>
            <p className="text-xs text-silver-300 leading-relaxed">
              Your 30-minute private evaluation is confirmed for <span className="font-semibold text-olive-400">{selectedDate}</span> at <span className="font-semibold text-olive-400">{selectedTime}</span>.
            </p>
            <p className="text-[11px] text-silver-500 uppercase tracking-wider">
              Notification routed to founding desk (Nikhil, Mokshith, Amaresh). Confirmation dispatched to {email}.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-olive-600 text-black text-xs font-mono uppercase font-bold tracking-widest hover:bg-olive-500 transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="mb-4">
              <p className="text-[10px] uppercase font-mono tracking-widest text-olive-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-olive-500 rounded-full" />
                EXECUTIVE BRIEFING DESK
              </p>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight mt-1">
                Schedule Consultation
              </h3>
              <p className="text-xs font-mono text-silver-400 mt-1">
                30-minute strategic evaluation. We review your product architecture, technical roadmap, and growth vectors.
              </p>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-silver-300 mb-2">
                Select Date Window
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {dates.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDate(d)}
                    className={`py-2 px-1 text-center text-xs font-mono transition-colors cursor-pointer border ${
                      selectedDate === d
                        ? 'bg-olive-600 text-black border-olive-500 font-bold shadow-[0_0_15px_rgba(112,130,56,0.3)]'
                        : 'bg-black border-white/10 text-silver-300 hover:border-white/30'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-silver-300 mb-2">
                Select Time Slot
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {times.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTime(t)}
                    className={`py-2 px-1 text-center text-xs font-mono transition-colors cursor-pointer border ${
                      selectedTime === t
                        ? 'bg-olive-600 text-black border-olive-500 font-bold shadow-[0_0_15px_rgba(112,130,56,0.3)]'
                        : 'bg-black border-white/10 text-silver-300 hover:border-white/30'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact details */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-silver-300 mb-1">
                  Principal Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-white/10 bg-black text-white text-xs font-mono focus:border-olive-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-silver-300 mb-1">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@enterprise.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-white/10 bg-black text-white text-xs font-mono focus:border-olive-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-silver-300 mb-1">
                  Domain / Handle
                </label>
                <input
                  type="text"
                  placeholder="@handle or url"
                  value={websiteOrHandle}
                  onChange={(e) => setWebsiteOrHandle(e.target.value)}
                  className="w-full px-3 py-2 border border-white/10 bg-black text-white text-xs font-mono focus:border-olive-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-silver-300 mb-1">
                  Core Focus
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3 py-2 border border-white/10 bg-black text-white text-xs font-mono focus:border-olive-500 focus:outline-none cursor-pointer"
                >
                  <option value="Full-Stack Web Engineering">Full-Stack Web Engineering</option>
                  <option value="Editorial UI/UX Design">Editorial UI/UX Design</option>
                  <option value="Strategy & Digital Advisory">Strategy & Digital Advisory</option>
                  <option value="Autonomous AI Integration">Autonomous AI Integration</option>
                  <option value="Mobile Application Suite">Mobile Application Suite</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-olive-600 text-black text-xs font-mono uppercase font-bold tracking-widest hover:bg-olive-500 transition-colors cursor-pointer disabled:opacity-50 mt-2 shadow-[0_0_20px_rgba(112,130,56,0.3)]"
            >
              {submitting ? 'TRANSMITTING DISPATCH...' : 'Confirm Consultation Booking'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
