import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How fast can we see results from SEO and Web Design?',
      a: 'Custom websites are completed and launched within 2 to 4 weeks. For SEO, initial technical speed and crawlability improvements reflect within 14–30 days, while keyword dominance and organic pipeline typically compound dramatically between months 2 and 4.'
    },
    {
      q: 'I have 0 followers on social media. Is the beginner incubator right for me?',
      a: 'Yes, exactly! Our "Newbies in Social Media Marketing" service was created specifically for zero-follower founders and beginners. We don\'t expect you to have camera skills or marketing knowledge—we provide exact fill-in-the-blank scripts, hook templates, profile setup, and algorithmic posting guidelines.'
    },
    {
      q: 'Do you offer a performance guarantee or trial period?',
      a: 'All client partnerships include clearly defined milestone deliverables and KPI roadmaps. If we fail to hit agreed-upon deployment milestones, we continue working at no additional cost until achieved.'
    },
    {
      q: 'How does the Client Portal work?',
      a: 'Once onboarding starts, you receive dedicated login access to the NYSAX Client Portal. Inside, you can track live campaign progress, view deliverable milestones, access brand assets in the vault, and message your strategists directly.'
    },
    {
      q: 'How do we get started?',
      a: 'Book a 30-minute discovery call using our booking calendar, or request a complimentary 7-point digital audit. We review your current assets, diagnose bottlenecks, and present a custom growth proposal.'
    }
  ];

  return (
    <section id="faq" className="py-24 bg-black border-t border-b border-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-16 flex-col lg:flex-row">
          {/* Left Column: Heading */}
          <div className="lg:w-5/12">
            <div className="flex items-center space-x-3 mb-4">
              <span className="w-8 h-[1px] bg-white"></span>
              <p className="text-[11px] uppercase font-mono tracking-[0.25em] text-neutral-400">
                Inquiries & Protocols
              </p>
            </div>
            <h2 className="font-light text-4xl sm:text-5xl mb-6 text-white uppercase tracking-tight">
              Frequently Addressed <span className="font-serif italic font-normal text-neutral-400 lowercase">protocols</span>
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-light">
              Have a bespoke inquiry or technical requirement not itemized here? Reach our partners directly at{' '}
              <a
                href="mailto:contact@nysaagency.com?subject=[Direct%20Inquiry]%20Nysa%20Agency"
                className="text-white underline underline-offset-4 hover:text-neutral-300 font-mono text-xs"
              >
                contact@nysaagency.com
              </a>
              {' '}or via Instagram{' '}
              <a
                href="https://www.instagram.com/nysax.agency?stkn=MXdycDVzN3lqc2tqZA=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4 hover:text-neutral-300 font-mono text-xs"
              >
                @nysax.agency
              </a>.
            </p>
          </div>

          {/* Right Column: Clean Accordion List */}
          <div className="lg:w-7/12">
            <div className="divide-y divide-neutral-900 border-t border-b border-neutral-900">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={index} className="py-6">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full text-left flex items-center justify-between gap-4 group cursor-pointer"
                    >
                      <span className="text-base sm:text-lg font-normal uppercase tracking-wide text-white group-hover:text-neutral-300 transition-colors">
                        {faq.q}
                      </span>
                      <div className={`size-7 rounded-none border border-neutral-800 shrink-0 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 bg-white text-black border-white' : 'text-neutral-400 group-hover:border-neutral-600'}`}>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="pt-4 pr-10 text-neutral-400 text-sm leading-relaxed animate-in fade-in duration-200 font-light">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
