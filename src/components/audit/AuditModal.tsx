import React, { useState } from 'react'
import { X, CheckCircle2 } from 'lucide-react'
import { db } from '../../lib/storage'

interface AuditModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AuditModal: React.FC<AuditModalProps> = ({ isOpen, onClose }) => {
  const [urlOrHandle, setUrlOrHandle] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !urlOrHandle.trim()) return

    setSubmitting(true)

    try {
      db.saveLead({
        name: name.trim() || 'Prospect',
        email: email.trim(),
        service: '7-Point Growth Audit',
        websiteOrHandle: urlOrHandle.trim(),
        source: 'audit_modal',
        status: 'new',
        message: `Diagnostic Audit requested for: ${urlOrHandle.trim()}`
      })

      // Dispatch to /api/contact via Resend to mokshith9944@gmail.com
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim() || 'Diagnostic Audit Prospect',
            email: email.trim(),
            service: 'Diagnostic Audit',
            websiteOrHandle: urlOrHandle.trim(),
            message: `Free Diagnostic Audit requested for ${urlOrHandle.trim()}`,
          }),
        })
      } catch (err) {
        console.warn('Audit dispatch fallback:', err)
      }

      setSubmitted(true)
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-obsidian-900 border border-white/15 shadow-2xl p-6 sm:p-8 overflow-hidden text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-silver-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-6 space-y-4 text-left font-mono">
            <div className="w-9 h-9 bg-olive-950 border border-olive-500/50 text-olive-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold uppercase text-white tracking-tight">
              Audit Brief Received
            </h3>
            <p className="text-xs text-silver-300 leading-relaxed">
              Our engineering team is analyzing <span className="text-olive-400 font-semibold">{urlOrHandle}</span> across performance, Core Web Vitals, and conversion leaks.
            </p>
            <p className="text-[11px] text-silver-500 uppercase tracking-wider">
              Diagnostic report will be transmitted directly to {email} within 24 hours.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-olive-600 text-black text-xs font-mono uppercase font-bold tracking-widest hover:bg-olive-500 transition-colors cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <p className="text-[10px] uppercase font-mono tracking-widest text-olive-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-olive-500 rounded-full" />
                TECHNICAL DIAGNOSTIC
              </p>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight mt-1">
                Request Growth Audit
              </h3>
              <p className="text-xs font-mono text-silver-400 mt-1">
                Receive an architectural breakdown of your digital presence, speed metrics, and conversion leaks.
              </p>
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-silver-300 mb-1">
                Website URL or Handle *
              </label>
              <input
                type="text"
                required
                placeholder="https://yourbrand.com or @handle"
                value={urlOrHandle}
                onChange={(e) => setUrlOrHandle(e.target.value)}
                className="w-full px-3 py-2 border border-white/10 bg-black text-white text-xs font-mono focus:border-olive-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-silver-300 mb-1">
                Executive Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-white/10 bg-black text-white text-xs font-mono focus:border-olive-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-silver-300 mb-1">
                Report Delivery Email *
              </label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-white/10 bg-black text-white text-xs font-mono focus:border-olive-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-olive-600 text-black text-xs font-mono uppercase font-bold tracking-widest hover:bg-olive-500 transition-colors cursor-pointer disabled:opacity-50 mt-2 shadow-[0_0_20px_rgba(112,130,56,0.3)]"
            >
              {submitting ? 'TRANSMITTING AUDIT REQUEST...' : 'Generate Diagnostic Audit'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
