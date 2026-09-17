import React, { useState } from 'react';
import { 
  Search, 
  Layout, 
  Target, 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Compass, 
  Zap, 
  Clock, 
  TrendingUp,
  Layers,
  ChevronRight
} from 'lucide-react';
import { ServiceDetail } from '../types';

interface ServicesProps {
  onOpenBooking: () => void;
  onOpenAudit: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenBooking, onOpenAudit }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const services: ServiceDetail[] = [
    {
      id: 'seo',
      title: 'SEO Optimization & Organic Dominance',
      shortDesc: 'Drive high-intent buyer traffic and rank #1 on Google without paying per click.',
      fullDesc: 'We dismantle your competitors keyword rankings with technical audits, semantic content clusters, high-authority digital PR backlinks, and Core Web Vitals optimization to turn Google into your #1 automated customer acquisition channel.',
      iconName: 'Search',
      features: [
        'Full Technical Site Audit & Core Web Vitals Speed Tuning',
        'Buyer-Intent Keyword Research & Competitor Gap Analysis',
        'Semantic Content Clustering & Programmatic Pillar Architecture',
        'High-Authority Digital PR & Editorial White-Hat Backlinks',
        'Google Business Profile & Local Search Domination'
      ],
      metrics: '+280% Avg. Organic Traffic within 90 Days',
      timeline: '4 - 12 Weeks to Compound',
      deliverables: [
        'Complete Technical SEO Roadmap',
        'Keyword Mapping & Content Calendar',
        'Monthly Live Ranking & Backlink Dashboard',
        'On-Page Optimization of Core Landing Pages'
      ],
      idealFor: 'Businesses tired of rising ad costs wanting compounding organic traffic.'
    },
    {
      id: 'website',
      title: 'High-Converting Website Design & Funnels',
      shortDesc: 'Bespoke, lightning-fast web experiences engineered specifically to turn visitors into paying clients.',
      fullDesc: 'A website should not merely look pretty—it must function as your hardest working 24/7 salesperson. We craft custom, high-velocity websites with psychological conversion architecture, interactive visual storytelling, and ultra-slick mobile experiences.',
      iconName: 'Layout',
      features: [
        'Psychology-Driven UX Wireframing & Responsive Visual Design',
        'Ultra-Fast Performance Architecture (< 1s Load Time)',
        'Conversion Rate Optimization (CRO) & A/B Funnel Split-Testing',
        'Custom Animations, Micro-Interactions & Interactive Calculators',
        'Seamless CRM, Payment & Analytics Tracking Integration'
      ],
      metrics: '3.4x Average Conversion Rate Increase',
      timeline: '2 - 4 Weeks Turnaround',
      deliverables: [
        'Complete Figma Design Prototype',
        'Fully Responsive Web Application / Storefront',
        'Automated Lead Capture & Booking Integrations',
        'Full Admin Content Management Capabilities'
      ],
      idealFor: 'Brands looking to establish instant prestige and convert traffic with high efficiency.'
    },
    {
      id: 'sales_strategy',
      title: 'Sales Strategy & Revenue Architecture',
      shortDesc: 'Systematize your sales pipeline, close high-ticket clients, and eliminate revenue plateaus.',
      fullDesc: 'We analyze your entire customer acquisition funnel, craft irresistible offers, structure high-ticket sales pipelines, and write battle-tested closing scripts so your team closes leads with predictable consistency.',
      iconName: 'Target',
      features: [
        'High-Ticket Offer Structuring & Pricing Optimization',
        'Outbound & Inbound Lead Qualification Systems',
        'Battle-Tested Closing Scripts & Objection Handling Playbooks',
        'CRM Pipeline Automation & Follow-Up Workflows',
        'Sales Rep Coaching & Performance KPI Dashboards'
      ],
      metrics: '+62% Discovery-to-Close Conversion Rate',
      timeline: '2 - 3 Weeks Setup',
      deliverables: [
        'Custom Sales Playbook & Objection Bible',
        'Automated CRM Lead Pipeline & Scoring Rules',
        'Recorded Script Roleplays & Training Modules',
        'Weekly Pipeline Review & Optimization Sprints'
      ],
      idealFor: 'Service businesses, consultants, and B2B companies looking to close higher ticket deals.'
    },
    {
      id: 'email_marketing',
      title: 'Automated Email Marketing & Retention',
      shortDesc: 'Generate 30%+ of your total revenue on autopilot with high-converting lifecycle flows.',
      fullDesc: 'Stop leaving money on the table. We build bulletproof automated email flows and high-engagement broadcast campaigns that nurture subscribers into repeat, high-LTV buyers without ever being flagged as spam.',
      iconName: 'Mail',
      features: [
        'High-Converting Welcome & Indoctrination Sequences',
        'Abandoned Cart, Checkout & Browse Recovery Automations',
        'VIP Customer Retention, Cross-Sell & Win-Back Funnels',
        'Deliverability Health & Inbox Placement Optimization',
        'Engaging Storytelling Broadcasts & Promo Launches'
      ],
      metrics: '34% - 46% of Total Revenue Generated via Email',
      timeline: '10 - 14 Days to Launch',
      deliverables: [
        'Up to 8 Custom Automated Email Flows',
        'Branded Responsive Email Templates',
        'Segmentation Matrix & List Hygiene Overhaul',
        'Bi-Weekly Campaign Strategy & Copy Deliverables'
      ],
      idealFor: 'eCommerce stores, creators, and brands seeking reliable predictable recurring revenue.'
    },
    {
      id: 'social_media_newbies',
      title: 'Newbies in Social Media Marketing (Zero-to-Hero)',
      shortDesc: 'A specialized incubator for beginners to build an influential, profitable social presence from scratch.',
      fullDesc: 'New to social media marketing? Overwhelmed by algorithms, Reels, TikTok, and hashtags? We take absolute beginners by the hand and build a magnetic personal or business brand on Instagram and TikTok from ground zero to consistent viral reach and engaged followers.',
      iconName: 'Sparkles',
      features: [
        'Zero-to-Hero Profile Makeover (Bio, Highlight Covers, Aesthetic Grid)',
        'Viral Short-Form Scripting (Reels & TikTok 3-Second Hook Formulas)',
        'Beginner-Friendly Content Creation Calendar & Trend Alerts',
        'Algorithm Growth Playbook (Hashtag strategy, audio timing, engagement loops)',
        'Follower-to-Customer Conversion Funnels (DM Automation & Link-in-Bio)'
      ],
      metrics: 'From 0 to 10k+ Engaged Followers in 60-90 Days',
      timeline: 'Immediate 30-Day Guided Launch',
      deliverables: [
        '30-Day Plug-and-Play Viral Content Calendar',
        '15 Custom Written Reel/TikTok Video Scripts',
        'Step-by-Step Mobile Filming & Editing Guide',
        'Weekly 1-on-1 Strategy & Algorithm Check-in Calls'
      ],
      idealFor: 'New business owners, beginners, and entrepreneurs starting with zero social media experience.'
    }
  ];

  const filteredServices = activeTab === 'all' 
    ? services 
    : services.filter(s => s.id === activeTab);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'seo': return <Search className="w-6 h-6 text-purple-400" />;
      case 'website': return <Layout className="w-6 h-6 text-cyan-400" />;
      case 'sales_strategy': return <Target className="w-6 h-6 text-indigo-400" />;
      case 'email_marketing': return <Mail className="w-6 h-6 text-pink-400" />;
      case 'social_media_newbies': return <Sparkles className="w-6 h-6 text-amber-400" />;
      default: return <Zap className="w-6 h-6 text-purple-400" />;
    }
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-600/10 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>Our Core Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            Full-Spectrum Growth Services Engineered For Impact.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            We don't offer generic vanity metrics. Every service is a synchronized growth engine designed to drive revenue, authority, and compounding digital leverage.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            All 5 Services
          </button>
          {services.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveTab(s.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === s.id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{s.title.split('&')[0].trim()}</span>
              {s.id === 'social_media_newbies' && (
                <span className="px-1.5 py-0.2 text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded uppercase font-bold">
                  Hot
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`p-7 rounded-3xl bg-[#0D121F]/80 border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 hover:shadow-2xl ${
                service.id === 'social_media_newbies'
                  ? 'border-amber-500/30 hover:border-amber-500/60 hover:shadow-amber-500/10'
                  : 'border-white/10 hover:border-purple-500/50 hover:shadow-purple-500/10'
              }`}
            >
              <div>
                {/* Card Header & Icon */}
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getServiceIcon(service.id)}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.06]">
                    {service.timeline}
                  </span>
                </div>

                {/* Badge if Social Media Newbies */}
                {service.id === 'social_media_newbies' && (
                  <div className="mb-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    Dedicated Beginner Incubator
                  </div>
                )}

                {/* Title & Short Description */}
                <h3 className="text-xl font-display font-bold text-white mb-2.5 group-hover:text-purple-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed mb-5">
                  {service.shortDesc}
                </p>

                {/* Key Deliverable Features */}
                <div className="space-y-2 mb-6 border-t border-white/[0.06] pt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    What's Included:
                  </p>
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer with Metric and CTA */}
              <div className="pt-5 border-t border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Target Outcome:</span>
                  <span className="font-semibold text-emerald-400">{service.metrics}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onOpenBooking}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-white/[0.06] hover:bg-purple-600 hover:text-white border border-white/10 hover:border-purple-500 text-xs font-semibold text-slate-200 transition-all flex items-center justify-center gap-1.5 group/btn"
                  >
                    <span>Get Started</span>
                    <ChevronRight className="w-3.5 h-3.5 text-purple-400 group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                  <button
                    onClick={onOpenAudit}
                    className="py-2.5 px-3 rounded-xl bg-transparent hover:bg-white/[0.06] border border-white/[0.08] text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
                    title="Audit this service"
                  >
                    Audit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner for Custom Inquiries */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-900/30 via-slate-900/60 to-cyan-900/30 border border-purple-500/20 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-display font-bold text-white">Need a Multi-Channel Customized Growth Retainer?</h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Combine SEO, bespoke Web Design, Sales Architecture, Email Flows, and Social Growth under one unified growth team.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenBooking}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-purple-500/20 transition-all flex items-center gap-2"
            >
              <span>Build Custom Package</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
