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
  // Brand partners for the NexStudio infinite logo ticker
  const partnerBrands = [
    { name: 'Shopify Plus', icon: '🛍️' },
    { name: 'Google Partner', icon: '🌐' },
    { name: 'Meta Business', icon: '♾️' },
    { name: 'Klaviyo Elite', icon: '✉️' },
    { name: 'Stripe Verified', icon: '💳' },
    { name: 'TikTok Ads', icon: '📱' },
    { name: 'HubSpot Inbound', icon: '📈' },
    { name: 'Amazon Ads', icon: '📦' }
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-background">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-primary/10 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-accent-cyan/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      {/* Background grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-7">
          {/* NexStudio Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-blue-300 text-xs font-semibold backdrop-blur-md shadow-lg shadow-primary/10">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            <span className="w-2 h-2 -ml-3.5 rounded-full bg-primary"></span>
            <span>Next-Gen Performance Marketing & Creative Studio</span>
            <span className="text-slate-600">•</span>
            <a
              href="https://www.instagram.com/nysax.agency?stkn=MXdycDVzN3lqc2tqZA=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-blue-300 hover:text-white transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>@nysax.agency</span>
            </a>
          </div>

          {/* Main Headline - NexStudio Style */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight leading-[1.08] text-white">
            We Craft High-Growth{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">
              Digital Systems
            </span>{' '}
            That Scale Brands.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 font-normal max-w-3xl mx-auto leading-relaxed">
            NYSAX is the modern growth agency helping founders dominate markets. 
            We specialize in <span className="text-white font-semibold">SEO optimization</span>, <span className="text-white font-semibold">high-converting website design</span>, <span className="text-white font-semibold">sales strategy</span>, <span className="text-white font-semibold">automated email marketing</span>, and our signature <span className="text-amber-300 font-semibold">zero-to-hero incubator for social media beginners</span>.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm tracking-wide shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
            >
              <span>Book 30-Min Discovery Call</span>
              <ArrowRight className="w-4 h-4 text-blue-200 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenAudit}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#0D1527] hover:bg-[#121c33] text-slate-200 hover:text-white border border-white/10 hover:border-primary/50 font-semibold text-sm transition-all flex items-center justify-center gap-2.5 backdrop-blur-md shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Claim Free 7-Point Audit</span>
            </button>
          </div>

          {/* Social Proof Avatar Stack */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-400">
            <div className="flex -space-x-2 overflow-hidden">
              {[
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80'
              ].map((img, i) => (
                <img
                  key={i}
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#070C18] object-cover"
                  src={img}
                  alt="Client avatar"
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-white">4.9/5 Rating</span>
              <span className="text-slate-500">from 120+ Founders & Growth Leads</span>
            </div>
          </div>
        </div>

        {/* NexStudio Client Partner Logo Marquee */}
        <div className="mt-16 pt-8 border-t border-white/[0.08]">
          <p className="text-center text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-6">
            Ecosystem Integrations & Certified Growth Partner Platforms
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-70 hover:opacity-100 transition-opacity">
            {partnerBrands.map((brand, bIdx) => (
              <div
                key={bIdx}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0D1527]/60 border border-white/[0.06] text-xs font-semibold text-slate-300 shadow-sm"
              >
                <span>{brand.icon}</span>
                <span>{brand.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* NexStudio Metric Counter Cards */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-[#0D1527]/80 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 text-primary mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Avg. ROAS</span>
              </div>
              <p className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">4.8x</p>
              <p className="text-xs text-slate-400 mt-1">Paid ad multiplier</p>
            </div>

            <div className="p-3 text-center border-l border-white/[0.08]">
              <div className="flex items-center justify-center gap-1.5 text-cyan-400 mb-1">
                <BarChart3 className="w-4 h-4" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Revenue Driven</span>
              </div>
              <p className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">$14.2M+</p>
              <p className="text-xs text-slate-400 mt-1">Direct client pipeline</p>
            </div>

            <div className="p-3 text-center border-t md:border-t-0 md:border-l border-white/[0.08]">
              <div className="flex items-center justify-center gap-1.5 text-indigo-400 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Organic Reach</span>
              </div>
              <p className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">48M+</p>
              <p className="text-xs text-slate-400 mt-1">Video views & search clicks</p>
            </div>

            <div className="p-3 text-center border-t md:border-t-0 md:border-l border-white/[0.08]">
              <div className="flex items-center justify-center gap-1.5 text-emerald-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Retention</span>
              </div>
              <p className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">98.2%</p>
              <p className="text-xs text-slate-400 mt-1">Client satisfaction rate</p>
            </div>
          </div>
        </div>

        {/* Agency Quick Contact Strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            Direct Email: <a href="mailto:nysaxofficial@gmail.com" className="text-slate-200 hover:text-primary font-medium underline underline-offset-4">nysaxofficial@gmail.com</a>
          </span>
          <span className="hidden sm:inline text-slate-700">•</span>
          <span className="flex items-center gap-2">
            <InstagramIcon className="w-4 h-4 text-pink-400" />
            Official Instagram: <a href="https://www.instagram.com/nysax.agency?stkn=MXdycDVzN3lqc2tqZA==" target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-pink-300 font-medium underline underline-offset-4">@nysax.agency</a>
          </span>
        </div>
      </div>
    </section>
  );
};
