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
    <section id="roi-calculator" className="py-24 relative overflow-hidden bg-[#070C18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-primary" />
            <span>Interactive Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            Calculate Your Untapped Revenue Potential.
          </h2>
          <p className="text-slate-300 text-base">
            See how fixing your website conversion rate, ranking on Google, and automating email retention translates into raw bottom-line revenue.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 rounded-3xl bg-[#0D1527] border border-white/10 backdrop-blur-2xl shadow-2xl relative">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Adjust Current Business Metrics
            </h3>

            {/* Slider 1: Monthly Revenue */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Current Monthly Revenue:</span>
                <span className="text-primary font-mono text-sm font-bold">${monthlyRevenue.toLocaleString()} / mo</span>
              </div>
              <input
                type="range"
                min="5000"
                max="200000"
                step="5000"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>$5,000</span>
                <span>$100,000</span>
                <span>$200,000+</span>
              </div>
            </div>

            {/* Slider 2: Conversion Rate */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Current Conversion Rate:</span>
                <span className="text-cyan-400 font-mono text-sm font-bold">{conversionRate.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0.5% (Low)</span>
                <span>2.0% (Average)</span>
                <span>5.0% (High)</span>
              </div>
            </div>

            {/* Slider 3: Average Order / Contract Value */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Average Customer / Order Value:</span>
                <span className="text-indigo-400 font-mono text-sm font-bold">${avgCustomerValue.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="50"
                max="3000"
                step="50"
                value={avgCustomerValue}
                onChange={(e) => setAvgCustomerValue(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>$50</span>
                <span>$1,500</span>
                <span>$3,000+</span>
              </div>
            </div>

            {/* Assumptions Breakdown */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2 text-xs text-slate-400">
              <p className="font-semibold text-slate-300 text-[11px] uppercase tracking-wider">
                Systemic Growth Factors Applied:
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Website CRO Lift: +{((projectedConversionRate - conversionRate) / conversionRate * 100).toFixed(0)}%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Email Flow Revenue: +28%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Organic SEO Traffic: +20%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sales Closing Rate: +35%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Projection Card */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-[#0E162B] to-[#090F1E] border border-primary/30 flex flex-col justify-between relative overflow-hidden shadow-xl">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold tracking-wider text-blue-300">
                  Projected with NYSAX
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  High Confidence
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-400">Projected Monthly Revenue:</span>
                <p className="text-3xl sm:text-4xl font-display font-black text-white mt-0.5 tracking-tight">
                  ${projectedMonthlyRevenue.toLocaleString()}
                  <span className="text-sm font-normal text-slate-400"> / mo</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                <div>
                  <span className="text-[11px] text-slate-400">Monthly Revenue Lift:</span>
                  <p className="text-xl font-bold text-emerald-400 font-mono">
                    +${monthlyRevenueLift.toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400">90-Day Pipeline Gain:</span>
                  <p className="text-xl font-bold text-cyan-400 font-mono">
                    +${quarterlyRevenueLift.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-xs text-blue-200">
                  ⚡ Estimated Annualized Return On Investment: <span className="font-bold text-white">{estimatedRoiMultiplier}%</span> based on typical NYSAX retainer terms.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={onOpenBooking}
                className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 group active:scale-95"
              >
                <span>Claim This Growth Plan</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[10px] text-center text-slate-500 mt-2">
                Customized growth roadmap presented on our strategy call.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
