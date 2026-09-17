import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      quote: "NYSAX completely rebuilt our eCommerce storefront and engineered 6 Klaviyo flows. We did +$142,000 in incremental revenue in the first 90 days. Their speed and technical precision are unmatched.",
      author: "Julian Vance",
      role: "Founder & CEO, Vanguard Goods",
      rating: 5,
      service: "Website Design & Email Marketing"
    },
    {
      quote: "Before NYSAX, our SaaS was burning $25k/mo on Google Ads with mediocre CAC. Within 4 months of their technical SEO cluster strategy, we took the #1 rank on 14 major terms and cut ad spend by half.",
      author: "Sarah Lin",
      role: "VP Marketing, AeroSync Cloud",
      rating: 5,
      service: "SEO Dominance & Sales Strategy"
    },
    {
      quote: "I had 0 followers on Instagram and had never recorded a video in my life. Their Newbies in Social Media incubator gave me exact scripts and hooks. We hit 42,000 followers and $60k in coaching sales.",
      author: "Marcus Brody",
      role: "Creator & Head Coach, Kinetics",
      rating: 5,
      service: "Newbies in Social Media Incubator"
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const activeReview = reviews[currentIndex];

  return (
    <section id="reviews" className="py-16 lg:py-25 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          {/* Left Column: Title & Controls */}
          <div className="w-full lg:w-4/12">
            <p className="text-xs uppercase font-mono tracking-widest text-gray-400 mb-2">
              Verified Feedback
            </p>
            <h2 className="font-normal text-4xl sm:text-5xl text-black -tracking-[1.92px] mb-8">
              Our Client <span className="italic font-serif">Reviews</span>
            </h2>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous review"
                className="size-12 border border-gray-300 rounded-full inline-flex items-center justify-center text-black hover:border-black hover:bg-black hover:text-white transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next review"
                className="size-12 border border-gray-300 rounded-full inline-flex items-center justify-center text-black hover:border-black hover:bg-black hover:text-white transition-all cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-gray-400 ml-3">
                0{currentIndex + 1} / 0{reviews.length}
              </span>
            </div>
          </div>

          {/* Right Column: Review Display Card */}
          <div className="w-full lg:w-7/12">
            <div className="p-8 sm:p-12 rounded-[24px] bg-[#FBFBFB] border border-gray-200 shadow-xs relative">
              <div className="flex items-center gap-1 mb-6 text-black">
                {[...Array(activeReview.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <blockquote className="text-xl sm:text-2xl font-normal text-black leading-relaxed mb-8">
                “{activeReview.quote}”
              </blockquote>

              <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-black text-base">{activeReview.author}</h4>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">{activeReview.role}</p>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-full">
                  {activeReview.service}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
