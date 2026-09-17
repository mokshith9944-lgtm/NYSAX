import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare, 
  Calendar, 
  Clock, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';
import confetti from 'canvas-confetti';
import { db } from '../lib/storage';

interface ContactSectionProps {
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    websiteOrHandle: '',
    service: 'SEO Optimization',
    budget: '$3,000 - $5,000/mo',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      db.saveLead({
        name: formData.name,
        email: formData.email,
        websiteOrHandle: formData.websiteOrHandle,
        service: formData.service,
        budget: formData.budget,
        message: formData.message,
        source: 'contact_form',
        status: 'new'
      });

      setLoading(false);
      setSubmitted(true);

      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }, 600);
  };

  const handleOpenEmail = () => {
    const subject = encodeURIComponent(`NYSAX Growth Inquiry: ${formData.service} - ${formData.name}`);
    const body = encodeURIComponent(
      `Hello NYSAX Team,\n\nName: ${formData.name}\nEmail: ${formData.email}\nWebsite/Instagram: ${formData.websiteOrHandle}\nService Needed: ${formData.service}\nBudget: ${formData.budget}\n\nProject Details:\n${formData.message}\n\nLooking forward to hearing from you!`
    );
    window.open(`mailto:nysaxofficial@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#070C18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - NexStudio Agency Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-blue-300 text-xs font-semibold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5 text-primary" />
              <span>Get in Touch</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              Ready to Accelerate Your Brand?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Submit your project details or connect directly with our strategic leads. We evaluate all inquiries within 4 business hours and prepare an actionable revenue roadmap.
            </p>

            <div className="space-y-4 pt-2">
              {/* Direct Email Card */}
              <a
                href="mailto:nysaxofficial@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#0D1527] border border-white/10 hover:border-primary/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Direct Inquiries</p>
                  <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                    nysaxofficial@gmail.com
                  </p>
                </div>
              </a>

              {/* Instagram Card */}
              <a
                href="https://www.instagram.com/nysax.agency?stkn=MXdycDVzN3lqc2tqZA=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#0D1527] border border-white/10 hover:border-pink-500/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Official Agency Instagram</p>
                  <p className="text-sm font-semibold text-white group-hover:text-pink-300 transition-colors">
                    @nysax.agency
                  </p>
                </div>
              </a>

              {/* Book Call Banner */}
              <div className="p-5 rounded-2xl bg-[#0D1527] border border-primary/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>Prefer Real-Time Discussion?</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Available Today
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Book a private 30-minute video strategy call directly on our team calendar.
                </p>
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 rounded-xl bg-primary/20 hover:bg-primary text-blue-200 hover:text-white font-semibold text-xs border border-primary/40 transition-all"
                >
                  Open Booking Calendar
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - NexStudio Submission Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl bg-[#0D1527] border border-white/10 backdrop-blur-2xl shadow-2xl relative">
              {submitted ? (
                <div className="text-center py-10 space-y-5 animate-in fade-in zoom-in-95">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    Inquiry Received, {formData.name}!
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                    Your brief has been logged in the NYSAX CRM. Our senior growth strategist is already reviewing your details and will follow up shortly at <span className="text-white font-medium">{formData.email}</span>.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleOpenEmail}
                      className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-primary/30"
                    >
                      <Mail className="w-4 h-4" />
                      Send Copy Via Email Client
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/10 text-slate-300 text-xs font-medium"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-display font-bold text-white mb-4">
                    Send Us a Project Brief
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#090E20] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#090E20] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Website or Instagram Handle
                      </label>
                      <input
                        type="text"
                        placeholder="example.com or @handle"
                        value={formData.websiteOrHandle}
                        onChange={(e) => setFormData({ ...formData, websiteOrHandle: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#090E20] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Primary Service Needed *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#090E20] border border-white/10 text-white text-xs focus:outline-none focus:border-primary"
                      >
                        <option value="SEO Optimization">01. SEO Optimization & Rankings</option>
                        <option value="Website Design">02. Website Design & Funnels</option>
                        <option value="Sales Strategy">03. Sales Strategy & Pipeline</option>
                        <option value="Email Marketing">04. Email Marketing & Retention</option>
                        <option value="Newbies in Social Media Marketing">05. Newbies in Social Media Marketing</option>
                        <option value="Multi-Service Growth Retainer">Full Multi-Service Retainer</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Estimated Monthly Budget
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['$1.5k - $3k', '$3k - $6k', '$6k - $12k+'].map((tier) => (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: tier })}
                          className={`py-2 px-2 text-center rounded-xl text-xs font-medium border transition-all ${
                            formData.budget === tier
                              ? 'bg-primary/20 border-primary text-white font-semibold'
                              : 'bg-[#090E20] border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          {tier}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Project Details & Goals
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us what you want to achieve, your timeline, or current bottlenecks..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#090E20] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-primary resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Logging Brief in CRM...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Project Brief to NYSAX</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 pt-1 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      100% Confidential
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      Response Within 4 Hours
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
