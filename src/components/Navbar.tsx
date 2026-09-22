import React, { useState, useEffect } from 'react'
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
} from 'lucide-react'
import { Logo } from './brand/Logo'
import { InstagramIcon } from './icons/InstagramIcon'
import { useAuth } from '../context/AuthContext'

interface NavbarProps {
  onOpenAuth: (initialMode?: 'login' | 'register', initialRole?: 'client' | 'admin') => void
  onOpenBooking: () => void
  onOpenAudit: () => void
  currentView: 'home' | 'client_portal' | 'admin_dashboard'
  setCurrentView: (view: 'home' | 'client_portal' | 'admin_dashboard') => void
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onOpenBooking,
  currentView,
  setCurrentView,
}) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const { user, isAuthenticated, isAdmin, logout, quickDemoLogin } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigateTo = (view: 'home' | 'client_portal' | 'admin_dashboard') => {
    setCurrentView(view)
    const targetPath = view === 'home' ? '/' : view === 'client_portal' ? '/portal/client' : '/admin'
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath)
    }
    setMobileMenuOpen(false)
    setUserDropdownOpen(false)
  }

  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'SERVICES', href: '#services' },
    { label: 'PROCESS', href: '#process' },
    { label: 'WORK', href: '#work' },
    { label: 'TEAM', href: '#team' },
    { label: 'PRICING', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ]

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    if (currentView !== 'home') {
      navigateTo('home')
      setTimeout(() => {
        const el = document.querySelector(href)
        el?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      const el = document.querySelector(href)
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl'
          : 'bg-black/60 backdrop-blur-md border-b border-white/5 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo with Live Status Pip */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('home')}
            className="text-left group cursor-pointer flex items-center gap-3"
            data-cursor="hover"
          >
            <Logo size="sm" subtext="Digital Studio" variant="dark" />
          </button>
          <div className="hidden sm:flex items-center gap-1.5 pl-3 border-l border-white/10 font-mono text-[10px] text-silver-400">
            <span className="w-1.5 h-1.5 rounded-full bg-olive-500 animate-pulse-slow" />
            <span className="tracking-widest uppercase">DISPATCH ON</span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="font-mono text-xs uppercase tracking-widest text-silver-400 hover:text-white transition-colors relative py-1 group cursor-pointer"
              data-cursor="hover"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-[1px] bg-olive-500 w-0 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* Right Action Cluster */}
        <div className="hidden md:flex items-center gap-4">
          {/* Touchpoints */}
          <div className="flex items-center gap-1.5 pr-3 border-r border-white/10 text-silver-400">
            <a
              href="mailto:contact@nysaagency.com?subject=[Project%20Inquiry]%20Nysa%20Agency"
              className="p-2 hover:text-olive-400 hover:bg-white/5 transition-colors"
              title="Direct Mail Access"
            >
              <Mail size={16} />
            </a>
            <a
              href="https://www.instagram.com/nysax.agency?stkn=MXdycDVzN3lqc2tqZA=="
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-olive-400 hover:bg-white/5 transition-colors"
              title="Instagram (@nysax.agency)"
            >
              <InstagramIcon size={16} className="w-4 h-4" />
            </a>
          </div>

          {/* Quick Demo Selector */}
          {!isAuthenticated && (
            <div className="flex items-center gap-2 border border-white/10 bg-obsidian-850 px-2.5 py-1 text-[10px] uppercase font-mono tracking-wider text-silver-400">
              <span className="text-silver-500">Demo:</span>
              <button
                onClick={() => quickDemoLogin('client')}
                className="hover:text-olive-400 transition-colors cursor-pointer underline"
              >
                Client
              </button>
              <span>/</span>
              <button
                onClick={() => quickDemoLogin('admin')}
                className="hover:text-olive-400 transition-colors cursor-pointer underline"
              >
                Admin
              </button>
            </div>
          )}

          {/* User Auth or Sign In */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-obsidian-850 border border-white/10 font-mono text-xs text-white hover:border-olive-500 transition-colors cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-olive-500" />
                <span className="truncate max-w-[100px]">{user.name.split(' ')[0]}</span>
                <ChevronDown size={12} className="text-silver-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-obsidian-900 border border-white/10 shadow-2xl z-50 py-2">
                  <div className="px-4 py-2 border-b border-white/10 font-mono text-[10px] text-silver-400">
                    <div>{user.email}</div>
                    <div className="text-olive-400 uppercase font-bold mt-0.5">{user.role}</div>
                  </div>

                  <button
                    onClick={() => navigateTo('client_portal')}
                    className="w-full px-4 py-2 text-left font-mono text-xs text-silver-300 hover:bg-white/5 hover:text-white flex items-center gap-2"
                  >
                    <LayoutDashboard size={14} />
                    <span>Client Portal</span>
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => navigateTo('admin_dashboard')}
                      className="w-full px-4 py-2 text-left font-mono text-xs text-silver-300 hover:bg-white/5 hover:text-white flex items-center gap-2"
                    >
                      <ShieldCheck size={14} />
                      <span>Admin Desk</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      logout()
                      setUserDropdownOpen(false)
                    }}
                    className="w-full px-4 py-2 text-left font-mono text-xs text-silver-400 hover:bg-white/5 hover:text-white flex items-center gap-2 border-t border-white/5 mt-1"
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth('login')}
              className="px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-silver-300 border border-white/10 hover:border-olive-500 hover:text-white transition-colors cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* Primary CTA */}
          <button
            onClick={onOpenBooking}
            className="px-5 py-2 bg-olive-600 text-black font-mono text-xs uppercase font-bold tracking-widest hover:bg-olive-500 transition-all shadow-[0_0_20px_rgba(112,130,56,0.3)] cursor-pointer"
            data-cursor="hover"
          >
            Start Project
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white p-2"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-black/95 backdrop-blur-2xl z-40 p-6 flex flex-col justify-between overflow-y-auto">
          <nav className="flex flex-col gap-4 mt-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="font-display text-3xl font-bold text-white hover:text-olive-400 text-left py-2 border-b border-white/5"
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => navigateTo('client_portal')}
              className="font-display text-2xl font-bold text-silver-400 hover:text-white text-left py-2 border-b border-white/5"
            >
              CLIENT PORTAL
            </button>
          </nav>

          <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenBooking()
              }}
              className="w-full py-3 bg-olive-600 text-black font-mono text-xs uppercase font-bold tracking-widest text-center"
            >
              Schedule Consultation
            </button>

            <div className="flex justify-between items-center text-silver-400 font-mono text-xs pt-2">
              <a href="mailto:contact@nysaagency.com">contact@nysaagency.com</a>
              <a href="https://www.instagram.com/nysax.agency?stkn=MXdycDVzN3lqc2tqZA==" target="_blank" rel="noreferrer">
                @nysax.agency
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
