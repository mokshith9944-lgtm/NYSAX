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
    <section id="roi-calculator" className="py-20 lg:py-25 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-xs uppercase font-mono tracking-widest text-gray-400">
            Performance Simulator
          </p>
          <h2 className="text-4xl sm:text-5xl font-normal text-black -tracking-[1.92px]">
            Calculate Your Untapped <span className="italic font-serif">Revenue Potential</span>
          </h2>
          <p className="text-gray-600 text-base max-w-xl mx-auto">
            See how fixing your website conversion rate, ranking on Google, and automating email retention translates directly into bottom-line revenue.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 rounded-[28px] bg-[#FBFBFB] border border-gray-200 shadow-xs">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl font-normal text-black tracking-tight">
              Adjust Current Business Metrics
            </h3>

            {/* Slider 1: Monthly Revenue */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-gray-700">Current Monthly Revenue:</span>
                <span className="text-black font-mono text-sm font-bold">${monthlyRevenue.toLocaleString()} / mo</span>
              </div>
              <input
                type="range"
                min="5000"
                max="200000"
                step="5000"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                <span>$5,000</span>
                <span>$100,000</span>
                <span>$200,000+</span>
              </div>
            </div>

            {/* Slider 2: Conversion Rate */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-gray-700">Current Website Conversion Rate:</span>
                <span className="text-black font-mono text-sm font-bold">{conversionRate.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                <span>0.5% (Leaking Leads)</span>
                <span>2.0% (Average)</span>
                <span>5.0% (Elite)</span>
              </div>
            </div>

            {/* Slider 3: Average Customer Value */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-gray-700">Average Order or Client LTV:</span>
                <span className="text-black font-mono text-sm font-bold">${avgCustomerValue.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="50"
                max="3000"
                step="50"
                value={avgCustomerValue}
                onChange={(e) => setAvgCustomerValue(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                <span>$50</span>
                <span>$1,500</span>
                <span>$3,000+</span>
              </div>
            </div>

            {/* Explanatory notes */}
            <div className="p-4 rounded-xl bg-white border border-gray-200 text-xs text-gray-600 space-y-1.5">
              <p className="font-semibold text-black">What drives this model?</p>
              <p>• CRO & speed architecture lifts conversion from {conversionRate.toFixed(1)}% to {projectedConversionRate.toFixed(1)}%</p>
              <p>• High-intent SEO + automated Klaviyo lifecycle retention captures abandoned pipeline.</p>
            </div>
          </div>

          {/* Results Summary Box - High Contrast Pure Black Studio Block */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-black text-white space-y-6">
            <div>
              <p className="text-xs uppercase font-mono tracking-wider text-gray-400">
                Projected 90-Day Pipeline Lift
              </p>
              <div className="mt-2 text-4xl sm:text-5xl font-normal tracking-tight text-white font-sans">
                +${quarterlyRevenueLift.toLocaleString()}
              </div>
              <p className="text-xs text-emerald-400 mt-1 font-mono">
                +${monthlyRevenueLift.toLocaleString()}/mo ongoing run-rate
              </p>
            </div>

            <div className="space-y-3 py-4 border-y border-neutral-800 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-400">Target Conversion Rate:</span>
                <span className="text-white font-semibold font-mono">{projectedConversionRate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">New Monthly Revenue:</span>
                <span className="text-white font-semibold font-mono">${projectedMonthlyRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Estimated 90-Day ROI:</span>
                <span className="text-white font-semibold font-mono">{estimatedRoiMultiplier}%</span>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-4 rounded-full bg-white text-black font-medium text-xs uppercase tracking-wider hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Review Growth Model</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
