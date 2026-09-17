import React from 'react';
import { Mail, ArrowUpRight, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';
import { useAuth } from '../context/AuthContext';

interface FooterProps {
  onOpenAuth: (mode?: 'login' | 'register', role?: 'client' | 'admin') => void;
  onOpenBooking: () => void;
  onOpenAudit: () => void;
  setCurrentView: (view: 'home' | 'client_portal' | 'admin_dashboard') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAuth,
  onOpenBooking,
  onOpenAudit,
  setCurrentView
}) => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <footer className="bg-[#050913] border-t border-white/[0.08] text-slate-400 text-xs relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center font-display font-black text-base text-white shadow-md shadow-primary/30">
                N
              </div>
              <span className="font-display font-black text-lg text-white tracking-wider">
                NYSAX <span className="text-[10px] text-primary uppercase font-bold ml-1">Studio</span>
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed max-w-sm">
              NYSAX is a premier digital growth studio engineering exponential revenue through SEO dominance, conversion web design, sales architecture, email flows, and social media incubation.
            </p>

            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href="mailto:nysaxofficial@gmail.com"
                className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors font-medium"
              >
                <Mail className="w-4 h-4 text-primary" />
                <span>nysaxofficial@gmail.com</span>
              </a>
              <a
                href="https://www.instagram.com/nysax.agency?stkn=MXdycDVzN3lqc2tqZA=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-pink-300 transition-colors font-medium"
              >
                <InstagramIcon className="w-4 h-4 text-pink-400" />
                <span>@nysax.agency on Instagram</span>
              </a>
            </div>
          </div>

          {/* Core Services Col */}
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-4 uppercase tracking-wider">
              Core Capabilities
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  01. SEO Optimization & Rankings
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  02. Website Design & Funnels
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  03. Sales Strategy & Pipelines
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  04. Email Marketing & Klaviyo
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-300 transition-colors font-medium flex items-center gap-1.5">
                  <span>05. Social Media for Newbies</span>
                  <span className="px-1 text-[9px] rounded bg-amber-500/20 text-amber-300 font-bold">Hot</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Growth Tools */}
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-4 uppercase tracking-wider">
              Growth Tools
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={onOpenBooking} className="hover:text-white transition-colors text-left">
                  Book 30-Min Strategy Call
                </button>
              </li>
              <li>
                <button onClick={onOpenAudit} className="hover:text-white transition-colors text-left">
                  Request Free 7-Point Audit
                </button>
              </li>
              <li>
                <a href="#roi-calculator" className="hover:text-white transition-colors">
                  Interactive ROI Calculator
                </a>
              </li>
              <li>
                <a href="#results" className="hover:text-white transition-colors">
                  Client Case Studies
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Agency FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Client & Admin Portal Col */}
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-4 uppercase tracking-wider">
              Secure Portals
            </h4>
            <ul className="space-y-2.5">
              {isAuthenticated ? (
                <>
                  <li>
                    <button
                      onClick={() => setCurrentView(isAdmin ? 'admin_dashboard' : 'client_portal')}
                      className="text-primary hover:text-blue-300 font-semibold flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isAdmin ? 'Admin Dashboard' : 'Client Portal'}</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setCurrentView('home')}
                      className="hover:text-white transition-colors"
                    >
                      Public Studio Home
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button
                      onClick={() => onOpenAuth('login', 'client')}
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <span>Client Portal Sign In</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onOpenAuth('register', 'client')}
                      className="hover:text-white transition-colors text-cyan-300"
                    >
                      Create Client Account
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onOpenAuth('login', 'admin')}
                      className="hover:text-white transition-colors text-slate-500 flex items-center gap-1"
                    >
                      <Lock className="w-3 h-3" />
                      <span>Agency Admin Center</span>
                    </button>
                  </li>
                </>
              )}
            </ul>
            <div className="mt-5 p-3 rounded-xl bg-[#0D1527] border border-white/10">
              <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Template: NexStudio by TailGrids</span>
              </span>
              <p className="text-[10px] text-slate-500 mt-1">Ready for Vercel Deployment</p>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} NYSAX Agency (nysax.agency). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="mailto:nysaxofficial@gmail.com" className="hover:text-slate-300">nysaxofficial@gmail.com</a>
            <span>•</span>
            <a href="https://www.instagram.com/nysax.agency?stkn=MXdycDVzN3lqc2tqZA==" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">Instagram: @nysax.agency</a>
            <span>•</span>
            <span className="text-slate-600">Encrypted Infrastructure</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
