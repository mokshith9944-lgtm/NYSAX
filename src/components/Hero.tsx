import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Mail, 
  CheckCircle2,
  BarChart3,
  Star,
  Users
} from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenAudit: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenAudit }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="radial-glow-top" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-cyan-500/10 blur-[110px] rounded-full pointer-events-none -z-10" />
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-7">
          {/* Availability & Social Pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 pr-4 rounded-full bg-slate-900/90 border border-purple-500/30 backdrop-blur-xl shadow-xl shadow-purple-500/5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-slate-200">
              ⚡ Now Onboarding 2 Select Growth Partners for Q3/Q4
            </span>
            <span className="hidden sm:inline-block text-slate-600">•</span>
            <a
              href="https://www.instagram.com/nysax.agency?stkn=MXdycDVzN3lqc2tqZA=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>@nysax.agency</span>
            </a>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight leading-[1.08] text-white">
            Scale Predictably.{' '}
            <span className="text-gradient-purple">
              Dominate Organically.
            </span>{' '}
            Convert Relentlessly.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 font-normal max-w-3xl mx-auto leading-relaxed">
            NYSAX is the full-stack growth agency engineering exponential revenue for modern brands. 
            From <span className="text-white font-medium">SEO optimization</span> and <span className="text-white font-medium">high-converting website design</span> to <span className="text-white font-medium">sales strategy</span>, <span className="text-white font-medium">automated email marketing</span>, and dedicated <span className="text-cyan-400 font-medium">zero-to-hero social media marketing for beginners</span>.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-sm tracking-wide shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
            >
              <span>Book 30-Min Growth Strategy Call</span>
              <ArrowRight className="w-4 h-4 text-cyan-200 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenAudit}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-purple-500/50 font-semibold text-sm transition-all flex items-center justify-center gap-2.5 backdrop-blur-md shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Get Free 7-Point Audit</span>
            </button>
          </div>

          {/* Guaranteed Value Bullets */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero Long-Term Lock-in Contracts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Guaranteed Deliverables & Timeline</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Direct Strategic Slack / WhatsApp Access</span>
            </div>
          </div>
        </div>

        {/* Live Metrics Showcase Banner */}
        <div className="mt-16 sm:mt-20 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-cyan-500/5 to-purple-500/5 pointer-events-none" />

            <div className="text-center p-3 relative">
              <div className="flex items-center justify-center gap-1.5 text-purple-400 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Avg. ROAS</span>
              </div>
              <p className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">4.8x</p>
              <p className="text-xs text-slate-400 mt-1">Paid ad efficiency multiplier</p>
            </div>

            <div className="text-center p-3 relative border-l border-white/[0.08]">
              <div className="flex items-center justify-center gap-1.5 text-cyan-400 mb-1">
                <BarChart3 className="w-4 h-4" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Revenue Driven</span>
              </div>
              <p className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">$14.2M+</p>
              <p className="text-xs text-slate-400 mt-1">Direct client pipeline value</p>
            </div>

            <div className="text-center p-3 relative border-t md:border-t-0 md:border-l border-white/[0.08]">
              <div className="flex items-center justify-center gap-1.5 text-indigo-400 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Social Reach</span>
              </div>
              <p className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">48M+</p>
              <p className="text-xs text-slate-400 mt-1">Organic video views & clicks</p>
            </div>

            <div className="text-center p-3 relative border-t md:border-t-0 md:border-l border-white/[0.08]">
              <div className="flex items-center justify-center gap-1.5 text-emerald-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Client Retention</span>
              </div>
              <p className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">98.2%</p>
              <p className="text-xs text-slate-400 mt-1">Month-over-month partner rate</p>
            </div>
          </div>
        </div>

        {/* Agency Quick Info Strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-purple-400" />
            Direct Email: <a href="mailto:nysaxofficial@gmail.com" className="text-slate-200 hover:text-purple-300 font-medium underline underline-offset-4">nysaxofficial@gmail.com</a>
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
