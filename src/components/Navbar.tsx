import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  User as UserIcon, 
  ShieldCheck, 
  Calendar, 
  LogIn, 
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Mail
} from 'lucide-react';
import { Logo } from './brand/Logo';
import { InstagramIcon } from './icons/InstagramIcon';
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

  const navigateTo = (view: 'home' | 'client_portal' | 'admin_dashboard') => {
    setCurrentView(view);
    const targetPath = view === 'home' ? '/' : view === 'client_portal' ? '/portal/client' : '/admin';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
  };

  const navLinks = [
    { label: 'SERVICES', href: '#services' },
    { label: 'WHY US', href: '#why-us' },
    { label: 'PORTFOLIO', href: '#results' },
    { label: 'FEEDBACK', href: '#reviews' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      navigateTo('home');
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
          ? 'bg-white/95 backdrop-blur-md border-b border-black py-4'
          : 'bg-white border-b border-neutral-200 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigateTo('home')}
            className="text-left group cursor-pointer"
          >
            <Logo size="md" subtext="Growth & Digital Studio" variant="light" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="cursor-pointer text-xs uppercase font-mono tracking-widest text-black hover:opacity-60 transition-opacity py-1"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden md:flex items-center gap-4">
            {/* Direct Social & Mail Touchpoints */}
            <div className="flex items-center gap-2 pr-2 border-r border-neutral-300">
              <a
                href="mailto:contact@nysaagency.com?subject=[Project%20Inquiry]%20Nysa%20Agency"
                className="p-2 text-black hover:bg-neutral-100 transition-colors"
                title="Direct Mail Access"
                aria-label="Direct Mail Access"
              >
                <Mail className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </a>
              <a
                href="https://www.instagram.com/nysax.agency?stkn=MXdycDVzN3lqc2tqZA=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-black hover:bg-neutral-100 transition-colors"
                title="Official Instagram (@nysax.agency)"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} className="w-[18px] h-[18px] text-black" />
              </a>
            </div>

            {/* Quick Demo Access Bar */}
            {!isAuthenticated && (
              <div className="flex items-center gap-2 border border-neutral-200 px-2.5 py-1 text-[10px] uppercase font-mono tracking-wider text-neutral-500">
                <span>Demo:</span>
                <button
                  onClick={() => quickDemoLogin('client')}
                  className="hover:text-black transition-colors cursor-pointer underline"
                >
                  Client
                </button>
                <span className="text-neutral-300">/</span>
                <button
                  onClick={() => quickDemoLogin('admin')}
                  className="hover:text-black transition-colors cursor-pointer underline"
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
                  className="flex items-center gap-2.5 px-4 py-2 border border-black text-black transition-all text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  <div className="w-4 h-4 bg-black text-white text-[9px] font-mono flex items-center justify-center">
                    {user?.name.charAt(0)}
                  </div>
                  <span>{user?.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-56 bg-white border border-black shadow-lg p-2 z-50">
                    <div className="px-3 py-2 border-b border-neutral-200 mb-1">
                      <p className="text-xs font-medium text-black truncate">{user?.name}</p>
                      <p className="text-[10px] font-mono text-neutral-500 truncate">{user?.email}</p>
                    </div>

                    {isAdmin ? (
                      <button
                        onClick={() => {
                          navigateTo('admin_dashboard');
                          setUserDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                          currentView === 'admin_dashboard'
                            ? 'bg-black text-white'
                            : 'text-black hover:bg-neutral-100'
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Command Center
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          navigateTo('client_portal');
                          setUserDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                          currentView === 'client_portal'
                            ? 'bg-black text-white'
                            : 'text-black hover:bg-neutral-100'
                        }`}
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        Client Portal
                      </button>
                    )}

                    <button
                      onClick={() => {
                        navigateTo('home');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-mono uppercase tracking-wider text-black hover:bg-neutral-100 transition-colors cursor-pointer"
                    >
                      Home
                    </button>

                    <div className="border-t border-neutral-200 my-1" />

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                        navigateTo('home');
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-mono uppercase tracking-wider text-neutral-600 hover:text-black transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3.5 py-2 text-xs font-mono uppercase tracking-widest text-black hover:opacity-60 transition-opacity cursor-pointer"
                >
                  Client Portal
                </button>
              </div>
            )}

            {/* Quiet Editorial CTA - 0px border radius */}
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 bg-black text-white text-xs font-mono uppercase tracking-widest border border-black hover:bg-neutral-900 transition-colors cursor-pointer"
            >
              Schedule Consultation
            </button>
          </div>

          {/* Mobile Menu Trigger & Fast Action */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="mailto:contact@nysaagency.com?subject=[Project%20Inquiry]%20Nysa%20Agency"
              className="p-2 text-black"
              aria-label="Direct Mail Access"
            >
              <Mail className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </a>
            <a
              href="https://www.instagram.com/nysax.agency?stkn=MXdycDVzN3lqc2tqZA=="
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-black"
              aria-label="Instagram"
            >
              <InstagramIcon size={18} className="w-[18px] h-[18px] text-black" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-black text-black transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-black px-6 py-6 animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-2 text-xs uppercase font-mono tracking-widest text-black border-b border-neutral-100 cursor-pointer"
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 bg-black text-white text-xs font-mono uppercase tracking-widest text-center"
              >
                Schedule Consultation
              </button>

              {!isAuthenticated ? (
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('login');
                    }}
                    className="flex-1 py-2.5 border border-black text-black text-xs font-mono uppercase tracking-wider text-center"
                  >
                    Client Portal
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('register');
                    }}
                    className="flex-1 py-2.5 bg-neutral-100 text-black text-xs font-mono uppercase tracking-wider text-center"
                  >
                    Register
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo(isAdmin ? 'admin_dashboard' : 'client_portal');
                  }}
                  className="w-full py-2.5 border border-black text-black text-xs font-mono uppercase tracking-wider text-center"
                >
                  {isAdmin ? 'Admin Dashboard' : 'Client Dashboard'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
