import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Menu, 
  X, 
  User as UserIcon, 
  ShieldCheck, 
  Calendar, 
  ArrowRight, 
  LogIn, 
  LayoutDashboard,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenAuth: (initialMode?: 'login' | 'register', initialRole?: 'client' | 'admin') => void;
  onOpenBooking: () => void;
  onOpenAudit: () => void;
  currentView: 'home' | 'client_portal' | 'admin_dashboard';
  setCurrentView: (view: 'home' | 'client_portal' | 'admin_dashboard') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onOpenBooking,
  onOpenAudit,
  currentView,
  setCurrentView,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout, quickDemoLogin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Case Studies', href: '#results' },
    { label: 'Process', href: '#process' },
    { label: 'ROI Calculator', href: '#roi-calculator' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07090E]/90 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-black/50 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-violet via-purple-600 to-brand-cyan flex items-center justify-center p-0.5 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all">
              <div className="w-full h-full bg-[#0D111A] rounded-[10px] flex items-center justify-center">
                <span className="font-display font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 tracking-wider">
                  N
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-xl tracking-wider text-white group-hover:text-purple-300 transition-colors">
                  NYSAX
                </span>
                <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-widest rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Agency
                </span>
              </div>
              <p className="text-[10px] tracking-widest text-slate-400 uppercase -mt-0.5 font-medium">
                Growth & Creative
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] px-4 py-1.5 rounded-full backdrop-blur-md">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-full transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Action Cluster */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Demo Access Bar */}
            {!isAuthenticated && (
              <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 rounded-full px-2 py-1 text-[11px] text-slate-400">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold pl-1">Demo:</span>
                <button
                  onClick={() => quickDemoLogin('client')}
                  className="px-2 py-0.5 rounded-full hover:bg-purple-500/20 hover:text-purple-300 transition-colors text-slate-300"
                >
                  Client
                </button>
                <span className="text-slate-700">•</span>
                <button
                  onClick={() => quickDemoLogin('admin')}
                  className="px-2 py-0.5 rounded-full hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors text-slate-300"
                >
                  Admin
                </button>
              </div>
            )}

            {/* Auth Dropdown or Buttons */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-white/10 hover:border-purple-500/40 text-slate-200 transition-all text-xs font-medium"
                >
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-[11px] font-bold text-white">
                    {user?.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="leading-tight text-white font-semibold text-xs">{user?.name.split(' ')[0]}</p>
                    <p className="text-[10px] text-purple-400 capitalize">{user?.role}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#0E131F] border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-2 border-b border-slate-800/80 mb-1">
                      <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                    </div>

                    {isAdmin ? (
                      <button
                        onClick={() => {
                          setCurrentView('admin_dashboard');
                          setUserDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                          currentView === 'admin_dashboard'
                            ? 'bg-purple-600 text-white'
                            : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                        }`}
                      >
                        <ShieldCheck className="w-4 h-4 text-cyan-400" />
                        Admin Command Center
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setCurrentView('client_portal');
                          setUserDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                          currentView === 'client_portal'
                            ? 'bg-purple-600 text-white'
                            : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                        }`}
                      >
                        <LayoutDashboard className="w-4 h-4 text-purple-400" />
                        Client Portal & Campaigns
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setCurrentView('home');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-white/[0.06] hover:text-white transition-colors"
                    >
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      View Public Agency Site
                    </button>

                    <div className="border-t border-slate-800/80 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                        setCurrentView('home');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5 text-purple-400" />
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors"
                >
                  <UserIcon className="w-3.5 h-3.5 text-cyan-400" />
                  Create Account
                </button>
              </div>
            )}

            {/* Book Call Button */}
            <button
              onClick={onOpenBooking}
              className="relative group overflow-hidden rounded-xl p-px font-semibold text-xs transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 rounded-xl animate-shimmer" />
              <div className="relative px-4 py-2 rounded-[11px] bg-[#07090E] transition-all duration-300 group-hover:bg-transparent flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-purple-400 group-hover:text-white transition-colors" />
                <span className="text-white">Book Growth Call</span>
                <ArrowRight className="w-3 h-3 text-cyan-400 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            {!isAuthenticated ? (
              <button
                onClick={() => onOpenAuth('login')}
                className="px-2.5 py-1.5 rounded-lg bg-white/10 text-xs font-medium text-white"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={() => setCurrentView(isAdmin ? 'admin_dashboard' : 'client_portal')}
                className="px-2.5 py-1.5 rounded-lg bg-purple-600/30 border border-purple-500/40 text-xs font-medium text-purple-200"
              >
                {isAdmin ? 'Admin' : 'Portal'}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/[0.06] border border-white/10 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-white/10 space-y-2 bg-[#090D15]/95 backdrop-blur-2xl rounded-2xl p-4 shadow-2xl">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors"
              >
                {link.label}
              </button>
            ))}

            <div className="pt-2 border-t border-white/10 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-purple-500/20"
              >
                <Calendar className="w-4 h-4" />
                Book Strategy Discovery Call
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAudit();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-slate-200 text-xs font-medium hover:bg-white/10"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Request Free 7-Point Growth Audit
              </button>

              {!isAuthenticated && (
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      quickDemoLogin('client');
                    }}
                    className="flex-1 py-1.5 text-center text-xs bg-purple-500/10 border border-purple-500/30 text-purple-300 rounded-lg"
                  >
                    Demo Client
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      quickDemoLogin('admin');
                    }}
                    className="flex-1 py-1.5 text-center text-xs bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded-lg"
                  >
                    Demo Admin
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
