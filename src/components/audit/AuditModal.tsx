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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md rounded-[28px] bg-white border border-gray-200 shadow-2xl p-6 sm:p-8 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="size-14 rounded-full bg-black text-white flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-normal text-black tracking-tight">Audit Request Received</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Our analysts are evaluating <span className="text-black font-semibold">{urlOrHandle}</span> across SEO, Core Web Vitals speed, and conversion funnels. Your 7-point diagnostic report will be emailed to <span className="text-black font-semibold">{email}</span> within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-full bg-black text-white text-xs uppercase tracking-wider font-medium hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-6">
              <p className="text-xs uppercase font-mono tracking-widest text-gray-400">
                Complimentary Diagnostic
              </p>
              <h3 className="text-2xl font-normal text-black -tracking-[0.8px] mt-1">
                Claim Your Free <span className="italic font-serif">7-Point Audit</span>
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                We analyze your website, speed, organic search positioning, and social presence with zero obligation.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Your Name *</label>
              <input
                type="text"
                required
                placeholder="Sarah Jenkins"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-black text-xs focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Work Email *</label>
              <input
                type="email"
                required
                placeholder="sarah@yourbrand.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-black text-xs focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Website URL or Instagram Handle *</label>
              <input
                type="text"
                required
                placeholder="https://yourbrand.com or @yourhandle"
                value={urlOrHandle}
                onChange={(e) => setUrlOrHandle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-black text-xs focus:outline-none focus:border-black"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-black text-white text-xs uppercase tracking-wider font-medium hover:bg-gray-800 transition-colors shadow-sm cursor-pointer mt-2"
            >
              Generate My Free Audit Report
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
