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
    <section id="services" className="py-16 lg:py-25 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div>
          {/* Authentic TailGrids NexStudio Heading */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs uppercase font-mono tracking-widest text-gray-400 mb-2">
                Core Capabilities
              </p>
              <h2 className="font-normal text-4xl sm:text-5xl text-black -tracking-[1.92px]">
                Our <span className="italic font-serif">Services</span>
              </h2>
            </div>
            <p className="text-sm font-mono text-gray-500 max-w-sm">
              Click any service to inspect detailed deliverables, timelines, and measurable outcomes.
            </p>
          </div>

          {/* Authentic NexStudio Horizontal Service Rows (Rv) */}
          <ul className="max-w-[1120px] mx-auto space-y-4">
            {services.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <li
                  key={item.id}
                  className={`rounded-2xl transition-all duration-300 border ${
                    isExpanded
                      ? 'bg-[#FBFBFB] border-black shadow-xs'
                      : 'bg-white border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {/* Row Header */}
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="p-6 sm:p-8 cursor-pointer flex flex-col lg:grid lg:grid-cols-[60px_320px_1fr_40px] lg:items-center gap-4 lg:gap-8"
                  >
                    <span className="text-black text-lg italic font-serif">
                      {item.number}
                    </span>
                    <h3 className="font-normal text-2xl text-black tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-base font-normal leading-relaxed">
                      {item.shortDesc}
                    </p>
                    <div className="flex justify-end">
                      <div className={`size-8 rounded-full border border-gray-300 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-black text-white border-black' : 'text-gray-600 hover:border-black'}`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Studio Drawer */}
                  {isExpanded && (
                    <div className="px-6 pb-8 sm:px-8 sm:pb-8 pt-2 border-t border-gray-200/80 animate-in fade-in duration-200">
                      <p className="text-gray-700 text-base leading-relaxed mb-6">
                        {item.fullDesc}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                        {/* What We Deliver */}
                        <div>
                          <h4 className="text-xs uppercase font-mono tracking-wider text-black font-semibold mb-3">
                            Key Deliverables
                          </h4>
                          <ul className="space-y-2">
                            {item.deliverables.map((del, dIdx) => (
                              <li key={dIdx} className="flex items-start gap-2.5 text-sm text-gray-700">
                                <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                                <span>{del}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Outcomes & Timeline */}
                        <div className="space-y-4">
                          <div className="p-4 rounded-xl bg-white border border-gray-200">
                            <p className="text-xs uppercase font-mono tracking-wider text-gray-500">Expected Outcome</p>
                            <p className="text-lg font-semibold text-black mt-0.5">{item.metrics}</p>
                          </div>

                          <div className="p-4 rounded-xl bg-white border border-gray-200">
                            <p className="text-xs uppercase font-mono tracking-wider text-gray-500">Typical Timeline</p>
                            <p className="text-sm font-medium text-black mt-0.5">{item.timeline}</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200">
                        <span className="text-xs text-gray-500 font-mono">
                          Ideal For: <span className="text-gray-800 font-sans">{item.idealFor}</span>
                        </span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={onOpenAudit}
                            className="px-4 py-2 rounded-full border border-gray-300 text-xs font-medium text-black hover:border-black transition-colors cursor-pointer"
                          >
                            Request Audit
                          </button>
                          <button
                            onClick={onOpenBooking}
                            className="group px-5 py-2 rounded-full bg-black text-white text-xs font-medium hover:bg-gray-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>Book Call</span>
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
