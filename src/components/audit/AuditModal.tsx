import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    db.saveLead({
      name,
      email,
      service: '7-Point Growth Audit',
      websiteOrHandle: urlOrHandle,
      source: 'audit_modal',
      status: 'new',
      message: `Audit requested for: ${urlOrHandle}`
    });

    setSubmitted(true);
    try {
      confetti({ particleCount: 80, spread: 50, origin: { y: 0.6 } });
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-[#0D1220] border border-white/10 shadow-2xl p-6 sm:p-8 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-display font-bold text-white">Audit Request Received!</h3>
            <p className="text-xs text-slate-300">
              Our growth analysts are evaluating <span className="text-cyan-300 font-medium">{urlOrHandle}</span> across SEO, web speed, and social media hooks. Your 7-point diagnostic PDF will be emailed to <span className="text-purple-300 font-medium">{email}</span> within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-cyan-600 text-white text-xs font-semibold"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center mb-5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" />
                100% Free Diagnostic
              </div>
              <h3 className="text-2xl font-display font-bold text-white">
                Claim Your 7-Point Audit
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                We'll audit your SEO keywords, website load speed, mobile CRO, and social media profile.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Sarah Connor"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Website URL or Instagram Handle *
              </label>
              <input
                type="text"
                required
                placeholder="https://yourbrand.com or @handle"
                value={urlOrHandle}
                onChange={(e) => setUrlOrHandle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Email Address for the Report *
              </label>
              <input
                type="email"
                required
                placeholder="sarah@yourbrand.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>Generate My Free Audit Report</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
