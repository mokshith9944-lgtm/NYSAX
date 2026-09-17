import React from 'react';
import { Mail } from 'lucide-react';
import { Logo } from './brand/Logo';
import { InstagramIcon } from './icons/InstagramIcon';
import { useAuth } from '../context/AuthContext';

interface FooterProps {
  onOpenAuth: (initialMode?: 'login' | 'register', initialRole?: 'client' | 'admin') => void;
  onOpenBooking: () => void;
  onOpenAudit: () => void;
  setCurrentView: (view: 'home' | 'client_portal' | 'admin_dashboard') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAuth,
  onOpenBooking,
  onOpenAudit,
  setCurrentView,
}) => {
  const currentYear = new Date().getFullYear();
  const { isAuthenticated, isAdmin } = useAuth();

  const navigateTo = (view: 'home' | 'client_portal' | 'admin_dashboard') => {
    setCurrentView(view);
    const targetPath = view === 'home' ? '/' : view === 'client_portal' ? '/portal/client' : '/admin';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
  };

  return (
    <footer className="bg-black text-white border-t border-neutral-800">
      <div className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Top Logo & Direct Touchpoints */}
          <div className="mb-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-10 border-b border-neutral-800">
            <Logo size="lg" variant="dark" subtext="High-Fashion Editorial Growth Studio" />
            
            <div className="flex items-center gap-3">
              <a
                href="mailto:contact@nysaagency.com?subject=[Project%20Inquiry]%20Nysa%20Agency"
                className="p-2.5 border border-neutral-700 text-white hover:border-white hover:bg-white hover:text-black transition-colors"
                title="Direct Mail: contact@nysaagency.com"
                aria-label="Direct Mail Access"
              >
                <Mail className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </a>
              <a
                href="https://www.instagram.com/nysax.agency?stkn=MXdycDVzN3lqc2tqZA=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 border border-neutral-700 text-white hover:border-white hover:bg-white hover:text-black transition-colors"
                title="Official Instagram (@nysax.agency)"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} className="w-[18px] h-[18px] text-current" />
              </a>
              <button
                onClick={onOpenBooking}
                className="px-5 py-2.5 bg-white text-black text-xs font-mono uppercase tracking-widest border border-white hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Schedule Consultation
              </button>
            </div>
          </div>

          {/* 4-Column Editorial Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-between gap-12 pb-14">
            {/* Col 1: Core Services */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-6 font-medium">
                Disciplines
              </h4>
              <ul className="space-y-3 font-mono text-xs tracking-wider text-neutral-400 [&>li>a]:hover:text-white [&>li>a]:transition-colors">
                <li><a href="#services">Organic SEO Architecture</a></li>
                <li><a href="#services">Editorial Web Design & CRO</a></li>
                <li><a href="#services">Revenue & Sales Systems</a></li>
                <li><a href="#services">Lifecycle Email Marketing</a></li>
                <li><a href="#services">Incubator: Social Media Newbies</a></li>
              </ul>
            </div>

            {/* Col 2: Studio & Framework */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-6 font-medium">
                Studio
              </h4>
              <ul className="space-y-3 font-mono text-xs tracking-wider text-neutral-400 [&>li>a]:hover:text-white [&>li>a]:transition-colors">
                <li><a href="#why-us">Why Partner With Us</a></li>
                <li><a href="#results">Case Studies & Metrics</a></li>
                <li><a href="#reviews">Verified Client Reviews</a></li>
                <li><a href="#roi-calculator">Revenue Simulator</a></li>
                <li><a href="#faq">Operational FAQ</a></li>
              </ul>
            </div>

            {/* Col 3: Portals & Access */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-6 font-medium">
                Access
              </h4>
              <ul className="space-y-3 font-mono text-xs tracking-wider text-neutral-400">
                <li>
                  <button
                    onClick={() => {
                      if (isAuthenticated && !isAdmin) {
                        navigateTo('client_portal');
                      } else {
                        onOpenAuth('login', 'client');
                      }
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Client Campaign Portal
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      if (isAuthenticated && isAdmin) {
                        navigateTo('admin_dashboard');
                      } else {
                        onOpenAuth('login', 'admin');
                      }
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Executive Command Center
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenAuth('register', 'client')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Register Account
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenAudit}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Free Growth Audit
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Leadership & Direct Contact */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-6 font-medium">
                Leadership
              </h4>
              <div className="space-y-2 font-mono text-xs text-neutral-400">
                <p className="text-white">Nikhil — Founder</p>
                <p className="text-white">Mokshith — Co-Founder</p>
                <p className="text-white">Amaresh — Co-Founder</p>
                <div className="pt-3 border-t border-neutral-800 space-y-1">
                  <p>Inquiries: <a href="mailto:contact@nysaagency.com" className="text-white hover:underline">contact@nysaagency.com</a></p>
                  <p>Instagram: <a href="https://www.instagram.com/nysax.agency?stkn=MXdycDVzN3lqc2tqZA==" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">@nysax.agency</a></p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Disclaimer */}
          <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono tracking-wider text-neutral-500 uppercase">
            <p>© {currentYear} NYSA AGENCY. All rights reserved. Directed by Nikhil, Mokshith & Amaresh.</p>
            <div className="flex gap-6">
              <a href="#contact" className="hover:text-white transition-colors">Privacy</a>
              <a href="#contact" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
