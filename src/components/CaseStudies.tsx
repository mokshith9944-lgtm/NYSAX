import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const CaseStudies: React.FC = () => {
  const cases = [
    {
      id: 1,
      title: 'Vanguard Luxury Goods — +214% DTC eCommerce Surge',
      type: 'Website Design & Email Automations',
      date: 'Q1 2026',
      metric: '+$142k/mo',
      roas: '5.4x ROAS',
      results: [
        'Sub-second redesign dropping bounce rate by 42%',
        '6-part Klaviyo automated lifecycle flows',
        'Conversion rate elevated from 1.2% to 3.1%'
      ]
    },
    {
      id: 2,
      title: 'AeroSync Cloud Software — #1 Page 1 Google Dominance',
      type: 'SEO Optimization & Sales Strategy',
      date: 'Q2 2026',
      metric: '280k/mo',
      roas: '11.8x ROI',
      results: [
        'Targeted 38 bottom-of-funnel SaaS search queries',
        '45 tier-1 authoritative editorial PR backlinks',
        'Discovery call closing rate lifted from 18% to 39%'
      ]
    },
    {
      id: 3,
      title: 'Kinetics Mindset — 0 to 42,000 Followers in 75 Days',
      type: 'Newbies in Social Media Marketing',
      date: 'Q2 2026',
      metric: '42,000+',
      roas: '4.9x ROAS',
      results: [
        'Started with 0 followers and zero video experience',
        '30 viral short-form video scripts reaching 2.4M organic views',
        '1,200 leads captured via ManyChat DM automation funnels'
      ]
    },
    {
      id: 4,
      title: 'Veritas Capital Advisory — $4.2M High-Ticket Deal Flow',
      type: 'Sales Strategy & Custom Web Funnels',
      date: 'Q3 2026',
      metric: '$4.2M',
      roas: '8.2x ROI',
      results: [
        'Restructured high-ticket enterprise offer narrative',
        'Engineered inbound executive qualification system',
        'Shortened sales cycle from 90 days to 24 days'
      ]
    }
  ];

  return (
    <section id="results" className="py-12 lg:py-25 bg-black rounded-4xl mx-3 sm:mx-6 lg:mx-8 my-10 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs uppercase font-mono tracking-widest text-neutral-400 mb-2">
                Portfolio Showcase
              </p>
              <h2 className="text-white text-4xl sm:text-5xl font-normal">
                NYSAX <span className="italic font-serif text-gray-300">Case Studies</span>
              </h2>
            </div>
            <p className="text-sm font-mono text-neutral-400 max-w-sm">
              Verifiable proof of concept across eCommerce, SaaS, and personal creator brands.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
            {cases.map((item) => (
              <article
                key={item.id}
                className="p-6 sm:p-8 rounded-[20px] border border-[#1F1F1F] bg-neutral-950 flex flex-col justify-between hover:border-neutral-700 transition-all duration-300"
              >
                <div>
                  <div className="flex py-2 text-neutral-400 text-xs justify-between font-mono border-b border-[#1F1F1F] mb-6">
                    <span className="uppercase tracking-wider text-white">{item.type}</span>
                    <span>{item.date}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-normal text-white mb-4 tracking-tight">
                    {item.title}
                  </h3>

                  <ul className="space-y-2 mb-6">
                    {item.results.map((res, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-[#1F1F1F] flex items-center justify-between">
                  <div>
                    <span className="text-2xl sm:text-3xl font-semibold text-white font-sans">{item.metric}</span>
                    <span className="text-xs font-mono text-neutral-400 ml-2">({item.roas})</span>
                  </div>
                  <div className="size-8 rounded-full border border-neutral-700 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
