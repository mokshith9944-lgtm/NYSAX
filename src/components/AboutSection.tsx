import React from 'react';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="bg-black py-20 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          {/* Left Headline */}
          <div className="lg:w-5/12">
            <h2 className="text-white text-4xl sm:text-5xl font-normal leading-tight">
              A Team of Builders & <span className="italic font-serif text-gray-300">Dominance Architects</span>
            </h2>
          </div>

          {/* Right Description & Pillars */}
          <div className="lg:w-6/12">
            <p className="text-white text-xl mb-5 font-normal leading-relaxed">
              We combine elite creative storytelling with quantitative revenue architecture to build brand ecosystems that dominate.
            </p>
            <p className="text-white/60 leading-relaxed">
              <span className="text-white font-medium">From ambitious startups to global category leaders</span> — we turn underperforming websites into sales machines, silence into organic search dominance, and ad spend into compounding enterprise value.
            </p>

            {/* Quick Metrics in Dark Container */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-neutral-800">
              <div>
                <p className="text-3xl font-semibold text-white font-sans">$14.2M+</p>
                <p className="text-xs uppercase font-mono tracking-wider text-neutral-400 mt-1">Client Revenue</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-white font-sans">4.8x</p>
                <p className="text-xs uppercase font-mono tracking-wider text-neutral-400 mt-1">Average ROAS</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-white font-sans">98.2%</p>
                <p className="text-xs uppercase font-mono tracking-wider text-neutral-400 mt-1">Retention Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
