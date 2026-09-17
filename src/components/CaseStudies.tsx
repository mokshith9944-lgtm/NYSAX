import React from 'react';
import { ArrowUpRight, CheckCircle2, Trophy, ExternalLink } from 'lucide-react';

export const CaseStudies: React.FC = () => {
  const cases = [
    {
      client: 'Vanguard Luxury Goods',
      category: 'Website Design & CRO + Email Automations',
      badge: '+214% Revenue Growth',
      results: [
        'Complete storefront redesign, dropping load time from 4.2s to 0.7s',
        'Built 6 automated Klaviyo lifecycle flows generating $48,000/mo on autopilot',
        'Conversion rate elevated from 1.2% to 3.1%'
      ],
      roas: '5.4x ROAS',
      metricNumber: '+$142,000',
      metricLabel: 'Monthly Revenue Lift',
      tag: 'eCommerce Storefront'
    },
    {
      client: 'AeroSync Cloud Software',
      category: 'SEO Optimization & Sales Strategy',
      badge: 'Page 1 Dominance',
      results: [
        'Targeted 38 bottom-of-funnel high-intent SaaS keywords',
        'Secured 45 tier-1 authoritative editorial PR backlinks',
        'Overhauled discovery call qualification scripts, raising closing rate from 18% to 39%'
      ],
      roas: '11.8x ROI',
      metricNumber: '280,000+',
      metricLabel: 'Organic Monthly Impressions',
      tag: 'B2B SaaS Platform'
    },
    {
      client: 'Kinetics Mindset Coaching',
      category: 'Newbies in Social Media Marketing',
      badge: 'Zero-to-Hero Breakout',
      results: [
        'Started with 0 followers and zero video filming experience',
        'Crafted 30 high-hook short-form video scripts reaching 2.4M organic views on Reels & TikTok',
        'Generated 1,200 high-ticket coaching leads through automated DM funnels'
      ],
      roas: '4.9x ROAS',
      metricNumber: '42,000+',
      metricLabel: 'Followers in 75 Days',
      tag: 'Creator & Personal Brand'
    }
  ];

  return (
    <section id="results" className="py-24 relative overflow-hidden bg-[#090E20]/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-emerald-400" />
            <span>Featured Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            Proven Outcomes Delivered Across Industries.
          </h2>
          <p className="text-slate-300 text-base">
            Explore how our synchronized growth systems transform client acquisition, search rankings, and automated recurring revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-[#0D1527] border border-white/10 hover:border-primary/50 p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10 group"
            >
              <div>
                {/* Top tags */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] font-semibold text-slate-300">
                    {item.tag}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-bold text-emerald-300">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-white group-hover:text-primary transition-colors mb-1.5 flex items-center justify-between">
                  <span>{item.client}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>
                <p className="text-xs font-semibold text-blue-400 mb-6">
                  {item.category}
                </p>

                {/* Key Results */}
                <div className="space-y-3 mb-8">
                  {item.results.map((res, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="leading-snug">{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Stat Strip */}
              <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                    {item.metricLabel}
                  </span>
                  <p className="text-2xl font-display font-black text-white">
                    {item.metricNumber}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Efficiency</span>
                  <p className="text-sm font-bold text-emerald-400">{item.roas}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
