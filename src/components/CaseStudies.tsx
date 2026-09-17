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
    <section id="results" className="py-24 bg-black border-t border-b border-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <span className="w-8 h-[1px] bg-white"></span>
                <p className="text-[11px] uppercase font-mono tracking-[0.25em] text-neutral-400">
                  Performance Records // Selected Work
                </p>
              </div>
              <h2 className="text-white text-4xl sm:text-5xl font-light uppercase tracking-tight">
                Case <span className="font-serif italic font-normal text-neutral-400 lowercase">studies</span>
              </h2>
            </div>
            <p className="text-xs font-mono text-neutral-400 max-w-sm uppercase tracking-wider">
              Empirical proof across high-ticket B2B, eCommerce scaling, and venture-backed digital brands.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
            {cases.map((item) => (
              <article
                key={item.id}
                className="p-6 sm:p-8 rounded-none border border-neutral-800 bg-neutral-950/60 flex flex-col justify-between hover:border-neutral-700 transition-all duration-300"
              >
                <div>
                  <div className="flex py-2 text-neutral-400 text-xs justify-between font-mono border-b border-neutral-900 mb-6">
                    <span className="uppercase tracking-widest text-white text-[11px]">{item.type}</span>
                    <span className="text-[11px] text-neutral-500">{item.date}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-normal uppercase tracking-tight text-white mb-4">
                    {item.title}
                  </h3>

                  <ul className="space-y-2.5 mb-6">
                    {item.results.map((res, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2 text-xs text-neutral-300 font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-neutral-900 flex items-center justify-between">
                  <div>
                    <span className="text-2xl sm:text-3xl font-light text-white font-mono">{item.metric}</span>
                    <span className="text-xs font-mono text-neutral-500 ml-2">({item.roas})</span>
                  </div>
                  <div className="size-8 rounded-none border border-neutral-800 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors cursor-pointer">
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
