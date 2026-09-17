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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-[28px] bg-white border border-gray-200 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="size-14 rounded-full bg-black text-white flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-normal text-black tracking-tight">Call Confirmed</h3>
            <p className="text-sm text-gray-600 max-w-sm mx-auto">
              Your 30-minute growth strategy session is locked for <span className="font-semibold text-black">{selectedDate}</span> at <span className="font-semibold text-black">{selectedTime}</span>.
            </p>
            <p className="text-xs text-gray-500 font-mono">
              Meeting invite sent to {email}. Check your inbox.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-full bg-black text-white text-xs uppercase tracking-wider font-medium hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="mb-6">
              <p className="text-xs uppercase font-mono tracking-widest text-gray-400">
                Direct Scheduling
              </p>
              <h3 className="text-2xl font-normal text-black -tracking-[0.8px] mt-1">
                Book a 30-Min <span className="italic font-serif">Strategy Call</span>
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                No high-pressure sales pitch. We analyze your website, diagnose bottlenecks, and map an execution blueprint.
              </p>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-gray-700 mb-2 font-medium">
                Select Date
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {dates.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDate(d)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      selectedDate === d
                        ? 'bg-black text-white font-semibold'
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-black'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-gray-700 mb-2 font-medium">
                Select Time Slot
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {times.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTime(t)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      selectedTime === t
                        ? 'bg-black text-white font-semibold'
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-black'
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
                <label className="block text-xs font-medium text-gray-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-black text-xs focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="john@brand.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-black text-xs focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Website / Instagram</label>
                <input
                  type="text"
                  placeholder="@handle or domain"
                  value={websiteOrHandle}
                  onChange={(e) => setWebsiteOrHandle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-black text-xs focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Service Needed</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-black text-xs focus:outline-none focus:border-black cursor-pointer"
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
              className="w-full py-3.5 rounded-full bg-black text-white text-xs uppercase tracking-wider font-medium hover:bg-gray-800 transition-colors shadow-sm cursor-pointer"
            >
              Confirm 30-Min Strategy Call
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
