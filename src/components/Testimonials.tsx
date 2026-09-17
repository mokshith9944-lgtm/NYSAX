import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Alexander Cross',
      role: 'Founder & CEO',
      company: 'Aura Luxe Skincare',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      text: 'NYSAX completely rebuilt our website and email automations. Within 60 days, our Klaviyo flows went from generating 8% of revenue to over 34%. They are responsive, surgical, and understand customer psychology deeply.',
      rating: 5,
      highlight: '34% of revenue on autopilot'
    },
    {
      name: 'Julian Montgomery',
      role: 'Head of Growth',
      company: 'Apex SaaS Labs',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      text: 'Our organic search visibility was practically non-existent. The NYSAX team mapped out our entire SEO keyword clustering strategy and fixed our technical Core Web Vitals. Today we rank #1 for 14 primary keywords.',
      rating: 5,
      highlight: '#1 rankings on 14 keywords'
    },
    {
      name: 'Sofia Calderon',
      role: 'Creator & Coach',
      company: 'Calderon Mindset Media',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      text: 'As an absolute beginner to social media marketing, I was terrified of Reels and the algorithm. NYSAX guided me step-by-step through their Newbies incubator. My third video reached 840,000 views and booked out my program!',
      rating: 5,
      highlight: '840k views as a beginner'
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#070A11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
            <span>Client Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            Trusted By High-Velocity Brands & Founders.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Read what partners say about working with NYSAX across our core marketing disciplines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#0D1220] border border-white/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between shadow-xl relative group"
            >
              <div className="space-y-4">
                {/* Stars and quote badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-purple-500/30 group-hover:text-purple-500/60 transition-colors" />
                </div>

                <div className="inline-block px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
                  "{r.highlight}"
                </div>

                <p className="text-slate-300 text-xs leading-relaxed italic">
                  "{r.text}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-6 border-t border-white/[0.08] flex items-center gap-3.5 mt-6">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-11 h-11 rounded-full object-cover border border-purple-500/30"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-white text-xs">{r.name}</p>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <p className="text-[11px] text-slate-400">{r.role} • {r.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
