import React from 'react';
import { Target, Cpu, LineChart, Award } from 'lucide-react';

export const WhyPartner: React.FC = () => {
  const pillars = [
    {
      id: 1,
      icon: <Target className="w-8 h-8 text-black" strokeWidth={1.5} />,
      title: 'Precision Targeting',
      description: 'We eliminate wasted ad spend through granular intent mapping, high-intent keyword clustering, and algorithmic customer acquisition.',
    },
    {
      id: 2,
      icon: <Cpu className="w-8 h-8 text-black" strokeWidth={1.5} />,
      title: 'Technical Dominance',
      description: 'Our sub-second web platforms, dynamic tracking pixels, and automated retention flows outperform generic agency templates every time.',
    },
    {
      id: 3,
      icon: <LineChart className="w-8 h-8 text-black" strokeWidth={1.5} />,
      title: 'Compound ROI Systems',
      description: 'We do not sell vanity clicks. Every campaign is engineered to lower CAC, elevate LTV, and generate measurable bottom-line revenue.',
    },
    {
      id: 4,
      icon: <Award className="w-8 h-8 text-black" strokeWidth={1.5} />,
      title: 'Dedicated Senior Squad',
      description: 'No inexperienced junior handoffs. You work directly with battle-tested operators, senior engineers, and growth architects.',
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-black border-t border-b border-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <span className="w-8 h-[1px] bg-white"></span>
            <p className="text-[11px] uppercase font-mono tracking-[0.25em] text-neutral-400">
              Methodology & Rigor // The Standard
            </p>
          </div>
          <h2 className="lg:w-7/12 mb-16 font-light text-4xl sm:text-5xl text-white uppercase tracking-tight">
            Why Enterprise Leaders <span className="font-serif italic font-normal text-neutral-400 lowercase">partner with nysa</span>
          </h2>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((item) => (
              <article key={item.id} className="group border border-neutral-800 bg-neutral-950/60 p-6 rounded-none flex flex-col justify-between hover:border-neutral-700 transition-colors">
                <div>
                  <div className="size-12 rounded-none bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-6 group-hover:border-white transition-colors">
                    <div className="[&_svg]:text-white">
                      {item.icon}
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">Pillar 0{item.id}</div>
                  <h4 className="mb-3 text-lg font-normal uppercase tracking-wide text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
