import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { db } from '../../lib/storage';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditModal: React.FC<AuditModalProps> = ({ isOpen, onClose }) => {
  const [urlOrHandle, setUrlOrHandle] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !urlOrHandle.trim()) return;

    setSubmitting(true);

    try {
      db.saveLead({
        name: name.trim() || 'Prospect',
        email: email.trim(),
        service: '7-Point Growth Audit',
        websiteOrHandle: urlOrHandle.trim(),
        source: 'audit_modal',
        status: 'new',
        message: `Audit requested for: ${urlOrHandle.trim()}`
      });

      // Dispatch to /api/contact
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim() || 'Growth Audit Prospect',
            email: email.trim(),
            service: '7-Point Growth Audit',
            websiteOrHandle: urlOrHandle.trim(),
            message: `Free Growth Audit requested for ${urlOrHandle.trim()}`,
          }),
        });
      } catch (err) {
        console.warn('Audit dispatch fallback:', err);
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-md rounded-none bg-white border border-black shadow-2xl p-6 sm:p-8 overflow-hidden font-mono">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-black hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-6 space-y-4 text-left">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-normal uppercase text-black tracking-tight">Audit Queued</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Technical audit queued for <span className="text-black font-semibold">{urlOrHandle}</span> across Core Web Vitals, organic keyword coverage, and funnel bottlenecks.
            </p>
            <p className="text-[11px] text-neutral-500 uppercase tracking-wider">
              Diagnostic report will be delivered to {email} within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-black text-white text-xs font-mono uppercase tracking-widest border border-black hover:bg-neutral-900 transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">
                Diagnostic Service
              </p>
              <h3 className="text-2xl font-normal text-black uppercase tracking-tight mt-1">
                7-Point Growth Audit
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                Comprehensive technical audit covering architecture, Core Web Vitals, and conversion path bottlenecks.
              </p>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-700 mb-1">
                Contact Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-none bg-neutral-50 border border-neutral-300 text-black text-xs font-mono focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-700 mb-1">
                Work Email *
              </label>
              <input
                type="email"
                required
                placeholder="client@organization.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-none bg-neutral-50 border border-neutral-300 text-black text-xs font-mono focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-700 mb-1">
                Website URL or Handle *
              </label>
              <input
                type="text"
                required
                placeholder="https://brand.com or @handle"
                value={urlOrHandle}
                onChange={(e) => setUrlOrHandle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-none bg-neutral-50 border border-neutral-300 text-black text-xs font-mono focus:outline-none focus:border-black"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-none bg-black text-white text-xs font-mono uppercase tracking-widest hover:bg-neutral-900 border border-black transition-colors cursor-pointer mt-2 disabled:opacity-50"
            >
              {submitting ? 'Transmitting Request...' : 'Request Growth Audit'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
