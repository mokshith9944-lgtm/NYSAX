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
    <section id="faq" className="py-20 lg:py-25 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-16 flex-col lg:flex-row">
          {/* Left Column: Heading */}
          <div className="lg:w-5/12">
            <p className="text-xs uppercase font-mono tracking-widest text-gray-400 mb-2">
              Common Inquiries
            </p>
            <h2 className="font-normal text-4xl sm:text-5xl mb-6 text-black -tracking-[1.92px]">
              Frequently Asked <span className="italic font-serif">Questions</span>
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-6 font-normal">
              Have a question that is not covered here? Reach out directly to <a href="mailto:nysaxofficial@gmail.com" className="text-black font-semibold underline">nysaxofficial@gmail.com</a> or message us on Instagram.
            </p>
          </div>

          {/* Right Column: Clean Accordion List */}
          <div className="lg:w-7/12">
            <div className="divide-y divide-gray-200">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={index} className="py-5">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full text-left flex items-center justify-between gap-4 group cursor-pointer"
                    >
                      <span className="text-lg sm:text-xl font-normal text-black group-hover:text-gray-600 transition-colors">
                        {faq.q}
                      </span>
                      <div className={`size-8 rounded-full border border-gray-300 shrink-0 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 bg-black text-white border-black' : 'text-gray-600 group-hover:border-black'}`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="pt-4 pr-10 text-gray-600 text-base leading-relaxed animate-in fade-in duration-200 font-normal">
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
