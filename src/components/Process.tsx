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
    <section id="process" className="py-16 lg:py-25 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs uppercase font-mono tracking-widest text-gray-400">
            Execution Framework
          </p>
          <h2 className="font-normal text-4xl sm:text-5xl text-black -tracking-[1.92px]">
            The 4-Step <span className="italic font-serif">Growth System</span>
          </h2>
          <p className="text-gray-600 text-base max-w-xl mx-auto">
            No guessing games. Our battle-tested framework systematically eliminates conversion friction and compounds agency revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-[24px] bg-[#FBFBFB] border border-gray-200 hover:border-black transition-all duration-300 flex flex-col justify-between shadow-xs"
            >
              <div>
                <span className="font-serif italic text-4xl text-black block mb-6">
                  {step.num}
                </span>

                <h3 className="text-xl font-normal text-black mb-3 tracking-tight">
                  {step.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed mb-6 font-normal">
                  {step.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-200 space-y-2">
                {step.deliverables.map((del, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2 text-xs text-gray-600 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
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
