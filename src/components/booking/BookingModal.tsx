import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { db } from '../../lib/storage';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState('02:00 PM EST');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [websiteOrHandle, setWebsiteOrHandle] = useState('');
  const [service, setService] = useState('Organic SEO Architecture');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const dates = ['Today', 'Tomorrow', 'In 2 Days', 'Next Monday'];
  const times = ['10:00 AM EST', '01:30 PM EST', '03:00 PM EST', '05:30 PM EST'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setSubmitting(true);

    try {
      // 1. Save locally to CRM
      db.saveLead({
        name: name.trim(),
        email: email.trim(),
        service,
        websiteOrHandle: websiteOrHandle.trim(),
        message: `Consultation Booked for ${selectedDate} at ${selectedTime}`,
        source: 'strategy_booking',
        status: 'new'
      });

      // 2. Dispatch to /api/appointment (Resend Dual Dispatch)
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
        });
      } catch (err) {
        console.warn('Appointment serverless API fallback:', err);
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Booking submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-none bg-white border border-black shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-black hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-8 space-y-4 text-left font-mono">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-normal uppercase text-black tracking-tight">Consultation Scheduled</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Your 30-minute growth diagnostic is confirmed for <span className="font-semibold text-black">{selectedDate}</span> at <span className="font-semibold text-black">{selectedTime}</span>.
            </p>
            <p className="text-[11px] text-neutral-500 uppercase tracking-wider">
              Leadership confirmation dispatched to {email}. Direct attendance by Nikhil, Mokshith, or Amaresh.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-black text-white text-xs font-mono uppercase tracking-widest border border-black hover:bg-neutral-900 transition-colors cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="mb-4">
              <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">
                Direct Scheduling
              </p>
              <h3 className="text-2xl font-normal text-black uppercase tracking-tight mt-1">
                Schedule Consultation
              </h3>
              <p className="text-xs font-mono text-neutral-600 mt-1">
                30-minute private evaluation. We review your site architecture, traffic funnels, and growth leverage points.
              </p>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-black mb-2 font-medium">
                Select Consultation Date
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {dates.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDate(d)}
                    className={`py-2 px-1 text-center text-xs font-mono transition-colors cursor-pointer border ${
                      selectedDate === d
                        ? 'bg-black text-white border-black font-semibold'
                        : 'bg-white border-neutral-300 text-neutral-700 hover:border-black'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-black mb-2 font-medium">
                Select Time Window
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {times.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTime(t)}
                    className={`py-2 px-1 text-center text-xs font-mono transition-colors cursor-pointer border ${
                      selectedTime === t
                        ? 'bg-black text-white border-black font-semibold'
                        : 'bg-white border-neutral-300 text-neutral-700 hover:border-black'
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
                <label className="block text-xs uppercase font-mono tracking-wider text-black mb-1">Principal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-black bg-white text-black text-xs font-mono focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-black mb-1">Corporate Email *</label>
                <input
                  type="email"
                  required
                  placeholder="john@brand.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-black bg-white text-black text-xs font-mono focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-black mb-1">Domain / Social Handle</label>
                <input
                  type="text"
                  placeholder="@handle or domain"
                  value={websiteOrHandle}
                  onChange={(e) => setWebsiteOrHandle(e.target.value)}
                  className="w-full px-3 py-2 border border-black bg-white text-black text-xs font-mono focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-black mb-1">Core Discipline</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3 py-2 border border-black bg-white text-black text-xs font-mono focus:outline-none cursor-pointer"
                >
                  <option value="Organic SEO Architecture">Organic SEO Architecture</option>
                  <option value="Editorial Web Design & CRO">Editorial Web Design & CRO</option>
                  <option value="Revenue & Sales Systems">Revenue & Sales Systems</option>
                  <option value="Lifecycle Email Marketing">Lifecycle Email Marketing</option>
                  <option value="Social Media Incubator">Social Media Incubator</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-black text-white text-xs font-mono uppercase tracking-widest border border-black hover:bg-neutral-900 transition-colors cursor-pointer disabled:opacity-50"
            >
              {submitting ? 'TRANSMITTING INQUIRY...' : 'Confirm Consultation'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
