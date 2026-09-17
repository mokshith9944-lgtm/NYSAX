import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Mail, 
  CheckCircle2,
  BarChart3,
  Star,
  Users,
  Award,
  Zap
} from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenAudit: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenAudit }) => {
  // Client partners for the NexStudio infinite logo ticker
  const partnerBrands = [
    { name: 'Shopify Plus', category: 'eCommerce' },
    { name: 'Google Ads', category: 'Search Dominance' },
    { name: 'Meta Business', category: 'Social Paid' },
    { name: 'Klaviyo Elite', category: 'Retention Flows' },
    { name: 'Stripe', category: 'Payments' },
    { name: 'TikTok Ads', category: 'Viral Creative' },
    { name: 'HubSpot', category: 'CRM & Pipeline' },
    { name: 'Amazon Ads', category: 'Marketplace' },
  ];

  return (
    <>
      {/* High-End Editorial Hero with 0px Border-Radius */}
      <section className="lg:pt-32 lg:pb-20 pt-20 pb-12 bg-transparent text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl text-center mx-auto">
            {/* Live Studio Status Badge - Sharp 0px */}
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-none border border-neutral-800 bg-black/60 backdrop-blur-xs text-[11px] font-mono text-neutral-300 mb-8">
              <span className="w-1.5 h-1.5 rounded-none bg-white animate-pulse" />
              <span className="uppercase tracking-[0.2em]">Nysa Agency // Growth & Engineering Studio</span>
              <span className="text-neutral-700">|</span>
              <a
                href="https://www.instagram.com/nysax.agency?stkn=MXdycDVzN3lqc2tqZA=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors font-medium flex items-center gap-1 text-neutral-400"
              >
                <span>@nysax.agency</span>
              </a>
            </div>

            {/* Editorial Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight mb-6 text-white uppercase leading-[1.05]">
              Architecting Brands That <span className="font-serif italic font-normal text-neutral-400 lowercase">dominate</span>
            </h1>

            {/* Subtitle */}
            <p className="mb-10 text-neutral-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-light">
              From organic search infrastructure and conversion-engineered web architecture to automated enterprise retention and high-ticket customer acquisition systems.
            </p>

            {/* Editorial Sharp 0px Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-black text-xs font-mono uppercase tracking-widest hover:bg-neutral-200 transition-colors rounded-none flex items-center justify-center space-x-2 cursor-pointer border border-white"
              >
                <span>Schedule Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-3.5 bg-black/80 text-white text-xs font-mono uppercase tracking-widest hover:bg-neutral-900 transition-colors rounded-none flex items-center justify-center border border-neutral-800 cursor-pointer"
              >
                <span>Submit Brief</span>
              </a>

              <button
                onClick={onOpenAudit}
                className="w-full sm:w-auto px-6 py-3.5 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors rounded-none border border-transparent hover:border-neutral-800 cursor-pointer"
              >
                Diagnostic Audit →
              </button>
            </div>

            {/* Proof Indicators - Sharp 0px */}
            <div className="mt-14 pt-8 border-t border-neutral-900 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-mono text-neutral-400 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <span className="font-normal text-white text-sm font-mono">$14.2M+</span>
                <span>Revenue Driven</span>
              </div>
              <span className="text-neutral-800 hidden sm:inline">/</span>
              <div className="flex items-center gap-2">
                <span className="font-normal text-white text-sm font-mono">4.8x</span>
                <span>Average ROAS</span>
              </div>
              <span className="text-neutral-800 hidden sm:inline">/</span>
              <div className="flex items-center gap-2">
                <span className="font-normal text-white text-sm font-mono">98.2%</span>
                <span>Client Retention</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Client Logo Ticker - Sharp 0px Monochrome */}
      <section className="border-y border-neutral-900 bg-black/70 backdrop-blur-xs py-5 overflow-hidden">
        <div className="mx-auto max-w-[1440px]">
          <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:linear-gradient(to_right,transparent_0,black_128px,black_calc(100%-128px),transparent_100%)]">
            <div className="flex items-center gap-12 whitespace-nowrap animate-infinite-scroll">
              {[...partnerBrands, ...partnerBrands, ...partnerBrands].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="flex items-center gap-3 text-neutral-500 hover:text-white transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-none bg-neutral-700" />
                  <span className="font-normal text-xs uppercase tracking-wider font-mono text-neutral-300">{partner.name}</span>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 border border-neutral-800 px-2 py-0.5 rounded-none">
                    {partner.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
