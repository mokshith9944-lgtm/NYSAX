import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  const leadership = [
    {
      name: 'Nikhil',
      role: 'Founder & Principal Architect',
      focus: 'Enterprise Systems, Creative Direction & Conversion Engineering',
      bio: 'Steers overarching agency strategy and technical architecture, translating brand visions into scalable, high-conversion web ecosystems.'
    },
    {
      name: 'Mokshith',
      role: 'Co-Founder & Growth Strategist',
      focus: 'Performance Acquisition & Brand Scale',
      bio: 'Orchestrates full-funnel quantitative performance systems and client acquisition operations with relentless precision.'
    },
    {
      name: 'Amaresh',
      role: 'Co-Founder & Operational Lead',
      focus: 'Operational Excellence & Client Delivery',
      bio: 'Directs operational delivery workflows, enterprise client relations, and multi-channel project execution standard.'
    }
  ];

  return (
    <section id="about" className="bg-black/90 border-t border-b border-neutral-900 py-24 text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Label */}
        <div className="flex items-center space-x-3 mb-8">
          <span className="w-8 h-[1px] bg-white"></span>
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-400">
            About Nysa Agency // Architecture & Leadership
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-16 mb-20">
          {/* Left Headline */}
          <div className="lg:w-5/12">
            <h2 className="text-white text-4xl sm:text-5xl font-light leading-tight tracking-tight uppercase">
              Precision Engineering & <span className="text-neutral-400">Brand Dominance</span>
            </h2>
          </div>

          {/* Right Description & Pillars */}
          <div className="lg:w-6/12 space-y-6 text-neutral-300 font-light leading-relaxed text-sm sm:text-base">
            <p className="text-white text-lg font-normal leading-relaxed">
              Nysa Agency operates at the intersection of high-concept editorial aesthetics and quantitative revenue infrastructure.
            </p>
            <p className="text-neutral-400">
              We reject cosmetic fluff and bloated vanity metrics. Every line of code, technical audit, and creative asset is deployed with singular intent: engineering unassailable category dominance for visionary enterprises.
            </p>

            {/* Quick Metrics in Sharp 0px Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-800 font-mono">
              <div className="border border-neutral-800 p-4 rounded-none bg-neutral-950/40">
                <p className="text-2xl sm:text-3xl font-normal text-white">$14.2M+</p>
                <p className="text-[10px] uppercase tracking-widest text-neutral-500 mt-1">Client Revenue</p>
              </div>
              <div className="border border-neutral-800 p-4 rounded-none bg-neutral-950/40">
                <p className="text-2xl sm:text-3xl font-normal text-white">4.8x</p>
                <p className="text-[10px] uppercase tracking-widest text-neutral-500 mt-1">Average ROAS</p>
              </div>
              <div className="border border-neutral-800 p-4 rounded-none bg-neutral-950/40">
                <p className="text-2xl sm:text-3xl font-normal text-white">98.2%</p>
                <p className="text-[10px] uppercase tracking-widest text-neutral-500 mt-1">Client Retention</p>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Roster */}
        <div className="mt-16 pt-12 border-t border-neutral-900">
          <div className="mb-10">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">
              Executive Leadership
            </p>
            <h3 className="text-2xl font-light uppercase tracking-tight text-white mt-1">
              Founders & Principals
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadership.map((leader) => (
              <div
                key={leader.name}
                className="border border-neutral-800 bg-neutral-950/60 p-6 rounded-none flex flex-col justify-between hover:border-neutral-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 border border-neutral-800 px-2 py-0.5">
                      Partner
                    </span>
                    <span className="text-xs font-mono text-neutral-600">0{leadership.indexOf(leader) + 1}</span>
                  </div>
                  <h4 className="text-xl font-normal uppercase tracking-wide text-white">
                    {leader.name}
                  </h4>
                  <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider mt-1">
                    {leader.role}
                  </p>
                  <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest mt-2">
                    {leader.focus}
                  </p>
                  <p className="text-xs text-neutral-400 mt-4 leading-relaxed font-light">
                    {leader.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-start">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 bg-white text-black text-xs font-mono uppercase tracking-widest hover:bg-neutral-200 transition-colors rounded-none flex items-center space-x-2 cursor-pointer"
            >
              <span>Initiate Executive Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
