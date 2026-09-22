import React, { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'

// Kinetic UI
import CustomCursor from './components/ui/CustomCursor'
import ScrollProgressBar from './components/ui/ScrollProgressBar'

// Nexus Storytelling Sections
import Hero from './components/sections/Hero'
import LogoCloud from './components/sections/LogoCloud'
import StorySection from './components/sections/StorySection'
import ServicesGrid from './components/sections/ServicesGrid'
import ProcessTimeline from './components/sections/ProcessTimeline'
import CaseStudies from './components/sections/CaseStudies'
import StatsSection from './components/sections/StatsSection'
import TeamSection from './components/sections/TeamSection'
import TestimonialsCarousel from './components/sections/TestimonialsCarousel'
import TechStack from './components/sections/TechStack'
import PricingSection from './components/sections/PricingSection'
import FAQSection from './components/sections/FAQSection'
import CTASection from './components/sections/CTASection'

// Modals & Application Portals
import { ChatAgent } from './components/chat/ChatAgent'
import { AuthModal } from './components/auth/AuthModal'
import { BookingModal } from './components/booking/BookingModal'
import { AuditModal } from './components/audit/AuditModal'
import { ClientPortal } from './components/portal/ClientPortal'
import { AdminDashboard } from './components/admin/AdminDashboard'
import { UserRole } from './types'
import { db } from './lib/storage'
import PortalFieldCollection from './components/effects/PortalFieldCollection'

const MainApp: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth()
  const [currentView, setCurrentView] = useState<'home' | 'client_portal' | 'admin_dashboard'>('home')

  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register'>('login')
  const [authInitialRole, setAuthInitialRole] = useState<UserRole>('client')
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [auditModalOpen, setAuditModalOpen] = useState(false)

  // Cloud Firestore synchronization on mount
  useEffect(() => {
    db.syncWithFirestore();
  }, []);

  // Sync state from URL pathname
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname
      if (path === '/portal/client') {
        if (!isAuthenticated) {
          handleOpenAuth('login', 'client')
          setCurrentView('home')
        } else {
          setCurrentView('client_portal')
        }
      } else if (path === '/admin') {
        if (!isAdmin) {
          handleOpenAuth('login', 'admin')
          setCurrentView('home')
        } else {
          setCurrentView('admin_dashboard')
        }
      } else {
        setCurrentView('home')
      }
    }

    handleLocationChange()
    window.addEventListener('popstate', handleLocationChange)
    return () => window.removeEventListener('popstate', handleLocationChange)
  }, [isAuthenticated, isAdmin])

  const setViewWithHistory = (view: 'home' | 'client_portal' | 'admin_dashboard') => {
    setCurrentView(view)
    const targetPath = view === 'home' ? '/' : view === 'client_portal' ? '/portal/client' : '/admin'
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath)
    }
  }

  const handleOpenAuth = (mode: 'login' | 'register' = 'login', role: UserRole = 'client') => {
    setAuthInitialMode(mode)
    setAuthInitialRole(role)
    setAuthModalOpen(true)
  }

  const handleAuthSuccess = (role: UserRole) => {
    if (role === 'admin') {
      setViewWithHistory('admin_dashboard')
    } else {
      setViewWithHistory('client_portal')
    }
  }

  return (
    <div className="relative min-h-screen bg-black text-silver-300 flex flex-col selection:bg-olive-600 selection:text-black overflow-x-hidden">
      {/* Interactive Kinetic UI Helpers */}
      <CustomCursor />
      <ScrollProgressBar />

      {/* Ambient 3D Shader Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-45">
        <PortalFieldCollection mode="dark" saturation={0} brightness={0.8} speed={0.7} />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <Navbar
          onOpenAuth={handleOpenAuth}
          onOpenBooking={() => setBookingModalOpen(true)}
          onOpenAudit={() => setAuditModalOpen(true)}
          currentView={currentView}
          setCurrentView={setViewWithHistory}
        />

        {/* View Router */}
        <main className="flex-1">
          {currentView === 'home' && (
            <>
              <Hero
                onBookConsultation={() => setBookingModalOpen(true)}
                onOpenAudit={() => setAuditModalOpen(true)}
              />
              <LogoCloud />
              <StorySection />
              <ServicesGrid
                onSelectService={() => setBookingModalOpen(true)}
              />
              <ProcessTimeline />
              <CaseStudies />
              <StatsSection />
              <TeamSection />
              <TestimonialsCarousel />
              <TechStack />
              <PricingSection
                onSelectPlan={() => setBookingModalOpen(true)}
              />
              <FAQSection />
              <CTASection
                onBookConsultation={() => setBookingModalOpen(true)}
              />
            </>
          )}

          {currentView === 'client_portal' && (
            <div className="pt-20">
              <ClientPortal
                onBackToHome={() => setViewWithHistory('home')}
                onOpenBooking={() => setBookingModalOpen(true)}
              />
            </div>
          )}

          {currentView === 'admin_dashboard' && (
            <div className="pt-20">
              <AdminDashboard
                onBackToHome={() => setViewWithHistory('home')}
              />
            </div>
          )}
        </main>

        {/* Global Editorial Footer */}
        {currentView === 'home' && (
          <Footer
            onOpenAuth={handleOpenAuth}
            onOpenBooking={() => setBookingModalOpen(true)}
            onOpenAudit={() => setAuditModalOpen(true)}
            setCurrentView={setViewWithHistory}
          />
        )}

        {/* 24/7 AI Growth Advisor */}
        <ChatAgent
          onOpenBooking={() => setBookingModalOpen(true)}
          onOpenAudit={() => setAuditModalOpen(true)}
        />

        {/* Modals */}
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialMode={authInitialMode}
          initialRole={authInitialRole}
          onSuccess={handleAuthSuccess}
        />

        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
        />

        <AuditModal
          isOpen={auditModalOpen}
          onClose={() => setAuditModalOpen(false)}
        />
      </div>
    </div>
  )
}

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  )
}

export default App
