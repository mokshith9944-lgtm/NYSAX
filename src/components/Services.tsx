import React, { useState } from 'react';
import { ChevronDown, ArrowUpRight, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { ServiceDetail } from '../types';

interface ServicesProps {
  onOpenBooking: () => void;
  onOpenAudit: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenBooking, onOpenAudit }) => {
  const [expandedId, setExpandedId] = useState<string | null>('seo');

  const services: (ServiceDetail & { number: string })[] = [
    {
      id: 'seo',
      number: '01',
      title: 'SEO Optimization',
      shortDesc: 'Drive high-intent buyer traffic and rank #1 on Google organically without recurring ad spend.',
      fullDesc: 'We dismantle your competitors keyword rankings with technical audits, semantic content clusters, high-authority digital PR backlinks, and Core Web Vitals optimization to turn Google into your #1 automated customer acquisition channel.',
      iconName: 'Search',
      features: [
        'Full Technical Site Audit & Core Web Vitals Speed Tuning',
        'Buyer-Intent Keyword Research & Competitor Gap Analysis',
        'Semantic Content Clustering & Programmatic Pillar Architecture',
        'High-Authority Digital PR & Editorial White-Hat Backlinks',
        'Google Business Profile & Local Search Domination'
      ],
      metrics: '+280% Avg. Organic Traffic in 90 Days',
      timeline: '4 - 12 Weeks to Compound',
      deliverables: [
        'Complete Technical SEO Roadmap',
        'Keyword Mapping & Content Calendar',
        'Monthly Live Ranking & Backlink Dashboard',
        'On-Page Optimization of Core Landing Pages'
      ],
      idealFor: 'Brands looking for permanent organic dominance and reduced customer acquisition costs.'
    },
    {
      id: 'website',
      number: '02',
      title: 'Website Design & Funnels',
      shortDesc: 'Bespoke, sub-second load web platforms engineered to convert traffic into high-value clients.',
      fullDesc: 'A website should not merely look pretty—it must function as your hardest working 24/7 salesperson. We craft custom, high-velocity websites with psychological conversion architecture, interactive visual storytelling, and ultra-slick mobile experiences.',
      iconName: 'Layout',
      features: [
        'Psychology-Driven UX Wireframing & Responsive Visual Design',
        'Ultra-Fast Performance Architecture (< 1s Load Time)',
        'Conversion Rate Optimization (CRO) & A/B Funnel Split-Testing',
        'Custom Animations, Micro-Interactions & Interactive Simulators',
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
      idealFor: 'Companies with outdated websites leaking high-intent leads.'
    },
    {
      id: 'sales',
      number: '03',
      title: 'Sales Strategy Architecture',
      shortDesc: 'End-to-end revenue engineering, pipeline qualification, and high-ticket closing playbooks.',
      fullDesc: 'Traffic without sales infrastructure is wasted capital. We architect end-to-end sales mechanisms: high-ticket offer restructuring, value proposition positioning, multi-touch nurture sequences, objection bibles, and inbound lead qualification engines.',
      iconName: 'Target',
      features: [
        'Irresistible High-Ticket Offer Design & Pricing Restructuring',
        'Inbound Pipeline Routing & Automated CRM Qualification',
        'Sales Rep Scripting, Battle Cards & Objection Overcoming Playbooks',
        'Multi-Channel Deal Acceleration Sequences (SMS, Email, Calls)',
        'Pipeline Stage Conversion Analytics & Leakage Diagnosis'
      ],
      metrics: '+$18,500 Avg. Deal Size Expansion',
      timeline: '2 - 3 Weeks Deployment',
      deliverables: [
        'Proprietary High-Ticket Offer Canvas',
        'Automated Lead Scoring Matrix',
        'Full Sales Scripting & Objection Bible',
        'Weekly Deal Review & Conversion Coaching'
      ],
      idealFor: 'B2B companies, agencies, and service providers looking to scale deal velocity.'
    },
    {
      id: 'email',
      number: '04',
      title: 'Automated Email Marketing',
      shortDesc: 'High-converting lifecycle retention flows turning subscribers into repeat buyers on autopilot.',
      fullDesc: 'Email delivers an average $42 ROI for every $1 spent. We architect automated Klaviyo and Omnisend lifecycle engines, behavioral trigger sequences, segmentation trees, and deliverability protocols that consistently extract 30%+ of your total revenue from your owned list.',
      iconName: 'Mail',
      features: [
        'Core 8-Part Lifecycle Automation (Welcome, Browse/Cart Abandon, VIP, Winback)',
        'Advanced RFM (Recency, Frequency, Monetary) Customer Segmentation',
        'Plaintext & Editorial Branded Copywriting with High-CTR Hooks',
        'Inbox Deliverability Defense (SPF, DKIM, DMARC, Domain Warmup)',
        'Comprehensive A/B Subject Line & Send-Time Machine Optimization'
      ],
      metrics: '34.8% of Total Brand Revenue via Email',
      timeline: '10 Days to Live Flows',
      deliverables: [
        '8 Fully Automated Lifecycle Flows',
        'Segmented Customer Database Architecture',
        'Bi-Weekly High-Converting Campaign Blasts',
        'Real-Time Revenue Attribution Dashboard'
      ],
      idealFor: 'eCommerce stores and digital brands under-monetizing their subscriber database.'
    },
    {
      id: 'newbies',
      number: '05',
      title: 'Newbies in Social Media',
      shortDesc: 'Dedicated zero-to-hero incubator for beginners with 0 followers to build an engaged audience.',
      fullDesc: 'Starting from scratch is intimidating. Our dedicated beginner social media incubator is built specifically for founders, local businesses, and creators starting at zero. We give you the complete roadmap: bio makeover, 30-day viral short-form script pack, camera confidence frameworks, algorithm growth hacks, and automated DM-to-lead funnels.',
      iconName: 'Sparkles',
      features: [
        'Day-0 Profile & Bio Optimization for Maximum Follower Conversion',
        '30-Day Plug-and-Play Viral Hook & Reel Script Library',
        'Simple Smartphone Content Filming & CapCut Editing Guides',
        'Instagram Algorithm & Reach Hacks to Beat Plateau Traps',
        'Automated DM Keyword Trigger Funnels (Turn Comments into Paying Leads)'
      ],
      metrics: '0 to 10,000+ Followers in First 60-90 Days',
      timeline: '30-Day Intensive Incubation',
      deliverables: [
        'Personalized 30-Day Social Growth Playbook',
        '30 High-Performing Reel/Short Video Scripts',
        'Profile Visual Makeover & Highlights Kit',
        'ManyChat DM Automation Workflow Setup',
        'Direct 1-on-1 Strategist WhatsApp/Telegram Support'
      ],
      idealFor: 'Founders, solopreneurs, and local brands starting from 0 who want rapid organic traction.'
    }
  ];

  return (
    <section id="services" className="py-24 bg-black border-t border-b border-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div>
          {/* Editorial Heading */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <span className="w-8 h-[1px] bg-white"></span>
                <p className="text-[11px] uppercase font-mono tracking-[0.25em] text-neutral-400">
                  Capabilities & Disciplines // Catalog
                </p>
              </div>
              <h2 className="font-light text-4xl sm:text-5xl text-white uppercase tracking-tight">
                Engineering & <span className="font-serif italic font-normal text-neutral-400 lowercase">growth disciplines</span>
              </h2>
            </div>
            <p className="text-xs font-mono text-neutral-400 max-w-sm uppercase tracking-wider">
              Expand any discipline to inspect technical architectures, deliverables, and empirical benchmarks.
            </p>
          </div>

          {/* Editorial Horizontal Service Rows */}
          <ul className="max-w-[1120px] mx-auto space-y-4">
            {services.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <li
                  key={item.id}
                  className={`rounded-none transition-all duration-300 border ${
                    isExpanded
                      ? 'bg-neutral-950 border-white'
                      : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  {/* Row Header */}
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="p-6 sm:p-8 cursor-pointer flex flex-col lg:grid lg:grid-cols-[60px_320px_1fr_40px] lg:items-center gap-4 lg:gap-8"
                  >
                    <span className="text-white text-base font-mono">
                      {item.number}
                    </span>
                    <h3 className="font-normal text-xl sm:text-2xl uppercase tracking-tight text-white">
                      {item.title}
                    </h3>
                    <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
                      {item.shortDesc}
                    </p>
                    <div className="flex justify-end">
                      <div className={`size-7 rounded-none border border-neutral-800 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-white text-black border-white' : 'text-neutral-400 hover:border-neutral-600'}`}>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Studio Drawer */}
                  {isExpanded && (
                    <div className="px-6 pb-8 sm:px-8 sm:pb-8 pt-4 border-t border-neutral-800 animate-in fade-in duration-200">
                      <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-light">
                        {item.fullDesc}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                        {/* What We Deliver */}
                        <div>
                          <h4 className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 mb-3">
                            Key Deliverables
                          </h4>
                          <ul className="space-y-2">
                            {item.deliverables.map((del, dIdx) => (
                              <li key={dIdx} className="flex items-start gap-2 text-xs text-neutral-300 font-light">
                                <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                                <span>{del}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Outcomes & Timeline */}
                        <div className="space-y-4">
                          <div className="p-4 rounded-none bg-neutral-900/60 border border-neutral-800">
                            <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">Benchmark Expectation</p>
                            <p className="text-base font-normal text-white mt-1 font-mono">{item.metrics}</p>
                          </div>

                          <div className="p-4 rounded-none bg-neutral-900/60 border border-neutral-800">
                            <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">Deployment Cycle</p>
                            <p className="text-xs font-mono text-neutral-300 mt-1 uppercase tracking-wider">{item.timeline}</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-900">
                        <span className="text-xs text-neutral-500 font-mono">
                          Target Profile: <span className="text-neutral-300">{item.idealFor}</span>
                        </span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={onOpenAudit}
                            className="px-4 py-2 rounded-none border border-neutral-800 text-xs font-mono uppercase tracking-widest text-neutral-300 hover:border-neutral-500 transition-colors cursor-pointer"
                          >
                            Diagnostic Audit
                          </button>
                          <button
                            onClick={onOpenBooking}
                            className="px-5 py-2 rounded-none bg-white text-black text-xs font-mono uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer border border-white"
                          >
                            <span>Schedule Consultation</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
