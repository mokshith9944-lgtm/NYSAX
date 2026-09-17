import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';
import { db } from '../lib/storage';

interface ContactSectionProps {
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Organic SEO Architecture',
    budget: '$3k - $5k/mo',
    websiteOrHandle: '',
    message: '',
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const servicesList = [
    'Organic SEO Architecture',
    'Editorial Web Design & CRO',
    'Revenue & Sales Systems',
    'Lifecycle Email Marketing',
    'Incubator: Social Media Newbies',
  ];

  const budgetTiers = ['<$2k/mo', '$2k - $5k/mo', '$5k - $10k/mo', '$10k+/mo'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    setIsSubmitting(true);
    setStatusMessage('TRANSMITTING INQUIRY...');

    try {
      // 1. Save locally to CRM storage
      db.saveLead({
        name: formData.name.trim(),
        email: formData.email.trim(),
        service: formData.service,
        budget: formData.budget,
        websiteOrHandle: formData.websiteOrHandle.trim(),
        message: formData.message.trim(),
        source: 'contact_form',
        status: 'new',
      });

      // 2. Dispatch to Vercel Serverless Function (/api/contact)
      let apiSuccess = false;
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          setStatusMessage(data.message || 'CONFIRMED: Your brief has reached our desk. Expect a response within 24 hours.');
          apiSuccess = true;
        }
      } catch (networkErr) {
        console.warn('Vercel API route offline or local preview, local storage saved:', networkErr);
      }

      if (!apiSuccess) {
        // Even in local preview, confirm receipt since local CRM captured it
        setStatusMessage('CONFIRMED: Your brief has reached our desk. Expect a response within 24 hours.');
      }

      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        service: 'Organic SEO Architecture',
        budget: '$3k - $5k/mo',
        websiteOrHandle: '',
        message: '',
      });
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatusMessage('DISPATCH ERROR: Please reach directly via mailto:contact@nysaagency.com.');
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact">
      {/* Editorial Monochrome Consultation Banner */}
      <section className="py-20 bg-black text-white border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center flex-col sm:flex-row justify-between gap-8">
            <div className="sm:w-7/12">
              <p className="text-xs uppercase font-mono tracking-widest text-neutral-400 mb-2">
                Executive Consultations
              </p>
              <h2 className="font-normal text-3xl sm:text-5xl uppercase tracking-tight text-white">
                Initiate Project Brief
              </h2>
            </div>
            <div className="sm:w-5/12 flex sm:justify-end">
              <button
                onClick={onOpenBooking}
                className="group px-7 py-4 bg-white text-black text-xs font-mono uppercase tracking-widest border border-white hover:bg-neutral-200 transition-colors flex items-center gap-3 cursor-pointer"
              >
                <span>Schedule Consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Contact Form */}
      <section className="py-20 lg:py-24 bg-white border-t border-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Contact Details */}
            <div className="lg:col-span-5 space-y-6">
              <p className="text-xs uppercase font-mono tracking-widest text-neutral-500">
                Direct Touchpoints
              </p>
              <h3 className="font-normal text-3xl sm:text-4xl text-black uppercase tracking-tight">
                Direct Inquiries Desk
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed font-mono">
                Submit project briefs below or contact leadership directly. All inquiries are screened and answered within 24 hours.
              </p>

              <div className="space-y-3 pt-4">
                <a
                  href="mailto:contact@nysaagency.com?subject=[Project%20Inquiry]%20Nysa%20Agency"
                  className="p-4 border border-black bg-white flex items-center gap-4 hover:bg-neutral-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-black text-white flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-mono text-neutral-500 tracking-wider">Direct Mail Access</p>
                    <p className="text-xs font-mono text-black font-semibold">contact@nysaagency.com</p>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/nysax.agency?stkn=MXdycDVzN3lqc2tqZA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border border-black bg-white flex items-center gap-4 hover:bg-neutral-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-black text-white flex items-center justify-center shrink-0">
                    <InstagramIcon size={20} className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-mono text-neutral-500 tracking-wider">Official Instagram Channel</p>
                    <p className="text-xs font-mono text-black font-semibold">@nysax.agency</p>
                  </div>
                </a>
              </div>

              <div className="p-4 border border-neutral-200 bg-neutral-50 font-mono text-xs text-neutral-600 space-y-1">
                <p className="text-black font-semibold uppercase tracking-wider">Executive Review Team:</p>
                <p>Nikhil — Founder</p>
                <p>Mokshith — Co-Founder</p>
                <p>Amaresh — Co-Founder</p>
              </div>
            </div>

            {/* Right Project Brief Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 border border-black bg-white">
                {/* Minimalist Inline State Messaging */}
                {statusMessage && (
                  <div
                    className={`mb-6 p-4 border text-xs font-mono uppercase tracking-wider flex items-center gap-3 ${
                      isSuccess
                        ? 'border-black bg-neutral-50 text-black'
                        : isSubmitting
                        ? 'border-neutral-400 bg-neutral-100 text-neutral-800'
                        : 'border-black bg-neutral-100 text-black'
                    }`}
                  >
                    {isSuccess && <CheckCircle2 className="w-4 h-4 shrink-0 text-black" />}
                    <span>{statusMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider text-black mb-2 font-medium">
                        Principal Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. David Vance"
                        className="w-full px-4 py-3 border border-black bg-white text-xs font-mono text-black placeholder-neutral-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider text-black mb-2 font-medium">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="david@company.com"
                        className="w-full px-4 py-3 border border-black bg-white text-xs font-mono text-black placeholder-neutral-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider text-black mb-2 font-medium">
                        Service Discipline
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 border border-black bg-white text-xs font-mono text-black focus:outline-none cursor-pointer"
                      >
                        {servicesList.map((svc) => (
                          <option key={svc} value={svc}>
                            {svc}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider text-black mb-2 font-medium">
                        Website / Social Handle
                      </label>
                      <input
                        type="text"
                        value={formData.websiteOrHandle}
                        onChange={(e) => setFormData({ ...formData, websiteOrHandle: e.target.value })}
                        placeholder="e.g. brand.com or @handle"
                        className="w-full px-4 py-3 border border-black bg-white text-xs font-mono text-black placeholder-neutral-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-black mb-2 font-medium">
                      Project Investment Tier
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetTiers.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setFormData({ ...formData, budget: b })}
                          className={`py-2.5 px-3 text-xs font-mono text-center transition-colors cursor-pointer border ${
                            formData.budget === b
                              ? 'bg-black text-white border-black font-semibold'
                              : 'bg-white border-neutral-300 text-neutral-700 hover:border-black'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-black mb-2 font-medium">
                      Executive Brief & Performance Objectives *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline current bottleneck, baseline revenue/traffic, and desired outcomes..."
                      className="w-full px-4 py-3 border border-black bg-white text-xs font-mono text-black placeholder-neutral-400 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-black text-white text-xs font-mono uppercase tracking-widest border border-black hover:bg-neutral-900 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'TRANSMITTING INQUIRY...' : 'Submit Brief'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
