import React from 'react';
import { TrendingUp, ArrowUpRight, CheckCircle2, Trophy, Star } from 'lucide-react';

export const CaseStudies: React.FC = () => {
  const cases = [
    {
      client: 'Vanguard Luxury Home Goods',
      category: 'Website Design & CRO + Email Flows',
      badge: '+214% Revenue Growth',
      results: [
        'Overhauled storefront UX, dropping load time from 4.2s to 0.7s',
        'Implemented 6 automated Klaviyo lifecycle flows generating $48,000/mo on autopilot',
        'Conversion rate elevated from 1.2% to 3.1%'
      ],
      roas: '5.4x ROAS',
      metricNumber: '+$142k',
      metricLabel: 'Monthly Revenue Lift',
      tag: 'eCommerce'
    },
    {
      client: 'AeroSync Cloud Software',
      category: 'SEO Optimization & Sales Strategy',
      badge: 'Page 1 Dominance',
      results: [
        'Targeted 38 bottom-of-funnel high-intent SaaS keywords',
        'Built 45 tier-1 authoritative editorial backlinks',
        'Revamped discovery call qualification scripts, raising closing rate from 18% to 39%'
      ],
      roas: '11.8x ROI',
      metricNumber: '280k',
      metricLabel: 'Organic Monthly Impressions',
      tag: 'B2B SaaS'
    },
    {
      client: 'Kinetics Fitness & Coaching',
      category: 'Newbies in Social Media Marketing',
      badge: 'Zero-to-Hero Viral Breakout',
      results: [
        'Started with 0 followers and no video editing experience',
        'Crafted 30 high-hook short-form video scripts reaching 2.4M organic views on Reels & TikTok',
        'Generated 1,200 high-ticket coaching inquiries through automated DM funnels'
      ],
      roas: '4.9x ROAS',
      metricNumber: '42,000+',
      metricLabel: 'Followers in 75 Days',
      tag: 'Creator & Coach'
    }
  ];

  return (
    <section id="results" className="py-24 relative overflow-hidden bg-[#080B13]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-emerald-400" />
            <span>Proven Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            Case Studies That Speak in Cold, Hard Revenue.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Real clients. Verifiable metrics. We don't settle for "impressions"—we engineer profitable market dominance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-[#0E1321] border border-white/10 hover:border-purple-500/50 p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-purple-500/10 group"
            >
              <div>
                {/* Top badges */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[11px] font-medium text-slate-300">
                    {item.tag}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-bold text-emerald-300">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-white group-hover:text-purple-300 transition-colors mb-1">
                  {item.client}
                </h3>
                <p className="text-xs font-medium text-purple-400 mb-6">
                  {item.category}
                </p>

                {/* Key Bullet Results */}
                <div className="space-y-3 mb-8">
                  {item.results.map((res, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Metric Stat Card */}
              <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">
                    {item.metricLabel}
                  </span>
                  <p className="text-2xl font-display font-extrabold text-white">
                    {item.metricNumber}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Efficiency</span>
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
