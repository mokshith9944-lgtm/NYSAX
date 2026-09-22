import React, { useState } from 'react'
import { Check, Globe2 } from 'lucide-react'
import {
  pricingPlans,
  supportedCurrencies,
  CurrencyCode
} from '../../data/nexusContent'
import ScrollReveal from '../ui/ScrollReveal'

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void
}

export default function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('USD')
  const currencyList = Object.values(supportedCurrencies)

  return (
    <section className="bg-black py-28 md:py-36 border-t border-white/5" id="pricing">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <p className="font-mono text-xs text-olive-400 uppercase tracking-widest mb-4 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-olive-500 rounded-full" />
            INVESTMENT TIERS & REGIONAL PRICING ($499 — $4,999)
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Transparent pricing.<br />
            <span className="text-silver-500 font-normal">Predictable marketing velocity.</span>
          </h2>
          <p className="font-body text-silver-400 max-w-lg mx-auto text-base mb-8">
            Clear growth deliverables, weekly campaign sprints, and transparent multi-currency invoicing for global partners.
          </p>

          {/* Regional Currency Switcher */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1 bg-obsidian-900 border border-white/10 select-none">
            <div className="px-3 py-1.5 flex items-center gap-1.5 text-silver-500 font-mono text-[11px] uppercase border-r border-white/10 mr-1 hidden sm:flex">
              <Globe2 size={13} className="text-olive-400" />
              <span>Currency:</span>
            </div>
            {currencyList.map(curr => (
              <button
                key={curr.code}
                onClick={() => setSelectedCurrency(curr.code)}
                className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCurrency === curr.code
                    ? 'bg-olive-600 text-black font-bold shadow-[0_0_15px_rgba(112,130,56,0.35)]'
                    : 'text-silver-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{curr.flag}</span>
                <span>{curr.code}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan, i) => {
            const currentPrice = plan.prices[selectedCurrency]

            return (
              <ScrollReveal key={plan.name} delay={i * 0.1}>
                <div
                  className={`relative bg-obsidian-850 border p-8 md:p-10 flex flex-col justify-between h-full transition-all duration-400 ${
                    plan.popular
                      ? 'border-olive-500/60 shadow-[0_0_40px_rgba(112,130,56,0.14)]'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                  data-cursor="hover"
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-8 -translate-y-1/2">
                      <span className="bg-olive-950 text-olive-400 border border-olive-500/50 font-mono text-[10px] uppercase font-bold tracking-widest px-3 py-1">
                        MOST POPULAR GROWTH SPRINT
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <h3 className="font-display text-2xl font-bold text-white">
                        {plan.name}
                      </h3>
                      <span className="font-mono text-xs text-silver-500 uppercase">
                        {plan.timeline}
                      </span>
                    </div>

                    <p className="font-body text-xs text-silver-400 mb-6 leading-relaxed">
                      {plan.desc}
                    </p>

                    <div className="mb-8 pb-6 border-b border-white/5">
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-4xl sm:text-5xl font-bold text-white">
                          {currentPrice}
                        </span>
                        <span className="font-mono text-xs text-olive-400 font-semibold">
                          {selectedCurrency}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-silver-500 mt-1 block">
                        Direct milestone delivery • Zero hidden retainers
                      </span>
                    </div>

                    <ul className="flex flex-col gap-3.5 mb-8">
                      {plan.features.map(f => (
                        <li key={f} className="flex items-start gap-3 text-silver-300 text-xs font-body">
                          <Check size={14} className="text-olive-400 mt-0.5 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => onSelectPlan(plan.name)}
                    className={`w-full py-3.5 font-mono text-xs uppercase tracking-widest transition-all cursor-pointer ${
                      plan.popular
                        ? 'bg-olive-600 text-black font-bold hover:bg-olive-500 shadow-[0_0_20px_rgba(112,130,56,0.3)]'
                        : 'bg-transparent border border-white/20 text-white hover:border-olive-400 hover:text-olive-400'
                    }`}
                  >
                    {plan.name === 'Growth Starter'
                      ? `Start for ${currentPrice}`
                      : plan.name === 'Performance Scaling'
                      ? `Scale for ${currentPrice}`
                      : `Inquire at ${currentPrice}`}
                  </button>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
