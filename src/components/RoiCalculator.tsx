import React, { useState } from 'react';
import { Calculator, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenBooking: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenBooking }) => {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(30000);
  const [conversionRate, setConversionRate] = useState<number>(1.8);
  const [avgCustomerValue, setAvgCustomerValue] = useState<number>(300);

  // Estimation Formulas
  const projectedConversionRate = Math.min(conversionRate * 1.65, 8.5);
  const projectedMonthlyRevenue = Math.round(monthlyRevenue * 1.58);
  const monthlyRevenueLift = projectedMonthlyRevenue - monthlyRevenue;
  const quarterlyRevenueLift = monthlyRevenueLift * 3;
  const estimatedRoiMultiplier = ((quarterlyRevenueLift / 9000) * 10).toFixed(0);

  return (
    <section id="roi-calculator" className="py-24 bg-black border-t border-b border-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-[11px] uppercase font-mono tracking-[0.25em] text-neutral-400">
            Performance Architecture // Simulation
          </p>
          <h2 className="text-4xl sm:text-5xl font-light text-white uppercase tracking-tight">
            Calculate Untapped <span className="font-serif italic font-normal text-neutral-400 lowercase">revenue potential</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Quantify how conversion-rate optimization, high-intent organic indexing, and automated retention flows translate into enterprise balance-sheet lift.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 rounded-none bg-neutral-950/80 border border-neutral-800">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl font-normal text-white uppercase tracking-wide">
              Baseline Parameters
            </h3>

            {/* Slider 1: Monthly Revenue */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-neutral-400 uppercase tracking-wider">Current Monthly Run-Rate:</span>
                <span className="text-white font-mono text-sm">${monthlyRevenue.toLocaleString()} / mo</span>
              </div>
              <input
                type="range"
                min="5000"
                max="200000"
                step="5000"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="w-full h-1 bg-neutral-800 rounded-none appearance-none cursor-pointer accent-white"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                <span>$5,000</span>
                <span>$100,000</span>
                <span>$200,000+</span>
              </div>
            </div>

            {/* Slider 2: Conversion Rate */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-neutral-400 uppercase tracking-wider">Website Conversion Benchmark:</span>
                <span className="text-white font-mono text-sm">{conversionRate.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full h-1 bg-neutral-800 rounded-none appearance-none cursor-pointer accent-white"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                <span>0.5% (Leaking Traffic)</span>
                <span>2.0% (Average)</span>
                <span>5.0% (Elite)</span>
              </div>
            </div>

            {/* Slider 3: Average Customer Value */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-neutral-400 uppercase tracking-wider">Average Order or Client LTV:</span>
                <span className="text-white font-mono text-sm">${avgCustomerValue.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="50"
                max="3000"
                step="50"
                value={avgCustomerValue}
                onChange={(e) => setAvgCustomerValue(Number(e.target.value))}
                className="w-full h-1 bg-neutral-800 rounded-none appearance-none cursor-pointer accent-white"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                <span>$50</span>
                <span>$1,500</span>
                <span>$3,000+</span>
              </div>
            </div>

            {/* Explanatory notes */}
            <div className="p-4 rounded-none bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-400 space-y-1.5 font-light">
              <p className="font-mono uppercase tracking-wider text-white text-[11px]">Architectural Modeling Drivers</p>
              <p>• Conversion rate re-engineering lifts baseline from {conversionRate.toFixed(1)}% to {projectedConversionRate.toFixed(1)}%</p>
              <p>• High-intent SEO infrastructure & automated retention sequences capture previously discarded traffic.</p>
            </div>
          </div>

          {/* Results Summary Box - Pure 0px Sharp Monochrome */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-none bg-neutral-900 border border-neutral-700 text-white space-y-6">
            <div>
              <p className="text-[10px] uppercase font-mono tracking-[0.2em] text-neutral-400">
                Projected 90-Day Pipeline Lift
              </p>
              <div className="mt-2 text-4xl sm:text-5xl font-light tracking-tight text-white font-mono">
                +${quarterlyRevenueLift.toLocaleString()}
              </div>
              <p className="text-xs text-neutral-300 mt-1 font-mono uppercase tracking-wider">
                +${monthlyRevenueLift.toLocaleString()} / mo projected run-rate
              </p>
            </div>

            <div className="space-y-3 py-4 border-y border-neutral-800 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-neutral-400 uppercase">Target Conversion:</span>
                <span className="text-white">{projectedConversionRate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400 uppercase">Projected Monthly:</span>
                <span className="text-white">${projectedMonthlyRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400 uppercase">Estimated 90-Day ROI:</span>
                <span className="text-white">{estimatedRoiMultiplier}%</span>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-3.5 rounded-none bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer border border-white"
            >
              <span>Schedule Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
