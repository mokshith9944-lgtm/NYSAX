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
import { Logo } from './brand/Logo';
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
    { label: 'Work', href: '#results' },
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
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-gray-200/80 shadow-sm py-4'
          : 'bg-white py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo - NexStudio Style */}
          <button
            onClick={() => setCurrentView('home')}
            className="text-left group cursor-pointer"
          >
            <Logo size="md" subtext="Growth & Digital Studio" variant="light" />
          </button>

          {/* Desktop Navigation Links - Authentic NexStudio Uppercase Menu */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="cursor-pointer text-xs uppercase font-medium tracking-wider text-black hover:text-gray-500 transition-colors py-1"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Demo Access Bar */}
            {!isAuthenticated && (
              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1 text-[11px] text-gray-500">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Demo:</span>
                <button
                  onClick={() => quickDemoLogin('client')}
                  className="px-2 py-0.5 rounded-full hover:bg-black hover:text-white transition-colors text-gray-700 font-medium cursor-pointer"
                >
                  Client
                </button>
                <span className="text-gray-300">•</span>
                <button
                  onClick={() => quickDemoLogin('admin')}
                  className="px-2 py-0.5 rounded-full hover:bg-black hover:text-white transition-colors text-gray-700 font-medium cursor-pointer"
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
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200 text-black transition-all text-xs font-medium cursor-pointer"
                >
                  <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-[10px] font-bold text-white">
                    {user?.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="leading-tight text-black font-medium text-xs">{user?.name.split(' ')[0]}</p>
                    <p className="text-[9px] text-gray-500 capitalize">{user?.role}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-2 border-b border-gray-100 mb-1">
                      <p className="text-xs font-semibold text-black truncate">{user?.name}</p>
                      <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
                    </div>

                    {isAdmin ? (
                      <button
                        onClick={() => {
                          setCurrentView('admin_dashboard');
                          setUserDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                          currentView === 'admin_dashboard'
                            ? 'bg-black text-white'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-black'
                        }`}
                      >
                        <ShieldCheck className="w-4 h-4 text-black" />
                        Admin Command Center
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setCurrentView('client_portal');
                          setUserDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                          currentView === 'client_portal'
                            ? 'bg-black text-white'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-black'
                        }`}
                      >
                        <LayoutDashboard className="w-4 h-4 text-black" />
                        Client Portal & Campaigns
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setCurrentView('home');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-100 hover:text-black transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-black" />
                      Studio Home
                    </button>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                        setCurrentView('home');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
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
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium text-black hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer uppercase tracking-wider"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium bg-gray-100 hover:bg-gray-200 text-black border border-gray-200 transition-colors cursor-pointer uppercase tracking-wider"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  Register
                </button>
              </div>
            )}

            {/* NexStudio Signature Pill CTA */}
            <button
              onClick={onOpenBooking}
              className="group px-6 py-3 flex gap-2 items-center bg-black text-xs uppercase font-medium tracking-wider text-white rounded-full hover:bg-gray-800 transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
            >
              <span>Book Strategy Call</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            {!isAuthenticated ? (
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3 py-1.5 rounded-full bg-black text-xs font-medium text-white"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={() => setCurrentView(isAdmin ? 'admin_dashboard' : 'client_portal')}
                className="px-3 py-1.5 rounded-full bg-black text-xs font-medium text-white"
              >
                {isAdmin ? 'Admin' : 'Portal'}
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-black transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg px-6 py-6 animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-2 text-sm uppercase tracking-wider font-medium text-black hover:text-gray-500 border-b border-gray-100 cursor-pointer"
              >
                {link.label}
              </button>
            ))}

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 rounded-full bg-black text-white text-xs uppercase tracking-wider font-medium text-center hover:bg-gray-800 transition-colors"
              >
                Book Strategy Call
              </button>

              {!isAuthenticated && (
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('login');
                    }}
                    className="flex-1 py-2.5 rounded-full border border-gray-200 text-black text-xs font-medium text-center"
                  >
                    Client Login
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('register');
                    }}
                    className="flex-1 py-2.5 rounded-full bg-gray-100 text-black text-xs font-medium text-center"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
