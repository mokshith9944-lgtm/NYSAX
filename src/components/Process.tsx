import React from 'react';
import { Search, Compass, Rocket, TrendingUp, CheckCircle2 } from 'lucide-react';

export const Process: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Growth Diagnostic & Funnel Audit',
      desc: 'We perform a surgical analysis of your website, SEO ranking gaps, sales objections, and social media presence to identify where your brand is leaking revenue.',
      icon: Search,
      deliverables: ['Full Technical & SEO Health Score', 'Conversion Rate Bottleneck Map', 'Competitor Gap Matrix']
    },
    {
      num: '02',
      title: 'Growth Blueprint & Creative Architecture',
      desc: 'We craft high-converting copy, design wireframes, automated email flow schematics, and custom social media playbooks tailored to your ideal customer profile.',
      icon: Compass,
      deliverables: ['Custom Growth Strategy Document', 'Figma Wireframes & Messaging Bible', 'Email Flow Architecture']
    },
    {
      num: '03',
      title: 'Full-Scale Execution & Deployment',
      desc: 'Our engineers and creative strategists build and deploy your new website, implement on-page SEO, set up automated email flows, and kick off beginner social media scripts.',
      icon: Rocket,
      deliverables: ['Live Tested Website Experience', 'Activated Email Lifecycle Automations', 'First 30-Day Viral Content Pack']
    },
    {
      num: '04',
      title: 'Iterative Scaling & Revenue Compounding',
      desc: 'We continually analyze conversion data, run A/B tests, refine sales scripts, and double down on top-performing organic keywords and viral social hooks.',
      icon: TrendingUp,
      deliverables: ['Weekly Transparent Reporting', 'Continuous A/B Conversion Split-Tests', 'Monthly Strategic Growth Review']
    }
  ];

  return (
    <section id="process" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-purple-400" />
            <span>The NYSAX Framework</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            How We Turn Chaos Into Predictable Revenue.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            No guessing games. Our battle-tested 4-step framework systematically eliminates friction and compounds your agency results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative p-6 rounded-3xl bg-[#0D121F] border border-white/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display font-black text-3xl text-slate-700 group-hover:text-purple-400 transition-colors">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-purple-400">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Key Outputs:</span>
                  {step.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
