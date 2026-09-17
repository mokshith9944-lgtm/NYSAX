import React, { useState, useEffect } from 'react';
import { db } from '../lib/storage';
import { ClientReview } from '../types';
import { Send, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [approvedReviews, setApprovedReviews] = useState<ClientReview[]>([]);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  
  // Submission form state
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState('SEO Architecture');
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  useEffect(() => {
    const loadReviews = () => {
      setApprovedReviews(db.getApprovedReviews());
    };
    loadReviews();
    window.addEventListener('nysax_storage_update', loadReviews);
    return () => window.removeEventListener('nysax_storage_update', loadReviews);
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !feedback.trim()) return;

    setSubmitting(true);
    setSubmittedStatus('TRANSMITTING INQUIRY...');

    try {
      // Save locally with pending moderation
      const newRev = db.saveReview({
        author: author.trim(),
        role: role.trim() || 'Client Partner',
        company: company.trim() || 'Enterprise Client',
        rating,
        feedback: feedback.trim(),
        service,
        status: 'pending',
        is_verified: false,
      });

      // Also transmit to Vercel serverless /api/feedback
      try {
        await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRev),
        });
      } catch (apiErr) {
        console.warn('API feedback dispatch fallback:', apiErr);
      }

      setSubmittedStatus('CONFIRMED: Your review has been logged for leadership moderation. Verified entries appear publicly.');
      setAuthor('');
      setRole('');
      setCompany('');
      setFeedback('');
      setTimeout(() => {
        setShowSubmitForm(false);
        setSubmittedStatus(null);
      }, 4000);
    } catch (err) {
      console.error(err);
      setSubmittedStatus('DISPATCH ERROR: Please reach directly via mailto:contact@nysaagency.com.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-20 bg-white border-t border-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-black">
          <div>
            <p className="text-xs uppercase font-mono tracking-widest text-neutral-500 mb-2">
              Authentic Records
            </p>
            <h2 className="font-normal text-3xl sm:text-4xl text-black uppercase tracking-tight">
              Client Feedback & Reviews
            </h2>
          </div>

          <button
            onClick={() => setShowSubmitForm(!showSubmitForm)}
            className="px-5 py-2.5 bg-black text-white text-xs font-mono uppercase tracking-widest border border-black hover:bg-neutral-900 transition-colors cursor-pointer self-start md:self-auto"
          >
            {showSubmitForm ? 'Close Submission Panel' : 'Submit Client Review'}
          </button>
        </div>

        {/* Client Submission Drawer (Understated 1px-border grid) */}
        {showSubmitForm && (
          <div className="my-10 p-8 border border-black bg-neutral-50 animate-in fade-in">
            <h3 className="text-lg font-mono uppercase tracking-wider text-black mb-1">
              Submit Direct Project Feedback
            </h3>
            <p className="text-xs font-mono text-neutral-600 mb-6">
              All reviews undergo direct verification by leadership (Nikhil, Mokshith, Amaresh) prior to public display.
            </p>

            {submittedStatus && (
              <div className="mb-6 p-4 border border-black bg-white text-xs font-mono uppercase tracking-wider text-black flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{submittedStatus}</span>
              </div>
            )}

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-black mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Marcus Vance"
                    className="w-full px-3 py-2 border border-black bg-white text-xs font-mono text-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-black mb-1">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Chief Executive"
                    className="w-full px-3 py-2 border border-black bg-white text-xs font-mono text-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-black mb-1">
                    Company / Brand
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Vance Holdings"
                    className="w-full px-3 py-2 border border-black bg-white text-xs font-mono text-black focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-black mb-1">
                    Service Retained
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3 py-2 border border-black bg-white text-xs font-mono text-black focus:outline-none cursor-pointer"
                  >
                    <option value="Organic SEO Architecture">Organic SEO Architecture</option>
                    <option value="Editorial Web Design & CRO">Editorial Web Design & CRO</option>
                    <option value="Revenue & Sales Strategy">Revenue & Sales Strategy</option>
                    <option value="Lifecycle Email Marketing">Lifecycle Email Marketing</option>
                    <option value="Social Media Incubator">Social Media Incubator</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-black mb-1">
                    Rating Evaluation
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-black bg-white text-xs font-mono text-black focus:outline-none cursor-pointer"
                  >
                    <option value={5}>5.0 / 5.0 — Exceptional</option>
                    <option value={4}>4.0 / 5.0 — Strong Execution</option>
                    <option value={3}>3.0 / 5.0 — Satisfactory</option>
                    <option value={2}>2.0 / 5.0 — Sub-par</option>
                    <option value={1}>1.0 / 5.0 — Unsatisfactory</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-black mb-1">
                  Project Evaluation & Quantitative Impact *
                </label>
                <textarea
                  rows={3}
                  required
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide an objective summary of project deliverables, milestones hit, and operational feedback..."
                  className="w-full px-3 py-2 border border-black bg-white text-xs font-mono text-black focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 bg-black text-white text-xs font-mono uppercase tracking-widest border border-black hover:bg-neutral-900 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>Submit For Verification</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}

        {/* Public Verified Feed: Understated 1px-Border Grid */}
        <div className="mt-12">
          {approvedReviews.length === 0 ? (
            <div className="p-12 border border-black bg-white text-center">
              <p className="text-xs uppercase font-mono tracking-widest text-black max-w-xl mx-auto leading-relaxed">
                AUTHENTIC CLIENT REVIEWS ARE PUBLISHED POST-VERIFICATION. RECENT CLIENTS MAY SUBMIT DIRECT PROJECT FEEDBACK ABOVE.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approvedReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-8 border border-black bg-white flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono uppercase text-neutral-500 pb-3 border-b border-neutral-200">
                      <span>{rev.service}</span>
                      <span className="font-semibold text-black">{rev.rating.toFixed(1)} / 5.0</span>
                    </div>
                    <p className="text-sm font-normal text-black leading-relaxed">
                      "{rev.feedback}"
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-neutral-200">
                    <p className="text-xs font-mono uppercase tracking-wider text-black font-semibold">
                      {rev.author}
                    </p>
                    <p className="text-[10px] font-mono text-neutral-500 uppercase">
                      {rev.role} — {rev.company}
                    </p>
                    <p className="text-[9px] font-mono text-neutral-400 mt-1 uppercase tracking-widest">
                      Verified by Nysa Agency Leadership
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
