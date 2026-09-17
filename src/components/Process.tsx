import React from 'react';
import { Search, Compass, Rocket, TrendingUp, CheckCircle2 } from 'lucide-react';

export const Process: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Growth Diagnostic & Audit',
      desc: 'We perform a surgical analysis of your website, SEO ranking gaps, sales objections, and social media presence to identify where your brand leaks revenue.',
      deliverables: ['Technical Health Score', 'Bottleneck Diagnostic', 'Competitor Gap Matrix']
    },
    {
      num: '02',
      title: 'Blueprint Architecture',
      desc: 'We craft high-converting copy, design prototypes, automated email flow schematics, and custom social media playbooks tailored to your ideal customer.',
      deliverables: ['Growth Strategy Roadmap', 'Figma UX Wireframes', 'Email Flow Architecture']
    },
    {
      num: '03',
      title: 'Deployment & Launch',
      desc: 'Our senior engineers deploy your new website, implement on-page SEO, activate automated email sequences, and launch beginner social media scripts.',
      deliverables: ['Sub-Second Live Platform', 'Klaviyo Email Automations', 'First 30-Day Viral Script Pack']
    },
    {
      num: '04',
      title: 'Compound & Scale',
      desc: 'We continually analyze conversion data, run A/B tests, refine sales scripts, and double down on top-performing organic keywords and viral social hooks.',
      deliverables: ['Weekly Transparent Reporting', 'Continuous A/B CRO Split-Tests', 'Monthly Strategic Reviews']
    }
  ];

  return (
    <section id="process" className="py-24 bg-black border-t border-b border-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-[11px] uppercase font-mono tracking-[0.25em] text-neutral-400">
            Systematic Methodology // Sequence
          </p>
          <h2 className="font-light text-4xl sm:text-5xl text-white uppercase tracking-tight">
            The 4-Stage <span className="font-serif italic font-normal text-neutral-400 lowercase">engineering cycle</span>
          </h2>
          <p className="text-neutral-400 text-sm max-w-xl mx-auto font-light leading-relaxed">
            Deterministic execution. We systematically dismantle conversion friction and architect unassailable category dominance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-none bg-neutral-950/60 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-3xl text-white block mb-6">
                  {step.num}
                </span>

                <h3 className="text-lg font-normal uppercase tracking-wide text-white mb-3">
                  {step.title}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed mb-6 font-light">
                  {step.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-900 space-y-2">
                {step.deliverables.map((del, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2 text-[11px] text-neutral-400 font-mono">
                    <span className="w-1 h-1 rounded-none bg-white shrink-0" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
