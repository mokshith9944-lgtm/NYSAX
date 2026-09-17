import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Who is the "Newbies in Social Media Marketing" program designed for?',
      a: 'This specialized program is engineered for founders, creators, and new business owners who are starting from complete ground zero with zero technical or video skills. We take care of bio branding, hook scripting, content calendars, mobile recording guidelines, and algorithm growth secrets so you never feel confused or overwhelmed.'
    },
    {
      q: 'How fast will we see results from SEO Optimization and Website Design?',
      a: 'Website redesigns and CRO funnels typically go live in 2-4 weeks, producing immediate conversion rate lifts the moment traffic hits the new layout. SEO optimization is a compounding engine: technical fixes and on-page optimization show initial ranking improvements within 30-45 days, with explosive compounding organic traffic occurring in months 2 to 4.'
    },
    {
      q: 'What is included in the NYSAX Client Portal?',
      a: 'When you partner with NYSAX or register an account, you gain dedicated 24/7 access to your custom Client Portal. There you can track campaign deliverables, monitor real-time milestone progress across SEO, website design, and email flows, download assets, and submit direct priority support tickets.'
    },
    {
      q: 'Do you lock clients into long-term 12-month contracts?',
      a: 'Never. We believe retention should be earned through tangible ROI, not legal handcuffs. We offer agile 90-day growth sprints and flexible month-to-month retainer options with full deliverable accountability.'
    },
    {
      q: 'How does NYSAX handle Email Marketing & Retention?',
      a: 'We specialize in lifecycle automation for eCommerce and high-ticket service brands using Klaviyo, Omnisend, and ActiveCampaign. We build custom welcome indoctrination sequences, abandoned checkout flows, VIP customer rewards, and winback funnels that typically generate 25% to 40%+ of total business revenue on autopilot.'
    },
    {
      q: 'How do I get started with NYSAX?',
      a: 'You can either book a 30-minute Growth Strategy Call using our booking calendar, claim a free 7-point audit, chat directly with our 24/7 Rule-Based Growth Advisor in the bottom right, or email us directly at nysaxofficial@gmail.com.'
    }
  ];

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Answers to Common Questions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            Frequently Asked Questions.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Everything you need to know about partnering with NYSAX for exponential growth.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0D121F] border border-white/10 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-display font-bold text-white text-base sm:text-lg pr-2">
                    {faq.q}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 text-purple-400">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/[0.04] bg-white/[0.01]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
