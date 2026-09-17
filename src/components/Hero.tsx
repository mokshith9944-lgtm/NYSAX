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
      {/* Authentic TailGrids NexStudio Hero (MS) */}
      <section className="lg:pt-28 lg:pb-16 pt-16 pb-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl text-center mx-auto">
            {/* Live Studio Availability Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-gray-200 bg-[#FBFBFB] text-xs font-mono text-gray-700 mb-8 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span className="uppercase tracking-wider">NYSAX Creative & Growth Studio</span>
              <span className="text-gray-300">|</span>
              <a
                href="https://www.instagram.com/nysax.agency?stkn=MXdycDVzN3lqc2tqZA=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors font-medium flex items-center gap-1"
              >
                <span>@nysax.agency</span>
              </a>
            </div>

            {/* Signature NexStudio Headline with Serif Italic Accent */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal -tracking-[2.88px] mb-6 text-black leading-[1.08]">
              We Scale <span className="italic font-serif">Digital Brands</span> That Dominate.
            </h1>

            {/* Subtitle */}
            <p className="mb-10 text-gray-600 text-lg sm:text-xl leading-relaxed -tracking-[0.2px] max-w-2xl mx-auto font-normal">
              From organic SEO dominance and high-converting web design to high-ticket sales strategies, automated email retention, and social media incubation for beginners.
            </p>

            {/* NexStudio Pill Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="#services"
                className="group px-7 py-4 flex gap-2 items-center bg-black text-sm font-medium -tracking-[0.2px] leading-5 text-white rounded-full hover:bg-gray-800 transition-all duration-300 shadow-sm cursor-pointer"
              >
                <span>EXPLORE SERVICES</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>

              <button
                onClick={onOpenBooking}
                className="group px-7 py-4 inline-flex gap-2 items-center bg-white border border-black text-sm font-medium -tracking-[0.2px] leading-5 text-black rounded-full hover:bg-gray-100 transition-all duration-300 cursor-pointer"
              >
                <span>BOOK STRATEGY CALL</span>
              </button>

              <button
                onClick={onOpenAudit}
                className="text-xs uppercase font-mono tracking-wider text-gray-500 hover:text-black underline underline-offset-4 py-2 px-3 transition-colors cursor-pointer"
              >
                Free 7-Point Audit →
              </button>
            </div>

            {/* Proof Badges */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-black text-sm font-sans">$14.2M+</span>
                <span>Revenue Driven</span>
              </div>
              <span className="text-gray-300 hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-black text-sm font-sans">4.8x</span>
                <span>Average ROAS</span>
              </div>
              <span className="text-gray-300 hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-black text-sm font-sans">98.2%</span>
                <span>Client Retention</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authentic TailGrids NexStudio Infinite Client Logo Ticker (md) */}
      <section className="border-y border-gray-200 bg-[#FBFBFB] py-8 overflow-hidden">
        <div className="mx-auto max-w-[1440px]">
          <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:linear-gradient(to_right,transparent_0,black_128px,black_calc(100%-128px),transparent_100%)]">
            <div className="flex items-center gap-12 whitespace-nowrap animate-infinite-scroll">
              {[...partnerBrands, ...partnerBrands, ...partnerBrands].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="flex items-center gap-3 text-gray-500 hover:text-black transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-gray-300" />
                  <span className="font-semibold text-sm tracking-tight font-sans text-black">{partner.name}</span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
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
