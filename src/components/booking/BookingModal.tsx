import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, User, Mail, Globe, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
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
  const [service, setService] = useState('SEO Optimization');
  const [budget, setBudget] = useState('$3,000 - $6,000/mo');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const dates = ['Today', 'Tomorrow', 'In 2 Days', 'Next Monday'];
  const times = ['10:00 AM EST', '01:30 PM EST', '03:00 PM EST', '05:30 PM EST'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    db.saveLead({
      name,
      email,
      service,
      websiteOrHandle,
      budget,
      message: `Strategy Call booked for: ${selectedDate} at ${selectedTime}`,
      source: 'strategy_booking',
      status: 'new'
    });

    setSubmitted(true);
    try {
      confetti({ particleCount: 90, spread: 60, origin: { y: 0.6 } });
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0D1220] border border-white/10 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white">Call Confirmed!</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              We've reserved <span className="text-white font-medium">{selectedDate} at {selectedTime}</span>. A calendar invite and Google Meet link have been sent to <span className="text-purple-300 font-medium">{email}</span>.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center mb-5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-bold uppercase tracking-wider mb-2">
                <Calendar className="w-3 h-3" />
                Private Strategy Session
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                Book a 30-Minute Growth Call
              </h3>
              <p className="text-xs text-slate-400">
                Direct 1-on-1 strategy call with a senior NYSAX growth strategist.
              </p>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Select Date
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {dates.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDate(d)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-medium border transition-all ${
                      selectedDate === d
                        ? 'bg-purple-600 border-purple-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Select Time Slot
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {times.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTime(t)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-medium border transition-all ${
                      selectedTime === t
                        ? 'bg-cyan-600 border-cyan-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
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
                <label className="block text-xs font-medium text-slate-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="john@brand.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Website / Instagram</label>
                <input
                  type="text"
                  placeholder="@handle or domain"
                  value={websiteOrHandle}
                  onChange={(e) => setWebsiteOrHandle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Service Needed</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                >
                  <option value="SEO Optimization">SEO Optimization</option>
                  <option value="Website Design">Website Design</option>
                  <option value="Sales Strategy">Sales Strategy</option>
                  <option value="Email Marketing">Email Marketing</option>
                  <option value="Newbies in Social Media Marketing">Newbies in Social Media</option>
                  <option value="Multi-Service Retainer">Full Retainer</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>Confirm Strategy Call ({selectedDate} - {selectedTime})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
