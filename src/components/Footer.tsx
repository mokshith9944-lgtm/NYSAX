import React from 'react'
import { Mail, ArrowUpRight } from 'lucide-react'
import { Logo } from './brand/Logo'
import { InstagramIcon } from './icons/InstagramIcon'
import { useAuth } from '../context/AuthContext'

interface FooterProps {
  onOpenAuth: (initialMode?: 'login' | 'register', initialRole?: 'client' | 'admin') => void
  onOpenBooking: () => void
  onOpenAudit: () => void
  setCurrentView: (view: 'home' | 'client_portal' | 'admin_dashboard') => void
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAuth,
  onOpenBooking,
  setCurrentView,
}) => {
  const currentYear = new Date().getFullYear()
  const { isAuthenticated, isAdmin } = useAuth()

  const navigateTo = (view: 'home' | 'client_portal' | 'admin_dashboard') => {
    setCurrentView(view)
    const targetPath = view === 'home' ? '/' : view === 'client_portal' ? '/portal/client' : '/admin'
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath)
    }
  }

  return (
    <footer className="bg-black text-silver-300 border-t border-white/10 pt-20 pb-10" id="contact">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <Logo size="md" variant="dark" subtext="Growth & Digital Architecture" />
              </div>
              <p className="font-body text-silver-400 text-sm max-w-sm leading-relaxed mb-6">
                We don't build generic websites. We engineer high-velocity digital futures that compound enterprise authority.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="mailto:contact@nysaagency.com?subject=[Project%20Inquiry]%20Nysa%20Agency"
                className="p-2.5 border border-white/10 text-silver-300 hover:text-white hover:border-olive-400 transition-colors"
                title="Direct Mail: contact@nysaagency.com"
                aria-label="Direct Mail Access"
              >
                <Mail size={16} />
              </a>
              <a
                href="https://www.instagram.com/nysax.agency?stkn=MXdycDVzN3lqc2tqZA=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 border border-white/10 text-silver-300 hover:text-white hover:border-olive-400 transition-colors"
                title="Official Instagram (@nysax.agency)"
                aria-label="Instagram"
              >
                <InstagramIcon size={16} className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenBooking}
                className="px-4 py-2.5 bg-olive-600 text-black text-xs font-mono uppercase font-bold tracking-widest hover:bg-olive-500 transition-colors cursor-pointer"
              >
                Schedule Consultation
              </button>
            </div>
          </div>

          {/* Capabilities */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs text-olive-400 uppercase tracking-widest mb-5">
              Disciplines
            </h4>
            <ul className="flex flex-col gap-3 font-mono text-xs text-silver-400">
              <li><a href="#services" className="hover:text-white transition-colors">Strategy Advisory</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">UI/UX Architecture</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Web Applications</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Mobile Systems</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">AI Pipelines</a></li>
            </ul>
          </div>

          {/* Company & Leadership */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs text-olive-400 uppercase tracking-widest mb-5">
              Leadership
            </h4>
            <ul className="flex flex-col gap-3 font-mono text-xs text-silver-400">
              <li><span className="text-white font-semibold">Nikhil</span> (Founder)</li>
              <li><span className="text-white font-semibold">Mokshith</span> (Co-Founder)</li>
              <li><span className="text-white font-semibold">Amaresh</span> (Co-Founder)</li>
              <li><a href="#team" className="text-olive-400 hover:underline pt-2 inline-block">Partner Profiles →</a></li>
            </ul>
          </div>

          {/* Access & Portal */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs text-olive-400 uppercase tracking-widest mb-5">
              Portal Access
            </h4>
            <ul className="flex flex-col gap-3 font-mono text-xs text-silver-400 mb-6">
              <li>
                <button
                  onClick={() => navigateTo('client_portal')}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span>Client Operations Portal</span>
                  <ArrowUpRight size={12} className="text-olive-400" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (isAdmin) {
                      navigateTo('admin_dashboard')
                    } else {
                      onOpenAuth('login', 'admin')
                    }
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span>Leadership Administration Desk</span>
                  <ArrowUpRight size={12} className="text-olive-400" />
                </button>
              </li>
            </ul>

            <div className="font-mono text-xs text-silver-500 pt-3 border-t border-white/5">
              <div>INBOX: contact@nysaagency.com</div>
              <div>LOCATION: Bangalore, India</div>
            </div>
          </div>
        </div>

        {/* Bottom Attribution Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-silver-500">
          <div>
            © {currentYear} NYSA AGENCY. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-4 text-silver-400">
            <span>BLACK</span>
            <span>•</span>
            <span>SILVER</span>
            <span>•</span>
            <span className="text-olive-400">OLIVE</span>
            <span>•</span>
            <span>WHITE</span>
          </div>

          <div>
            SERIOUS PARTNERSHIPS FOR AMBITIOUS FOUNDERS.
          </div>
        </div>
      </div>
    </footer>
  )
}
