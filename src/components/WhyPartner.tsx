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
    <section id="why-us" className="py-16 lg:py-25 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div>
          <h2 className="lg:w-5/12 mb-10 lg:mb-16 font-normal text-4xl sm:text-5xl text-black -tracking-[1.92px]">
            Why Partner <span className="italic font-serif">With Us</span>
          </h2>

          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((item) => (
              <article key={item.id} className="group">
                <div className="size-14 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <div className="group-hover:[&_svg]:text-white transition-colors">
                    {item.icon}
                  </div>
                </div>
                <h4 className="mb-4 mt-8 text-2xl font-normal text-black tracking-tight">
                  {item.title}
                </h4>
                <p className="text-base text-gray-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
