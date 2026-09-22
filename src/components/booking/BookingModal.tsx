import React, { useState } from 'react'
import { X, CheckCircle2, Globe2 } from 'lucide-react'
import { db } from '../../lib/storage'
import { bookingRegions, BookingRegion } from '../../data/nexusContent'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [selectedRegion, setSelectedRegion] = useState<BookingRegion>(bookingRegions[0]) // Default India (or international)
  const [selectedDate, setSelectedDate] = useState('Tomorrow')
  const [selectedTime, setSelectedTime] = useState(bookingRegions[0].slots[0])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [websiteOrHandle, setWebsiteOrHandle] = useState('')
  const [service, setService] = useState('Performance Marketing & Paid Acquisition')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  if (!isOpen) return null

  const dates = ['Today', 'Tomorrow', 'In 2 Days', 'Next Monday']

  const handleRegionChange = (reg: BookingRegion) => {
    setSelectedRegion(reg)
    setSelectedTime(reg.slots[0])
  }

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
        message: `Strategic Consultation: ${selectedDate} at ${selectedTime} (${selectedRegion.country} • ${selectedRegion.timezone}) | Currency: ${selectedRegion.currency} (${selectedRegion.symbol})`,
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
            timezone: selectedRegion.timezone,
            region: selectedRegion.country,
            currency: selectedRegion.currency,
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
      <div className="relative w-full max-w-xl bg-obsidian-900 border border-white/15 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[92vh] overflow-y-auto text-white">
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
            <div className="p-3 bg-black border border-white/10 text-[11px] text-silver-400 space-y-1">
              <div>Region: <span className="text-white font-semibold">{selectedRegion.country} ({selectedRegion.timezone})</span></div>
              <div>Billing Currency: <span className="text-olive-400 font-semibold">{selectedRegion.currency} ({selectedRegion.symbol})</span></div>
              <div>Selected Focus: <span className="text-white font-semibold">{service}</span></div>
            </div>
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
            <div>
              <p className="text-[10px] uppercase font-mono tracking-widest text-olive-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-olive-500 rounded-full" />
                GLOBAL STRATEGY & MARKETING ADVISORY
              </p>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight mt-1">
                Schedule Strategic Consultation
              </h3>
              <p className="text-xs font-mono text-silver-400 mt-1">
                30-minute private evaluation. We audit your acquisition funnel, paid ROAS, and scaling roadmap.
              </p>
            </div>

            {/* Region & Timezone Picker */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs uppercase font-mono tracking-wider text-silver-300 flex items-center gap-1.5">
                  <Globe2 size={13} className="text-olive-400" />
                  <span>Select Your Region & Timezone</span>
                </label>
                <span className="text-[10px] font-mono text-olive-400">
                  {selectedRegion.timezone} • {selectedRegion.currency}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {bookingRegions.map(reg => (
                  <button
                    key={reg.id}
                    type="button"
                    onClick={() => handleRegionChange(reg)}
                    className={`py-2 px-2 text-left text-xs font-mono transition-all cursor-pointer border flex items-center justify-between ${
                      selectedRegion.id === reg.id
                        ? 'bg-olive-600 text-black border-olive-500 font-bold shadow-[0_0_15px_rgba(112,130,56,0.35)]'
                        : 'bg-black border-white/10 text-silver-400 hover:text-white hover:border-white/30'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <span>{reg.flag}</span>
                      <span className="truncate">{reg.country}</span>
                    </span>
                    <span className="text-[10px] opacity-75">{reg.symbol}</span>
                  </button>
                ))}
              </div>
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
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-black border-white/10 text-silver-300 hover:border-white/30'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection in Selected Timezone */}
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-silver-300 mb-2">
                Select Time Slot ({selectedRegion.timezone})
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {selectedRegion.slots.map((t) => (
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
            <div className="grid grid-cols-2 gap-3 pt-1">
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
                  Website / Brand Handle
                </label>
                <input
                  type="text"
                  placeholder="@brand or domain.com"
                  value={websiteOrHandle}
                  onChange={(e) => setWebsiteOrHandle(e.target.value)}
                  className="w-full px-3 py-2 border border-white/10 bg-black text-white text-xs font-mono focus:border-olive-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-silver-300 mb-1">
                  Primary Objective
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3 py-2 border border-white/10 bg-black text-white text-xs font-mono focus:border-olive-500 focus:outline-none cursor-pointer"
                >
                  <option value="Performance Marketing & Paid Acquisition">Performance Marketing & Paid Acquisition</option>
                  <option value="Conversion Web Architecture (CRO)">Conversion Web Architecture (CRO)</option>
                  <option value="Search Engine Dominance (SEO)">Search Engine Dominance (SEO)</option>
                  <option value="Brand Storytelling & Ad Creatives">Brand Storytelling & Ad Creatives</option>
                  <option value="Lifecycle & Retention Marketing">Lifecycle & Retention Marketing</option>
                  <option value="Full Growth Retainer ($499 - $4,999)">Full Growth Retainer ($499 - $4,999)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-olive-600 text-black text-xs font-mono uppercase font-bold tracking-widest hover:bg-olive-500 transition-colors cursor-pointer disabled:opacity-50 mt-2 shadow-[0_0_20px_rgba(112,130,56,0.3)]"
            >
              {submitting ? 'TRANSMITTING DISPATCH...' : `Confirm Consultation (${selectedRegion.currency} • ${selectedRegion.timezone})`}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
