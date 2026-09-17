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
    service: 'SEO Optimization',
    budget: '$3k - $5k',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const servicesList = [
    'SEO Optimization & Organic Dominance',
    'High-Converting Website Design & Funnels',
    'Sales Strategy & Revenue Architecture',
    'Automated Email Marketing & Retention',
    'Newbies in Social Media Marketing (Incubator)',
  ];

  const budgetTiers = ['<$2k/mo', '$2k - $5k/mo', '$5k - $10k/mo', '$10k+/mo'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      db.saveLead({
        name: formData.name,
        email: formData.email,
        service: formData.service,
        budget: formData.budget,
        message: formData.message,
        source: 'contact_form',
        status: 'new',
      });

      // Mailto fallback
      const mailtoUrl = `mailto:nysaxofficial@gmail.com?subject=New Client Inquiry: ${encodeURIComponent(
        formData.name
      )} (${encodeURIComponent(formData.service)})&body=Name: ${encodeURIComponent(
        formData.name
      )}%0D%0AEmail: ${encodeURIComponent(formData.email)}%0D%0AService: ${encodeURIComponent(
        formData.service
      )}%0D%0ABudget: ${encodeURIComponent(formData.budget)}%0D%0AMessage: ${encodeURIComponent(
        formData.message
      )}`;

      window.location.href = mailtoUrl;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div id="contact">
      {/* Authentic TailGrids NexStudio CTA Banner (Pi) */}
      <section className="py-16 bg-[#FBFBFB] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center flex-col sm:flex-row justify-between gap-8">
            <div className="sm:w-7/12">
              <h2 className="font-normal text-4xl sm:text-5xl text-center sm:text-left text-black -tracking-[1.92px]">
                Ready to build your next <br />
                <span className="italic font-serif">breakthrough?</span>
              </h2>
            </div>
            <div className="sm:w-5/12 flex sm:justify-end">
              <button
                onClick={onOpenBooking}
                className="group px-7 py-4.5 inline-flex gap-2 items-center bg-white border border-black text-sm font-medium -tracking-[0.2px] leading-5 text-black rounded-full hover:bg-black hover:text-white transition-all duration-300 shadow-xs cursor-pointer"
              >
                <span>BOOK DISCOVERY CALL</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Studio Contact Form */}
      <section className="py-20 lg:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Contact Details */}
            <div className="lg:col-span-5 space-y-6">
              <p className="text-xs uppercase font-mono tracking-widest text-gray-400">
                Direct Inquiries
              </p>
              <h3 className="font-normal text-3xl sm:text-4xl text-black -tracking-[1.5px]">
                Tell Us About <span className="italic font-serif">Your Vision</span>
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Submit a project brief below, email our senior strategists directly, or DM us on Instagram for immediate response.
              </p>

              <div className="space-y-4 pt-4">
                <a
                  href="mailto:nysaxofficial@gmail.com"
                  className="p-4 rounded-2xl bg-[#FBFBFB] border border-gray-200 flex items-center gap-4 hover:border-black transition-colors"
                >
                  <div className="size-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-mono text-gray-400">Direct Email</p>
                    <p className="text-sm font-semibold text-black">nysaxofficial@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/nysax.agency?stkn=MXdycDVzN3lqc2tqZA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#FBFBFB] border border-gray-200 flex items-center gap-4 hover:border-black transition-colors"
                >
                  <div className="size-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                    <InstagramIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-mono text-gray-400">Official Instagram</p>
                    <p className="text-sm font-semibold text-black">@nysax.agency</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Project Brief Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-[24px] bg-[#FBFBFB] border border-gray-200 shadow-xs">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="size-14 rounded-full bg-black text-white flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h4 className="text-2xl font-normal text-black">Brief Received</h4>
                    <p className="text-gray-600 text-sm max-w-md mx-auto">
                      Thank you, {formData.name}. Our lead strategist will review your requirements and reach out to {formData.email} within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs uppercase font-mono text-black font-semibold underline underline-offset-4 pt-4"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase font-mono tracking-wider text-gray-700 mb-2 font-medium">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex Morgan"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-mono tracking-wider text-gray-700 mb-2 font-medium">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider text-gray-700 mb-2 font-medium">
                        Primary Service Needed
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm text-black focus:outline-none focus:border-black transition-colors cursor-pointer"
                      >
                        {servicesList.map((svc) => (
                          <option key={svc} value={svc}>
                            {svc}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider text-gray-700 mb-2 font-medium">
                        Approximate Monthly Budget
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {budgetTiers.map((b) => (
                          <button
                            type="button"
                            key={b}
                            onClick={() => setFormData({ ...formData, budget: b })}
                            className={`py-2.5 px-3 rounded-xl text-xs font-mono text-center transition-all cursor-pointer ${
                              formData.budget === b
                                ? 'bg-black text-white font-semibold'
                                : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-400'
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider text-gray-700 mb-2 font-medium">
                        Project Details & Current Bottleneck
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your brand, website, current traffic/revenue, and primary goals..."
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-full bg-black text-white text-xs uppercase tracking-wider font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
                    >
                      <span>Submit Project Brief</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
