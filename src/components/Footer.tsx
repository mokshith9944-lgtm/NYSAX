import React from 'react';
import { Mail, ArrowUpRight, ShieldCheck, User, LayoutDashboard } from 'lucide-react';
import { Logo } from './brand/Logo';
import { InstagramIcon } from './icons/InstagramIcon';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

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

  return (
    <footer className="bg-[#070707] text-white overflow-hidden">
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Top Logo Row */}
          <div className="mb-16 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-12 border-b border-neutral-800">
            <Logo size="lg" variant="dark" subtext="Creative & Growth Studio" />
            
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/nysax.agency?stkn=MXdycDVzN3lqc2tqZA=="
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 rounded-full border border-neutral-700 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4 fill-current" />
              </a>
              <a
                href="mailto:nysaxofficial@gmail.com"
                className="size-10 rounded-full border border-neutral-700 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenBooking}
                className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-medium uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Book Call
              </button>
            </div>
          </div>

          {/* 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-between gap-12 pb-16">
            {/* Col 1: Core Services */}
            <div>
              <h4 className="text-base font-semibold text-white mb-6 uppercase tracking-wider text-xs font-mono">
                Services
              </h4>
              <ul className="space-y-3.5 text-neutral-400 text-sm [&>li>a]:hover:text-white [&>li>a]:transition-colors">
                <li><a href="#services">SEO Optimization</a></li>
                <li><a href="#services">Website Design & CRO</a></li>
                <li><a href="#services">Sales Strategy Architecture</a></li>
                <li><a href="#services">Automated Email Marketing</a></li>
                <li><a href="#services">Newbies in Social Media</a></li>
              </ul>
            </div>

            {/* Col 2: Agency & Proof */}
            <div>
              <h4 className="text-base font-semibold text-white mb-6 uppercase tracking-wider text-xs font-mono">
                Agency
              </h4>
              <ul className="space-y-3.5 text-neutral-400 text-sm [&>li>a]:hover:text-white [&>li>a]:transition-colors">
                <li><a href="#why-us">Why Partner With Us</a></li>
                <li><a href="#results">Client Case Studies</a></li>
                <li><a href="#reviews">Founder Reviews</a></li>
                <li><a href="#roi-calculator">Revenue Simulator</a></li>
                <li><a href="#faq">Frequently Asked Questions</a></li>
              </ul>
            </div>

            {/* Col 3: Portals & Access */}
            <div>
              <h4 className="text-base font-semibold text-white mb-6 uppercase tracking-wider text-xs font-mono">
                Portals & Auth
              </h4>
              <ul className="space-y-3.5 text-neutral-400 text-sm">
                <li>
                  <button
                    onClick={() => {
                      if (isAuthenticated && !isAdmin) {
                        setCurrentView('client_portal');
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
                        setCurrentView('admin_dashboard');
                      } else {
                        onOpenAuth('login', 'admin');
                      }
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Admin Command Center
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenAuth('register', 'client')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Create New Account
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenAudit}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Free 7-Point Audit
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact & Studio Info */}
            <div>
              <h4 className="text-base font-semibold text-white mb-6 uppercase tracking-wider text-xs font-mono">
                Contact & Studio
              </h4>
              <div className="space-y-3 text-neutral-400 text-sm">
                <p>
                  Official Inquiries:<br />
                  <a href="mailto:nysaxofficial@gmail.com" className="text-white hover:underline font-mono text-xs">
                    nysaxofficial@gmail.com
                  </a>
                </p>
                <p>
                  Instagram DM:<br />
                  <a href="https://www.instagram.com/nysax.agency?stkn=MXdycDVzN3lqc2tqZA==" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-mono text-xs">
                    @nysax.agency
                  </a>
                </p>
                <p className="text-xs text-neutral-500 pt-2 font-mono">
                  Operational Hours:<br />Mon - Sat | 9:00 AM - 7:00 PM EST
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Disclaimer */}
          <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
            <p>© {currentYear} NYSAX Agency. All rights reserved. Designed in TailGrids NexStudio specification.</p>
            <div className="flex gap-6">
              <a href="#contact" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#contact" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
